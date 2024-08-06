const deseoInput = document.getElementById("sueño");
const prioridadSelect = document.getElementById("prioridad");
const categoriaSelect = document.getElementById("categoria");
const agregarBtn = document.getElementById("agregarBtn");
const listaDeseos = document.getElementById("listaSueño");
const modoBtn = document.getElementById('modoBtn');

let sueño = [];

// Cargar sueño desde localStorage al iniciar
window.addEventListener('load', cargarSueño);

agregarBtn.addEventListener("click", agregarSueño);

function agregarSueño() {
    const nuevoSueño = deseoInput.value;
    const prioridad = prioridadSelect.value;
    const categoria = categoriaSelect.value;

    if (nuevoSueño.trim() !== "") {
        sueño.push({ sueño: nuevoDeseo, prioridad, categoria });
        mostrarSueño();
        guardarSueño();
        deseoInput.value = "";
    }
}

function mostrarSueño(filtrarPrioridad = "", filtrarCategoria = "") {
    listaSueño.innerHTML = "";

    sueño.forEach((sueño, index) => {
        if ((filtrarPrioridad === "" || (sueño.prioridad && sueño.prioridad === filtrarPrioridad)) &&
            (filtrarCategoria === "" || (sueño.categoria && sueño.categoria === filtrarCategoria))) {

            const listItem = document.createElement("li");
            listItem.setAttribute('data-prioridad', sueño.prioridad);
            listItem.classList.add('fade-in'); // Agregar clase para animación

            // Agregar icono según la categoría
            let icono = "";
            switch (sueño.categoria) {
                case "viajes":
                    icono = '<i class="fas fa-plane"></i>';
                    break;
                case "tecnologia":
                    icono = '<i class="fas fa-laptop"></i>';
                    break;
                case "experiencias":
                    icono = '<i class="fas fa-gift"></i>';
                    break;
                default:
                    icono = '<i class="fas fa-star"></i>';
            }

            listItem.innerHTML = `
                ${icono}
                ${sueño.sueño} 
                (${sueño.prioridad ? sueño.prioridad : ""}, 
                 ${sueño.categoria ? sueño.categoria : ""})
                <div>
                    <button onclick="editarsueño(${index})">Editar</button>
                    <button class="eliminar" onclick="eliminarsueño(${index})">Eliminar</button>
                </div>
            `;

            listasueño.appendChild(listItem);
        }
    });
}

function filtrarPorPrioridad(prioridad) {
    mostrarsueño(prioridad, "");
}

function filtrarPorCategoria(categoria) {
    mostrarsueño("", categoria);
}

function eliminarsueño(index) {
    sueño.splice(index, 1);
    mostrarsueño();
    guardarsueño();
}

function editarsueño(index) {
    const nuevosueño = prompt("Editar sueño:", sueño[index].sueño);
    if (nuevosueño !== null && nuevosueño.trim() !== "") {
        sueño[index].sueño = nuevosueño;
        mostrarsueño();
        guardarsueño();
    }
}

function guardarsueño() {
    localStorage.setItem("sueño", JSON.stringify(sueño));
}

function cargarsueño() {
    const sueñoGuardados = localStorage.getItem("sueño");
    if (sueñoGuardados) {
        sueño = JSON.parse(sueñoGuardados);
        mostrarsueño();
    }
}


modoBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        modoBtn.textContent = 'Modo Claro';
    } else {
        modoBtn.textContent = 'Modo Oscuro';
    }
});


new Sortable(listasueño, {
    animation: 150,
    ghostClass: 'sortable-ghost',
    onUpdate: function (evt) {
        sueño.splice(evt.newIndex, 0, sueño.splice(evt.oldIndex, 1)[0]);
        guardarsueño();
    },
});
