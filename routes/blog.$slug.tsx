import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { CoverImage } from "@/components/site/CoverImage";
import { AffiliateDisclosure } from "@/components/site/Disclosure";
import { JsonLd } from "@/components/site/JsonLd";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { OfferLink } from "@/components/site/OfferLink";
import { BLOG_CATEGORIES, BLOG_POSTS, getPost } from "@/lib/content/blog";
import { SEED_OFFERS } from "@/lib/offers/seed";
import { articleJsonLd, breadcrumbJsonLd, pageHead } from "@/lib/seo";
import { eur } from "@/lib/utils";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPostPage,
  head: ({ params }) => {
    const post = getPost(params.slug);
    return pageHead(
      post ? `${post.title} | The Booking Hack` : "Articolo | The Booking Hack",
      post?.description || "Articolo editoriale The Booking Hack.",
      `/blog/${params.slug}`,
      { ogType: "article", noindex: !post },
    );
  },
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  const post = getPost(slug);
  if (!post) throw notFound();
  const related = SEED_OFFERS.filter(
    (o) => (post.relatedOffers.includes(o.slug) || post.relatedOffers.includes(o.id)) && o.status === "PUBBLICATO",
  );
  const more = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const firstPara = post.body.find((b) => b.type === "p");
  const pull = firstPara && firstPara.type === "p" ? firstPara.text : post.description;

  return (
    <main className="editorial mx-auto w-[min(760px,calc(100%-1.5rem))] py-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          articleJsonLd({
            headline: post.title,
            description: post.description,
            path: `/blog/${post.slug}`,
            datePublished: post.datePublished,
            image: post.imageUrl,
          }),
        ]}
      />
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Blog", to: "/blog" }, { label: post.title }]} />
      <p className="text-xs font-bold uppercase tracking-wide text-muted">
        {BLOG_CATEGORIES[post.category]} · {post.dateLabel}
      </p>
      <h1 className="mt-2 font-display text-4xl leading-[1.05] md:text-5xl">{post.title}</h1>
      <p className="mt-4 text-lg text-muted">{post.description}</p>
      <div className="mt-4 flex items-center gap-3 border-y-3 border-ink py-3">
        <div className="flex size-11 items-center justify-center rounded-full border-3 border-ink bg-yellow font-display text-lg">F</div>
        <div>
          <p className="font-display text-sm">Filippo · editor</p>
          <p className="text-xs text-muted">Venezia · lettura ~4 min · bozza demo</p>
        </div>
      </div>
      <CoverImage
        src={post.imageUrl}
        alt={post.imageAlt}
        className="mt-6 aspect-video rounded-xl border-3 border-ink shadow-card"
        sizes="(max-width: 760px) 100vw, 760px"
        priority
      />
      <p className="mt-2 text-xs text-muted">{post.imageAlt} · stock da sostituire</p>
      <blockquote className="pullquote">{pull}</blockquote>
      <div className="prose-editorial">
        {post.body.map((block, i) => {
          if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
          if (block.type === "ul")
            return (
              <ul key={i}>
                {block.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            );
          if (i === 0) return null;
          return <p key={i}>{block.text}</p>;
        })}
      </div>
      <AffiliateDisclosure />
      {related.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-display text-2xl">Offerte collegate</h2>
          <p className="mt-1 text-sm text-muted">Le schede di cui parla l’articolo. Ancora catalogo demo.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((o) => (
              <OfferLink
                key={o.id}
                offer={o}
                className="overflow-hidden rounded-xl border-3 border-ink bg-surface shadow-card"
              >
                <CoverImage src={o.imageUrl} alt={o.imageAlt} className="aspect-video border-b-3 border-ink" sizes="50vw" showStock={false} />
                <div className="p-3">
                  <p className="text-xs font-bold uppercase text-muted">{o.badge}</p>
                  <p className="font-display">{o.title}</p>
                  <p className="font-display text-xl text-pink">{eur(o.price)}</p>
                </div>
              </OfferLink>
            ))}
          </div>
        </section>
      ) : null}
      <section className="mt-10">
        <h2 className="font-display text-2xl">Altri articoli</h2>
        <ul className="mt-3 border-3 border-ink bg-surface">
          {more.map((p) => (
            <li key={p.slug} className="border-b-3 border-ink last:border-b-0">
              <Link to="/blog/$slug" params={{ slug: p.slug }} className="block p-4 hover:bg-yellow">
                <p className="text-xs font-bold uppercase text-muted">{BLOG_CATEGORIES[p.category]}</p>
                <p className="font-display text-lg">{p.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <NewsletterForm />
    </main>
  );
}
