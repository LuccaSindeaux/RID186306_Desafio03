document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("taskInserter");
    const taskNameInput = document.getElementById("taskName");
    const taskLabelInput = document.getElementById("taskLabel");
    const tasksList = document.getElementById("tasksList");
    const footer = document.querySelector("footer");
  
    // Adiciona contador no footer
    const completedCountEl = document.createElement("p");
    completedCountEl.style.fontSize = "1.4rem";
    completedCountEl.style.color = "#334155";
    completedCountEl.style.margin = "1rem 2rem 0 0";
    footer.appendChild(completedCountEl);
  
    // Gera um ID único para cada tarefa
    const generateId = () => Date.now().toString() + Math.random().toString(36).substring(2, 8);
  
    function loadTasks() {
      const saved = localStorage.getItem("tasks"); // constante recebe o comando que pega do local storage
      return saved ? JSON.parse(saved) : []; // retorna o que está salvo ou cria um array vazion no local Storage com o parse
    }
  
    function saveTasks(tasks) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    function updateCompletedCount() {
      const tasks = loadTasks();
      const completedCount = tasks.filter(t => t.completed).length;
      completedCountEl.textContent = `Tarefas concluídas: ${completedCount}`;
    }
  
    function renderTasks() {
      const tasks = loadTasks();
      tasksList.innerHTML = "";
  
      tasks.forEach(task => {
        const li = document.createElement("li");
  
        const taskContent = document.createElement("div");
        taskContent.className = "taskContent";
  
        const taskInfo = document.createElement("div");
        taskInfo.className = "taskInfo";
  
        const title = document.createElement("h2");
        title.textContent = task.title;
  
        const tagDate = document.createElement("div");
        tagDate.className = "tagDate";
  
        const tag = document.createElement("p");
        tag.className = "tag";
        tag.textContent = task.label;
  
        const date = document.createElement("p");
        date.className = "date";
        date.textContent = `Criado em: ${task.date}`;
  
        tagDate.append(tag, date);
        taskInfo.append(title, tagDate);
        taskContent.appendChild(taskInfo);
  
        const button = document.createElement("button");
        button.className = "concludeBtn";
  
        if (task.completed) {
          // Estilo visual para tarefa concluída
          title.style.textDecoration = "line-through";
          title.style.color = "#94a3b8";
          tag.style.color = "#94a3b8";
          tag.style.borderColor = "#94a3b8";
          date.style.color = "#94a3b8";
  
          // Botão verde ✓
          button.textContent = "✓";
          button.style.backgroundColor = "#10B981";
          button.style.borderRadius = "50%";
          button.style.width = "3.2rem";
          button.style.height = "3.2rem";
          button.style.fontSize = "1.6rem";
          button.style.fontWeight = "bold";
          button.style.color = "#fff";
          button.style.border = "none";
          button.style.cursor = "pointer";
  
          button.addEventListener("click", () => {
            // Remove do localStorage com base no ID
            const currentTasks = loadTasks();
            const updatedTasks = currentTasks.filter(t => t.id !== task.id);
            saveTasks(updatedTasks);
            renderTasks();
          });
        } else {
          button.textContent = "Concluir";
          button.addEventListener("click", () => {
            const currentTasks = loadTasks();
            const updatedTasks = currentTasks.map(t =>
              t.id === task.id ? { ...t, completed: true } : t
            );
            saveTasks(updatedTasks);
            renderTasks();
          });
        }
  
        taskContent.appendChild(button);
        li.appendChild(taskContent);
        tasksList.appendChild(li);
      });
  
      updateCompletedCount();
    }
  
    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = taskNameInput.value.trim();
      const label = taskLabelInput.value.trim();
      if (!title || !label) return;
  
      const newTask = {
        id: generateId(),
        title,
        label,
        date: new Date().toLocaleDateString("pt-BR"),
        completed: false
      };
  
      const tasks = loadTasks();
      tasks.push(newTask);
      saveTasks(tasks);
      renderTasks();
  
      taskNameInput.value = "";
      taskLabelInput.value = "";
    });
  
    renderTasks();
  });
  