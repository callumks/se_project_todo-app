import { initialTodos, validationConfig } from "../utils/constants.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

const handleEscClose = (evt) => {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_visible");
    if (openPopup) {
      closeModal(openPopup);
    }
  }
};

const openModal = (modal) => {
  modal.classList.add("popup_visible");
  window.addEventListener("keydown", handleEscClose);
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
  window.removeEventListener("keydown", handleEscClose);
};

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = { id: uuidv4(), name, date };
  const todo = generateTodo(values);
  todosList.append(todo);
  closeModal(addTodoPopup);
  // Reset validation and disable submit after successful submission
  formValidator.resetValidation();
});

initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});

// Enable validation for the add-todo form
const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();
