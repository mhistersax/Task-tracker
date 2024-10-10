# Task Tracker CLI

A simple Command Line Interface (CLI) application built using Node.js to help you track, manage, and organize tasks. Tasks can be added, updated, deleted, and their status can be modified (e.g., `pending`, `inprogress`, `done`). The tasks are stored in a JSON file located in the project directory.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
  - [Add a Task](#add-a-task)
  - [List All Tasks](#list-all-tasks)
  - [List Tasks by Status](#list-tasks-by-status)
  - [Update a Task](#update-a-task)
  - [Delete a Task](#delete-a-task)
  - [Update Task Status](#update-task-status)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Add a new task.
- Update the description of an existing task.
- Delete a task.
- Mark a task as `pending`, `inprogress`, or `done`.
- List all tasks.
- Filter tasks based on their status.

---

## Installation

### Prerequisites
- Ensure you have [Node.js](https://nodejs.org/en/) installed.

### Steps
1. Clone this repository:
   ```bash
   git clone https://github.com/mhistersax/Task-tracker.git
   cd task-tracker
   ```

2. Initialize the project:
   ```bash
   npm init -y
   ```

3. Create an empty `tasks.json` file in the root directory:
   ```bash
   touch tasks.json
   ```

4. Your project is now ready to use!

---

## Usage

The Task Tracker CLI can be used by running the following commands from the terminal. Make sure to be in the project directory.

### Commands

#### Add a Task
To add a new task, use the following command:
```bash
npm run add -- "Your task description here"
```
Example:
```bash
npm run add -- "Finish the Node.js project"
```

#### List All Tasks
To list all tasks, run:
```bash
npm run list
```

#### List Tasks by Status
You can filter tasks by their status. The valid status filters are:
- `pending`
- `inprogress`
- `done`

Example to list all tasks that are in progress:
```bash
npm run list -- inprogress
```

#### Update a Task
To update the description of an existing task, use the following command:
```bash
npm run update -- <task-id> "New task description"
```
Example:
```bash
npm run update -- 1 "Update the task tracker documentation"
```

#### Delete a Task
To delete a task, use:
```bash
npm run delete -- <task-id>
```
Example:
```bash
npm run delete -- 1
```

#### Update Task Status
To update the status of a task, use:
```bash
npm run status -- <task-id> <status>
```
Where `<status>` can be one of:
- `pending`
- `inprogress`
- `done`

Example:
```bash
npm run status -- 1 done
```

---

## Contributing

Contributions are welcome! If you want to add features or improve the project, feel free to open a pull request or raise issues.

---

## License

This project is licensed under the MIT License.

---

### Notes:

- Ensure that tasks are saved in `tasks.json`, which is automatically created in the root directory.
- The application uses Node.js's native `fs` module to interact with the JSON file, ensuring task persistence.

---

This **README** provides clear instructions on how to set up and use your Task Tracker CLI project. Let me know if you need further customization!