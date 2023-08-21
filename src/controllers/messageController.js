
let hello = (req, res) => {
    console.log("hello() from messages controller");
    res.send("Hello, this is a public hello:")
}


//we want this one available only to logged in users
let privateHello = (req, res) => {

    let fullName = req.userInfo.fullName;
    let userId = req.userInfo.userId;

    console.log("private hello from message controller")
    res.send("Hello! " + fullName + "! You are logged in with userId")
}

module.exports = { hello, privateHello } 