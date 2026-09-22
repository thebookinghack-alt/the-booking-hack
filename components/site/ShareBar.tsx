import { Copy, Send, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/offers/analytics";
import { APP_CONFIG } from "@/lib/offers/config";
import { useDeskStore } from "@/lib/offers/store";

export function ShareBar({ title, path }: { title: string; path: string }) {
  const pushToast = useDeskStore((s) => s.pushToast);
  const url = `${APP_CONFIG.siteUrl}${path}`;
  const text = `${title} — The Booking Hack`;

  async function nativeShare() {
    track("share_clicked", { channel: "native" });
    track("share", { title });
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title, url, text });
        return;
      }
      await copy();
    } catch {
      pushToast("Condivisione annullata.");
    }
  }

  async function copy() {
    track("share_clicked", { channel: "copy" });
    try {
      await navigator.clipboard.writeText(url);
      pushToast("Link copiato.");
    } catch {
      pushToast("Copia non disponibile.");
    }
  }

  const wa = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
  const tg = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;

  return (
    <div className="flex flex-wrap gap-2">
      <Button type="button" onClick={() => void nativeShare()} aria-label="Condividi offerta">
        <Share2 className="size-4" />
        Condividi
      </Button>
      <Button asChild>
        <a href={wa} target="_blank" rel="noopener noreferrer" onClick={() => track("share_clicked", { channel: "whatsapp" })}>
          WhatsApp
        </a>
      </Button>
      <Button asChild>
        <a href={tg} target="_blank" rel="noopener noreferrer" onClick={() => track("share_clicked", { channel: "telegram" })}>
          <Send className="size-4" />
          Telegram
        </a>
      </Button>
      <Button type="button" onClick={() => void copy()} aria-label="Copia link">
        <Copy className="size-4" />
        Copia link
      </Button>
    </div>
  );
}
