export const isNonEmptyArray = <T>(value: unknown): value is T[] =>
  Array.isArray(value) && value.length > 0;

export function getInitials(name: string) {
  const nameParts = name.split(' ');
  const initials = nameParts.map((part) => part.charAt(0).toUpperCase());
  return initials.join('');
}
