export const uppercaseFirtChar = (word: string): string => {
  const firstChar = word.charAt(0).toUpperCase();
  const rest = word.slice(1);

  return `${firstChar}${rest}`;
};
