export function convertToSlug(text: string) {
  return text
    .toLowerCase()                   // Convert to lowercase
    .trim()                          // Remove leading/trailing whitespace
    .replace(/[^\w\s-]/g, '')        // Remove all non-word characters except spaces and hyphens
    .replace(/\s+/g, '-')            // Replace spaces with hyphens
    .replace(/--+/g, '-')           // Replace multiple hyphens with a single hyphen
}

export function truncateString(str : string, maxLength = 150) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + '...';
  }
  return str;
}