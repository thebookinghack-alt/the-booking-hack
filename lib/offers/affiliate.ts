export function isPlaceholderAffiliate(url: string) {
  return /example\.com|PLACEHOLDER|replace-with-real/i.test(url);
}
