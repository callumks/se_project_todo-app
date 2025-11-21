export default class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._completed = todos.filter((todo) => todo.completed).length;
    this._total = todos.length;
    this._incrementValue = 1;
    this._decrementValue = 1;
    this._updateText();
  }

  updateCompleted = (increment) => {
    if (increment) {
      this._completed += this._incrementValue;
    } else {
      this._completed -= this._decrementValue;
    }
    this._updateText();
  };

  updateTotal = (increment) => {
    if (increment) {
      this._total += this._incrementValue;
    } else {
      this._total -= this._decrementValue;
    }
    this._updateText();
  };

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

