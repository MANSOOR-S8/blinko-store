import { FieldErrors } from "./auth.validator";
import { Address } from "@/types/user.types";

export function validateShippingAddress(address: Partial<Address>): FieldErrors {
  const errors: FieldErrors = {};
  if (!address.fullName?.trim()) errors.fullName = "Full name is required.";
  if (!address.phone?.trim()) errors.phone = "Phone number is required.";
  if (!address.addressLine1?.trim()) errors.addressLine1 = "Address is required.";
  if (!address.city?.trim()) errors.city = "City is required.";
  if (!address.state?.trim()) errors.state = "State is required.";
  if (!address.postalCode?.trim()) errors.postalCode = "Postal code is required.";
  if (!address.country?.trim()) errors.country = "Country is required.";
  return errors;
}
