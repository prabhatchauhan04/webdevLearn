
// this is just a GET request to fetch all todos from the server
// we will run this code when the page loads
// so that we can see all the todos when we open the page
// and when we add a new todo and the page reloads , we can see the updated list of todos
fetch('/todos')
    .then(res => res.json())
    .then(data => {
        // adds the fetched todos to the taskList ul
        const taskList = document.querySelector('.taskList');
        data.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = `${todo.id}. ${todo.task}`;
            taskList.appendChild(li);
        });
    });

/*
💡 Why are we using fetch()?
Because fetch() allows us to send requests to the server without refreshing the page.
📌 In contrast:
Traditional HTML form submission → refreshes the page.
JavaScript fetch() → sends request and handles response in the background.
*/
