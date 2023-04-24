const jwt = require("jsonwebtoken");

exports.requireLogin = (req, res, next) => {
      if (req.headers.authorization){
            const token = req.headers.authorization.split(" ")[1];
            const user = jwt.verify(token, process.env.JWT_SECRECT);
            // console.log(user);
            req.user = user;
      }else{
            return res.status(400).json({message: 'Authorization Required!'});
      }
      next();
}

exports.userMiddleware = (req, res, next) => {
      if(req.user.role !== 'user'){
            return res.status(400).json({message: "User access denied"});
      }
      next();
}

exports.billingUserMiddleware = (req, res, next) => {
      if(req.user.role !== 'billingUser'){
            return res.status(400).json({message: "Billing user access denied"});
      }
      next();
}

exports.kitchenUserMiddleware = (req, res, next) => {
      if(req.user.role !== 'kitchenUser'){
            return res.status(400).json({message: "Kitchen user access denied"});
      }
      next();
}

exports.adminMiddleware = (req, res, next) => {
      if(req.user.role !== 'admin'){
            return res.status(400).json({message: "Admin access denied"});
      }
      next();
}