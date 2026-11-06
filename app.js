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
  const contenedor = document.querySelector('#tarjetas');

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row', 'g-4', 'align-items-center', 'mb-3');

  const colCard = document.createElement('div');
  colCard.classList.add('col-12', 'col-md-8');

  const tarjetaDiv = document.createElement('div');
  tarjetaDiv.classList.add('card', 'text-bg-dark');
  tarjetaDiv.innerHTML = `
    <h5 class="card-header">Tarea</h5>
    <div class="card-body">
      <h5 class="card-title">${tarea.nombre}</h5>
      <p class="card-text mb-1"><strong>Descripción:</strong> ${tarea.descripcion}</p>
      <p class="card-text mb-1"><strong>Límite de realización:</strong> ${tarea.limite}</p>
      <p class="card-text mb-0"><strong>Estado:</strong> ${tarea.estado}</p>
    </div>
  `;
  colCard.appendChild(tarjetaDiv);

  const colBotones = document.createElement('div');
  colBotones.classList.add('col-12', 'col-md-4', 'd-flex', 'justify-content-center', 'align-items-center', 'gap-2', 'mt-3', 'mt-md-0');
  colBotones.innerHTML = `
    <button class="btn btn-success w-100">Finalizada</button>
    <button class="btn btn-danger w-100" onclick="this.closest('.row').remove()">Eliminar</button>
  `;

  rowDiv.appendChild(colCard);
  rowDiv.appendChild(colBotones);

  contenedor.appendChild(rowDiv);
}

