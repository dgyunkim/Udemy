const taskInput = document.querySelector("#task-input");
const addBtn = document.querySelector("#addBtn");
const filterInput = document.querySelector("#filter-input");
const taskList = document.querySelector("#task-list");
const clrBtn = document.querySelector("#clrBtn");

addBtn.addEventListener("click", addTask);
filterInput.addEventListener("keyup", filterTask);
taskList.addEventListener("click", deleteTask);
clrBtn.addEventListener("click", clearTasks);
document.addEventListener("DOMContentLoaded", loadTasksLocal);

function addTask(event) {
  event.preventDefault();

  const li = document.createElement("li");
  li.className = "list-group-item";
  li.innerHTML = `<div class="row">
                    <div class="col-11">
                      ${taskInput.value}
                    </div>
                    <div class="col-1">
                      <i
                        class="fas fa-times text-danger delete-task"
                        style="cursor: pointer;"
                      ></i>
                    </div>
                  </div>`;
  taskList.appendChild(li);
  addTaskLocal(taskInput.value);
  taskInput.value = "";
}

function addTaskLocal(taskName) {
  let tasks = localStorage.getItem("tasks");
  if (!tasks) {
    tasks = [];
  } else {
    tasks = JSON.parse(tasks);
  }
  tasks.push(taskName);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function filterTask(evnet) {
  for (let child of taskList.children) {
    console.log(child.querySelector(".col-11").innerText);
    if (child.querySelector(".col-11").innerText.includes(filterInput.value)) {
      child.style.display = "block";
    } else {
      child.style.display = "none";
    }
  }
}

function deleteTask(event) {
  if (event.target.classList.contains("delete-task")) {
    if (confirm("Are you sure?")) {
      event.target.parentElement.parentElement.parentElement.remove();
      deleteTaskLocal(
        event.target.parentElement.previousElementSibling.innerText.trim()
      );
    }
  }
}

function deleteTaskLocal(taskName) {
  console.log(taskName);
  console.log("HTML");
  let tasks = localStorage.getItem("tasks");
  if (!tasks) {
    tasks = [];
  } else {
    tasks = JSON.parse(tasks);
  }
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i] == taskName) {
      tasks.splice(i, 1);
      break;
    }
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasks(event) {
  if (confirm("Are you sure?")) {
    while (taskList.firstChild) {
      taskList.firstChild.remove();
    }
    localStorage.removeItem("tasks");
  }
}

function loadTasksLocal() {
  let tasks = localStorage.getItem("tasks");
  if (tasks) {
    tasks = JSON.parse(tasks);
    for (let taskName of tasks) {
      let li = document.createElement("li");
      li.className = "list-group-item";
      li.innerHTML = `<div class="row">
                        <div class="col-11">
                          ${taskName}
                        </div>
                        <div class="col-1">
                          <i
                            class="fas fa-times text-danger delete-task"
                            style="cursor: pointer;"
                          ></i>
                        </div>
                      </div>`;
      taskList.appendChild(li);
    }
  }
}
