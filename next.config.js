module.exports = {
  images: {
    domains: [
      'links.papareact.com',
      'platform-lookaside.fbsbx.com',
      'images.unsplash.com',
      'ik.imagekit.io',
      'image.flaticon.com'
    ]
  },
  env: {
    NEXTAUTH_URL: 'http://localhost:3000',
    BASE_URL:
      process.env.NODE_ENV !== 'production'
        ? `http://localhost:3000`
        : 'https://daniel-fullstack-facebook.herokuapp.com'
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
