// Globals.
const PI = Math.PI,
  TWO_PI = PI + PI;
  HALF_PI = PI * 0.5,
  TEN_PI = 10 * PI;

// Point class.
class Point {
  // Public properties.
  x;
  y;

  // Constructor.
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  // Stringify object, for debugging.
  toString() { return JSON.stringify(this, null, 2); }
};

// Particle class.
const noop = () => {};
class Particle {
  // Private properties.
  #p0;
  #c0;
  #c1;
  #p1;
  #time = 0;
  #duration;
  #color;
  #draw;
  #done = false;
  #onDone;
  #delay = 0;

  // Public properties.
  x;
  y;
  r = 0;
  sx = 1;
  sy = 1;

  // Contructor.
  constructor({p0, c0, c1, p1, delay, duration, color, draw, onDone}) {
    // Required input.
    this.#p0 = getValue(p0);
    this.#c0 = getValue(c0);
    this.#c1 = getValue(c1);
    this.#p1 = getValue(p1);
    this.x = this.#p0.x;
    this.y = this.#p0.y;

    // Optional input.
    this.#delay = Math.max(getValue(delay) || 0, 0);
    this.#duration = Math.max(getValue(duration) || (3 + Math.random() * 2), 0);
    this.#color = getValue(color) || `#${Math.floor((Math.random() * 0xffffff)).toString(16)}`;
    this.#draw = getValue(getDrawFunc(draw));

    // Hidden method to update the onDone callback.
    Object.defineProperty(this, '__set_on_done__', {
      value: function(f) {
        this.#onDone = typeof f === "function" && f || noop;
      }
    });
    this.__set_on_done__(onDone);
  }

