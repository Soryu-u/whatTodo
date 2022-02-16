let todos = [
  {
    id: 1,
    title: "First task",
    description: "just text description",
    done: false,
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
    title: "Make tea",
    description: "green tea, please",
    done: false,
    due_date: "",
  },
  {
    id: 4,
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

function isDone(todo) {
  if (todo.done) {
    return "checked";
  } else {
    return "";
  }
}

function isOpen() {
  let openBtn = document.getElementById("open");
  if (openBtn.classList.contains("active")) {
    getOpenTodo();
  }
}

function isOverdue(todo) {
  if (todo.due_date) {
    let currentDate = new Date().setHours(0, 0, 0, 0, 0);
    let taskDate = todo.due_date.setHours(0, 0, 0, 0, 0);

    if (taskDate < currentDate) {
      return "overdue__task";
    } else {
      return "";
    }
  } else {
    return "";
  }
}

function getDate(todo) {
  if (todo.due_date) {
    let taskDate = todo.due_date;
    function month() {
      if (taskDate.getMonth() % 0 > 0) {
        return taskDate.getMonth() + 1;
      } else {
        return `0${taskDate.getMonth() + 1}`;
      }
    }

    let date = `${taskDate.getFullYear()}-${month()}-${taskDate.getDate()}`;
    return date;
  } else {
    return "";
  }
}

function appendTodo(todo) {
  const todoElement = document.getElementById("todo__items");

  todoElement.innerHTML += `
  <li class="todo__item">
      <div class="task__header">
        <input id="${todo.id}" 
          type="checkbox" 
          class="todo__checkbox" 
          onclick="changeStatus(this)" 
          ${isDone(todo)}>
        <p class="task__body ">${todo.title}</p>
        <button class="delete__btn" onclick="deleteTask(this)">
          <img src="./src/img/icons8-trash.svg" alt="">
      </button>  
      </div>
      <div class="task__content ">
          <p class="task__description">${todo.description}</p>
          <p class="task__date ${isOverdue(todo)}">${getDate(todo)}</p>
      </div>
  </li>`;
}

function renderAllTodo() {
  todos.forEach((todo) => {
    appendTodo(todo);
  });
}

function getAllTodo() {
  let allBtn = document.getElementById("all");
  let openBtn = document.getElementById("open");

  openBtn.classList.remove("active");
  allBtn.classList.add("active");

  let tasksDone = document.querySelectorAll(".done");

  for (let i = 0; i < tasksDone.length; i++) {
    tasksDone[i].classList.remove("done");
  }
}

function getOpenTodo() {
  let allBtn = document.getElementById("all");
  let openBtn = document.getElementById("open");

  openBtn.classList.add("active");
  allBtn.classList.remove("active");

  let taskOpen = document.querySelectorAll(".todo__checkbox");

  for (let i = 0; i < taskOpen.length; i++) {
    if (taskOpen[i].checked) {
      taskOpen[i].parentElement.parentElement.classList.add("done");
    }
  }
}

function changeStatus(e) {
  isOpen();

  let taskId = e.id;
  if (todos[taskId - 1].id == taskId) {
    if (!todos[taskId - 1].done) {
      todos[taskId - 1].done = true;
    } else {
      todos[taskId - 1].done = false;
    }
  }
}

function deleteTask(e) {
  e.parentElement.parentElement.remove();
}

function createTodo(title, description, due_date) {
  this.title = title;
  this.description = description;
  this.due_date ? "" : new Date(due_date);
  this.done = false;
  this.id = todos.length + 1;
}

const taskForm = document.forms["task"];
const titleForm = document.getElementsByName("title");

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(taskForm);
  const task = Object.fromEntries(formData.entries());
  if (task.title) {
    titleForm[0].classList.remove("invalid__input");
    let todo = new createTodo(task.title, task.description, task.due_date);
    todos.push(todo);
    console.log(todos);
    appendTodo(todo);
    taskForm.reset();
  } else {
    console.log(titleForm);
    titleForm[0].classList.add("invalid__input");
  }
});

renderAllTodo();
renderClock();
renderCalendar();
