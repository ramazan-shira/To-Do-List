document.addEventListener("DOMContentLoaded", function () {
  const taskForm = document.getElementById("task-form");
  const newTask = document.getElementById("new-task");
  const tasklist = document.getElementById("task-list");
  const listTitle = document.getElementById("list-title");
  const searchTask = document.getElementById("search-task");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    tasklist.innerHTML = "";

    tasks.forEach(function (task) {
      const taskTitle = task.title;
      if (taskTitle.includes(searchTask.value.toLowerCase())) {
        console.log(searchTask.value.toLowerCase());

        const li = document.createElement("li");
        li.innerHTML = ` <div class="task-info">
      <input type="checkbox" name="done" class="done" data-id=${task.id} ${
          task.completed ? "checked" : ""
        } />
      <p class="task">${task.title}</p>
    </div>
      <button class="delete-btn"  data-id=${task.id} >&#8855;</button>
    `;

        tasklist.appendChild(li);
      }
    });

    if (tasks.length != 0) {
      listTitle.classList.remove("hidden");
      searchTask.classList.remove("hidden");
    } else {
      listTitle.classList.add("hidden");
      searchTask.classList.add("hidden");
    }
  }
  function addTask(title) {
    if (
      tasks.find((task) => task.title.toLowerCase() === title.toLowerCase())
    ) {
      alert("This task exists");
      newTask.value = "";
      return;
    }
    const addNewTask = { id: Date.now(), title: title, completed: false };
    tasks.push(addNewTask);

    newTask.value = "";
    saveTasks();
    renderTasks();
  }

  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputValue = newTask.value;

    if (inputValue.length <= 1) {
      alert("Title should be more than 1 character");
    } else {
      addTask(inputValue);
    }
  });

  function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    renderTasks();
  }

  tasklist.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
      const taskId = parseInt(e.target.getAttribute("data-id"));
      deleteTask(taskId);
    }

    if (e.target.classList.contains("done")) {
      const taskId = e.target.getAttribute("data-id");

      tasks = tasks.map((task) => {
        if (task.id == taskId) {
          if (task.completed) {
            task.completed = false;
            e.target.parentElement.classList.remove("completed");
          } else {
            task.completed = true;
            e.target.parentElement.classList.add("completed");
          }
        }
        return task;
      });

      saveTasks();
    }
  });

  renderTasks();
});
