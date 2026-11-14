import { defineRailway, github, preserve, project, service } from 'railway/iac';

// Railway definition for the websites monorepo, one service per app. Only
// production is deployed, from the main branch. Secrets and values are never
// written here: preserve() keeps whatever value is already set on Railway. Add
// a new variable name here first, then set its value in the dashboard.
//
//   railway config plan     preview against the linked environment
//   railway config apply    apply after review
//
// Not expressed here, still dashboard-managed: restart policy (Railway default,
// on failure with 10 retries).
export default defineRailway(() => {
  const region = 'europe-west4-drams3a';

  const repo = github('chrisbalola/cb-website', {
    branch: 'main',
    checkSuites: false,
  });

  // Watch paths are matched against each commit's diff; a service only
  // redeploys when something it builds from changed. Every app reads these
  // root files and the shared packages on top of its own directory.
  const sharedWatchPaths = ['/package.json', '/pnpm-lock.yaml', '/pnpm-workspace.yaml', '/turbo.json', '/packages/**'];
  const watchPaths = (app: string) => [`/apps/${app}/**`, ...sharedWatchPaths];

  const chrisbalola = service('chrisbalola-website', {
    source: repo,
    build: {
      buildCommand: 'pnpm --filter @websites/chrisbalola build',
      watchPatterns: watchPaths('chrisbalola'),
    },
    start: 'pnpm --filter @websites/chrisbalola start',
    healthcheck: '/',
    replicas: { [region]: 1 },
    domains: [
      { domain: 'chrisbalola.com', port: 8080 },
      { domain: 'www.chrisbalola.com', port: 8080 },
    ],
    // NEXT_PUBLIC_* values are inlined at build time, so a change needs a
    // redeploy, which Railway does on its own when a value is set.
    env: {
      ENVIRONMENT: preserve(),
      NEXT_PUBLIC_SITE_URL: preserve(),
      NEXT_PUBLIC_LINK_BLOG: preserve(),
      NEXT_PUBLIC_SOCIAL_X: preserve(),
      NEXT_PUBLIC_SOCIAL_LINKEDIN: preserve(),
      NEXT_PUBLIC_CONTACT_EMAIL: preserve(),
      NEXT_PUBLIC_LINK_MENEJA: preserve(),
      NEXT_PUBLIC_CF_ANALYTICS_TOKEN: preserve(),
    },
  });

  return project('chrisbalola', {
    resources: [chrisbalola],
  });
});
