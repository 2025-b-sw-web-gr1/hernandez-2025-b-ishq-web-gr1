/**
 * Custom Element: <todo-list>
 * Contenedor de tareas que gestiona el estado y la renderización
 */
class TodoList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.todos = this.loadTodos();
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.renderTodos();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }

                .list-container {
                    background-color: #ffffff;
                    padding: 1.5rem;
                    border-radius: 8px;
                    border: 1px solid #e5e5e5;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
                }

                .list-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }

                .list-title {
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: #9b9b9b;
                    letter-spacing: 0.05em;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .filter-buttons {
                    display: flex;
                    gap: 0.5rem;
                }

                .filter-btn {
                    padding: 0.4rem 0.9rem;
                    border: 1px solid #e5e5e5;
                    background-color: #ffffff;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 0.85rem;
                    transition: all 0.15s ease;
                    color: #6b6b6b;
                    font-weight: 500;
                    font-family: inherit;
                }

                .filter-btn:hover {
                    background-color: #f7f7f7;
                    border-color: #d0d0d0;
                }

                .filter-btn.active {
                    background-color: #2d2d2d;
                    color: white;
                    border-color: #2d2d2d;
                }

                .todos-container {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .empty-state {
                    text-align: center;
                    padding: 3rem 1rem;
                    color: #9b9b9b;
                }

                .empty-state p {
                    font-size: 1rem;
                    margin-bottom: 0.5rem;
                }

                .empty-state small {
                    font-size: 0.85rem;
                    color: #b5b5b5;
                }

                @media (max-width: 768px) {
                    .list-header {
                        flex-direction: column;
                        gap: 1rem;
                        align-items: flex-start;
                    }

                    .filter-buttons {
                        width: 100%;
                    }

                    .filter-btn {
                        flex: 1;
                        font-size: 0.8rem;
                    }
                }
            </style>

            <div class="list-container">
                <div class="list-header">
                    <div class="list-title">
                        TASKS
                    </div>
                    <div class="filter-buttons">
                        <button class="filter-btn active" data-filter="all">All</button>
                        <button class="filter-btn" data-filter="active">Active</button>
                        <button class="filter-btn" data-filter="completed">Done</button>
                    </div>
                </div>

                <div class="todos-container" id="todos-container">
                    <!-- Los todo-items se agregarán aquí -->
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Escuchar evento de agregar tarea
        document.addEventListener('add-todo', (e) => {
            this.addTodo(e.detail);
        });

        // Escuchar evento de toggle tarea
        this.shadowRoot.addEventListener('toggle-todo', (e) => {
            this.toggleTodo(e.detail.id);
        });

        // Escuchar evento de eliminar tarea
        this.shadowRoot.addEventListener('delete-todo', (e) => {
            this.deleteTodo(e.detail.id);
        });

        // Filtros
        const filterButtons = this.shadowRoot.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.renderTodos(btn.dataset.filter);
            });
        });
    }

    addTodo(todoData) {
        const newTodo = {
            id: Date.now(),
            text: todoData.text,
            priority: todoData.priority,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.todos.push(newTodo);
        this.saveTodos();
        this.renderTodos();
        this.emitUpdateEvent();
        this.showNotification('✅ Task added successfully');
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.renderTodos();
            this.emitUpdateEvent();
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveTodos();
        this.renderTodos();
        this.emitUpdateEvent();
        this.showNotification('Task deleted');
    }

    renderTodos(filter = 'all') {
        const container = this.shadowRoot.getElementById('todos-container');
        container.innerHTML = '';

        let filteredTodos = this.todos;
        if (filter === 'active') {
            filteredTodos = this.todos.filter(t => !t.completed);
        } else if (filter === 'completed') {
            filteredTodos = this.todos.filter(t => t.completed);
        }

        if (filteredTodos.length === 0) {
            const emptyMessages = {
                'all': 'No tasks yet',
                'active': 'No active tasks',
                'completed': 'No completed tasks'
            };
            
            container.innerHTML = `
                <div class="empty-state">
                    <p>📭 ${emptyMessages[filter]}</p>
                    <small>Add a new task to get started!</small>
                </div>
            `;
            return;
        }

        filteredTodos.forEach(todo => {
            const todoItem = document.createElement('todo-item');
            todoItem.setAttribute('data-id', todo.id);
            todoItem.setAttribute('text', todo.text);
            todoItem.setAttribute('priority', todo.priority);
            if (todo.completed) {
                todoItem.setAttribute('completed', '');
            }
            container.appendChild(todoItem);
        });
    }

    loadTodos() {
        const stored = localStorage.getItem('web-components-todos');
        return stored ? JSON.parse(stored) : [];
    }

    saveTodos() {
        localStorage.setItem('web-components-todos', JSON.stringify(this.todos));
    }

    emitUpdateEvent() {
        window.dispatchEvent(new CustomEvent('todos-updated'));
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 0.9rem 1.5rem;
            background-color: #2d2d2d;
            color: white;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            font-weight: 500;
            font-size: 0.95rem;
            animation: slideIn 0.3s ease;
            font-family: 'Inter', sans-serif;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2500);
    }
}

// Registrar el Custom Element
customElements.define('todo-list', TodoList);

// Agregar estilos de animación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
