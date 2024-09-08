var tPresupuesto = parseInt(localStorage.getItem("presupuesto"));
var gastos = JSON.parse(localStorage.getItem("gastos")) || [];
var divPresupuesto = document.querySelector('#divPresupuesto');
var presupuesto = document.querySelector('#presupuesto');
var btnPresupuesto = document.querySelector('#btnPresupuesto');
var divGastos = document.querySelector('#divGastos');
var progress = document.querySelector("#progress");
var tGastos = 0;
var disponible = 0;
var Tcomidaa = 0;

var comida = JSON.parse(localStorage.getItem("comida")) || [];




const guardarGasto = () => {
    gastos = JSON.parse(localStorage.getItem("gastos")) || [];
    comida = JSON.parse(localStorage.getItem("comida")) || [];

    let descripcion = document.getElementById("descripcion").value;
    let costo = parseInt(document.getElementById("costo").value);
    let categoria = document.getElementById("categoria").value;
    if (descripcion.trim() == "" || document.getElementById("costo").value.trim() === "" || costo <= 0 || categoria == "todos") {
        Swal.fire({ icon: "error", title: "ERROR", text: "Datos incorrectos maall" });
        return;
    }

    const gasto = { categoria, descripcion, costo }
    gastos.push(gasto);
    localStorage.setItem("gastos", JSON.stringify(gastos));

    mostrarGastos();

}


const mostrarGastos = () => {

    let gastos = JSON.parse(localStorage.getItem("gastos")) || [];
    let gastosHTML = ``;
    let tGastos = 0;
    let Tcomidaa = 0;
var total = 0;
    gastos.forEach((gasto, index) => {
        if (gasto.categoria === "Ejercicio") {
            gastosHTML += `
            <div class="card text-center w-100 m-auto mt-3 p-2">
                <div class="row">
                    <div class="col text-start">
                        <p><b>Categoria:</b> <small>${gasto.categoria}</small></p> 
                        <p><b>Descripcion:</b> <small>${gasto.descripcion}</small></p>            
                        <p><b>Costo:</b> <small>${parseInt(gasto.costo).toFixed(2)}</small></p>
                    </div>
                    <div class="col">
                        <button class="btn btn-outline-primary" onclick="cargarGasto(${index})" data-bs-toggle="modal" data-bs-target="#editarGasto" >Editar</button>
                        <button class="btn btn-outline-danger" onclick="deleteGasto(${index})">DEL</button>
                    </div>
                </div>
            </div>`;
            tGastos += parseInt(gasto.costo);
        } else if (gasto.categoria === "comida") {
            gastosHTML += `
            <div class="card text-center w-100 m-auto mt-3 p-2">
                <div class="row">
                    <div class="col text-start">
                        <p><b>Categoria:</b> <small>${gasto.categoria}</small></p> 
                        <p><b>Descripcion:</b> <small>${gasto.descripcion}</small></p>            
                        <p><b>Costo:</b> <small>${parseInt(gasto.costo).toFixed(2)}</small></p>
                    </div>
                    <div class="col">
                        <button class="btn btn-outline-primary" onclick="cargarGasto(${index})" data-bs-toggle="modal" data-bs-dismiss="modal" data-bs-target="#editarGasto" >Editar</button>
                        <button class="btn btn-outline-danger" onclick="deleteGasto(${index})">DEL</button>
                    </div>
                </div>
            </div>`;
            Tcomidaa += parseInt(gasto.costo);

        }
     

    });

    // Mostrar los totales en el DOM
    if (tGastos > 0) {
        let totalGastos = document.querySelector("#TEje");
        totalGastos.innerHTML = `${tGastos.toFixed(2)} C`;
    }

    if (Tcomidaa > 0) {
        let totalComida = document.querySelector("#Tcomida");
        totalComida.innerHTML = `${Tcomidaa.toFixed(2)} C`;
    }

    let comparacion = document.querySelector("#Consumidas");
        if (Tcomidaa > tGastos) {
            comparacion.innerHTML = `${(Tcomidaa-tGastos).toFixed(2)} C`;
        } else if (Tcomidaa < tGastos) {
            comparacion.innerHTML = `${(Tcomidaa-tGastos).toFixed(2)} C`;
        } else {
            comparacion.innerHTML = `${(0).toFixed(2)} C`;
        }
 

        let comparacion1 = document.querySelector("#comparacion");
        if (Tcomidaa > tGastos) {
            comparacion1.innerHTML = `<p>Los gastos en comida son</p> <p>mayores que los gastos en ejercicio.</p>`;
        } else if (Tcomidaa < tGastos) {
            comparacion1.innerHTML = "<p>Los gastos en ejercicio son</p> <p>mayores que los gastos en comida.</p>";
        } else {
            comparacion1.innerHTML = "<p>Los gastos en</p><p> comida y ejercicio son iguales.</p>";
        }

    let gastosContainer = document.querySelector("#listaGastos");
    gastosContainer.innerHTML = gastosHTML;


       

}

  


