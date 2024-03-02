// Load tasks from local storage
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskList = document.getElementById("taskList");

document.getElementById("taskInput").addEventListener("keypress", function (e){
if(e.key==="Enter") {
  addTask();
}
})

document.getElementById("addButton").addEventListener("click", addTask);


// Render tasks
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
  <div class="list">
    <input type="checkbox" ${
      task.completed ? "checked" : ""
    } onchange="toggleTask(${index})">
    <span class="${task.completed ? "completed" : ""}">${task.text}</span>
    <button class="Add-button" onclick="deleteTask(${index})">Delete</button>
  </div>
`;
    taskList.appendChild(div);
  });
}

// Add new task
function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text !== "") {
    tasks.push({ text, completed: false });
    input.value = "";
    saveTasks();
    renderTasks();
  }
}

// Toggle task completion status
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Initial render
renderTasks();
