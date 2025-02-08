const taskInput = document.getElementById("tesk-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const editButton = document.getElementById("edit-button");
const alertMessage = document.getElementById("alert-message");
const todosBody = document.querySelector("tbody");
const deleteAllButton = document.getElementById("delete-all-button");
const filterButtons = document.querySelectorAll(".filter-todos");

// console.log(alertMessage);

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const generateId = () => {
  const id = Math.round(
    Math.random() * Math.random() * Math.pow(10, 15).toString()
  );
  return id;
  // "این برای ما ای دی تولید می کند که غیر تکراری هست برای این که کاربران را با این بشناسیم"
};

const showAlert = (message, type) => {
  alertMessage.innerHTML = "";
  const alert = document.createElement("p");
  alert.innerText = message;
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  alertMessage.append(alert);
  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};

const displayTodos = (data) => {
  const todoList = data || todos;
  todosBody.innerHTML = "";
  if (!todoList.length) {
    todosBody.innerHTML = `<tr class="bg-white dark:bg-blue-300">
      <td
        id="td-no-task"
        colspan="4"
        class="p-1 min-w-40 font-extrabold dark:text-gray-700 text-center border-r-1 border-[#c6c6c6] dark:border-[#323232]"
      >
        No task foun!
      </td>
    </tr>`;
    return;
  }
  todoList.forEach((todo) => {
    todosBody.innerHTML += `    
   <tr>
  <td class="todoClass p-1 w-[40%] dark:text-gray-700 text-center border-r-1 border-[#eae9e9] dark:border-[#323232] border-t-[#eae9e9] border-t-1 dark:border-t-[#323232] dark:bg-blue-300">
    ${todo.task}
  </td>
  <td class="todoClass p-1 w-[20%] dark:text-gray-700 text-center border-r-1 border-[#eae9e9] dark:border-[#323232] border-t-[#eae9e9] border-t-1 dark:border-t-[#323232] dark:bg-blue-300">
    ${todo.date || "No Date"}
  </td>
  <td class="todoClass w-12 p-1 w-[20%]  dark:text-gray-700 text-center border-r-1 border-[#eae9e9] dark:border-[#323232] border-t-[#eae9e9] border-t-1 dark:border-t-[#323232] dark:bg-blue-300">
    ${todo.completed ? "Completed ✅" : "Pending ❌"}
  </td>
<td class="todoClass p-1 w-[40%] dark:text-gray-700 text-center border-r-1 border-[#eae9e9] dark:border-[#323232] border-t-[#eae9e9] border-t-1 dark:border-t-[#323232] dark:bg-blue-300">
  <button
    onclick="editHandler(${todo.id})"
     class="text-white mx-1  bg-amber-400 dark:bg-blue-600 py-1 px-2 rounded-md hover:opacity-75 cursor-pointer"
   >
     Edit
   </button>
   <button
    onclick="toggleHandler(${todo.id})"
     class="text-white mx-1 min-w-14 max-w-14 bg-green-600 py-1 px-2 rounded-md hover:opacity-75 cursor-pointer"
   >
   ${todo.completed ? "Undo" : "Do"}  
   </button
   ><button
    onclick="deleteHandler(${todo.id})"
     class="text-white mx-1  bg-red-600 py-1 px-2 rounded-md hover:opacity-75 cursor-pointer"
    >
     Delete
   </button>
  </td>
</tr>
    `;
  });
};

const addHandler = () => {
  const task = taskInput.value;
  const date = dateInput.value;
  const todo = {
    id: generateId(),
    completed: false,
    task: task,
    date: date,
  };
  if (task) {
    todos.push(todo);
    saveToLocalStorage();
    displayTodos();
    taskInput.value = "";
    dateInput.value = "";
    console.log(todos);
    showAlert("Todo added successfully", "success");
  } else {
    showAlert("Please enter a todo!", "error");
  }
};

const deleteAllHandler = () => {
  if (todos.length) {
    todos = [];
    saveToLocalStorage();
    displayTodos();
    showAlert("All todos cleared success fully", "success");
  } else {
    showAlert("No todos to clear", "error");
  }
};

const deleteHandler = (id) => {
  const newTodos = todos.filter((todo) => todo.id !== id);
  todos = newTodos;
  saveToLocalStorage();
  displayTodos();
  showAlert("Todo deleted successfully 😊", "success");
};

const toggleHandler = (id) => {
  const newTodos = todos.map((todo) => {
    if (todo.id === id) {
      return {
        id: todo.id,
        task: todo.task,
        date: todo.date,
        completed: !todo.completed,
      };
    } else {
      return todo;
    }
  });
  todos = newTodos;
  saveToLocalStorage();
  displayTodos();
  showAlert("Todo status changed successfully 😎", "success");
};

const editHandler = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  taskInput.value = todo.task;
  dateInput.value = todo.date;
  addButton.style.display = "none";
  editButton.style.display = "inline-block";
  editButton.dataset.id = id;
};

const applyEditHandler = (event) => {
  const id = Number(event.target.dataset.id);
  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    showAlert("Todo not found! 🙄", "error");
    return;
  }

  todo.task = taskInput.value;
  todo.date = dateInput.value; // این خط را اصلاح کردیم

  taskInput.value = "";
  dateInput.value = "";

  addButton.style.display = "inline-block";
  editButton.style.display = "none";

  saveToLocalStorage();
  displayTodos();
  showAlert("Todo edited successfully 😉", "success");
};

const filterHandler = (event) => {
  let filteredTodos = null;
  const filter = event.target.dataset.filter;

  switch (filter) {
    case "pending":
      filteredTodos = todos.filter((todo) => todo.completed === false);
      break;
    case "completed":
      filteredTodos = todos.filter((todo) => todo.completed === true);
      break;
    default:
      filteredTodos = todos;
      break;
  }
  displayTodos(filteredTodos);
};

window.addEventListener("load", () => displayTodos());
addButton.addEventListener("click", addHandler);
deleteAllButton.addEventListener("click", deleteAllHandler);
editButton.addEventListener("click", applyEditHandler);
filterButtons.forEach((button) => {
  button.addEventListener("click", filterHandler);
});
