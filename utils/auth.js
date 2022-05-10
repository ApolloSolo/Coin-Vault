// Checks to see if User has a session
const hasSess = (req, res, next) => {
    
    // If no session then redirect to login screen
    if (!req.session.user_id) {
      res.redirect('/');
    } else {
      next();
    }
  };
  
  module.exports = hasSess;
  

