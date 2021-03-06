'use strict';
exports.setup = function(User, config) {
  var passport = require('passport');
  var TwitterStrategy = require('passport-twitter').Strategy;

  passport.use(new TwitterStrategy({
      consumerKey: config.twitter.clientID,
      consumerSecret: config.twitter.clientSecret,
      callbackURL: config.twitter.callbackURL
    },
    function(token, tokenSecret, profile, done) {
      User.find({
          where: {
            'twitter': profile.id
          }
        })
        .then(function(user) {
          if (!user) {
            user = User.build({
              name: profile.displayName,
              email: '@' + profile.username,
              role: 'user',
              provider: 'twitter',
              twitter: profile.id
            });
            user.save()
              .then(function(user) {
                return done(null, user);
              })
              .catch(function(err) {
                return done(err);
              });
          } else {
            return done(null, user);
          }
        })
        .catch(function(err) {
          return done(err);
        });
    }));
};
