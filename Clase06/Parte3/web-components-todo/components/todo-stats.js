/**
 * Custom Element: <todo-stats>
 * Muestra estadísticas de las tareas con Shadow DOM
 */
class TodoStats extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        
        // Escuchar eventos de actualización
        window.addEventListener('todos-updated', () => {
            this.updateStats();
        });

        this.updateStats();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin-bottom: 1.5rem;
                }

                .stats-container {
                    background-color: #ffffff;
                    padding: 1.5rem;
                    border-radius: 8px;
                    border: 1px solid #e5e5e5;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
                }

                .stats-title {
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: #9b9b9b;
                    letter-spacing: 0.05em;
                    margin-bottom: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    gap: 1.5rem;
                }

                .stat-item {
                    text-align: center;
                }

                .stat-value {
                    font-size: 2rem;
                    font-weight: 600;
                    color: #2d2d2d;
                    display: block;
                    margin-bottom: 0.25rem;
                }

                .stat-label {
                    font-size: 0.85rem;
                    color: #6b6b6b;
                    font-weight: 500;
                }

                @media (max-width: 768px) {
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
            </style>

            <div class="stats-container">
                <div class="stats-title">
                    <span>📊</span>
                    STATISTICS
                </div>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-value" id="total-todos">0</span>
                        <span class="stat-label">Total</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value" id="active-todos">0</span>
                        <span class="stat-label">Active</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value" id="completed-todos">0</span>
                        <span class="stat-label">Completed</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value" id="progress">0%</span>
                        <span class="stat-label">Progress</span>
                    </div>
                </div>
            </div>
        `;
    }

    updateStats() {
        const todos = this.getTodos();
        
        const total = todos.length;
        const completed = todos.filter(todo => todo.completed).length;
        const active = total - completed;
        const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

        this.shadowRoot.getElementById('total-todos').textContent = total;
        this.shadowRoot.getElementById('active-todos').textContent = active;
        this.shadowRoot.getElementById('completed-todos').textContent = completed;
        this.shadowRoot.getElementById('progress').textContent = `${progress}%`;
    }

    getTodos() {
        const stored = localStorage.getItem('web-components-todos');
        return stored ? JSON.parse(stored) : [];
    }
}

// Registrar el Custom Element
customElements.define('todo-stats', TodoStats);
