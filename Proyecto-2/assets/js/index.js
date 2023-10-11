console.log("Entro index.js");

//Lo siguiente es un objeto - local storage//
let comerciales = JSON.parse(localStorage.getItem("comerciales")) || [];

//Estos son los inputs (cuando se solicita info al lector)//
const inputNombre = document.getElementById("inputNombre");
const inputVersion = document.getElementById("inputVersion");
const inputDuracion = document.getElementById("inputDuracion");
const inputMedios = document.getElementById("inputMedios");
const inputFormato = document.getElementById("inputFormato");
const inputFecha = document.getElementById("inputFecha");

//Estas son las referencias a los botones//
const btnAgregar = document.getElementById("btnAgregar");
const btntBorrarTodo = document.getElementById("btnBorrarTodo");

const divComerciales = document.getElementById("divComerciales");
let alertSinComerciales = document.getElementById("alertSinComerciales");

let indexEditar = null;

class Comercial {
    constructor(nombre, version, duracion, medios, formato, fecha) {
        this.nombre = nombre;
        this.version = version;
        this.duracion = duracion;
        this.medios = medios;
        this.formato = formato;
        this.fecha = fecha;
    }
}
function guardarComercial() {
    let nombre = inputNombre.value;
    let version = inputVersion.value;
    let duracion = inputDuracion.value;
    let medios = inputMedios.value;
    let formato = inputFormato.value;
    let fecha = inputFecha.value;

    let comercial = new Comercial(
        nombre,
        version,
        duracion,
        medios,
        formato,
        fecha
    );
    console.log(comercial);

    if (indexEditar === null) { // comercial nuevo//
        console.log("Agregar comercial");
        comerciales.push(comercial);

    } else { //es un comercial existente que se va a editar//
        comerciales [indexEditar] = comercial;
        indexEditar= null;
        console.log("Editar comercial");
    }
    limpiarFormularioComerciales();
    localStorage.setItem("comerciales", JSON.stringify(comerciales));
    console.log("Entra funcion guardar comercial");
    mostrarComerciales();
}
function borrarTodo() {
    console.log("Entra función borrar todo");
    localStorage.clear();
    comerciales = [];
    mostrarComerciales();
    alert("se borraron todos los datos");
}

function editarComercial(index) {
    console.log("Entra a editar comercial:" + index);
    let comercialAEditar = comerciales [index];
    console.log (comercialAEditar, "comercialAEditar");
    inputNombre.value = comercialAEditar.nombre;
    inputVersion.value = comercialAEditar.version;
    inputDuracion.value = comercialAEditar.duracion;
    inputMedios.value = comercialAEditar.medios;
    inputFormato.value = comercialAEditar.formato;
    inputFecha.value = comercialAEditar.fecha;
    indexEditar=index;
    
}

function eliminarComercial(index) {
    console.log("Entro a eliminar comercial:" + index);
    comerciales.splice(index,1);
    localStorage.setItem ("comerciales", JSON.stringify(comerciales));
    mostrarComerciales();
}

function mostrarComerciales() {
    if (comerciales.length === 0) {
        divComerciales.innerHTML = `
        <div class="alert alert-primary" role="alert" id="alertSinComerciales">
            No hay comerciales agregados
        </div>`;
    } else {
        divComerciales.innerHTML = "";
        comerciales.forEach(({nombre, version, duracion, medios, formato, fecha}, index) => {
            divComerciales.innerHTML += `
            <tr>
            <td> ${nombre}</td>
            <td> ${version}</td>
            <td> ${duracion}</td>
            <td> ${medios}</td>
            <td> ${formato}</td>
            <td> ${fecha}</td>
            <td><button class="btn btn-warning" onclick="editarComercial(${index})">Editar</button></td>
                <td><button class="btn btn-danger"  onclick="eliminarComercial(${index})">Borrar</button></td>  
            </tr>    
            `;
        });
    }
}

function limpiarFormularioComerciales() {
    inputNombre.value = "";
    inputVersion.value = "";
    inputDuracion.value = "";
    inputMedios.value = "";
    inputFormato.value = "";
    inputFecha.value = "";
}
btnAgregar.addEventListener("click", guardarComercial);
btnBorrarTodo.addEventListener("click", borrarTodo);

mostrarComerciales();
