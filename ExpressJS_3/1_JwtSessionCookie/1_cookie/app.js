const express= require('express');
const app= express();
const path= require('path');  //for path.join
const PORT=4441;

// npm install cookie-parser
const cookieParser = require('cookie-parser');   //seting cookies and parser for reading the cookie
app.use(cookieParser());  //middleware for cookies

app.use(express.urlencoded({extended:true}));  //for req.body

app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'inhex.html'));   //inorder to post using browser
})

app.post('/login',(req,res)=>{
    const{username}= req.body;

    // creating object for cookie
    let userData={
        username,
        count:0
    }

    res.cookie('user',JSON.stringify(userData),{
        httpOnly:true
    });     //setting a cookie with an object of key 'user' and value stringified of 'userData'
// all the above done using form in index.html

    res.redirect('/profile');   //after submit it redirects to profile page as response
}) 

app.get('/profile',(req,res)=>{
   console.log(req.cookies);

//    making sure cookie exists
    if(!req.cookies.user){
        return res.redirect('/login');
    }
    
    let userData= JSON.parse(req.cookies.user);  //parsing the cookie to get username and count   

    userData.count++;   

    // after increasing the count, setting up the same cookie again
    res.cookie('user',JSON.stringify(userData),{
        httpOnly:true
    });
    console.log(userData.count);

    res.send(`welcome ${userData.username} and count: ${userData.count}
        <br>
        <br>
        <a href='/logout'>
            <button>LOGOUT</button>
        </a>`
    );  //response data on the client side
})

app.get('/logout',(req,res)=>{
    res.cookie('user',"");    //setting up an empty cookie
    res.redirect('/login');  //after logout, redirecting to login page
})

app.listen(PORT,()=>{
    console.log('http://localhost:'+PORT);
})

/*
Cookies are small pieces of data stored on a user's browser by a website.
They are sent from the server to the browser, saved locally, and then automatically returned to the server with every subsequent 
request to the same domain.
Cookies are primarily used for identifying users, maintaining sessions, and storing small amounts of user-specific information.
*/