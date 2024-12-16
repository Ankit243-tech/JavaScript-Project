const listContainer = document.getElementById("list-container");
const inputBox = document.getElementById("input-box");

function addTask() {
  const task = inputBox.value.trim();

  if (!task) {
    alert("Please enter a task.");
    return;
  }

  const li = document.createElement("li");

  // Create status icon (uncheck by default)
  const statusIcon = document.createElement("div");
  statusIcon.className = "status-icon uncheck";
  statusIcon.addEventListener("click", function () {
    if (statusIcon.classList.contains("uncheck")) {
      statusIcon.classList.remove("uncheck");
      statusIcon.classList.add("check");
      li.classList.add("checked");
    } else {
      statusIcon.classList.remove("check");
      statusIcon.classList.add("uncheck");
      li.classList.remove("checked");
    }
    saveTasks();
  });

  // Add task text
  const taskText = document.createElement("span");
  taskText.textContent = task;

  // Create remove button
  const removeBtn = document.createElement("span");
  removeBtn.textContent = "X";
  removeBtn.addEventListener("click", function () {
    li.remove();
    saveTasks();
  });

  li.appendChild(statusIcon);
  li.appendChild(taskText);
  li.appendChild(removeBtn);

  listContainer.appendChild(li);
  inputBox.value = ""; // Clear input field
  saveTasks();
}

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", listContainer.innerHTML);
}

// Load tasks from local storage
function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    listContainer.innerHTML = savedTasks;

    // Rebind event listeners to dynamically loaded tasks
    listContainer.querySelectorAll(".status-icon").forEach((icon) => {
      icon.addEventListener("click", function () {
        const li = icon.parentElement;
        if (icon.classList.contains("uncheck")) {
          icon.classList.remove("uncheck");
          icon.classList.add("check");
          li.classList.add("checked");
        } else {
          icon.classList.remove("check");
          icon.classList.add("uncheck");
          li.classList.remove("checked");
        }
        saveTasks();
      });
    });

    listContainer.querySelectorAll("li span:last-child").forEach((removeBtn) => {
      removeBtn.addEventListener("click", function () {
        removeBtn.parentElement.remove();
        saveTasks();
      });
    });
  }
}

// Initialize tasks on page load
loadTasks();
