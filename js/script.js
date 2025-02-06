const taskInput = document.getElementById("tesk-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const alertMessage = document.getElementById("alert-message");
const todosBody = document.querySelector("tbody");
const deleteAllButton = document.getElementById("delete-all-button");
// console.log(alertMessage);

let todos = JSON.parse(localStorage.getItem("todos")) || [];
console.log(todos);

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

const displayTodos = () => {
  todosBody.innerHTML = "";
  if (todos.length === 0) {
    todosBody.innerHTML = "<tr><td colspan='4'>No task found !</td></tr>";
    return;
  }
  todos.forEach((todo) => {
    todosBody.innerHTML += ` 
    <tr>
      <td>${todo.task}</td>
      <td>${todo.date ? todo.date : "No date"}</td>
      <td>${todo.completed ? "Completed" : "Pending"}</td>
      <td>
        <button> Edit </button>
        <button> Do </button>
        <button onclick="deleteHandler('${todo.id}') "> Delete </button>
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

// const deleteHandler = (id) => {
//   const newTodos = todos.filter((todo) => todo.id !== id);
//   todos = newTodos;
//   saveToLocalStorage();
//   displayTodos();
//   showAlert("Todo deleted successfully", "success");
// };
const deleteHandler = (id) => {
  const newTodos = todos.filter((todo) => todo.id !== id);
  todos = newTodos;
  saveToLocalStorage();
  displayTodos();
  showAlert("Todo deleted successfully:))", "success");
};
window.addEventListener("load", displayTodos());
addButton.addEventListener("click", addHandler);
deleteAllButton.addEventListener("click", deleteAllHandler);
