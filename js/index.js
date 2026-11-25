const taskManager = new TaskManager();
const newTaskForm = document.getElementById("formulario");
const listaTareas = document.querySelector('#tarjetas');

document.addEventListener('DOMContentLoaded', () => {
    taskManager.cargar();
});

newTaskForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const inputNombre = document.querySelector('#nombre');
  const inputDescripcion = document.querySelector('#descripcion');
  const inputLimite = document.querySelector('#limite');

  const nombre = inputNombre.value;
  const descripcion = inputDescripcion.value;
  const limite = inputLimite.value;

  const tarea = {
    nombre: nombre,
    descripcion: descripcion,
    limite: limite,
  };

  const esValido = validarFormulario(tarea);

  if (esValido) {
    ocultarAlerta();
    console.log("Tarea agregada exitosamente");

    taskManager.addTask(nombre, descripcion, limite);

    newTaskForm.reset();
  }
});

function validarFormulario(datos) {
  const mensajeAlerta = document.querySelector('#mensajeAlerta');
  let mensajeError = "";

  if (datos.nombre === "") {
    mensajeError = "El nombre de la tarea no puede estar vacío";
  } else if (datos.descripcion === "") {
    mensajeError = "La descripción no puede estar vacía";
  } else if (datos.limite === "") {
    mensajeError = "Debes seleccionar una fecha límite para la tarea";
  }

  if (mensajeError !== "") {
    mostrarAlerta(mensajeError);
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

listaTareas.addEventListener('click', (event) => {
    const deleteBtn = event.target.closest('.delete-button');
    if (!deleteBtn) return;

    const parentTask = deleteBtn.closest('.row[data-task-id]');
    if (!parentTask) return;

    const taskId = Number(deleteBtn.dataset.taskId || parentTask.dataset.taskId);

    taskManager.deleteTask(taskId);
    parentTask.remove();
});

