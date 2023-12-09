let jwt = require("jsonwebtoken");

//AUTHORIZATION: WHERE CAN YOU GO AS A LOGGED IN USER. ie. WHAT ROUTES CAN YOU ACCESS AS A LOGGED IN USTER THAT A REGULAR USER CAN'TX

let checkJWT = (req, res, next) => {
  let headerValue = req.get("Authorization");
  let signedToken;

  if (headerValue) {
    let parts = headerValue.split(" ");
    signedToken = parts[1];

    if (!signedToken) {
      console.log("Missing signed token");
      res.sendStatus(403);
      return; //stop
    }
  }

  // if i get here, the signed token is good, so i want to verify the secret
  try {
    let unsigned = jwt.verify(signedToken, process.env.JWT_SECRET);
    req.userInfo = unsigned;
  } catch (err) {
    console.log("Failed to verify token ", err);
    res.sendStatus(403);
    return;
  }

  next();
};

module.exports = { checkJWT };
