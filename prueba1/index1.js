let contenedor = document.getElementById("contenedor");
let contenedorCarrito = document.getElementById("contenedorCarrito");
let botonCompra = document.getElementById("carritoCompra");
let botonVaciar = document.getElementById("vaciar-carrito");
let contadorCarrito = document.getElementById("contador-carrito");
let precioTotal = document.getElementById("precio-total");
let carrito = [];

const stockProductos = [
    {id: 1, nombre: "Conjunto Sublime", tipo: "colchon", promo: "15% OFF", rating: "★★★★☆", cantidad: 1, desc: "Conjunto Sublime", medida: "1,40 * 1,90", precio: 96.199, img: `./multimedia/conjuntosublime.png`},
    {id: 2, nombre: "Conjunto Exclusive", tipo: "colchon", promo: "18% OFF", rating: "★★★☆☆", cantidad: 1, desc: "Conjunto Exclusive", medida: "1,40 * 1,90", precio: 82.699, img: `./multimedia/conjuntoexclusive.png`},
    {id: 3, nombre: "Conjunto Támesis", tipo: "colchon", promo: "25% OFF", rating: "★★☆☆☆", cantidad: 1, desc: "Conjunto Támesis", medida: "1,40 * 1,90", precio: 128.399, img: `./multimedia/conjuntotamesis.png`},
    {id: 4, nombre: "Conjunto Montreaux", tipo: "colchon", promo: "30% OFF", rating: "★★★★★", cantidad: 1, desc: "Conjunto Montreaux", medida: "1,40 * 1,90", precio: 59.999, img: `./multimedia/conjuntomontreaux.png`},
    {id: 5, nombre: "Conjunto Sonno", tipo: "colchon", promo: "20% OFF", rating: "★★★☆☆", cantidad: 1, desc: "Conjunto Sonno", medida: "1,40 * 1,90", precio: 78.999, img: `./multimedia/conjuntosonno.png`},
    {id: 6, nombre: "Conjunto Regno", tipo: "colchon", promo: "25% OFF", rating: "★★★★☆", cantidad: 1, desc: "Conjunto Regno", medida: "1,40 * 1,90", precio: 101.899, img: `./multimedia/conjuntoregno.png`},
    {id: 7, nombre: "Conjunto Nantes", tipo: "colchon", promo: "10% OFF", rating: "★★★★☆", cantidad: 1, desc: "Conjunto Nantes", medida: "1,40 * 1,90", precio: 76.599, img: `./multimedia/conjuntonantes.png`},
    {id: 8, nombre: "Conjunto Princess", tipo: "colchon", promo: "15% OFF", rating: "★★☆☆☆", cantidad: 1, desc: "Conjunto Princess", medida: "1,40 * 1,90", precio: 59.899, img: `./multimedia/conjuntoprincess.png`},
    {id: 9, nombre: "Conjunto Doral", tipo: "colchon", promo: "25% OFF", rating: "★★★☆☆", cantidad: 1, desc: "Conjunto Doral", medida: "1,40 * 1,90", precio: 120.999, img: `./multimedia/conjuntodoral.png`},
] 

document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"))
        actualizarCarrito();
    }
})
botonVaciar.addEventListener("click", () =>{
    carrito.length = 0;
    actualizarCarrito();
    carrito = JSON.parse(localStorage.getItem("carrito"));
    localStorage.clear("carrito");
    Toastify({
        text: "Carrito vaciado",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right", 
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #D0312D, #D0312D)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
});
stockProductos.forEach(item => {
    let productos = document.createElement("div");
    productos.className = "container-card col-xs-12 col-md-6 col-lg-4 my-3";
    productos.innerHTML = `
        <img src="${item.img}" alt="" class="image img-index" style="width:100%">
        <h4 class="card-titulo text-center">${item.nombre}</h4>
        <h5 class="card-titulo">$${item.precio}</h5>
        <span class="rating">${item.rating}</span>
        <div>
            <button id="${item.id}" class="btn-comprar">Agregar al Carrito</button>
        </div>
    `
    contenedor.append(productos)
    let boton = document.getElementById(item.id);
    boton.addEventListener("click", () => {
        agregarAlCarrito(item.id);
    })
});
const agregarAlCarrito = (prodId) => {
    const existe = carrito.some( prod => prod.id === prodId)
    if(existe){
        const prod = carrito.map(prod => {
            if(prod.id === prodId){
                prod.cantidad++
                prod.precio += prod.precio
            }
        })
    }else{
        let item = stockProductos.find((prod) => prod.id === prodId);
        carrito.push({
            id: item.id,
            nombre: item.nombre,
            precio: item.precio,
            cantidad : 1
        });
    }
    actualizarCarrito();
}
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId);
    const indice = carrito.indexOf(item);
    carrito.splice(indice, 1);
    actualizarCarrito();
    
}
const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach((prod) => {
        const div = document.createElement("div");
        div.className = "";
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick = "eliminarDelCarrito(${prod.id})" class="btn btn-outline-danger">Elminar <i class="fa-solid fa-trash"></i></button>
        `
        contenedorCarrito.append(div);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        Toastify({
            text: "Agregado al Carrito",
            duration: 1000,
            close: true,
            gravity: "bottom",
            position: "left",
            stopOnFocus: true,
            style: {
              background: "linear-gradient(to right, #006f48, #006f48)",
            },
            onClick: function () { }
          }).showToast();
    });

    contadorCarrito.innerText = carrito.length;
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0);
}


document.getElementById("icon-menu").addEventListener("click", mostrar_menu);

function mostrar_menu(){

    document.getElementById("move-content").classList.toggle('move-container-all');
    document.getElementById("show-menu").classList.toggle('show-lateral');
}








                            //Buscador de contenido


//Ejecutando funciones
document.getElementById("icon-search").addEventListener("click", mostrar_buscador);
document.getElementById("cover-ctn-search").addEventListener("click", ocultar_buscador);

//Declarando variables
bars_search =       document.getElementById("ctn-bars-search");
cover_ctn_search =  document.getElementById("cover-ctn-search");
inputSearch =       document.getElementById("inputSearch");
box_search =        document.getElementById("box-search");


//Funcion para mostrar el buscador
function mostrar_buscador(){

    bars_search.style.top = "80px";
    cover_ctn_search.style.display = "block";
    inputSearch.focus();

    if (inputSearch.value === ""){
        box_search.style.display = "none";
    }

}

//Funcion para ocultar el buscador
function ocultar_buscador(){

    bars_search.style.top = "-10px";
    cover_ctn_search.style.display = "none";
    inputSearch.value = "";
    box_search.style.display = "none";

}


//Creando filtrado de busqueda

document.getElementById("inputSearch").addEventListener("keyup", buscador_interno);

function buscador_interno(){


    filter = inputSearch.value.toUpperCase();
    li = box_search.getElementsByTagName("li");

    //Recorriendo elementos a filtrar mediante los "li"
    for (i = 0; i < li.length; i++){

        a = li[i].getElementsByTagName("a")[0];
        textValue = a.textContent || a.innerText;

        if(textValue.toUpperCase().indexOf(filter) > -1){

            li[i].style.display = "";
            box_search.style.display = "block";

            if (inputSearch.value === ""){
                box_search.style.display = "none";
            }

        }else{
            li[i].style.display = "none";
        }

    }



}

