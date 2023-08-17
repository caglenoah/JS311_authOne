let express = require("express");
let router = express.Router();
let controller = require("../controllers/messageController");

// any one can get to this route
router.get('/hello', controller.hello)


// private hello - someone with a valid token can access this route
// needs some work first 

router.get('/privatehello', controller.privateHello)

module.exports = router;

