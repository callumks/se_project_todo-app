export default class Todo {
  constructor(data, templateSelector) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._element = null;
    this._todoNameEl = null;
    this._todoCheckboxEl = null;
    this._todoLabelEl = null;
    this._todoDateEl = null;
    this._todoDeleteBtn = null;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector);
    return template.content.querySelector(".todo").cloneNode(true);
  }

  _applyData() {
    this._todoNameEl.textContent = this._data.name;
    this._todoCheckboxEl.checked = Boolean(this._data.completed);

    // Apply id and for attributes; may be undefined for new todos.
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabelEl.setAttribute("for", `todo-${this._data.id}`);

    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      this._todoDateEl.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._element.remove();
    });

    this._todoCheckboxEl.addEventListener("change", (evt) => {
      this._data.completed = evt.target.checked;
    });
  }

  getView() {
    this._element = this._getTemplate();
    this._todoNameEl = this._element.querySelector(".todo__name");
    this._todoCheckboxEl = this._element.querySelector(".todo__completed");
    this._todoLabelEl = this._element.querySelector(".todo__label");
    this._todoDateEl = this._element.querySelector(".todo__date");
    this._todoDeleteBtn = this._element.querySelector(".todo__delete-btn");

    this._applyData();
    this._setEventListeners();

    return this._element;
  }
}
