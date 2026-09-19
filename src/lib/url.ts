/**
 * Prefix an internal path with the site's base.
 *
 * Astro does not rewrite hrefs you write by hand, so every internal link and
 * asset reference goes through here. On a normal domain the base is `/` and
 * this is a no-op; on a GitHub Pages project site it is `/repo-name/`, and
 * without the prefix every link on the site would 404.
 */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
