const {Router}  = require('express');
const authRouter = Router();
const passport = require('passport')
require('dotenv').config();

authRouter
authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile', 'openid'] })
)

.get( '/google/callback',
    passport.authenticate( 'google', {

      successRedirect: process.env.VERCEL_ORIGIN||process.env.LOCAL_ORIGIN,
      failureRedirect: `${process.env.VERCEL_ORIGIN||process.env.LOCAL_ORIGIN}/login/user`
    })
  );

module.exports = authRouter

