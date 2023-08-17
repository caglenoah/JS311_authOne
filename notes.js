/**
 * bob logs in with a username and password
 * and we have to figure out if it's really bob
 * 
 * we're going to store his creds in the database, so we have that info
 * but we NEVER store the password
 * 
 * don't store the password, but if you enter a password, i can verify that it's correct
 * 
 * what we're going to store is a hashed(encrypted) password
 * 
 * hash is a recipe to do that
 */

// recipe: a-z and 0-9
// assign a number to each char , so a-z -> 1-26, and 0-9 -> 27-36

//pwd
bob123

2
15
2
28
29
30

// add them up 2+15+2+28+29+30

106

//multiply that number by n times  n(106)

2132142342342 // this value is what i store

// we want one-way function, meaning it's easy to hash the pwd, but as hard as possible to un-hash

md5 // older recipe
sha256 // newer and harder to crack 

    //***************TERMINAL
    //echo-n"bob123" | md5
    //echo -n “Bob123” | shasum -a 256 | awk '{print $1}'

// the hash will be the same everytime i enter the password

// we sometimes us salt: random string that's added before the password and random number after the password

/**
 * register
 * user fills in username, password
 * we add the username to the database
 * then we generate a pwd hash from the pwd they entered and store the pwd hash(NOT the pwd)
 * 
 * login
 * user logs in with username and a password
 * we generate a pwd hash from the pwd they just entered
 * and check it against the hash in the database for that user
 * 
 * if they authenticate, then we create a token (we can put whatever we want in the token)
 * sign the token (confirmation that it's authentic) 
 * return the signed token
 * 
 * when the user makes the next request, that request will include (in the backround) their signed token
 * along with the route they're attempting to access
 * 
 * 
 * some routes are public (need no auth) and some are private (need auth) 
 * it's our job to make sure they have a good signed token to access the private routes
 * 
 * signed token is their "wristband" is valid
 * 
 * so, before we we let them access the private route, we have to check that token 
 * to make sure it's valid before i process the request
 * 
 * 
 */