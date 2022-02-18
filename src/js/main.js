const localUrl = "http://localhost:8000";
fetch(localUrl + `/tasks`)
  .then((response) => response.json())
  .then((tasks) => renderAllTodo(tasks))
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
      if (taskDate.getMonth() + 1 > 9) {
        return taskDate.getMonth() + 1;
      } else {
        return `0${taskDate.getMonth() + 1}`;
      }
    }
    function day() {
      if (taskDate.getDate() > 9) {
        return taskDate.getDate();
      } else {
        return `0${taskDate.getDate()}`;
      }
    }

    let date = `${day()}.${month()}.${taskDate.getFullYear()}`;
    return date;
  } else {
    return "";
  }
}

function appendTodo(todo) {
  const todoElement = document.getElementById("todo__items");

  todoElement.innerHTML += `
  <li id="${todo.id}" class="todo__item">
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

  tasksDone.forEach((task) => {
    task.classList.remove("done");
  });
}

function getOpenTodo() {
  let allBtn = document.getElementById("all");
  let openBtn = document.getElementById("open");

  openBtn.classList.add("active");
  allBtn.classList.remove("active");

  let taskOpen = document.querySelectorAll(".todo__checkbox");

  taskOpen.forEach((task) => {
    if (task.checked) {
      task.closest("li").classList.add("done");
    }
  });
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

function changeStatus(e) {
  isOpen();
  let taskId = e.closest("li").id;
  let checkbox = document.getElementById(taskId).querySelector("input");
  let taskBody = document.getElementById(taskId).querySelector(".task__body");

  if (!taskBody.classList.contains("checked")) {
    sendRequest("PATCH", localUrl + `/lists/5/tasks/${taskId}`, {
      done: true,
    }).catch(alert);
    taskBody.classList.toggle("checked");
    checkbox.setAttribute("checked", true);
  } else {
    sendRequest("PATCH", localUrl + `/lists/5/tasks/${taskId}`, {
      done: false,
    }).catch(alert);
    taskBody.classList.toggle("checked");
    checkbox.removeAttribute("checked");
  }
}

function deleteTask(e) {
  let li = e.closest("li");
  fetch(localUrl + `/lists/5/tasks/${li.id}`, {
    method: "delete",
  });

  li.remove();
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

  task.title
    ? sendRequest("POST", localUrl + `/lists/5/tasks`, body)
        .then((task) => appendTodo(task[0]))
        .then((_) => titleForm[0].classList.remove("invalid__input"))
        .then((_) => taskForm.reset())
        .catch(alert)
    : titleForm[0].classList.add("invalid__input");
});

renderClock();
renderCalendar();
