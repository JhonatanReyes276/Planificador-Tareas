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
                data.tasks.forEach((task) => {
                    this.addTask(
                        task.nombre,
                        task.descripcion,
                        task.limite,
                        task.estado,
                        task.id
                    );
                });
            }
        } catch (error) {
            console.error('Error al cargar tareas desde localStorage:', error);
        }
    }

    addTask(nombre, descripcion, limite, estado = "POR HACER", existingId = null) {
        const taskId = existingId !== null ? existingId : ++this.currentId;

        const existente = this.tasks.find(t => t.id === taskId);
        if (existente) {
            existente.estado = estado;
        } else {
            this.tasks.push({
                id: taskId,
                nombre: nombre,
                descripcion: descripcion,
                limite: limite,
                estado: estado,
            });
        }

        const seccion = document.querySelector('#tarjetas');
        const listaFinalizadas = document.querySelector('#listaFinalizadas');

        const contenedorTarjetas = document.createElement('div');
        contenedorTarjetas.classList.add('row', 'g-4', 'align-items-center', 'mb-3');
        contenedorTarjetas.dataset.taskId = taskId;

        const colCard = document.createElement('div');
        colCard.classList.add('col-12', 'col-md-8');

        let fechaFormateada = limite;

        if (limite) {
            let partes = limite.split('-');
            fechaFormateada = `${partes[2]}/${partes[1]}/${partes[0]}`;
        }

        const tarjetaDiv = document.createElement('div');
        tarjetaDiv.classList.add('card', 'text-bg-dark');
        tarjetaDiv.innerHTML = `
            <h5 class="card-header">Tarea ${taskId}</h5>
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text mb-1"><strong>Descripción:</strong> ${descripcion}</p>
                <p class="card-text mb-1"><strong>Límite de realización:</strong> ${fechaFormateada}</p>
                <p class="card-text mb-0 estado-texto"><strong>Estado:</strong> ${estado}</p>
            </div>
        `;
        colCard.appendChild(tarjetaDiv);

        const colBotones = document.createElement('div');
        colBotones.classList.add('col-12', 'col-md-4', 'd-flex', 'justify-content-center', 'align-items-center', 'gap-2', 'mt-3', 'mt-md-0');

        const btnFinalizada = document.createElement('button');
        btnFinalizada.className = 'btn btn-success w-100';
        btnFinalizada.textContent = 'Finalizada';

        const btnEliminar = document.createElement('button');
        btnEliminar.className = 'delete-button btn btn-danger w-100';
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.dataset.taskId = taskId;

        const moverAFinalizadas = () => {
            const taskEnLista = this.tasks.find(t => t.id === taskId);
            if (taskEnLista) {
                taskEnLista.estado = "FINALIZADA";
            }
            tarjetaDiv.querySelector('.estado-texto').innerHTML = `<strong>Estado:</strong> FINALIZADA`;

            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-start';
            listItem.dataset.taskId = taskId;

            listItem.innerHTML = `
                <div class="ms-2 me-auto">
                    <div class="fw-bold">${nombre}</div>
                    <p class="mb-0">${descripcion}</p>
                    <button class="btn btn-outline-secondary btn-sm mt-1">Falta completar</button>
                </div>
                <span class="badge text-bg-success text-light rounded-pill">✓</span>
            `;

            const btnRegresar = listItem.querySelector('button');
            btnRegresar.onclick = () => {
                const taskARestaurar = this.tasks.find(t => t.id === taskId);
                if (taskARestaurar) {
                    taskARestaurar.estado = "POR HACER";
                }
                tarjetaDiv.querySelector('.estado-texto').innerHTML = `<strong>Estado:</strong> POR HACER`;
                seccion.appendChild(contenedorTarjetas);
                listItem.remove();
                this.guardar();
            };

            listaFinalizadas.appendChild(listItem);
            contenedorTarjetas.remove();
            this.guardar();
        };

        btnFinalizada.onclick = moverAFinalizadas;

        colBotones.appendChild(btnFinalizada);
        colBotones.appendChild(btnEliminar);

        contenedorTarjetas.appendChild(colCard);
        contenedorTarjetas.appendChild(colBotones);

        seccion.appendChild(contenedorTarjetas);

        if (estado === "FINALIZADA") {
            moverAFinalizadas();
        } else {
            this.guardar();
        }
    }

    deleteTask(taskId) {
        const newTasks = [];
        for (let task of this.tasks) {
            if (task.id !== taskId) {
                newTasks.push(task);
            }
        }
        this.tasks = newTasks;
        this.guardar();
    }
}