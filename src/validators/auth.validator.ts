export interface FieldErrors {
  [field: string]: string;
}

export function validateRegister(input: { name: string; email: string; password: string }): FieldErrors {
  const errors: FieldErrors = {};
  if (!input.name?.trim()) errors.name = "Name is required.";
  if (!input.email?.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) errors.email = "Enter a valid email address.";
  if (!input.password) errors.password = "Password is required.";
  else if (input.password.length < 6) errors.password = "Password must be at least 6 characters.";
  return errors;
}

export function validateLogin(input: { email: string; password: string }): FieldErrors {
  const errors: FieldErrors = {};
  if (!input.email?.trim()) errors.email = "Email is required.";
  if (!input.password) errors.password = "Password is required.";
  return errors;
}
