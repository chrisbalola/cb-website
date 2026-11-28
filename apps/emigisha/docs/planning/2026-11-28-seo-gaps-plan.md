# SEO gaps: plan

Fixes for the gaps found when checking emigisha.com on 28 Nov 2026. The basics are already right: server-rendered pages, a title, description and canonical URL per page, `lang="en"`, one `h1` per page, an Open Graph image, Organization structured data on the home page, and a `robots.txt` that allows everything.

## Status (28 Nov 2026)

Steps 1 to 6 are built. Decisions taken while building:

- The legal pages' last-updated date now lives in one constant, used for both the page line and the sitemap. The page shows it in the locale's long date format ("November 28, 2026").
- Step 6 was built before the company profiles exist: `NEXT_PUBLIC_COMPANY_LINKEDIN` and `NEXT_PUBLIC_COMPANY_X` are empty by default, so nothing shows until they are set. The founder settings were renamed to `NEXT_PUBLIC_FOUNDER_*`, with the same defaults.

Left: set the new Railway values once the profiles exist (step 6), and step 8 after deploying.

## Gaps

| #   | Gap                                                                                                                                 | Effect                                                                                                                                                     |
| --- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | No sitemap                                                                                                                          | Search engines find the legal pages only by following links.                                                                                               |
| 2   | Unknown paths that contain a dot (for example `/sitemap.xml`, `/anything.php`) return the "Page not found" page with status **200** | A soft 404: crawlers may index error pages, and Search Console reports them.                                                                               |
| 3   | `robots.txt` does not point to a sitemap                                                                                            | Crawlers do not discover the sitemap on their own.                                                                                                         |
| 4   | The legal pages inherit the home page's Open Graph title and URL                                                                    | A shared `/terms` link previews as "Emigisha" pointing at the home page.                                                                                   |
| 5   | The home page title is only "Emigisha"                                                                                              | Search results show a word most people do not know, with nothing about what the company does.                                                              |
| 6   | No company social profiles                                                                                                          | The structured data has no `sameAs` links, so Google cannot connect the company to its profiles. The site only shows the founder's GitHub, LinkedIn and X. |

## Causes

- **Gap 2:** the middleware matcher in `src/proxy.ts` skips any path with a dot (`.*\\..*`), so next-intl never sees `/sitemap.xml`. The App Router then matches it to `[locale]` with `sitemap.xml` as the locale. `[locale]/layout.tsx` does not check the locale, so it renders the layout around the not-found content with a 200.
- **Gap 4:** `generateMetadata` in the three legal routes sets `title`, `description` and `alternates`, but not `openGraph` or `twitter`. Next merges metadata shallowly, so those two objects come unchanged from `[locale]/layout.tsx`.
- **Gap 5:** `shared.pages.home.title` is "Emigisha", and the legal pages also use it as the site name in their titles (`Terms of Service · Emigisha`), so it cannot simply be changed.

## Plan

1. **Reject unknown locales** (gap 2). In `[locale]/layout.tsx`, read the `locale` param and call `notFound()` when `hasLocale(routing.locales, locale)` is false, as next-intl's setup guide does. Every unknown single-segment path then returns a real 404. Check that `/foo.php` and `/sitemap.xml` (before step 2) return 404.
2. **Sitemap** (gap 1). Add `src/app/sitemap.ts`, a Next metadata route, outside `[locale]`. List `/`, `/terms`, `/privacy` and `/refunds` with absolute URLs from `clientConfig.siteUrl`. Use the legal "Last updated" date as `lastModified` for the legal pages. A route at `app/sitemap.ts` takes priority over `[locale]`, so `/sitemap.xml` serves XML with a 200.
3. **robots** (gap 3). Replace `public/robots.txt` with `src/app/robots.ts`, allowing everything and pointing to `${siteUrl}/sitemap.xml`. Generating it keeps the sitemap URL in step with `NEXT_PUBLIC_SITE_URL`.
4. **Per-page Open Graph** (gap 4). Add a small helper, for example `pageMetadata({ title, description, path })`, that returns `title`, `description`, `alternates.canonical`, `openGraph` (title, description, url, type, siteName, image) and `twitter` together. Use it in the three legal routes, and in the root layout for the home page, so no page can drift again.
5. **Home page title** (gap 5). Add `shared.pages.home.documentTitle`: "Emigisha · Software that gives back". Use it for the home page `<title>` and Open Graph title only. Keep `title` ("Emigisha") as the site name used everywhere else. Keep the description under about 155 characters.
6. **Company social profiles** (gap 6). Needs the profiles to exist first (see below). Once they do:
   - Add company profile URLs to the config as `companyLinks` (for example `NEXT_PUBLIC_COMPANY_LINKEDIN`, `NEXT_PUBLIC_COMPANY_X`), each empty by default so nothing renders until set. Document them in `.env.example` and Railway.
   - Rename the founder variables to say what they are (`NEXT_PUBLIC_FOUNDER_GITHUB` and so on), so company and founder links cannot be mixed up. Update Railway at the same time.
   - Show the company profiles in the footer (small icons or text links) and add them to the Organization structured data as `sameAs`.
   - Add the founder's profiles to the founder entry in the structured data as `sameAs` too.
7. **Verify.** Build, then check: `/sitemap.xml` and `/robots.txt` return the right content types; `/foo.php` returns 404; each page's `og:title` and `og:url` match the page; the home page `<title>` reads as in step 5. Run the home page and one legal page through Google's Rich Results Test and a link preview checker after deploying.
8. **After deploy** (you): add emigisha.com to Google Search Console, submit the sitemap, and request indexing for the four pages.

Steps 1 to 5 are code in this repo and can ship together. Step 6 waits on the profiles. Step 8 needs your Google account.

## Company social media: current state

- The site supports only the **founder's** profiles: GitHub, LinkedIn and X in the about section. The config calls them `github`, `linkedin` and `x`, with env vars `NEXT_PUBLIC_SOCIAL_*` that default to the chrisbalola accounts.
- There are **no company profiles** in the config, the footer or the structured data. `website.md` does not list any either; the customer support notes leave the company's WhatsApp number open.
- The product sites have their own social settings (Instagram, TikTok, WhatsApp in Talatala, PrettyCV and StyledDoc). Those belong to the products and stay there.

Decide which company profiles to create before step 6. A LinkedIn company page is the most useful for a company that payment providers and partners look up; X is optional.
