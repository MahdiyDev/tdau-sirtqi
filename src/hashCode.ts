function stringToHash(string: string): string {
  let hash = 0,
    i: number,
    char: number;

  if (string.length == 0) return hash.toString();

  for (i = 0; i < string.length; i++) {
    char = string.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return hash.toString();
}

export { stringToHash };
