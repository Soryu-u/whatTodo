const localUrl = "http://localhost:8000";
fetch(localUrl + `/tasks`)
  .then((response) => response.json())
  .then((tasks) => renderAllTodo(tasks));

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
      if (taskDate.getMonth() % 0 > 0) {
        return taskDate.getMonth() + 1;
      } else {
        return `0${taskDate.getMonth() + 1}`;
      }
    }
    function day() {
      if (taskDate.getDate() % 0 > 0) {
        return taskDate.getDate() + 1;
      } else {
        return `0${taskDate.getDate() + 1}`;
      }
    }

    let date = `${taskDate.getFullYear()}-${month()}-${day()}`;
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
        <p class="task__body ${isDone(todo)}">${todo.title}</p>
        <button id="${todo.id}" class="delete__btn" onclick="deleteTask(this)">
          <img src="./src/img/icons8-trash.svg" alt="">
      </button>  
      </div>
      <div class="task__content ">
          <p class="task__description">${todo.description}</p>
          <p class="task__date ${isOverdue(todo)}">${getDate(todo)}</p>
      </div>
  </li>`;
}

function renderAllTodo(todo) {
  todo.forEach((todo) => {
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
      taskOpen[i].closest("li").classList.add("done");
    }
  }
}

function sendRequest(method, url, body = null) {
  const headers = {
    "content-type": "application/json",
  };

  return fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: headers,
  }).then((response) => {
    return response.json();
  });
}

function changeStatus(e) {
  isOpen();
  let taskId = e.id;
  let checkbox = document.getElementById(taskId);
  let taskBody = checkbox.parentElement.getElementsByClassName("task__body")[0];
  let body = {};

  if (!taskBody.classList.contains("checked")) {
    body = {
      done: true,
    };
    taskBody.classList.toggle("checked");
    checkbox.setAttribute("checked", true);

    sendRequest("PATCH", localUrl + `/lists/5/tasks/${taskId}`, body);
  } else {
    body = {
      done: false,
    };
    taskBody.classList.toggle("checked");
    checkbox.setAttribute("checked", false);
    sendRequest("PATCH", localUrl + `/lists/5/tasks/${taskId}`, body);
  }
}

function deleteTask(e) {
  fetch(localUrl + `/lists/5/tasks/${e.id}`, {
    method: "delete",
  });

  e.closest("li").remove();
}

const taskForm = document.forms["task"];
const titleForm = document.getElementsByName("title");

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(taskForm);
  const task = Object.fromEntries(formData.entries());
  if (task.title) {
    titleForm[0].classList.remove("invalid__input");
    let body = {
      title: task.title,
      description: task.description,
      due_date: task.due_date ? task.due_date : null,
    };
    sendRequest("POST", localUrl + `/lists/5/tasks`, body).then((task) => {
      appendTodo(task[0]);
    });
    taskForm.reset();
  } else {
    titleForm[0].classList.add("invalid__input");
  }
});

renderClock();
renderCalendar();
