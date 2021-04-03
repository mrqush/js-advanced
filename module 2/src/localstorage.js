import { createTodoItem } from './todo-app.js';

export function setItemsLocal(key, array) {
  localStorage.setItem(`${key}`, JSON.stringify(array));
}

function getItemsLocal(key) {
  return JSON.parse(localStorage.getItem(`${key}`));
}

export function loadItemsLocal(key, localTodoArr, todoList) {
  const storedItems = getItemsLocal(key);
  if (storedItems != null) {
    for (let i = 0; i < storedItems.length; ++i) {
      let storedItem = createTodoItem(storedItems[i].name, storedItems[i].done);
      todoList.append(storedItem.item);
      if (storedItem.done === true) {
        storedItem.item.classList.add('list-group-item-success');
        storedItem.done = true;
      }
      storedItem.doneButton.addEventListener('click', function () {
        storedItem.item.classList.toggle('list-group-item-success');
        const result = localTodoArr.indexOf(storedItem);
        localTodoArr[result].done = !localTodoArr[result].done;
        setItemsLocal(key, localTodoArr);
      });
      localTodoArr.push(storedItem);
      storedItem.deleteButton.addEventListener('click', function () {
        if (confirm('Are you sure?')) {
          storedItem.item.remove();
          const result = localTodoArr.indexOf(storedItem);
          localTodoArr.splice(result, 1);
          setItemsLocal(key, localTodoArr);
        }
      });
    }
  }
}

