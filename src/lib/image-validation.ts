export const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
export const MAX_DIMENSION = 5000; // px
export const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export const ACCEPTED_LABEL = "JPG, PNG or WEBP";

export type ValidationResult = { ok: true; width: number; height: number } | { ok: false; error: string };

export function readDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("That file could not be opened as an image."));
    };
    img.src = url;
  });
}

export async function validateImage(file: File): Promise<ValidationResult> {
  if (!ACCEPTED_TYPES.includes(file.type as (typeof ACCEPTED_TYPES)[number])) {
    return { ok: false, error: `Unsupported format. Please use ${ACCEPTED_LABEL}.` };
  }
  if (file.size > MAX_FILE_BYTES) {
    return { ok: false, error: "That image is over 10 MB. Please upload a smaller file." };
  }
  try {
    const { width, height } = await readDimensions(file);
    if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
      return { ok: false, error: "Maximum resolution is 5000 × 5000 pixels." };
    }
    return { ok: true, width, height };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Invalid image." };
  }
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
