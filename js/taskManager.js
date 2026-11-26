class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }

    guardar() {
        const data = {
            tasks: this.tasks,
            currentId: this.currentId
        };
        localStorage.setItem('tasks', JSON.stringify(data));
    }

    cargar() {
        const c = localStorage.getItem('tasks');
        if (!c) return;

        try {
            const data = JSON.parse(c);
            this.currentId = Number(data.currentId) || 0;

            if (Array.isArray(data.tasks)) {
                this.tasks = data.tasks.map((task) => ({
                    id: task.id,
                    nombre: task.nombre,
                    descripcion: task.descripcion,
                    limite: task.limite,
                    estado: task.estado
                }));
            }

            this.render();
        } catch (error) {
            console.error('Error al cargar tareas desde localStorage:', error);
        }
    }

    addTask(nombre, descripcion, limite, estado = "POR HACER") {
        const task = {
            id: ++this.currentId,
            nombre: nombre,
            descripcion: descripcion,
            limite: limite,
            estado: estado
        };

        this.tasks.push(task);
        this.guardar();
        this.render();
    }

    getTaskById(taskId) {
        let foundTask;
        for (let task of this.tasks) {
            if (task.id === taskId) {
                foundTask = task;
            }
        }
        return foundTask;
    }

    formatearFecha(limite) {
        if (!limite) return limite;
        const partes = limite.split('-');
        return partes.length === 3 ? `${partes[2]}/${partes[1]}/${partes[0]}` : limite;
    }

    createTaskHtml(id, nombre, descripcion, limite, estado) {
        const fechaFormateada = this.formatearFecha(limite);

        return `
            <div class="row g-4 align-items-center mb-3" data-task-id="${id}">
                <div class="col-12 col-md-8">
                    <div class="card text-bg-dark">
                        <h5 class="card-header">Tarea ${id}</h5>
                        <div class="card-body">
                            <h5 class="card-title">${nombre}</h5>
                            <p class="card-text mb-1"><strong>Descripción:</strong> ${descripcion}</p>
                            <p class="card-text mb-1"><strong>Límite de realización:</strong> ${fechaFormateada}</p>
                            <p class="card-text mb-0 estado-texto"><strong>Estado:</strong> ${estado}</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-4 d-flex justify-content-center align-items-center gap-2 mt-3 mt-md-0">
                    <button type="button" class="done-button btn btn-success w-100">
                        Finalizada
                    </button>
                    <button type="button" class="delete-button btn btn-danger w-100" data-task-id="${id}">
                        Eliminar
                    </button>
                </div>
            </div>
        `;
    }

    crearTareaFinalizada(id, nombre, descripcion) {
        return `
            <li class="list-group-item d-flex justify-content-between align-items-start" data-task-id="${id}">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">${nombre}</div>
                    <p class="mb-0">${descripcion}</p>
                    <button type="button" class="reopen-button btn btn-outline-secondary btn-sm mt-1">
                        Falta completar
                    </button>
                </div>
                <span class="badge text-bg-success text-light rounded-pill">✓</span>
            </li>
        `;
    }

    render() {
        const seccion = document.querySelector('#tarjetas');
        const listaFinalizadas = document.querySelector('#listaFinalizadas');

        if (seccion) {
            seccion.innerHTML = this.tasks
                .filter((task) => task.estado !== "FINALIZADA")
                .map((task) =>
                    this.createTaskHtml(
                        task.id,
                        task.nombre,
                        task.descripcion,
                        task.limite,
                        task.estado
                    )
                )
                .join('');
        }

        if (listaFinalizadas) {
            listaFinalizadas.innerHTML = this.tasks
                .filter((task) => task.estado === "FINALIZADA")
                .map((task) =>
                    this.crearTareaFinalizada(
                        task.id,
                        task.nombre,
                        task.descripcion,
                        task.limite
                    )
                )
                .join('');
        }
    }

    deleteTask(taskId) {
        const idNum = Number(taskId);
        this.tasks = this.tasks.filter((task) => task.id !== idNum);
        this.guardar();
        this.render();
    }
}