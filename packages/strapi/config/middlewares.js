module.exports = ({ env }) => [
  'strapi::errors',
  {
    name: 'strapi::body',
    config: {
      jsonLimit: '10mb',
    },
  },
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', `${env('AWS_BUCKET')}.s3.${env('AWS_REGION')}.amazonaws.com`],
          'media-src': ["'self'", 'data:', 'blob:', `${env('AWS_BUCKET')}.s3.${env('AWS_REGION')}.amazonaws.com`],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];