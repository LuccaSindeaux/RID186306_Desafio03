document.addEventListener("DOMContentLoaded", () => {    
    const taskForm = document.getElementById("taskInserter");
    const taskNameInput = document.getElementById("taskName");
    const taskLabelInput = document.getElementById("taskLabel");
    const taskList = document.getElementById("tasksList");
    const footer = document.querySelector("footer");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const saveTasksToStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const updateCompletedCount = () => {
    const completedCount = tasks.filter(task => task.completed).length;

    let counterEl = document.getElementById("completedCounter");
    if (!counterEl) {
        counterEl = document.createElement("p");
        counterEl.id = "completedCounter";
        footer.appendChild(counterEl);
    }

    counterEl.textContent = `${completedCount} tarefa${completedCount !== 1 ? "s" : ""} concluída${completedCount !== 1 ? "s" : ""}`;
    };

    const removeTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
    saveTasksToStorage();
    renderTasks();
    };

    const createTaskElement = (task) => {
    const li = document.createElement("li");
    const taskContent = document.createElement("div");
    taskContent.className = "taskContent";

    const taskInfo = document.createElement("div");
    taskInfo.className = "taskInfo";

    const h2 = document.createElement("h2");
    h2.textContent = task.title;

    const tagDate = document.createElement("div");
    tagDate.className = "tagDate";

    const tag = document.createElement("p");
    tag.className = "tag";
    tag.textContent = task.label;

    const date = document.createElement("p");
    date.className = "date";
    date.textContent = `Criado em: ${task.date}`;

    tagDate.appendChild(tag);
    tagDate.appendChild(date);

    taskInfo.appendChild(h2);
    taskInfo.appendChild(tagDate);

    const button = document.createElement("button");

    if (task.completed) {
        li.style.opacity = 0.5;
        h2.style.textDecoration = "line-through";
        h2.style.color = "#94a3b8";
        tag.style.color = "#94a3b8";
        date.style.color = "#94a3b8";

        button.innerHTML = "✔";
        button.className = "concludeBtn";
        button.style.backgroundColor = "#10B981";
        button.style.borderRadius = "50%";
        button.style.width = "4.4rem";
        button.style.height = "4.4rem";
        button.style.fontSize = "1.6rem";
        button.style.fontWeight = "bold";
        button.style.color = "#fff";
        button.style.border = "none";
        button.style.cursor = "pointer";

        button.onclick = () => removeTask(task.id);
    } else {
        button.textContent = "Concluir";
        button.className = "concludeBtn";
        button.onclick = () => {
        task.completed = true;
        saveTasksToStorage();
        renderTasks();
        };
    }

    taskContent.appendChild(taskInfo);
    taskContent.appendChild(button);
    li.appendChild(taskContent);

    return li;
    };

    const renderTasks = () => {
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const taskEl = createTaskElement(task);
        taskList.appendChild(taskEl);
    });

    updateCompletedCount();
    };

    taskForm.onsubmit = (event) => {
    event.preventDefault();

    const titleInput = document.getElementById("taskName");
    const labelInput = document.getElementById("taskLabel");
    const title = titleInput.value.trim();
    const label = labelInput.value.trim();

    if (!title || !label) return;

    const newTask = {
        id: Date.now(),
        title,
        label,
        date: new Date().toLocaleDateString("pt-BR"),
        completed: false,
    };

    tasks.push(newTask);
    saveTasksToStorage();
    renderTasks();

    titleInput.value = "";
    labelInput.value = "";
    };

    // Inicializa ao carregar
    renderTasks();
});
