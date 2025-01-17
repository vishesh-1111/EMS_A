const {Router}  = require('express');
const authRouter = Router();
const passport = require('passport')
require('dotenv').config();

authRouter
authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile', 'openid'] })
)

.get('/google/callback',
  (req, res, next) => {

    passport.authenticate('google', (err, user, info) => {
      if (err) {
        console.error('Error during authentication:', err);
        return res.redirect(`${process.env.VERCEL_ORIGIN || process.env.LOCAL_ORIGIN}/login/user`);
      }
      if (!user) {
        console.error('No user found:', info);
        return res.redirect(`${process.env.VERCEL_ORIGIN || process.env.LOCAL_ORIGIN}/login/user`);
      }
      req.login(user, (err) => {
        if (err) {
          console.error('Login failed:', err);
          return res.redirect(`${process.env.VERCEL_ORIGIN || process.env.LOCAL_ORIGIN}/login/user`);
        }
        return res.redirect(process.env.VERCEL_ORIGIN || process.env.LOCAL_ORIGIN);
      });
    })(req, res, next);
  }
);

module.exports = authRouter

