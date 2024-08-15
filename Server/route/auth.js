const express = require('express');
const passport = require('../config/passportConfig');
const router = express.Router();

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/user-login' }),
  (req, res) => {
    const { jwtToken } = req.user;
    res.redirect(`https://serenity-connect.netlify.app/home?token=${jwtToken}`);
  }
);

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
