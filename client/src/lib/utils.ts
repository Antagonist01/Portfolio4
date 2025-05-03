import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Copies text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!navigator.clipboard) {
    console.error("Clipboard API not available");
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy: ", err);
    return false;
  }
}

/**
 * Creates a gradient text style with the specified colors
 */
export function gradientText(type: "primary" | "secondary" = "primary"): string {
  return type === "primary" 
    ? "bg-gradient-to-r from-primary-start to-primary-end bg-clip-text text-transparent"
    : "bg-gradient-to-r from-secondary-start to-secondary-end bg-clip-text text-transparent";
}

/**
 * Creates a gradient background style with the specified colors
 */
export function gradientBg(type: "primary" | "secondary" = "primary"): string {
  return type === "primary" 
    ? "bg-gradient-to-r from-primary-start to-primary-end"
    : "bg-gradient-to-r from-secondary-start to-secondary-end";
}

/**
 * Adds glass morphism effect to elements
 */
export function glassEffect(): string {
  return "bg-white/10 backdrop-blur-md border border-white/20 dark:bg-neutral-900/80 dark:border-neutral-700/30";
}
