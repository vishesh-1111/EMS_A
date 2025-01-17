var jwt = require('jsonwebtoken');

function isUser(req,res,next){
  
const token =req.cookies['token'];
//console.log('midlleware',token);
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
      return next();
  }

   jwt.verify(token, 'secret', (err, payload) => {
      if (err) {
          return next();
      }

      if (payload.role !== 'admin') {
          return next();
      }
     req.admin=payload;
        next();
     });
   };

    module.exports= {
        isUser,
        isAdmin,
    }