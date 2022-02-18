const localUrl = "http://localhost:8000";
fetch(localUrl + `/tasks`)
  .then((response) => response.json())
  .then(renderAllTodo)
  .catch(alert);

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

function isOpenMode() {
  let openBtn = document.getElementById("open");
  if (openBtn.classList.contains("active")) {
    getOpenTodo();
  }
}

function isOverdue(todo) {
  if (todo.due_date) {
    let currentDate = new Date().setHours(0, 0, 0, 0, 0);
    let taskDate = new Date(todo.due_date).setHours(0, 0, 0, 0, 0);

    if (taskDate < currentDate) {
      return "overdue__task";
    } else {
      return "";
    }
  }
}

function getDate(todo) {
  if (todo.due_date) {
    let taskDate = new Date(todo.due_date);
    function month() {
      return taskDate.getMonth() + 1 > 9
        ? taskDate.getMonth() + 1
        : `0${taskDate.getMonth() + 1}`;
    }
    function day() {
      return taskDate.getDate() > 9
        ? taskDate.getDate()
        : `0${taskDate.getDate()}`;
    }
    let date = `${day()}.${month()}.${taskDate.getFullYear()}`;
    return date;
  } else {
    return "";
  }
}

function appendTodo(todo) {
  const todoElement = document.getElementById("todo__items");

  todoElement.insertAdjacentHTML(
    "beforeend",
    `
  <li id="${todo.id}" class="todo__item ${todo.done ? "done" : ""}">
      <div class="task__header">
        <input "
          type="checkbox"
          class="todo__checkbox"
          onclick="changeStatus(this)"
          ${isDone(todo)}>
        <p class="task__body ${isDone(todo)}">${todo.title}</p>
        <button  class="delete__btn" onclick="deleteTask(this)">
          <img src="./src/img/icons8-trash.svg" alt="">
      </button>
      </div>
      <div class="task__content ">
          <p class="task__description">${todo.description}</p>
          <p class="task__date ${isOverdue(todo)}">${getDate(todo)}</p>
      </div>
  </li>`
  );
}

let allBtn = document.getElementById("all");
let openBtn = document.getElementById("open");
let ulContainer = document.querySelector("#todo__items");

function renderAllTodo(todo) {
  todo.forEach(appendTodo);
}

function getAllTodo() {
  openBtn.classList.remove("active");
  allBtn.classList.add("active");

  ulContainer.classList.remove("hide-done");
}

function getOpenTodo() {
  openBtn.classList.add("active");
  allBtn.classList.remove("active");

  ulContainer.classList.add("hide-done");
}

async function sendRequest(method, url, body) {
  const headers = {
    "content-type": "application/json",
  };

  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: headers,
  });
  return await response.json();
}

function changeStatus(input) {
  let taskLi = input.closest("li");
  let taskBody = document
    .getElementById(taskLi.id)
    .querySelector(".task__body");

  sendRequest("PATCH", localUrl + `/lists/5/tasks/${taskLi.id}`, {
    done: !taskBody.classList.contains("checked") ? true : false,
  })
    .then((_) => taskLi.classList.toggle("done"))
    .then((_) => taskBody.classList.toggle("checked"))
    .catch(alert);

  isOpenMode();
}

function deleteTask(btn) {
  let li = btn.closest("li");
  fetch(localUrl + `/lists/5/tasks/${li.id}`, {
    method: "delete",
  })
    .then((_) => li.remove())
    .catch(alert);
}

const taskForm = document.forms["task"];
const titleForm = document.getElementsByName("title");

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(taskForm);
  const task = Object.fromEntries(formData.entries());

  let body = {
    title: task.title,
    description: task.description,
    due_date: task.due_date ? task.due_date : null,
  };

  if (task.title) {
    sendRequest("POST", localUrl + `/lists/5/tasks`, body)
      .then((task) => appendTodo(task[0]))
      .then((_) => titleForm[0].classList.remove("invalid__input"))
      .then((_) => taskForm.reset())
      .catch(alert);
  } else {
    titleForm[0].classList.add("invalid__input");
  }
});

renderClock();
renderCalendar();
