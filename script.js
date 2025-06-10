const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage when page loads
loadTasks();

// Add new task on button click
addBtn.addEventListener("click", addTask);

// Add new task on Enter key press
taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

// Add task function
function addTask() {
    const task = taskInput.value.trim();
    if (task) {
        createTaskElement(task, false); // false means task is not done initially
        taskInput.value = "";
        saveTasks();
    } else {
        alert("Please enter a task");
    }
}

// Create task list item element
function createTaskElement(task, done) {
    const listItem = document.createElement("li");

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = done;
    checkbox.id = `task-${Date.now()}`;

    // Create label linked to checkbox
    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = task;

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteTask";

    // When delete button clicked, remove task
    deleteButton.addEventListener("click", () => {
        taskList.removeChild(listItem);
        saveTasks();
    });

    // When checkbox changed, save tasks to update done state
    checkbox.addEventListener("change", saveTasks);

    // Append elements to list item
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(deleteButton);

    // Append list item to task list
    taskList.appendChild(listItem);
}

// Save tasks and their done state to localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach((item) => {
        const checkbox = item.querySelector("input[type='checkbox']");
        const label = item.querySelector("label");
        tasks.push({ task: label.textContent, done: checkbox.checked });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(({ task, done }) => createTaskElement(task, done));
}
