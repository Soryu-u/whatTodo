let todos = [
  {
    id: 1,
    title: "First task",
    description: "just text description",
    done: true,
    due_date: new Date("2022-02-14"),
  },
  {
    id: 2,
    title: "Second important task",
    description: "",
    done: false,
    due_date: new Date("2022-02-16"),
  },
  {
    id: 3,
    title: "Finish `em all!",
    description: "tasks, i mean tasks",
    done: false,
    due_date: new Date("2022-02-17"),
  },
];

function renderClock() {
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
}

function renderCalendar() {
  function getCurrentTime() {
    let now = new Date();
    let currentTime = now.toDateString();

    return currentTime;
  }

  function updateCalendar() {
    let clock = document.querySelector("#calendar");
    clock.innerText = getCurrentTime();
  }

  setInterval(updateCalendar, 1000);
}

function isDone(i) {
  if (todos[i].done) {
    return "checked";
  } else {
    return "";
  }
}

function isOverdue(i) {
  let currentDate = new Date().setHours(0, 0, 0, 0, 0);
  let taskDate = todos[i].due_date.setHours(0, 0, 0, 0, 0);

  console.log(currentDate);
  console.log(taskDate);
  if (taskDate < currentDate) {
    return "overdue__task";
  } else {
    return "";
  }
}

function getDate(i) {
  function month(i) {
    if (todos[i].due_date.getMonth() % 0 > 0) {
      return todos[i].due_date.getMonth() + 1;
    } else {
      return `0${todos[i].due_date.getMonth() + 1}`;
    }
  }

  let date = `${todos[i].due_date.getFullYear()}-${month(i)}-${todos[
    i
  ].due_date.getDate()}`;
  return date;
}

function renderTodo() {
  function appendTodo(todo, i) {
    const todoElement = document.getElementById("todo__items");

    todoElement.innerHTML += `
    <li class="todo__item ">
        <div class="task__header">
          <input type="checkbox" name="todo__checkbox" ${isDone(i)}>
          <p class="task__body ">${todo[i].title}</p>
          <button class="delete__btn">
            <img src="./src/img/icons8-trash.svg" alt="">
        </button>  
        </div>
        <div class="task__content ">
            <p class="task__description">${todo[i].description}</p>
            <p class="task__date ${isOverdue(i)}">${getDate(i)}</p>
        </div>
    </li>`;
  }

  for (let i = 0; i < todos.length; i++) {
    appendTodo(todos, i);
  }
}

renderTodo();
renderClock();
renderCalendar();
