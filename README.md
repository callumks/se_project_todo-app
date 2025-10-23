# Simple ToDo App

A simple to-do app demonstrating ES6 modules and OOP with `Todo` and `FormValidator` components. Users can add items, set an optional due date, mark items complete, and delete them. Form validation ensures correct input before submission.

## Functionality

- Renders an initial list of to-dos from `utils/constants.js`.
- Opens/closes the new to-do form; supports creating items and pressing Enter to submit.
- Toggles completion status and deletes to-do items.
- Generates unique IDs for new items via the `uuid` package.
- Uses the unique IDs to connect checkbox `id` and label `for` attributes.
- Modal supports closing with the Escape key.

## Technology

- HTML, CSS (Flat BEM blocks in `blocks/`)
- JavaScript (ES6 modules, classes)
- Prettier (with `.prettierignore` to exclude `vendor/normalize.css`)
- GitHub Pages deployment

## Deployment

View the project on [GitHub Pages](https://callumks.github.io/se_project_todo-app/).
