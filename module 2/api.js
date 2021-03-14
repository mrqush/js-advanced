export async function getTodoList() {
    const response = await fetch('http://localhost:3000/api/todos');
    const data = await response.json()
    return data
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