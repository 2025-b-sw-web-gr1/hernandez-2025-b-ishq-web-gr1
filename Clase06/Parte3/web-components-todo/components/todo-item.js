/**
 * Custom Element: <todo-item>
 * Representa una tarea individual con Shadow DOM para encapsulación
 */
class TodoItem extends HTMLElement {
    constructor() {
        super();
        
        // Crear Shadow DOM para encapsular estilos y estructura
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // Obtener datos del elemento
        const id = this.getAttribute('data-id');
        const text = this.getAttribute('text');
        const completed = this.hasAttribute('completed');
        const priority = this.getAttribute('priority') || 'normal';

        // Renderizar el componente
        this.render(id, text, completed, priority);
        
        // Agregar event listeners
        this.setupEventListeners(id);
    }

    render(id, text, completed, priority) {
        const priorityBadges = {
            'baja': { color: '#7ed321', text: 'Low' },
            'normal': { color: '#4a90e2', text: 'Normal' },
            'alta': { color: '#f5a623', text: 'High' },
            'urgente': { color: '#d0021b', text: 'Urgent' }
        };

        const badge = priorityBadges[priority];

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }

                .todo-item {
                    background-color: #ffffff;
                    border: 1px solid #e5e5e5;
                    border-radius: 6px;
                    padding: 0.9rem 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.9rem;
                    transition: all 0.15s ease;
                    margin-bottom: 0.5rem;
                }

                .todo-item:hover {
                    background-color: #fafafa;
                    border-color: #d0d0d0;
                }

                .todo-item.completed {
                    opacity: 0.5;
                }

                .checkbox-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .checkbox {
                    width: 18px;
                    height: 18px;
                    cursor: pointer;
                    accent-color: #2d2d2d;
                    border-radius: 3px;
                }

                .todo-content {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .todo-text {
                    font-size: 0.95rem;
                    color: #2d2d2d;
                    text-decoration: ${completed ? 'line-through' : 'none'};
                    flex: 1;
                }

                .priority-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    padding: 0.25rem 0.6rem;
                    border-radius: 4px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    background-color: ${badge.color}15;
                    color: ${badge.color};
                    border: 1px solid ${badge.color}30;
                }

                .priority-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background-color: ${badge.color};
                }

                .btn-delete {
                    background: transparent;
                    color: #9b9b9b;
                    border: none;
                    padding: 0.4rem 0.7rem;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 1rem;
                    transition: all 0.15s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .btn-delete:hover {
                    background-color: #fee;
                    color: #d0021b;
                }
            </style>

            <div class="todo-item ${completed ? 'completed' : ''}">
                <div class="checkbox-wrapper">
                    <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}>
                </div>
                <div class="todo-content">
                    <span class="todo-text">${this.escapeHtml(text)}</span>
                    <span class="priority-badge">
                        <span class="priority-dot"></span>
                        ${badge.text}
                    </span>
                </div>
                <button class="btn-delete" title="Delete task">Delete</button>
            </div>
        `;
    }

    setupEventListeners(id) {
        const checkbox = this.shadowRoot.querySelector('.checkbox');
        const deleteBtn = this.shadowRoot.querySelector('.btn-delete');

        checkbox.addEventListener('change', () => {
            // Emitir evento personalizado para que el padre lo escuche
            this.dispatchEvent(new CustomEvent('toggle-todo', {
                bubbles: true,
                composed: true,
                detail: { id: parseInt(id) }
            }));
        });

        deleteBtn.addEventListener('click', () => {
            // Emitir evento personalizado para eliminar
            this.dispatchEvent(new CustomEvent('delete-todo', {
                bubbles: true,
                composed: true,
                detail: { id: parseInt(id) }
            }));
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Registrar el Custom Element
customElements.define('todo-item', TodoItem);
