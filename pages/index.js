import { initialTodos, validationConfig } from "../utils/constants.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupElement = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupElement.querySelector(".popup__form");

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

// Create Section instance for todos
const todosSection = new Section({
  items: initialTodos,
  renderer: (data) => {
    const element = generateTodo(data);
    todosSection.addItem(element);
  },
  containerSelector: ".todos__list",
});

// Render initial todos
todosSection.renderItems();

// Create Popup instance (will be replaced with child class later)
const addTodoPopup = new Popup("#add-todo-popup");
addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (!addTodoForm.checkValidity()) {
    return;
  }
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = { id: uuidv4(), name, date };
  const element = generateTodo(values);
  todosSection.addItem(element);
  addTodoPopup.close();
  // Reset validation and disable submit after successful submission
  formValidator.resetValidation();
});

// Enable validation for the add-todo form
const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();