const reset = () => {
    Swal.fire({
        title: " Esta seguro de salir??",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "SI",
        denyButtonText: `NO`,
        cancelButtonColor: "#dc3545",
        confirmButtonColor: "#198754",
        denyButtonColor: "#dc3545",
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            inicio();
        }

    });



}



const actualizarGasto2 = () => {
    comida = JSON.parse(localStorage.getItem("comida")) || [];

    let descripcion = document.getElementById("edescripcion2").value;
    let costo = parseInt(document.getElementById("ecosto2").value);
    let categoria = document.getElementById("ecategoria2").value;

    let index = parseInt(document.getElementById("eindex2").value);
    if (descripcion.trim() == "" || costo <= 0) {
        Swal.fire({ icon: "error", title: "mal", text: "Datos incorrectos" });
        return;

    }
    comida[index].descripcion = descripcion;
    comida[index].costo = costo;
    comida[index].categoria = categoria;
    if (categoria == "Ejercicio") {
        localStorage.setItem("gastos", JSON.stringify(gastos))
    }


    localStorage.setItem("comida", JSON.stringify(comida));
    bootstrap.Modal.getInstance(document.getElementById("editarGasto2")).hide();
    comida.splice(index, 1)
    mostrarGastos();
}

const cargarGasto2 = (index) => {
    var comic = comida[index];
    document.getElementById("edescripcion2").value = comic.descripcion;
    document.getElementById("ecosto2").value = comic.costo;
    document.getElementById("ecategoria2").value = comic.categoria;
    document.getElementById("eindex2").value = index;
}






const actualizarGasto = () => {
    gastos = JSON.parse(localStorage.getItem("gastos")) || [];

    let descripcion = document.getElementById("edescripcion").value;
    let costo = parseInt(document.getElementById("ecosto").value);
    let categoria = document.getElementById("ecategoria").value;
    let index = parseInt(document.getElementById("eindex").value);
    if (descripcion.trim() == "" || costo <= 0) {
        Swal.fire({ icon: "error", title: "mal", text: "Datos incorrectos" });
        return;

    }

    gastos[index].descripcion = descripcion;
    gastos[index].costo = costo;
    gastos[index].categoria = categoria
    if (categoria == "comida") {
        localStorage.setItem("gastos", JSON.stringify(comida))
    }
    localStorage.setItem("gastos", JSON.stringify(gastos));
    bootstrap.Modal.getInstance(document.getElementById("editarGasto")).hide();
    gastos.splice(index, 1)
    mostrarGastos();
}

const cargarGasto = (index) => {
    var gasto = gastos[index];
    document.getElementById("edescripcion").value = gasto.descripcion;
    document.getElementById("ecosto").value = gasto.costo;
    document.getElementById("ecategoria").value = gasto.categoria;
    document.getElementById("eindex").value = index;
}

const deleteGasto = (index) => {
    Swal.fire({
        title: " Esta seguro de Eliminar?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "SI",
        denyButtonText: `NO`,
        cancelButtonColor: "#dc3545",
        confirmButtonColor: "#198754",
        denyButtonColor: "#dc3545",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("Eliminado", "", "success");
            gastos.splice(index, 1)
            localStorage.setItem("gastos", JSON.stringify(gastos));
            mostrarGastos();
            reinicia();
        }

    });
}

const deleteGasto2 = (index) => {
    Swal.fire({
        title: " Esta seguro de Eliminar?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "SI",
        denyButtonText: `NO`,
        cancelButtonColor: "#dc3545",
        confirmButtonColor: "#198754",
        denyButtonColor: "#dc3545",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("Eliminado", "", "success");
            comida.splice(index, 1)
            localStorage.setItem("comida", JSON.stringify(comida));
            mostrarGastos();
            reinicia();
        }

    });
}

const reinicia=()=>{
    location.reload()
}
