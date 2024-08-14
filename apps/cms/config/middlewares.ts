export default ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  // 'strapi::security',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        directives: {
          'default-src': [`'self'`],
          'img-src': [
            `'self'`,
            'data:',
            'blob:',
            'market-assets.strapi.io',
            env('SUPABASE_API_URL'),
          ],
          'media-src': [
            `'self'`,
            'data:',
            'blob:',
            'market-assets.strapi.io',
            env('SUPABASE_API_URL'),
          ],
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
