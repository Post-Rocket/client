// Globals.
const PI = Math.PI,
  TWO_PI = PI + PI,
  HALF_PI = PI * 0.5,
  FOUR_PI = TWO_PI + TWO_PI,
  HEIGHT_PI = FOUR_PI + FOUR_PI,
  PIXEL_RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
  })();

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
  #r0 = Math.random() * FOUR_PI;

  // Public properties.
  x;
  y;
  r = 0;
  sx = 1;
  sy = 1;

  // Contructor.
  constructor({ p0, c0, c1, p1, delay, duration, color, draw, onParticuleDone }) {
    // Required input.
    this.#p0 = getValue(p0, this);
    this.#c0 = getValue(c0, this);
    this.#c1 = getValue(c1, this);
    this.#p1 = getValue(p1, this);
    this.x = this.#p0.x;
    this.y = this.#p0.y;

    // Optional input.
    this.#delay = Math.max(getValue(delay, this) || 0, 0);
    this.#duration = Math.max(getValue(duration, this) * (0.5 + 0.5 * Math.random()) || (3000 + Math.random() * 2000), 0);
    this.#color = getValue(color, this) || `#${Math.floor((Math.random() * 0xffffff)).toString(16)}`;
    this.#draw = getDrawFunc(getValue([draw], this));

    // Hidden method to update the onDone callback.
    Object.defineProperty(this, '__set_on_done__', {
      value: function(f) {
        this.#onDone = typeof f === "function" && f || noop;
      }
    });
    this.__set_on_done__(onParticuleDone);
  }

  // Check if particle cycle is done.
  get done() { return this.#done; }

  // Get particle color.
  get color() { return this.#color; }

  // Get the temporal and spatial position of a particle.
  getPosition(timingFunc) {
    const t = timingFunc(this.#time - this.#delay, 1, 0, this.#duration),
      p = cubeBezier(t, this.#p0, this.#c0, this.#c1, this.#p1);
    return [t, p];
  }

  // Update the particle state.
  update(timeStep, timingFunc) {
    const delay = this.#delay, end = this.#duration + delay;
    timeStep = getValue(timeStep);
    timingFunc = getValue([timingFunc]);

    // Get next time.
    if ((this.#time = this.#time + timeStep) > end) {
      this.#time = end;

      // The particle life is done.
      this.#done = true;

      // Callback.
      this.#onDone(this);

      return this;
    } else if (this.#time < delay) return this;

    // Remap time with timing function, get new point and delta.
    const [t, p] = this.getPosition(timingFunc),
      dx = p.x - this.x,
      dy = p.y - this.y;

    // Update position, rotation and scale.
    this.r = Math.atan2(dy, dx) + this.#r0;
    this.sy = Math.sin((HEIGHT_PI + this.#r0) * t);
    this.x = p.x;
    this.y = p.y;

    // Not done yet.
    this.#done = false;

    return this;
  }

  // Kill the particle.
  kill() {
    this.#done = true;
    this.#onDone(this);
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
    typeof arg0 === "function" ?
      arg0(ctx, this.#color, ...args.slice(1))
      : this.#draw(ctx, this.#color, ...args)
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
  #iteration = 0;
  #timeoutId;

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

    // Normalize  done callback.
    const onDone = this.#options.onDone, onParticuleDone = this.#options.onParticuleDone, that = this;
    this.#options.onDone = function(cancel = false) {
      typeof onDone === "function" && onDone(this);

      ++that.#iteration < that.#options.numIterations && !cancel && (
        that.init(), // init animation
        that.start() // start animation
      ) || (
        // If it was a temporary canvas:
        that.#options.temporary && (
          that.#canvas && (
            that.#canvas.remove(), // remove canvas from dom
            that.#canvas = null // free node
          ),
          that.#ctx = null, // remove canvas context
          that.#particles = [] // destroy particles
        )
      );
      return that;
    }
    typeof onParticuleDone === "function" && (
      this.#options.onParticuleDone = function(particule) {
        return onParticuleDone(particule, this);
      }
    );

    // Init particles, if it's not temporary.
    this.#options.temporary || (
      this.#particles = this.#options.initParticles(this.#options)
    );

    // Freeze options.
    Object.freeze(this.#options);

    // Set auto start.
    this.#options.autoStart && this.start();
  }

  // Get the number of particules active.
  get active() { return Array.isArray(this.#particles) && this.#particles.length || 0; }

  // Check if cycle is done.
  get done() { return !this.active; }

  // Check if all cycles are done.
  get fullyDone() { return !this.active && this.#iteration >= this.#options.numIterations; }

  // Get input options.
  get options() { return this.#options; }

  // Get check if temporary.
  get temporary() { return this.#options.temporary; }

  // Get the current iteration.
  get iteration() { return this.#iteration; }

  // Get the current iteration.
  get numIterations() { return this.#options.numIterations; }

  // Get playing.
  get playing() { return !!this.#timeoutId; }

  // Init system.
  init(options) {
    options = options && new Option({
      ...this.#options,
      ...options
    }) || this.#options;

    // If temporary canvas.
    this.#canvas || (
      this.#canvas = document.body.appendChild(document.createElement("canvas")),
      this.#canvas.style = "width: 100dvw; height: 100dvh; position: fixed; z-index: 999999; top: 0; left: 0",
      this.#canvas.width = this.#options.viewWidth * PIXEL_RATIO,
      this.#canvas.height = this.#options.viewHeight * PIXEL_RATIO,
      this.#ctx = this.#canvas.getContext('2d'),
      this.#ctx.scale(PIXEL_RATIO, PIXEL_RATIO)
    );

    // Init particules.
    this.#particles && this.#particles.length || (this.#particles = options.initParticles(options));

    return this;
  }

  // Start animation.
  start(options) {
    this.#particles && this.#particles.length && this.#canvas && this || this.init(options);
    requestAnimationFrame(() => this.animate());
    return this;
  }

  // Animate.
  animate() {
    this.#timeoutId = setTimeout(() => {
      let l = 0, i = 0, a = this.#particles, n = a.length, p;

      // Clear canvas.
      this.#ctx.clearRect(0, 0, this.#options.viewWidth, this.#options.viewHeight);

      // Draw particles and update them.
      for (; i !== n; ++i) {
        (p = a[i]).draw(this.#ctx).update(this.#options.timeStep, this.#options.timingFunc).done || (a[l++] = p);
      }
      (a.length = l) && requestAnimationFrame(() => this.animate()) || this.#options.onDone();
    }, this.#options.timeStep);
    return this;
  }

  // Pause animation.
  pause() {
    clearTimeout(this.#timeoutId);
    this.#timeoutId = undefined;
    return this;
  }

  // Cancel animation.
  cancel() {
    this.pause();
    this.#options.onDone(true);
    return this;
  }

  // Stop animation.
  restart(options) {
    return this.cancel().start(options);
  }

  // Stringify object, for debugging.
  toString() { return JSON.stringify(this, null, 2); }
}

export const createConfettis = Confettis.createConfettis = (...args) => new Confettis(...args);

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

// Additional utilities.
const RE = /[\-\_\s]+/g,
getEntry = s => (s || "").toLowerCase().replace(RE, "");

// Option class.
class Option {
  // Constructor.
  constructor (o) {
    const {
      ease = "outCubic", easing = ease, timing = easing, timingFunc = timing,
      step = 10, timeStep = step,
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
      onparticulecomplete, onParticuleComplete = onparticulecomplete,
      onconfettisdone = onParticuleComplete, onConfettisDone = onconfettisdone,
      onparticuledone = onconfettisdone, onParticuleDone = onparticuledone,
      loop = 1, loops = loop, iters = loops, numIters = iters, iterations = numIters, numIterations = iterations,
      start = false, autostart = start, autoStart = autostart,
      ...other
    } = typeof o === "object" && o || (typeof o === "string" && Options[getEntry(o)]) || Options.default;

    Object.assign(this, {
      timingFunc: getTimingFunc(timingFunc),
      timeStep,
      temporary,
      numParticles: Math.max(numParticles || 0, 0),
      initParticles: Array.isArray(initParticles) && (() => initParticles) || (typeof initParticles === "function" && initParticles) || Options.default.initParticles,
      viewWidth,
      viewHeight,
      center,
      color,
      draw: getDrawFunc(draw),
      onDone,
      onParticuleDone,
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
    timingFunc: "outCubic",
    initParticles: ({
      numParticles = 128,
      viewWidth,
      viewHeight,
      center,
      ...other
    }) => {
      const n = Math.max(numParticles || 0, 0);
      const particles = new Array(n);
      for (let i = 0; i !== n; ++i) {
        particles[i] = new Particle({
          p0: center,
          c0: new Point(...polar(Math.random() * TWO_PI, (0.9 * Math.random() + 0.1) * Math.min(viewWidth, viewHeight), 0.5 * viewWidth, 0.5 * viewHeight)),
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
getValue = (v, ...args) => (Array.isArray(v) && (v = v.flat()).length ?
  v[v.length === 1 ? 0 : Math.round(Math.random() * (v.length - 1))]
  : typeof v === "function" ? v(...args)
  : v) || 0,
polar = (angle, radius, cx = 0, cy = 0) => [radius * Math.cos(angle) + cx, radius * Math.sin(angle) + cy];

// Exports.
export default Object.freeze(Object.defineProperty(Confettis, 'Confettis', {
  value: Confettis
}));