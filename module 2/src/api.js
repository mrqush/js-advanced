import { createTodoItem } from './todo-app.js';

async function getTodoList() {
    const response = await fetch('http://localhost:3000/api/todos');
    const data = await response.json();
    return data
}

export async function loadTodoList(todoList) {
    const storedItems = await getTodoList();
    if (storedItems != null) {
        for (let i = 0; i < storedItems.length; ++i) {
            let storedItem = createTodoItem(storedItems[i].name, storedItems[i].done);
            todoList.append(storedItem.item);
            if (storedItem.done === true) {
                storedItem.item.classList.add('list-group-item-success');
                storedItem.done = true;
            }
            storedItem.doneButton.addEventListener('click', async () => {
                storedItem.item.classList.toggle('list-group-item-success');
                await changeTodoitem(storedItems[i].name, storedItems[i].owner, !storedItems[i].done, storedItems[i].id);
            });
            storedItem.deleteButton.addEventListener('click', async () => {
                if (confirm('Are you sure?')) {
                    storedItem.item.remove();
                    await deleteTodoItem(storedItems[i].id);
                }
            });
        }
    }
}

export async function addTodoItem(name, owner, done) {
    fetch('http://localhost:3000/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name,
            owner: owner,
            done: done
        })
    })
}

export async function deleteTodoItem(id) {
    await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
}

export async function changeTodoitem(name, owner, done, id) {
    fetch(`http://localhost:3000/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name,
            owner: owner,
            done: done
        })
    })
}