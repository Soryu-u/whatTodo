let todos = [
  {
    id: 1,
    title: "First task",
    description: "just text description",
    done: false,
    due_date: "2022-02-15",
  },
  {
    id: 2,
    title: "Second important task",
    description: "",
    done: false,
    due_date: "2022-02-15",
  },
  {
    id: 3,
    title: "Finish them all!",
    description: "not serious",
    done: false,
    due_date: "2022-02-15",
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

function renderTodo() {
  function appendTodo(todo, i) {
    const todoElement = document.getElementById("todo__items");
    todoElement.innerHTML += `
    <li class="todo__item">
      <div class="todo__task">
          <div class="task__main">
            <input class="todo__checkbox" type="checkbox" onclick="setStatus()" id="id-${todo[i].id}">
            <p id="title-${todo[i].id}" class="task__body">${todo[i].title}</p>
          </div>
          <div class="task__dls">
              <p class="task__description">${todo[i].description}</p>
              <p class="task__data">${todo[i].due_date}</p>
          </div>
      </div>
    </li>`;
  }

  for (let i = 0; i < todos.length; i++) {
    appendTodo(todos, i);
  }
}

function setStatus() {
  let checkbox = document.getElementById("todoDone");
  let taskBody = document.getElementById("task");
  if (checkbox.checked) {
    taskBody.classList.toggle("task__done");
  } else {
    taskBody.classList.toggle("task__done");
  }
}

renderTodo();
renderClock();
renderCalendar();
