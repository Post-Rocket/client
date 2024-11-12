import "../utils/stringUtils.js";

// Check if input is an event.
const isSubmitEvent = event => {
  if (!event || typeof event !== 'object') return false;
  else if (event.target && event.target instanceof HTMLFormElement) return true;
  try {
    return event instanceof SyntheticBaseEvent || event instanceof SubmitEvent;
  } catch {
    return event instanceof SubmitEvent;
  }
}

// Create data from a form.
export const createFormData = (input, defaultOutput = {}) => {
  if (!input || typeof input !== 'object') return defaultOutput;
  let submitter;

  // If input is an event instead of a form.
  input instanceof HTMLFormElement || (isSubmitEvent(input) && (
    submitter = input.submitter,
    input = input.target
  ));

  // If we can't capture the form element.
  if (!(input instanceof HTMLFormElement)) return defaultOutput;

  // Format data, ignoring empty values.
  const output = {};
  input = new FormData(input);
  submitter && submitter.name && input.append(submitter.name, submitter.value || true);
  for (const pair of input) {
    const [key, value] = pair;
    (typeof value === 'number' || typeof value === 'boolean' || value) && (
      output[key.toCamelCase()] = value
    );
  }

  // Return output.
  return output;
};

// Exports.
export default Object.freeze(Object.defineProperty(createFormData, 'createFormData', {
  value: createFormData
}));