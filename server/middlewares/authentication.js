var jwt = require('jsonwebtoken');

function isUser(req,res,next){
const token = req.cookies['token'];
if(!token){
   return next();
}
try {
  var payload = jwt.verify(token, 'secret');
} catch(err) {
  return next(err);

}
req.user=payload;
return next();
}


const isAdmin = (req, res, next) => {
  const token = req.cookies['token'];

  if (!token) {
      return res.status(403).json({ message: 'No token provided' });
  }

   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
          return res.status(401).json({ message: 'Unauthorized' });
      }

      req.user = decoded;

      if (req.user.role !== 'admin') {
          return res.status(403).json({ message: 'Access denied. Admins only.' });
      }
      next();
    });
  };

    module.exports= {
        isUser,
        isAdmin,
    }