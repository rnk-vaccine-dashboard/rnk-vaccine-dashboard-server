module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'd7b5eaad6de90033055aade386d23254'),
  },
});
