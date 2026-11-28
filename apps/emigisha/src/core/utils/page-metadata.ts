import type { Metadata } from 'next';

type PageMetadataOptions = {
  /** Page name, shown as "<title> · <siteName>"; for the home page, set `fullTitle` instead */
  title?: string;
  /** Complete document title, used as is */
  fullTitle?: string;
  description: string;
  /** Path of the page, e.g. "/terms"; used for the canonical URL and the link preview URL */
  path: string;
  siteName: string;
};

const PREVIEW_IMAGE = { url: '/og.png', width: 1200, height: 630 };

/**
 * Title, description, canonical URL and link preview for one page, set together so the preview always matches the
 * page. URLs are relative to `metadataBase`, which the locale layout sets.
 */
export function pageMetadata({ title: pageTitle, fullTitle, description, path, siteName }: PageMetadataOptions): Metadata {
  const title = fullTitle ?? (pageTitle ? `${pageTitle} · ${siteName}` : siteName);

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: path,
      siteName,
      title,
      description,
      images: [{ ...PREVIEW_IMAGE, alt: siteName }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [PREVIEW_IMAGE.url],
    },
  };
}
