const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
let tasks = [];
function addTask() {
            const taskText = taskInput.value.trim();
            if (taskText !== "") {
                tasks.push({ text: taskText});
                taskInput.value = "";
                displayTasks();
            }
        }
//         he above code includes:
// taskText variable to retrieve the value entered into the taskInput HTML element by the user, trimming any trailing whitespace.
// A conditional statement that uses an if block to check if the taskText is not an empty string; if not, it creates a new task object with the entered text.
// Addition of this new task object using the push array method to the tasks array, representing the ToDo List.
// Resetting the value of the taskInput field to an empty string after adding the task, clearing the input for the next task entry.
// Calling the displayTasks function to display entered todo tasks, which you will create in the next step.
// Create the displayTasks function by including the given code in the JavaScript file.

        function displayTasks() {
            taskList.innerHTML = "";
            tasks.forEach((task, index) => {
                const li = document.createElement("li");
                li.innerHTML = `<input type="checkbox" id="task-${index}" ${task.completed ? "checked" : ""}>
                    <label for="task-${index}">${task.text}</label>`;
                li.querySelector("input").addEventListener("change", () => toggleTask(index));
                taskList.appendChild(li);
            });
        }
                function toggleTask(index) {
            tasks[index].completed = !tasks[index].completed;
            displayTasks();
        }
            function clearCompletedTasks() {
            tasks = tasks.filter(task => !task.completed);
            displayTasks();
        }
        addTaskBtn.addEventListener("click", addTask);
clearCompletedBtn.addEventListener("click", clearCompletedTasks);
 displayTasks();