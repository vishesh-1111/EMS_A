const {Router}  = require('express');
const authRouter = Router();
const passport = require('passport')

authRouter
authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile', 'openid'] })
)

.get( '/google/callback',
    passport.authenticate( 'google', {
      
      successRedirect: 'http://localhost:3000',
      failureRedirect: 'http://localhost:3000/login/user'
    })
  );

module.exports = authRouter

