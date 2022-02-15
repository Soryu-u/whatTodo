let todos = [
  {
    id: 1,
    title: "First task",
    description: "just text description",
    done: false,
    due_date: new Date("2022-02-15"),
  },
  {
    id: 2,
    title: "Second important task",
    description: "",
    done: true,
    due_date: new Date("2022-02-15"),
  },
  {
    id: 3,
    title: "Finish them all!",
    description: "not serious",
    done: true,
    due_date: new Date("2022-02-14"),
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
    function isDone(i) {
      if (todos[i].done) {
        return "task__done";
      } else {
        return "";
      }
    }

    function isOverdue(i) {
      let currentDate = new Date().toDateString();
      let taskDate = todos[i].due_date.toDateString();
      if (taskDate < currentDate) {
        return `overdue__task`;
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
      return date.toString();
    }

    const todoElement = document.getElementById("todo__items");

    todoElement.innerHTML += `
    <li class="todo__item ${isOverdue(i)}">
      <div class="todo__task">
          <div class="task__main">
            
            <p id="title-${todo[i].id}" class="task__body ${isDone(
      i
    )}" onclick="setStatus(event.target)">${todo[i].title}</p>
          </div>
          <div class="task__dls ${isOverdue(i)}">
              <p class="task__description">${todo[i].description}</p>
              <p class="task__data">${getDate(i)}</p>
          </div>
      </div>
    </li>`;
  }

  for (let i = 0; i < todos.length; i++) {
    appendTodo(todos, i);
  }
}

function setStatus(e) {
  e.classList.toggle("task__done");
  console.log("click", e);
}

renderTodo();
renderClock();
renderCalendar();
