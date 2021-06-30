const nextTranslate = require('next-translate');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});
module.exports = withBundleAnalyzer(
  nextTranslate({
    webpack5: false,
    images: {
      domains: [
        'platform-lookaside.fbsbx.com',
        'images.unsplash.com',
        'ik.imagekit.io',
        'image.flaticon.com'
      ]
    },
    async headers() {
      return [
        {
          source: '/:all*(svg|jpg|png)',
          locale: false,
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=9999999999, must-revalidate'
            }
          ]
        }
      ];
    },
    env: {
      BASE_URL:
        process.env.NODE_ENV === 'production'
          ? 'https://toi-moi.herokuapp.com'
          : 'http://localhost:3000'
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        issuer: {
          test: /\.(js|ts)x?$/
        },
        use: ['@svgr/webpack']
      });

      return config;
    }
  })
);
