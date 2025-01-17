const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const jwt = require('jsonwebtoken');
const cookie = require('cookie'); // Ensure you install this library
const { user: User } = require('../models/user');
require('dotenv').config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.serverurl}/auth/google/callback`,
      passReqToCallback: true,
      accessType: 'offline',
      prompt: 'consent',
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            googleId: profile.id,
            email: profile.email,
            name: profile.displayName,
            profilePicture: profile.picture,
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
          await user.save();
        } else {
          user.accessToken = accessToken;
          user.refreshToken = refreshToken;
          await user.save();
        }

        // Generate JWT
        const tokenPayload = {
          _id: user._id,
          accessToken,
          name: user.name,
          email: user.email,
        };

        const jwtToken = jwt.sign(tokenPayload, 'secret', {
          expiresIn: '1h', // Token expiration
        });

        // Set the JWT cookie using res.setHeader
        request.res.setHeader(
          'Set-Cookie',
          cookie.serialize('token', jwtToken, {
            httpOnly: false, // Set to false if you want it accessible to client-side
            secure: true, // Send over HTTPS
            maxAge: 60 * 60, // 1 hour in seconds
            sameSite: 'none', // Required for cross-origin cookies
            path: '/', // Accessible across the application
          })
        );

        console.log('User authenticated and JWT set in cookie:', user);

        // Pass the user to the `done` callback
        return done(null, user);
      } catch (err) {
        console.error('Error saving user to MongoDB:', err);
        return done(err, null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = {
  passport,
};
