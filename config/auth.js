var ids = {
  facebookAuth: {
     clientID: process.env.FACEBOOK_CLIENT || '498954433616322',
     clientSecret: process.env.FACEBOOK_SECRET || 'c20f555df96bcaf6d2587375bc539bbb',
     callbackURL: process.env.FACEBOOK_CALLBACK || 'http://localhost:3000/auth/facebook/callback'
  }
};

console.log(ids)
module.exports = ids;
