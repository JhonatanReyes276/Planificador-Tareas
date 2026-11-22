class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }
    addTask(nombre, descripcion, limite, estado = "POR HACER") {

        this.currentId++;

        this.tasks.push({
            id: this.currentId,
            nombre: nombre,
            descripcion: descripcion,
            limite: limite,
            estado: estado,
        });

        const seccion = document.querySelector('#tarjetas');
        const listaFinalizadas = document.querySelector('#listaFinalizadas');

        const restaurarTarjeta = () => {
            taskManager.addTask(nombre, descripcion, limite, estado = "POR HACER")
        };

        const contenedorTarjetas = document.createElement('div');
        contenedorTarjetas.classList.add('row', 'g-4', 'align-items-center', 'mb-3');

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
    <h5 class="card-header">Tarea ${this.currentId}</h5>
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text mb-1"><strong>Descripción:</strong> ${descripcion}</p>
      <p class="card-text mb-1"><strong>Límite de realización:</strong> ${fechaFormateada}</p>
      <p class="card-text mb-0"><strong>Estado:</strong> ${estado}</p>
    </div>
  `;
        colCard.appendChild(tarjetaDiv);

        const colBotones = document.createElement('div');
        colBotones.classList.add('col-12', 'col-md-4', 'd-flex', 'justify-content-center', 'align-items-center', 'gap-2', 'mt-3', 'mt-md-0');

        const btnFinalizada = document.createElement('button');
        btnFinalizada.className = 'btn btn-success w-100';
        btnFinalizada.textContent = 'Finalizada';

        const btnEliminar = document.createElement('button');
        btnEliminar.className = 'btn btn-danger w-100';
        btnEliminar.textContent = 'Eliminar';


        btnFinalizada.onclick = () => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-start';

            listItem.innerHTML = `
    <div class="ms-2 me-auto">
      <div class="fw-bold">${nombre}</div>
      <p class="mb-0">${descripcion}</p>
      <button class="btn btn-outline-secondary btn-sm">Falta completar</button>
    </div>
    <span class="badge text-bg-success text-light rounded-pill">✓</span>
    `;

            const btnRegresar = listItem.querySelector('button');
            btnRegresar.onclick = () => {
                restaurarTarjeta();
                listItem.remove();
            };

            listaFinalizadas.appendChild(listItem);
            contenedorTarjetas.remove();
        };

        colBotones.appendChild(btnFinalizada);
        colBotones.appendChild(btnEliminar);

        contenedorTarjetas.appendChild(colCard);
        contenedorTarjetas.appendChild(colBotones);

        seccion.appendChild(contenedorTarjetas);
    }
}

