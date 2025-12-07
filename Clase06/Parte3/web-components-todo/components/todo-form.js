/**
 * Custom Element: <todo-form>
 * Formulario para agregar nuevas tareas con Shadow DOM
 */
class TodoForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin-bottom: 1.5rem;
                }

                .form-container {
                    background-color: #ffffff;
                    padding: 1.5rem;
                    border-radius: 8px;
                    border: 1px solid #e5e5e5;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
                }

                .form-title {
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: #9b9b9b;
                    letter-spacing: 0.05em;
                    margin-bottom: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .form-group {
                    display: flex;
                    gap: 0.75rem;
                    flex-wrap: wrap;
                }

                input[type="text"] {
                    flex: 1;
                    min-width: 250px;
                    padding: 0.7rem 1rem;
                    border: 1px solid #e5e5e5;
                    border-radius: 6px;
                    font-size: 0.95rem;
                    font-family: inherit;
                    transition: all 0.2s ease;
                    background-color: #ffffff;
                }

                input[type="text"]:focus {
                    outline: none;
                    border-color: #4a90e2;
                    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
                }

                input[type="text"]::placeholder {
                    color: #9b9b9b;
                }

                select {
                    padding: 0.7rem 1rem;
                    border: 1px solid #e5e5e5;
                    border-radius: 6px;
                    font-size: 0.95rem;
                    font-family: inherit;
                    cursor: pointer;
                    background-color: #ffffff;
                    color: #2d2d2d;
                }

                select:focus {
                    outline: none;
                    border-color: #4a90e2;
                }

                button {
                    padding: 0.7rem 1.5rem;
                    background-color: #2d2d2d;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-size: 0.95rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-family: inherit;
                }

                button:hover {
                    background-color: #1a1a1a;
                }

                button:active {
                    transform: scale(0.98);
                }

                @media (max-width: 768px) {
                    .form-group {
                        flex-direction: column;
                    }

                    input[type="text"],
                    select,
                    button {
                        width: 100%;
                    }
                }
            </style>

            <div class="form-container">
                <div class="form-title">
                    NEW TASK
                </div>
                <form id="todo-form">
                    <div class="form-group">
                        <input 
                            type="text" 
                            id="todo-input" 
                            placeholder="What needs to be done?" 
                            required
                            autocomplete="off"
                        >
                        <select id="priority-select">
                            <option value="baja">Low Priority</option>
                            <option value="normal" selected>Normal</option>
                            <option value="alta">High Priority</option>
                            <option value="urgente">Urgent</option>
                        </select>
                        <button type="submit">Add Task</button>
                    </div>
                </form>
            </div>
        `;
    }

    setupEventListeners() {
        const form = this.shadowRoot.getElementById('todo-form');
        const input = this.shadowRoot.getElementById('todo-input');
        const prioritySelect = this.shadowRoot.getElementById('priority-select');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const text = input.value.trim();
            const priority = prioritySelect.value;

            if (!text) return;

            // Emitir evento personalizado con los datos de la nueva tarea
            this.dispatchEvent(new CustomEvent('add-todo', {
                bubbles: true,
                composed: true,
                detail: {
                    text,
                    priority,
                    completed: false
                }
            }));

            // Limpiar el formulario
            input.value = '';
            prioritySelect.value = 'normal';
            input.focus();
        });
    }
}

// Registrar el Custom Element
customElements.define('todo-form', TodoForm);
