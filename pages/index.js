import { initialTodos, validationConfig } from "../utils/constants.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

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

// Declare popup variable first so callback can reference it
let addTodoPopup;

// Handle form submission callback
const handleAddTodoSubmit = (formValues) => {
  if (!addTodoForm.checkValidity()) {
    return;
  }
  
  const name = formValues.name;
  const dateInput = formValues.date;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = { id: uuidv4(), name, date };
  const element = generateTodo(values);
  todosSection.addItem(element);
  addTodoPopup.close();
  // Reset validation and disable submit after successful submission
  formValidator.resetValidation();
};

// Create PopupWithForm instance
addTodoPopup = new PopupWithForm("#add-todo-popup", handleAddTodoSubmit);
addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

// Enable validation for the add-todo form
const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();
