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
    errorMessage = "Debes seleccionar una opción";
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
