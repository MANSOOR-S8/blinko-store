import { FieldErrors } from "./auth.validator";

export function validateProduct(input: {
  name: string;
  price: number | string;
  category: string;
  stock: number | string;
}): FieldErrors {
  const errors: FieldErrors = {};
  if (!input.name?.trim()) errors.name = "Product name is required.";
  if (input.price === "" || input.price === undefined || Number(input.price) < 0) {
    errors.price = "Enter a valid price.";
  }
  if (!input.category) errors.category = "Category is required.";
  if (input.stock === "" || input.stock === undefined || Number(input.stock) < 0) {
    errors.stock = "Enter a valid stock quantity.";
  }
  return errors;
}
