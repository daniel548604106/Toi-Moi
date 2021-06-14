module.exports = {
  images: {
    domains: [
      'links.papareact.com',
      'platform-lookaside.fbsbx.com',
      'images.unsplash.com',
      'ik.imagekit.io'
    ]
  },
  env: {
    NEXTAUTH_URL: 'http://localhost:3000'
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
