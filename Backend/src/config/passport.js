const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userModel = require("../models/user.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userModel.findOne({ googleId: profile.id });

        if (!user) {
          user = await userModel.findOne({ email: profile.emails[0].value });
          if (user) {
            // User exists but without googleId
            user.googleId = profile.id;
            await user.save();
          } else {
            // Create a new user
            
            // Generate a unique username if necessary
            let baseUsername = profile.displayName ? profile.displayName.replace(/\s+/g, '').toLowerCase() : profile.emails[0].value.split('@')[0];
            let username = baseUsername;
            let counter = 1;
            while(await userModel.findOne({ username })) {
                username = `${baseUsername}${counter}`;
                counter++;
            }

            user = await userModel.create({
              googleId: profile.id,
              email: profile.emails[0].value,
              username: username,
              profileImage: profile.photos[0] ? profile.photos[0].value : undefined,
            });
          }
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

module.exports = passport;
