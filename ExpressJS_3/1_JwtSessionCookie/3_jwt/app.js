const express= require('express');
const app= express();
const path= require('path');
const PORT= 4441;

const cookieParser= require('cookie-parser')
app.use(cookieParser());

const jwt= require('jsonwebtoken');
const JWT_SECRET= "decneicnjvbjrgvd";

app.use(express.urlencoded({extended:true}));

app.get('/login', (req,res)=>{
    let token= req.cookies.token
    let userData;
    try{
        userData= jwt.verify(token, JWT_SECRET);
    } catch(error){
       return res.sendFile(path.join(__dirname,'index.html'));
    }
    res.redirect('/profile');
})

app.post('/login',(req,res)=>{
    const {username}= req.body;

    let userData= {
        username,
        count:0
    }

    var token= jwt.sign(userData, JWT_SECRET); 
    res.cookie('token',token,{ //not using JSON.stringify because token is already a string
        httpOnly:true
    } )

    res.redirect('/profile');
})

app.get('/profile',(req,res)=>{
    var token= req.cookies.token //not using JSON.parse because token is not an object
    if(!token){
        return res.redirect('/login');
    }

    var userData;
    try{
        userData= jwt.verify(token, JWT_SECRET);
    } catch(error){
        res.redirect('/login');
    }
    
    userData.count++;

    // re generating the token after updating the payload
    token= jwt.sign(userData, JWT_SECRET);
    res.cookie('token',token,{
        httpOnly:true
    } )
    res.send(`welcome ${userData.username} and the count is ${userData.count}
        <br><br>
        <a href='/logout'>
        <button>logout</button>
        </a>`
    )   
})

app.get('/logout',(req,res)=>{
    res.cookie('token',"",{
        httpOnly:true
    })
    res.redirect('/login');
})


app.listen(PORT,()=>{
    console.log(`http://localhost:`+PORT);
})

/*
1️⃣ What are Headers?

Headers are meta-information sent along with an HTTP request or response.

Example of a request:

GET /profile HTTP/1.1
Host: example.com
Authorization: Bearer <token>
Content-Type: application/json


Authorization → contains your JWT token

Content-Type → tells the server this is JSON

Host → tells which server you’re talking to

Headers are like the envelope of a letter, containing instructions about the letter, while the body is the actual content.

2️⃣ Why JWT is usually sent in Headers (Authorization) instead of Cookies
Reason	Explanation
Flexibility	Headers can be sent in any HTTP request, including API requests (fetch/Ajax). Cookies are automatically sent by browsers only.
Cross-domain APIs	When frontend and backend are on different domains, headers allow sending JWT without worrying about CORS cookie issues.
Stateless	JWT is self-contained; server doesn’t need to track it in a session. No need for server-side session storage.
Mobile/SPA friendly	Mobile apps or SPAs don’t automatically handle cookies like browsers; headers work everywhere.
3️⃣ Why Not Cookies (Always)?

You can store JWT in cookies, but:

Cookies are automatically sent on every request → might send JWT to unintended endpoints (CSRF risk).

Cookies need extra settings for security (httpOnly, SameSite, Secure).

For APIs (like fetch or mobile apps), headers are more explicit and flexible.

4️⃣ When Cookies Make Sense

If you want the browser to automatically send JWT without writing code for Authorization headers.

Use httpOnly cookies → safer from XSS attacks.

Example:

res.cookie('token', jwtToken, { httpOnly: true, secure: true });


Then the browser sends it automatically with requests.
*/

/*
⭐ JWT Structure

A JWT (JSON Web Token) is a string with three parts separated by dots:

xxxxx.yyyyy.zzzzz


Where:

Header → xxxxx

Payload → yyyyy

Signature → zzzzz

Each part is Base64URL-encoded.

1️⃣ Header

Contains metadata about the token, like algorithm and type.

Example JSON:

{
  "alg": "HS256",
  "typ": "JWT"
}


After Base64 encoding → first part of the token (xxxxx).

2️⃣ Payload (Claims)

Contains the actual data (called claims) you want to store in the token.

Example:

{
  "id": 1,
  "name": "John",
  "role": "admin",
  "iat": 1698200000
}


iat → issued at (timestamp)

Can also have exp → expiry timestamp

After Base64 encoding → second part of token (yyyyy).

Important: Payload is not encrypted, just encoded.
Anyone can decode it and see the info. Don’t put secrets here!

3️⃣ Signature

Ensures token integrity (it was really issued by your server).

Created by:

HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secretKey
)


After Base64 encoding → third part (zzzzz)

If someone changes the header or payload, the signature will not match, so the token is invalid.

Header and Payload are just encoded, not encrypted

Example: if your payload has { "id": 1, "name": "John" }, anyone can decode it with an online Base64 decoder or jwt.decode().

They can see the data, but cannot change it without breaking the signature.

Signature is what protects the token

Signature is created with a secret key (or private key for RSA).

If someone tampers with the header or payload, the signature won’t match, and the server will reject the token.

🔹 Why you can’t get the secret from the signature

HMAC and SHA256 are one-way functions

Given the output (signature), it’s computationally infeasible to reverse it to get the secret key.

Even if someone sees:

header.payload.signature


They can decode header & payload → yes

They cannot reverse the hash to get your secret

The only way to “forge” a token is to guess the secret key (brute-force), which is impractical if your secret is strong.
*/