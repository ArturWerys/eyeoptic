const ORPHANED_SINGLE_LETTER_WORDS =
  /(^|[\s([{"'“„])([AaIiOoUuWwZz])\s+(?=\S)/g;

export function formatDisplayText(value) {
  if (typeof value !== "string") return value;

  return value.replace(
    ORPHANED_SINGLE_LETTER_WORDS,
    (_, prefix, word) => `${prefix}${word}\u00A0`,
  );
}

