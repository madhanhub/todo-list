document.getElementById('userForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_name: username, password: password }),
    });

    const result = await response.json();
    alert(result.message);
});

document.getElementById('taskForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const label = document.getElementById('label').value;
    const description = document.getElementById('description').value;

    const response = await fetch('/Task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ u_id: 'user_id_placeholder', lable: label, describtion: description }),
    });

    const result = await response.json();
    alert(result.message);
});
