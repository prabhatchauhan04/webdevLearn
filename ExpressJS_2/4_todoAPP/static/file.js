
/*
💡 Why are we using fetch()?
Because fetch() allows us to send requests to the server without refreshing the page.
📌 In contrast:
Traditional HTML form submission → refreshes the page.
JavaScript fetch() → sends request and handles response in the background.
*/


const taskList = document.querySelector('.taskList');
function updateTodos(data) {
    // data: [{id, task}]
    taskList.innerText = '';
    // adds the fetched todos to the taskList ul
    data.forEach(d => {
        let li = document.createElement('li');
        // li.innerText = d.task;
        li.innerHTML =
            `<span class='task-name'>${d.task}</span>
            <button class='delete-btn'>❌</button>`
        li.setAttribute('id', d.id);
        li.setAttribute('class', 'task-item');
        taskList.appendChild(li);
    })
}


// this is just a GET request to fetch all todos from the server
// we will run this code when the page loads
// so that we can see all the todos when we open the page
// and when we add a new todo and the page reloads , we can see the updated list of todos
fetch('/todos')
    .then((res) => res.json())
    .then(data => {
        console.log(data);
        updateTodos(data);
    })


// EVENT LISTENER TO SEND REQUEST FOR ONE TASK AT THE BACKEND
taskList.addEventListener('click', ev => {
    let className = ev.target.getAttribute('class');
    if (className == 'task-name' || className == 'task-item') {

        // log kra dega ki konsa task click hua in console on browser
        let id = ev.target.getAttribute('id');
        if (!id) {
            id = ev.target.parentElement.getAttribute('id');
        }
        fetch(`/todo/${id}`)
            .then((res) => res.json())
            .then(data => {
                console.log(data);
            }).catch(err => {
                console.log(err)
            })
    }
    else if (className == 'delete-btn') {
        let id = ev.target.parentElement.getAttribute('id');
        fetch(`/todo-delete/${id}`)
            .then((res) => res.json())
            .then(data => {
                // console.log(data);
                updateTodos(data);
            }).catch(err => {
                console.log(err)
            })
    }


})
