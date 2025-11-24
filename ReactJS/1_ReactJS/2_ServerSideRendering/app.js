import express from "express";
const app = express();

app.set('view engine', 'hbs');
// app.set('views', 'pages'); // To rename the folder to pages 
// by default it looks for views folder in the root directory to find the templates
// so if we want to change the folder name then we can use the above line

let todos = [];

app.get('/', (req, res) => {
    let data = todos.length > 0 ? todos : null;

    res.render('index', {
        todos: data
    });
})

app.get('/addtodo', (req, res) => {
    const { task, description } = req.query;
    todos.push({
        name: task,
        description
    })

    res.redirect('/'); // It simply means GET request on '/'
    // res.render('index', {
    //     todos: todos
    // })
})

app.listen(4444, () => {
    console.log('http://localhost:4444')
})

/*
Server Side Rendering (SSR) :
(handlebars (mustache syntax) , ejs (embedded javascript template) , pug etc are template engines jo server side rendering ke 
liye use hote hain)
yha we used hbs (hbs) as template engine to render dynamic data on server side and send the final html to client.
ismein hacking ka scope kam hota hai kyunki client ko sirf final html hi milta hai.
usko js milta hi nhi. 
isliye ye zyada secure hota hai.
bcoz server pe hi sara rendering ho jata hai.
SSR basically means html aur js dono server pr hi render krdo taki client ko bs html aur css hi mile.
*/