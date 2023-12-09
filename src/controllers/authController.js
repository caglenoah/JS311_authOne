let db = require("../utils/db");
let argon2 = require("argon2");
let jwt = require("jsonwebtoken");
require("dotenv").config();

let register = async (request, res) => {
  let username = request.body.username;
  let password = request.body.password;

  let passwordHash;

  try {
    passwordHash = await argon2.hash(password);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
    return;
  }
  let params = [username, passwordHash];
  let sql = "insert into users (user_name, pswrd) values (?, ?)";

  try {
    let results = await db.queryPromise(sql, params); //calling function from db.js
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    if (err.code == "ER_DUP_ENTRY") {
      res.status(400).send("That user name is taken. Please select another.");
    } else {
      res.sendStatus(500);
    }
    return;
  }
};

let login = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  let sql = "select id, pswrd from users where user_name = ?";
  let params = [username];

  db.query(sql, params, async (err, rows) => {
    if (err) {
      console.log("Could not find username", err);
      res.sendStatus(500);
    } else {
      // we found someone, make sure it's just one row
      if (rows.length > 1) {
        console.log("Returned too many rows for username", username);
        res.sendStatus(500);
      } else if (rows.length == 0) {
        console.log("username does not exist");
        res
          .status(400)
          .send("That user name doesn't exist. Please sign up for an account");
      } else {
        //it comes back as an array with an object, so you have to get the row values by it's index

        let passwordHash = rows[0].pswrd;
        let userId = rows[0].id;

        let goodPass = false;

        try {
          goodPass = await argon2.verify(passwordHash, password); // return a boolean, so if it's good here, then goodPass = true //uses the argon2 (beautiful) verify() method
        } catch (err) {
          console.log("failed to verify password", err);
          res.status(400).send("Invalid Password");
        }

        if (goodPass) {
          let token = {
            user_name: username,
            userId: userId,
          };

          // now i need to sign the token
          let signedToken = jwt.sign(token, process.env.JWT_SECRET);
          // show this just for testing

          // cannot have line 109 and 113 ran at the same time

          res.status(200); // this is what you will send in a real life situation (production)
          res.send(signedToken);
        } else {
          res.sendStatus(400);
        }
      }
    }
  });
};

module.exports = { register, login };
