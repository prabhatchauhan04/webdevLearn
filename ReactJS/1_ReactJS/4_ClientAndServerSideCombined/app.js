import express from "express";
const app = express();
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
    
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public'))); // Public folder ko frontend par bhej do

app.set('view engine', 'hbs');
let todos = [];

app.get('/', (req, res) => {
    let data = todos.length > 0 ? todos : null;

    res.render('index', {
        todos: data
    });
})

app.get('/addtodo', (req, res) => {
    const { task, description, type } = req.query;
    todos.push({
        name: task,
        description
    })
    
    if(type) return res.send(todos); // CSR: AXIOS se request aai

    res.redirect('/'); // SSR: Form element se request aai
})

app.listen(4444, () => {
    console.log('http://localhost:4444')
})

/*
Here’s a **detailed, well-structured set of notes** for your project showing **both Server-Side Rendering (SSR) and Client-Side Rendering (CSR)** using the code you provided. I’ll break it into **concepts, folder structure, and what each file does**.

---

# 📝 **Project Notes: Both Client and Server Side Rendering**

## 1️⃣ **Concept**

This project demonstrates:

* **SSR (Server-Side Rendering):**

  * When a user submits the form normally, the server renders a fresh page with updated todos using Handlebars (`res.render('index', {...})`).
  * Works without JavaScript (basic HTML forms).

* **CSR (Client-Side Rendering):**

  * When a user submits the form using **Axios** from the front-end JS (`script.js`), the page **doesn’t reload**.
  * The front-end JS updates the DOM dynamically with the new todo.

**Key Idea:** The same endpoint `/addtodo` supports **both SSR and CSR** depending on how the request is made.

---

## 2️⃣ **Folder Structure**

```
project/
│
├─ app.js               # Express server code
├─ public/              # Static files served to frontend
│   └─ script.js        # Client-side JS for dynamic updates (CSR)
├─ views/               # Handlebars templates
│   └─ index.hbs        # HTML template for SSR
```

---

## 3️⃣ **app.js** – Server Code

### ✅ Key Functionalities

```js
import express from "express";
const app = express();
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
```

* Sets up an **Express server** with ES modules.

```js
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public'))); 
// Public folder ko frontend par bhej do
```

* **`express.static`** serves static files (JS, CSS, images).
* Anything in `public` can be accessed directly from the browser.

```js
app.set('view engine', 'hbs');
```

* Sets **Handlebars** as the template engine for SSR.

```js
let todos = [];
```

* In-memory storage of todos for demonstration purposes.

---

### **Routes**

#### 1️⃣ Home Route – SSR

```js
app.get('/', (req, res) => {
    let data = todos.length > 0 ? todos : null;
    res.render('index', { todos: data })
})
```

* Renders **index.hbs** with current todos.
* This is **Server-Side Rendering**.

#### 2️⃣ Add Todo Route – SSR + CSR

```js
app.get('/addtodo', (req, res) => {
    const { task, description, type } = req.query;
    todos.push({ name: task, description });
    
    if(type) return res.send(todos); // CSR: Axios request

    res.redirect('/'); // SSR: Normal form submission
})
```

* Adds a new todo to the array.
* Checks `type` query parameter:

  * `type = 'csr'` → send JSON back for **AJAX / Axios** (CSR)
  * Otherwise → **redirect back** to homepage (SSR)

---

### 4️⃣ Server Listening

```js
app.listen(4444, () => {
    console.log('http://localhost:4444')
})
```

* Starts the server on **port 4444**.

---

## 4️⃣ **index.hbs** – View Template

### Key Points

```html
<form action="/addtodo">
```

* Normal form submission → SSR.

```html
<ul class="tasklist">
    {{#each todos as |t|}}
        <li>{{t.name}} : {{t.description}}</li>
    {{/each}}
</ul>
```

* Handlebars loops over todos **rendered on the server**.

```html
<script src="/script.js"></script>
```

* Client-side JS is loaded from **public folder**.

**Notes:**

* Server renders initial todos list (SSR).
* JS handles dynamic updates without page reload (CSR).

---

## 5️⃣ **script.js** – Client-Side JS (CSR)

### Functionality

```js
ev.preventDefault(); 
```

* Prevents **normal form submission** (SSR).

```js
axios.get('/addtodo', {
    params: {
        task: taskValue,
        description: descriptionValue,
        type: 'csr'
    }
})
```

* Sends **AJAX request** to the server.
* `type='csr'` → server knows it’s **CSR** and sends JSON.

```js
.then(({ data }) => {
    setTask(data);
})
```

* Updates DOM dynamically with the new todos **without page reload**.

### `setTask()` function

* Clears current task list and adds all todos from response.
* Creates **li, div, p elements dynamically** for each todo.

---

## 6️⃣ **How SSR and CSR Work Together in This Project**

| Feature         | SSR                                    | CSR                                    |
| --------------- | -------------------------------------- | -------------------------------------- |
| Trigger         | Normal form submission                 | Button click intercepted by JS / Axios |
| Server Response | `res.redirect('/')` → full page reload | `res.send(todos)` → JSON data          |
| Rendering       | Handlebars renders HTML on server      | JS updates DOM dynamically             |
| First Load      | Fast HTML render                       | Not used on first load                 |
| UX              | Page reloads                           | No page reload, smoother               |

---

## 7️⃣ **Key Learnings**

* **Hybrid Approach:** Same backend endpoint supports both SSR and CSR.
* **express.static:** Serves JS files for frontend.
* **Handlebars (`hbs`)**: Server-side template rendering.
* **Axios:** Client-side request to server → dynamic update without reload.
* **Dynamic DOM Update:** `setTask()` shows CSR in action.

---

benefit of this approach is that you can cater to users with JavaScript disabled (SSR) while also providing a smooth, dynamic 
experience for users with JavaScript enabled (CSR). This dual strategy enhances accessibility and user experience simultaneously.
*/