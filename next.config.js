module.exports = {
  images: {
    domains: [
      'platform-lookaside.fbsbx.com',
      'images.unsplash.com',
      'ik.imagekit.io',
      'image.flaticon.com'
    ]
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-tw']
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
};