  // Check if particle cycle is done.
  get done() { return this.#done; }

  // Get particle color.
  get color() { return this.#color; }

  // Update the particle state.
  update(timeStep, timingFunc) {
    const delay = this.#delay, start = delay, end = this.#duration + delay;

    // Get next time.
    this.#time = Math.min(this.#time + timeStep, end);

    if (this.#time < delay) return this;

    // Remap time with timing function, get new point and delta.
    const t = timingFunc(this.#time - delay, 0, 1, this.#duration),
      p = cubeBezier(t, this.#p0, this.#c0, this.#c1, this.#p1),
      dx = p.x - this.x,
      dy = p.y - this.y;

    // Update position, rotation and scale.
    this.r = Math.atan2(dy, dx) + HALF_PI;
    this.sy = Math.sin(TEN_PI * t);
    this.x = p.x;
    this.y = p.y;

    // Check if the particle life is done.
    this.#done = this.#time === end;

    // Callback.
    this.#done && this.#onDone();

    return this;
  }

  // Kill the particle.
  kill() {
    this.#done = true;
    this.#onDone();
    return this;
  }

  // Reset particle time.
  reset(t = 0) {
    const end = this.#duration + delay;
    this.#time = t && Math.min(Math.max(t, 0), end) || 0;

    // Check if the particle life is done.
    this.#done = this.#time === end;

    // Callback.
    this.#done && this.#onDone();
    return this;
  }

  // Drawing function.
  draw(ctx, ...args) {
    if (this.#time < this.#delay || this.#done) return this;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.r);
    ctx.scale(this.sx, this.sy);
    const arg0 = args[0];
    typeof arg0 === "function" && arg0(this, ...args.slice(1))
      || this.#draw(ctx, arg0 || this.#color, ...args.slice(1))
    ctx.restore();
    return this;
  }

  // Stringify object, for debugging.
  toString() { return JSON.stringify(this, null, 2); }
};

// Confetti canon, can be attached to any canvas.
export class Confettis {
  // Private properties.
  #particles = [];
  #canvas = null;
  #ctx = null;
  #options;
  #completed = 0;
  #iteration = 0;
  #paused = false;

  // Constructor.
  constructor(canvas, options) {
    // Normalize input.
    typeof canvas === "string" && (canvas = document.getElementById(canvas));
    canvas && canvas instanceof HTMLElement && canvas.tagName.toLowerCase() === "confettis-canvas" && (canvas = canvas.canvas);
    // canvas instanceof HTMLCanvasElement && (this.#canvas = canvas);
    canvas && typeof canvas === "object" && !(
      options || canvas instanceof HTMLCanvasElement
     ) && (
      options = canvas,
      canvas = options.canvas
    );

    // Get options.
    this.#options = new Option(options);

    // Check if attached canvas is legit.
    canvas && canvas instanceof HTMLCanvasElement && !this.#options.temporary (
      this.#canvas = canvas,
      this.#ctx = this.#canvas.getContext('2d')
    ) || (
      this.#options.temporary = true
    );

    // Set pause.
    his.#paused = !this.#options.autoStart;

    // Normalize  done callback.
    const onDone = this.#options.onDone;
    this.#options.onDone = function() {
      (++this.#completed) >= this.#particles.length && (
        typeof onDone === "function" && onDone(this),
        // If it was a temporary canvas:
        this.#options.temporary && (
          this.#canvas ** this.#canvas.remove(), // remove canvas from dom
          this.#particles = [] // destroy particles
        ) || (
          ++this.#iteration < this.#options.numIterations && (
            this.reset(), // reset animation
            this.start() // start animation
          )
        )
      ); 
      return this;
    }

    // Init particles, if it's not temporary.
    this.#options.temporary || (
      this.#particles = this.#options.initParticles(this.#options)
    );

    // Freeze options.
    Object.freeze(this.#options);
  }

  // Get the number of particules.
  get length() {
    return Array.isArray(this.#particles) && this.#particles.length || 0;
  }

  // Get the number of particules completed.
  get completed() { return this.#completed; }

  // Get input options.
  get options() { return this.#options; }

  // Get check if temporary.
  get temporary() { return this.#options.temporary; }

  // Get the current iteration.
  get iteration() { return this.#iteration; }

  // Get the current iteration.
  get numIterations() { return this.#options.numIterations; }

  // Reset all particles at a time t.
  reset(t = 0) {
    this.#completed = 0;
    for (let i = 0, p = this.#particles, n = p.length; i !== n; ++i) p[i].reset(t);
    return this;
  }

  // Start animation.
  start() {
    this.#paused = false;
    return this;
  }

  // Pause animation.
  pause() {
    this.#paused = true;
    return this;
  }

  // Stop animation.
  stop() {
    return this.pause().reset();
  }

  // Stop animation.
  restart() {
    return this.stop().start();
  }

  // Stringify object, for debugging.
  toString() { return JSON.stringify(this, null, 2); }
}

// Option class.
class Option {
  // Constructor.
  constructor (o) {
    const {
      ease = "outCubic", easing = ease, timing = easing, timingFunc = timing,
      step = 1 / 60, timeStep = step,
      temp = false,
      temporary = temp,
      particles, confettis = particles, init = confettis, initParticles = init,
      n = 128, num = n, length = num, numParticles = length,
      w = window.innerWidth || 512, width = w, viewWidth = width,
      h = window.innerHeight || 512, height = h, viewHeight = height,
      x = 0.5 * viewWidth, cx = x,
      y = 0.5 * viewHeight, cy = y,
      center = new Point(cx, cy),
      col, color = col,
      shape, draw = shape,
      oncomplete, onComplete = oncomplete, done = onComplete, ondone = done, onDone = ondone,
      loop = 1, loops = loop, iters = loops, numIters = iters, iterations = numIters, numIterations = iterations,
      start = false, autostrt = start, autoStart = autoStart,
      ...other
    } = typeof o === "object" && o || (typeof o === "string" && Options[getEntry(o)]) || Options.default;

    Object.assign(this, {
      timingFunc: getTimingFunc(timingFunc),
      timeStep,
      temporary,
      numParticles: Math.max(numParticles || 0, 0),
      initParticles: Array.isArray(initParticles) && (() => initParticles) || (typeof initParticles === "function" && initParticles) || Confettis.Options.explosion.initParticles,
      viewWidth,
      viewHeight,
      center,
      color,
      draw: getDrawFunc(draw),
      onDone,
      numIterations: Math.max(numIterations, 1),
      autoStart,
      ...other
    });
  }

  // Stringify object, for debugging.
  toString() { return JSON.stringify(this, null, 2); }
}

// Preset options.
const Options = {
  get default() { return this.explosion; },
  explosion: new Option({
    initParticles: ({
      numParticles = 128,
      viewWidth,
      viewHeight,
      center,
      ...other
    }) => {
      const n = Math.max(numParticles || 0, 0);
      particles = new Array(n);
      for (let i = 0; i !== n; ++i) {
        particles[i] = new Particle({
          p0: center,
          c0: new Point(Math.random() * viewWidth, Math.random() * viewHeight),
          c1: new Point(Math.random() * viewWidth, Math.random() * viewHeight),
          p1: new Point(Math.random() * viewWidth, viewHeight + 64),
          ...other
        });
      }

      return particles;
    }
  })
}

// Freeze presets.
for (const k in Options) Object.freeze(Options[k]);
Object.freeze(Options);

// Confettis custom element.
export class ConfettisCanvas extends HTMLElement {

  // Constructor.
  constructor() {
    super();
  }
}

// Drawing functions.
const Draw = Object.freeze({
  get default() { return this.rectangle; },
  rectangle: (ctx, color, w = 8, h = 6) => (
    ctx.fillStyle = color,
    ctx.fillRect(-w * 0.5, -h * 0.5, w, h)
  )
}),
// Helper function to normalize draw function.
getDrawFunc = f => typeof f === "function" && f || (typeof f === "string" && Draw[getEntry(f)]) || Draw.default;

// Animation timing functions.
const Timing = Object.freeze({
  get default() { return this.linear; },
  linear: (t, a, b, d) => a * t / d + b,
  incubic: (t, a, b, d) => a * (t /= d) * t * t + b,
  outcubic: (t, a, b, d) => a * ((t = t / d - 1) * t * t + 1) + b,
  inoutcubic: (t, a, b, d) => {
    if ((t *= 2 / d) < 1) return 0.5 * a * t * t * t + b;
    return 0.5 * a * ((t -= 2) * t * t + 2) + b;
  },
  inback: (t, a, b, d, s = 1.70158) => (
    a * (t /= d) * t * ((s + 1) * t - s) + b
  )
}),
// Helper function to normalize timing function.
getTimingFunc = f => typeof f === "function" && f || (typeof f === "string" && Timing[getEntry(f)]) || Timing.default;

// Math functions.
const cubeBezier = (t, p0, c0, c1, p1, out = new Point) => {
  const nt = 1 - ((t || (t = 0))),
    nt2 = nt * nt,
    nt3 = nt2 * nt,
    tnt2_3 = 3 * t * nt2,
    t2 = t * t,
    t2nt_3 = 3 * t2 * nt,
    t3 = t2 * t;

    out.x = nt3 * p0.x + tnt2_3 * c0.x + t2nt_3 * c1.x + t3 * p1.x;
    out.y = nt3 * p0.y + tnt2_3 * c0.y + t2nt_3 * c1.y + t3 * p1.y;
    return out;
},
getValue = v => (Array.isArray(v) ?
  v[Math.round(Math.random() * (v.length - 1))]
  : v) || 0;

// Additional utilities.
const RE = /[\-\_\s]+/g,
getEntry = s => (s || "").toLowerCase().replace(RE, "");

// Register component.
customElements.define('confettis-canvas', ConfettisCanvas);

// Exports.
Confettis.ConfettisCanvas = ConfettisCanvas;
export default Object.freeze(Object.defineProperty(Confettis, 'Confettis', {
  value: Confettis
}));