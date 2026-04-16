/**
 * A lightweight utility to merge class names.
 * This is a vanilla replacement for 'clsx' and 'tailwind-merge' to keep the project dependency-free.
 */
export function cn(...inputs: any[]) {
  return inputs
    .flat()
    .filter((item) => typeof item === "string" && item)
    .join(" ");
}
