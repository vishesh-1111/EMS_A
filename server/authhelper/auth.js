const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const {user:User} = require('../models/user');
require('dotenv').config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.serverurl}/auth/google/callback`,
  passReqToCallback: true,
  accessType: 'offline',
  prompt: 'consent',
},
async function(request, accessToken, refreshToken, profile, done) {
  try {
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
  
      user = new User({
        googleId: profile.id,
        email: profile.email,
        name: profile.displayName,
        profilePicture: profile.picture,
        accessToken:accessToken, 
        refreshToken:refreshToken, 
      });
      await user.save();
    } else {
      user.accessToken = accessToken;
      user.refreshToken = refreshToken;
      await user.save();
    }

    // Pass the user and token to the done callback
    console.log('done',user);
    return done(null, user);
  } catch (err) {
    console.error('Error saving user to MongoDB', err);
    return done(err, null);
  }
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports={
  passport,
}