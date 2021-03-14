import { setItemsLocal, getItemsLocal } from './localstorage.js'
import { getTodoList, addTodoItem } from'./api.js'

window.createTodoApp = createTodoApp;
function createAppTitle(title) {
  let appTitle = document.createElement('h2');
  appTitle.textContent = title;
  return appTitle;
}

function createTodoItemForm() {
  let form = document.createElement('form');
  let input = document.createElement('input');
  let buttonWrapper = document.createElement('div');
  let button = document.createElement('button');

  form.classList.add('input-group', 'mb-3');
  input.classList.add('form-control');
  input.placeholder = 'Add new todo';
  buttonWrapper.classList.add('input-group-append');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Add todo';

  buttonWrapper.append(button);
  form.append(input);
  form.append(button);

  return {
    form,
    input,
    button,
  };
}

function createTodoList() {
  let appList = document.createElement('ul');
  appList.classList.add('list-group');
  return appList;
}

function createTodoItem(name, status = false) {
  let item = document.createElement('li');
  let buttonGroup = document.createElement('div');
  let doneButton = document.createElement('button');
  let deleteButton = document.createElement('button');
  let done = status;

  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  item.textContent = name;

  buttonGroup.classList.add('btn-group', 'btn-group-sm');
  doneButton.classList.add('btn', 'btn-success');
  doneButton.textContent = 'Done';
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.textContent = 'Delete';

  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);

  return {
    item,
    name,
    done,
    doneButton,
    deleteButton
  };
}

function createTodoApp(container, title = 'Todo List', key, itemsArray = []) {

  let todoAppTitle = createAppTitle(title);
  let todoItemForm = createTodoItemForm();
  let todoList = createTodoList();
  let localTodoArr = [];

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);

  todoItemForm.button.disabled = true;
  todoItemForm.input.addEventListener('input', function () {
    if (!todoItemForm.input.value) {
      todoItemForm.button.disabled = true;
    } else {
      todoItemForm.button.disabled = false;
    }
  });
  for (let i = 0; i < itemsArray.length; ++i) {
    let todoItem = createTodoItem(itemsArray[i].name, itemsArray[i].done);
    todoList.append(todoItem.item);
    if (todoItem.done === true) {
      todoItem.item.classList.toggle('list-group-item-success');
    }
    todoItem.doneButton.addEventListener('click', function () {
      todoItem.item.classList.toggle('list-group-item-success');
    });
    todoItem.deleteButton.addEventListener('click', function () {
      if (confirm('Are you sure?')) {
        todoItem.item.remove();
      }
    });
  }

  todoItemForm.form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!todoItemForm.input.value) {
      return;
    }
    let todoItem = createTodoItem(todoItemForm.input.value);
    todoItem.doneButton.addEventListener('click', function () {
      todoItem.item.classList.toggle('list-group-item-success');
      let result = localTodoArr.indexOf(todoItem);
      localTodoArr[result].done = true;
      setItemsLocal(key, localTodoArr);
    });
    localTodoArr.push(todoItem);
    todoItem.deleteButton.addEventListener('click', function () {
      if (confirm('Are you sure?')) {
        todoItem.item.remove();
        let result = localTodoArr.indexOf(todoItem);
        localTodoArr.splice(result, 1);
        setItemsLocal(key, localTodoArr);
      };
    });

    todoList.append(todoItem.item);
    todoItemForm.input.value = '';
    todoItemForm.button.disabled = true;
    setItemsLocal(key, localTodoArr);
  });

  // let storedItems = getItemsLocal(key);
  // if (storedItems != null) {
  //   for (let i = 0; i < storedItems.length; ++i) {
  //     let storedItem = createTodoItem(storedItems[i].name, storedItems[i].done);
  //     todoList.append(storedItem.item);
  //     if (storedItem.done === true) {
  //       storedItem.item.classList.add('list-group-item-success');
  //       storedItem.done = true;
  //     }
  //     storedItem.doneButton.addEventListener('click', function () {
  //       storedItem.item.classList.toggle('list-group-item-success');
  //       let result = localTodoArr.indexOf(storedItem);
  //       localTodoArr[result].done = !localTodoArr[result].done;
  //       setItemsLocal(key, localTodoArr);
  //     });
  //     localTodoArr.push(storedItem);
  //     storedItem.deleteButton.addEventListener('click', function () {
  //       if (confirm('Are you sure?')) {
  //         storedItem.item.remove();
  //         let result = localTodoArr.indexOf(storedItem);
  //         localTodoArr.splice(result, 1);
  //         setItemsLocal(key, localTodoArr);
  //       }
  //     });
  //   }
  // }
  let result = getTodoList();
}

// let array = [
//   { name: 'name', done: true },
//   { name: 'name2', done: false }
// ];

createTodoApp(document.getElementById('todo-app'), 'My Todo List', 'me');