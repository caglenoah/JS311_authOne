
let hello = (req, res) => {
    console.log("hello() from messages controller");
    res.send("Hello, this is a public hello:")
}

let privateHello = (req, res) => {
    console.log("private hello from message controller")
    res.send("Hello! You are logged in")
}

module.exports = { hello, privateHello } 