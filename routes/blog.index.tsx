import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { CoverImage } from "@/components/site/CoverImage";
import { JsonLd } from "@/components/site/JsonLd";
import { BLOG_CATEGORIES, BLOG_POSTS } from "@/lib/content/blog";
import { articleJsonLd, breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
  head: () =>
    pageHead(
      "Blog | The Booking Hack",
      "Guide destinazione, metodo Hack Score, trasparenza affiliati e storie di prenotazione. Bozze editoriali, dati mock.",
      "/blog",
    ),
});

function BlogIndex() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <main className="mx-auto w-[min(1100px,calc(100%-1.5rem))] py-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Blog" }]} />
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">Editoriale · bozze demo</p>
      <h1 className="font-display text-4xl md:text-5xl">Pagine lunghe, pochi pezzi</h1>
      <p className="mt-3 max-w-xl text-muted">
        Non è un feed di offerte. Sono guide e metodi firmati, con link interni alle schede. Ogni articolo è ancora bozza.
      </p>

      {featured ? (
        <Link
          to="/blog/$slug"
          params={{ slug: featured.slug }}
          className="mt-8 grid overflow-hidden rounded-xl border-3 border-ink bg-surface shadow-card md:grid-cols-2"
        >
          <CoverImage
            src={featured.imageUrl}
            alt={featured.imageAlt}
            className="aspect-video md:aspect-auto md:min-h-72"
            sizes="(max-width: 800px) 100vw, 550px"
            priority
          />
          <div className="flex flex-col justify-center p-5 md:p-8">
            <p className="text-xs font-bold uppercase text-muted">
              In evidenza · {BLOG_CATEGORIES[featured.category]}
            </p>
            <h2 className="mt-2 font-display text-3xl leading-tight">{featured.title}</h2>
            <p className="mt-3 text-muted">{featured.description}</p>
            <p className="mt-4 text-sm font-bold">Leggi l’articolo →</p>
          </div>
        </Link>
      ) : null}

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {rest.map((post) => (
          <Link
            key={post.slug}
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="overflow-hidden rounded-xl border-3 border-ink bg-surface shadow-card"
          >
            <CoverImage src={post.imageUrl} alt={post.imageAlt} className="aspect-video border-b-3 border-ink" sizes="(max-width: 800px) 100vw, 50vw" />
            <div className="p-4">
              <p className="text-xs font-bold uppercase text-muted">
                {BLOG_CATEGORIES[post.category]} · {post.dateLabel}
              </p>
              <h2 className="mt-2 font-display text-xl leading-tight">{post.title}</h2>
              <p className="mt-2 line-clamp-2 text-sm text-muted">{post.description}</p>
            </div>
          </Link>
        ))}
      </div>
      <JsonLd
        data={BLOG_POSTS.map((p) =>
          articleJsonLd({
            headline: p.title,
            description: p.description,
            path: `/blog/${p.slug}`,
            datePublished: p.datePublished,
            image: p.imageUrl,
          }),
        )}
      />
    </main>
  );
}
