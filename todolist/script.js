// Select Elements
const form = document.getElementById('todoform');
const todoInput = document.getElementById('newtodo');
const todolistElement = document.getElementById('todos-list');
const addButton = document.getElementById('addButton'); // Add this line
const editButton = document.getElementById('editButton'); // Add this line

let todos = [];

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const action = document.querySelector('input[name="action"]:checked').value;

    if (action === 'add') {
        saveToDo();
    } else if (action === 'edit') {
        editToDo();
    }

    renderTodos();
});

addButton.addEventListener('click', function(event) { // Add this block
    event.preventDefault();

    saveToDo();
    renderTodos();
});

editButton.addEventListener('click', function(event) { // Add this block
    event.preventDefault();

    editToDo();
    renderTodos();
});

// RENDER TODOS
function renderTodos() {
    // CLEAR ELEMENT BEFORE A RE-RENDER
    todolistElement.innerHTML = '';

    todos.forEach((todo, index) => {
        todolistElement.innerHTML += `
        <div class="todo" id="${index}">
            <i class="bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle'}" style="color: ${todo.color}" data-action="check"></i>
            <p class="${todo.checked ? 'checked' : ''}" data-action="check">${todo.value}</p>
            <i class="bi bi-pencil-square" data-action="edit"></i>
            <i class="bi bi-trash" data-action="delete"></i>
        </div>`;
    });
}

// EDIT A TODO
function editTodo(todoId) {
    const newTodoValue = prompt('Edit todo:', todos[todoId].value);
    if (newTodoValue !== null) {
        todos[todoId].value = newTodoValue;
        renderTodos();
    }
}

// DELETE A TODO
function deleteTodo(todoId) {
    todos.splice(todoId, 1);
    renderTodos();
}

// SAVE TODOS TO LOCAL STORAGE
function saveTodosToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// LOAD TODOS FROM LOCAL STORAGE
function loadTodosFromLocalStorage() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
        renderTodos();
    }
}

// LOAD SAVED TODOS ON PAGE LOAD
loadTodosFromLocalStorage();
