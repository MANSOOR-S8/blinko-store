export function generateSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generateSku(prefix = "SKU"): string {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${Date.now().toString().slice(-6)}-${random}`;
}
