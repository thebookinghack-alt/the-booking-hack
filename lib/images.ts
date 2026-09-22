/** Unsplash mock images: srcset + webp hint. Internamente sono stock da sostituire. */
export function withWidth(url: string, w: number) {
  if (!url.includes("images.unsplash.com")) return url;
  const u = new URL(url);
  u.searchParams.set("auto", "format");
  u.searchParams.set("fit", "crop");
  u.searchParams.set("w", String(w));
  u.searchParams.set("q", "75");
  u.searchParams.set("fm", "webp");
  return u.toString();
}

export function srcSet(url: string) {
  if (!url.includes("images.unsplash.com")) return undefined;
  return [400, 800, 1200, 1600].map((w) => `${withWidth(url, w)} ${w}w`).join(", ");
}

export const STOCK_LABEL = "Foto stock · da sostituire";
