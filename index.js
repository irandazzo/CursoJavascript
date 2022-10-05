let contenedor = document.getElementById("contenedor");
let contenedorCarrito = document.getElementById("contenedorCarrito");
let botonCompra = document.getElementById("carritoCompra");
let botonVaciar = document.getElementById("vaciar-carrito");
let contadorCarrito = document.getElementById("contador-carrito");
let precioTotal = document.getElementById("precio-total");
let carrito = [];

const productosIndex = [
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
});
productosIndex.forEach(item => {
    let productos = document.createElement("div");
    productos.className = "container-card col-xs-12 col-md-6 col-lg-4 my-3";
    productos.innerHTML = `
        <img src="${item.img}" alt="Avatar" class="image img__index"
            style="width:100%">
        <h4 class="card-titulo text-center">${item.nombre}</h4>
        <h5 class="card-titulo">$${item.precio}</h5>
        <span class="rating">${item.rating}</span>
        <div class="middle">
            <button id="${item.id}" class="btn-comprar">Comprar</button>
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
        let item = productosIndex.find((prod) => prod.id === prodId);
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
    });

    contadorCarrito.innerText = carrito.length;
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0);
}

