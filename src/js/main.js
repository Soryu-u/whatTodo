let todos = [
  {
    id: 1,
    taskTitle: "First task",
    description: "just test area",
    done: false,
    due_date: "2022-02-15",
  },
  {
    id: 2,
    taskTitle: "Second important task",
    description: "",
    done: false,
    due_date: "2022-02-15",
  },
  {
    id: 3,
    taskTitle: "Finish them all!",
    description: "not serious",
    done: false,
    due_date: "2022-02-15",
  },
];

const todoElement = document.getElementById("todo__items");

function appendTodo(todo, i) {
  todoElement.innerHTML += `
  <li class="todo__item">
    <div class="todo__task"> 
        <input type="checkbox" id="task-${todo[i - 1].id}">
        <p class="task__body">${todo[i - 1].taskTitle}</p>
        <p class="task__description">${todo[i - 1].description}</p>
        <p class="task__data">${todo[i - 1].due_date}</p>
    </div>
  </li>`;
}

for (let i = 1; i <= todos.length; i++) {
  appendTodo(todos, i);
}
