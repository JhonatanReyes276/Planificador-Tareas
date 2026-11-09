const formulario = document.getElementById("formulario");

formulario.addEventListener('submit', function (event) {
  event.preventDefault();

  const inputNombre = document.querySelector('#nombre');
  const inputDescripcion = document.querySelector('#descripcion');
  const inputLimite = document.querySelector('#limite');
  const inputEstado = document.querySelector('#estado');

  const nombre = inputNombre.value;
  const descripcion = inputDescripcion.value;
  const limite = inputLimite.value;
  const estado = inputEstado.value;

  const datosFormulario = {
    nombre: nombre,
    descripcion: descripcion,
    limite: limite,
    estado: estado
  };

  const esValido = validFormFieldInput(datosFormulario);

  if (esValido) {
    ocultarAlerta();
    console.log("Tarea agregada exitosamente");

    agregarTarjeta(datosFormulario);

    formulario.reset();
  }
});

function validFormFieldInput(data) {
  const mensajeAlerta = document.querySelector('#mensajeAlerta');
  let errorMessage = "";

  if (data.nombre === "") {
    errorMessage = "El nombre de la tarea no puede estar vacío";
  } else if (data.descripcion === "") {
    errorMessage = "La descripción no puede estar vacía";
  } else if (data.limite === "") {
    errorMessage = "Debes seleccionar una fecha límite para la tarea";
  } else if (data.estado === "") {
    errorMessage = "Debes seleccionar una opción de estado de la tarea";
  }

  if (errorMessage !== "") {
    mostrarAlerta(errorMessage);
    return false;
  }

  return true;
}

function mostrarAlerta(mensaje) {
  const alerta = document.querySelector('#alerta');
  const mensajeAlerta = document.querySelector('#mensajeAlerta');

  mensajeAlerta.textContent = mensaje;
  alerta.classList.remove('d-none');
}

function ocultarAlerta() {
  const alerta = document.querySelector('#alerta');
  alerta.classList.add('d-none');
}

function agregarTarjeta(tarea) {
  const seccion = document.querySelector('#tarjetas');
  const listaFinalizadas = document.querySelector('#listaFinalizadas');

  const restaurarTarjeta = () => {
    agregarTarjeta(tarea);
  };

  const contenedorTarjetas = document.createElement('div');
  contenedorTarjetas.classList.add('row', 'g-4', 'align-items-center', 'mb-3');

  const colCard = document.createElement('div');
  colCard.classList.add('col-12', 'col-md-8');

  let fechaFormateada = tarea.limite;

  if (tarea.limite) {
    let partes = tarea.limite.split('-');
    fechaFormateada = `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

  const tarjetaDiv = document.createElement('div');
  tarjetaDiv.classList.add('card', 'text-bg-dark');
  tarjetaDiv.innerHTML = `
    <h5 class="card-header">Tarea</h5>
    <div class="card-body">
      <h5 class="card-title">${tarea.nombre}</h5>
      <p class="card-text mb-1"><strong>Descripción:</strong> ${tarea.descripcion}</p>
      <p class="card-text mb-1"><strong>Límite de realización:</strong> ${fechaFormateada}</p>
      <p class="card-text mb-0"><strong>Estado:</strong> ${tarea.estado}</p>
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
      <div class="fw-bold">${tarea.nombre}</div>
      <p class="mb-0">${tarea.descripcion}</p>
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

const taskManager = new TaskManager();
console.log(taskManager.tasks);



