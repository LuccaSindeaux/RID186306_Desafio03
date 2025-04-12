document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("taskInserter");
    const taskList = document.getElementById("tasksList");
  
    // Carrega tarefas salvas ao iniciar
    loadTasks();
  
    // Adiciona nova tarefa
    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const titleInput = document.getElementById("taskName");
      const labelInput = document.getElementById("taskLabel");
  
      const title = titleInput.value.trim();
      const label = labelInput.value.trim();
      const date = new Date().toLocaleDateString("pt-BR");
  
      if (!title || !label) return;
  
      const task = { title, label, date };
      addTaskToDOM(task);
      saveTask(task);
  
      titleInput.value = "";
      labelInput.value = "";
    });
  
    // Lida com cliques nos botões de concluir/remover
    taskList.addEventListener("click", (e) => {
      const target = e.target;
  
      if (target.classList.contains("concludeBtn")) {
        const li = target.closest("li");
  
        // Se já estiver concluída, remove
        if (li.classList.contains("completed")) {
          removeTask(li);
        } else {
          li.classList.add("completed");
          target.textContent = ""; // Vira bolinha verde com ícone via CSS
        }
  
        updateLocalStorage();
      }
    });
  
    // Adiciona tarefa visualmente
    function addTaskToDOM({ title, label, date }) {
      const li = document.createElement("li");
  
      li.innerHTML = `
        <div class="taskContent">
          <div class="taskInfo">
            <h2>${title}</h2>
            <div class="tagDate">
              <p class="tag">${label}</p>
              <p class="date">Criado em: ${date}</p>
            </div>
          </div>
          <button class="concludeBtn">Concluir</button>
        </div>
      `;
  
      taskList.appendChild(li);
    }
  
    // Salva no localStorage
    function saveTask(task) {
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      savedTasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(savedTasks));
    }
  
    // Carrega tarefas do localStorage
    function loadTasks() {
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      savedTasks.forEach(task => addTaskToDOM(task));
    }
  
    // Atualiza localStorage com o que está na tela
    function updateLocalStorage() {
      const lis = document.querySelectorAll("#tasksList li:not(.completed)");
      const tasks = [];
  
      lis.forEach(li => {
        const title = li.querySelector("h2").textContent;
        const label = li.querySelector(".tag").textContent;
        const date = li.querySelector(".date").textContent.replace("Criado em: ", "");
  
        tasks.push({ title, label, date });
      });
  
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    // Remove tarefa visual e no localStorage
    function removeTask(li) {
      const title = li.querySelector("h2").textContent;
      li.remove();
  
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks = tasks.filter(task => task.title !== title);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  });
  