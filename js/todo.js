window.todoState = {
  todos: JSON.parse(localStorage.getItem('todos') || '[]')
};

function createTodoElements() {
  const modal = document.createElement('div');
  modal.className = 'todo-modal';
  
  modal.innerHTML = `
    <div class="todo-content">
      <div class="todo-header">
        <h2 class="todo-title">ToDoリスト</h2>
        <button class="todo-close">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <form class="todo-form">
        <input type="text" class="todo-input" placeholder="新しいタスクを入力...">
        <button type="submit" class="todo-add">追加</button>
      </form>
      <ul class="todo-list"></ul>
    </div>
  `;
  
  document.body.appendChild(modal);
  return modal;
}

function renderTodoPreview() {
  const previewList = document.querySelector('.todo-preview-list');
  if (!previewList) return;

  const incompleteTodos = window.todoState.todos.filter(todo => !todo.completed);
  
  previewList.innerHTML = incompleteTodos.map((todo, index) => `
    <div class="todo-preview-item" data-index="${index}">
      <input type="checkbox" class="todo-preview-checkbox" ${todo.completed ? 'checked' : ''}>
      <span class="todo-preview-text">${todo.text}</span>
    </div>
  `).join('');

  previewList.querySelectorAll('.todo-preview-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const item = e.target.closest('.todo-preview-item');
      const index = parseInt(item.dataset.index);
      const todoIndex = window.todoState.todos.findIndex((t, i) => {
        return !t.completed && i >= index;
      });
      
      if (todoIndex !== -1) {
        window.todoState.todos[todoIndex].completed = true;
        saveTodos();
        renderTodos();
        renderTodoPreview();
      }
    });
  });
}

function renderTodos() {
  const todoList = document.querySelector('.todo-list');
  if (!todoList) return;
  
  todoList.innerHTML = window.todoState.todos.map((todo, index) => `
    <li class="todo-item">
      <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} data-index="${index}">
      <span class="todo-text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
      <button class="todo-delete" data-index="${index}">
        <i class="fas fa-trash"></i>
      </button>
    </li>
  `).join('');
  
  todoList.querySelectorAll('.todo-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const index = parseInt(e.target.dataset.index);
      window.todoState.todos[index].completed = e.target.checked;
      saveTodos();
      renderTodos();
    });
  });
  
  todoList.querySelectorAll('.todo-delete').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = parseInt(e.target.closest('.todo-delete').dataset.index);
      window.todoState.todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });
  });
  
  // プレビューも更新
  renderTodoPreview();
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(window.todoState.todos));
}

function initializeTodo() {
  const modal = createTodoElements();
  const form = modal.querySelector('.todo-form');
  const input = modal.querySelector('.todo-input');
  const closeButton = modal.querySelector('.todo-close');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text) {
      window.todoState.todos.push({ text, completed: false });
      saveTodos();
      renderTodos();
      input.value = '';
    }
  });
  
  closeButton.addEventListener('click', () => {
    modal.classList.remove('active');
  });
  
  // 初期レンダリング
  renderTodos();
  renderTodoPreview();
  
  return modal;
}

// DOMContentLoadedイベントで初期化
document.addEventListener('DOMContentLoaded', () => {
  const todoModal = initializeTodo();
  
  document.querySelector('.todo-icon').addEventListener('click', () => {
    todoModal.classList.add('active');
  });
});