let todos = [
  {
    id: 1,
    taskTitle: "First task",
    description: "just text description",
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

function getCurrentTime() {
  let now = new Date();
  let currentTime = now.toTimeString().split(" ")[0];

  return currentTime;
}

function updateClock() {
  let clock = document.querySelector("#clock");
  clock.innerText = getCurrentTime();
}

setInterval(updateClock, 1000);

function appendTodo(todo, i) {
  const todoElement = document.getElementById("todo__items");
  todoElement.innerHTML += `
  <li class="todo__item">
    <div class="todo__task">
        <div class="task__main">
            <input class="todo__checkbox" type="checkbox" id="task-${
              todo[i - 1].id
            }">
            <p class="task__body">${todo[i - 1].taskTitle}</p>
        </div>
        <div class="task__dls">
            <p class="task__description">${todo[i - 1].description}</p>
            <p class="task__data">${todo[i - 1].due_date}</p>
        </div>
    </div>
  </li>`;
}

for (let i = 1; i <= todos.length; i++) {
  appendTodo(todos, i);
}
