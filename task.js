const fs = require("fs");
const path = require("path");

// Define the file path for the tasks JSON file
const TASK_FILE = path.join(__dirname, "tasks.json");

// Load tasks from JSON file, or create the file if it doesn't exist
function loadTasks() {
  try {
    if (!fs.existsSync(TASK_FILE)) {
      fs.writeFileSync(TASK_FILE, "[]");
    }
    const tasksBuffer = fs.readFileSync(TASK_FILE);
    return JSON.parse(tasksBuffer.toString());
  } catch (err) {
    console.error("Error reading tasks file:", err.message);
    return [];
  }
}

// Save tasks back to the JSON file
function saveTasks(tasks) {
  try {
    fs.writeFileSync(TASK_FILE, JSON.stringify(tasks, null, 2));
  } catch (err) {
    console.error("Error saving tasks:", err.message);
  }
}

// Add a new task
function addTask(description) {
  if (!description) {
    console.error("Task description is required.");
    return;
  }

  const tasks = loadTasks();
  const newTask = {
    id: tasks.length + 1,
    description,
    status: "pending",
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log("Task added successfully");
}

// Update a task description
function updateTask(id, description) {
  // first load the tasks
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id == id);

  if (!task) {
    console.error(`Task with ID ${id} not found.`);
    return;
  }

  if (!description) {
    console.error("New description is required.");
    return;
  }

  task.description = description;
  saveTasks(tasks);
  console.log(`Task with ID ${id} updated.`);
}

// Delete a task by ID
function deleteTask(id) {
  let tasks = loadTasks();
  const taskIndex = tasks.findIndex((t) => t.id == id);

  if (taskIndex === -1) {
    console.error(`Task with ID ${id} not found.`);
    return;
  }

  tasks.splice(taskIndex, 1);
  saveTasks(tasks);
  console.log(`Task with ID ${id} deleted.`);
}

// Update the status of a task
function updateStatus(id, status) {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id == id);

  if (!task) {
    console.error(`Task with ID ${id} not found.`);
    return;
  }

  if (!["pending", "inprogress", "done"].includes(status)) {
    console.error(
      "Invalid status. Valid statuses are: pending, inprogress, done."
    );
    return;
  }

  task.status = status;
  saveTasks(tasks);
  console.log(`Task with ID ${id} marked as ${status}.`);
}

// List tasks, with optional status filtering
function listTasks(status = null) {
  const tasks = loadTasks();
  // check if the status been passed is in relation with what we accept
  if (status && !["pending", "inprogress", "done"].includes(status)) {
    console.error(
      "Invalid status filter. Valid statuses are: pending, inprogress, done."
    );
    return;
  }

  const filteredTasks = status
    ? tasks.filter((task) => task.status === status)
    : tasks;

  if (filteredTasks.length === 0) {
    console.log("No tasks found.");
  } else {
    filteredTasks.forEach((task) => {
      console.log(
        `ID: ${task.id}, Description: ${task.description}, Status: ${task.status}`
      );
    });
  }
}

// Command-line argument handling
const [command, ...args] = process.argv.slice(2);

switch (command) {
  // Switch case to handle add command
  case "add":
    const description = args.join(" ");
    addTask(description);
    break;
  case "update":
    const updateId = args[0];
    const updatedDescription = args.slice(1).join(" ");
    updateTask(updateId, updatedDescription);
    break;
  case "delete":
    const deleteId = args[0];
    deleteTask(deleteId);
    break;
  case "status":
    const statusId = args[0];
    const newStatus = args[1];
    updateStatus(statusId, newStatus);
    break;
  case "list":
    const statusFilter = args[0]; // pending, inprogress, done
    listTasks(statusFilter);
    break;
  default:
    console.error(
      "Unknown command. Available commands: add, update, delete, status, list."
    );
    break;
}
