export interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export function validate(validatableInput: Validatable): boolean {
  let isValid = true;
  const { value, required, minLength, maxLength, min, max } = validatableInput;

  if (required) {
    isValid = isValid && value.toString().trim().length !== 0;
  }

  if (typeof value === 'string') {
    if (minLength != null) {
      isValid = isValid && value.length >= minLength;
    }
    if (maxLength != null) {
      isValid = isValid && value.length <= maxLength;
    }
  }

  if (typeof value === 'number') {
    if (min != null) {
      isValid = isValid && value >= min;
    }
    if (max != null) {
      isValid = isValid && value <= max;
    }
  }
  return isValid;
}
