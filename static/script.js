document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const taskForm = document.getElementById('task-form');
    const taskTitle = document.getElementById('task-title');

    // Función para cargar las tareas desde la API
    async function loadTasks() {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        taskList.innerHTML = '';
        data.tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.title;
            taskList.appendChild(li);
        });
    }

    // Manejar el envío del formulario
    taskForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const title = taskTitle.value.trim();
        if (title) {
            await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title }),
            });
            taskTitle.value = '';
            loadTasks();
        }
    });

    // Cargar las tareas al iniciar
    loadTasks();
});
