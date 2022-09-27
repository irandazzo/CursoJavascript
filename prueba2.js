let stockProductos = [
    {id: 1, nombre: "Conjunto Sublime", tipo: "colchon", cantidad: 1, desc: "Conjunto Sublime", medida: "1,40 * 1,90", precio: 96199, img: `./multimedia/conjuntosublime.png`},
    {id: 2, nombre: "Conjunto Exclusive", tipo: "colchon", cantidad: 1, desc: "Conjunto Exclusive", medida: "1,40 * 1,90", precio: 82699, img: `./multimedia/conjuntoexclusive.png`},
    {id: 3, nombre: "Conjunto Támesis", tipo: "colchon", cantidad: 1, desc: "Conjunto Támesis", medida: "1,40 * 1,90", precio: 128399, img: `./multimedia/conjuntotamesis.png`},
    {id: 4, nombre: "Conjunto Montreaux", tipo: "colchon", cantidad: 1, desc: "Conjunto Montreaux", medida: "1,40 * 1,90", precio: 59999, img: `./multimedia/conjuntomontreaux.png`},
    {id: 5, nombre: "Conjunto Sonno", tipo: "colchon", cantidad: 1, desc: "Conjunto Sonno", medida: "1,40 * 1,90", precio: 78999, img: `./multimedia/conjuntosonno.png`},
    {id: 6, nombre: "Conjunto Regno", tipo: "colchon", cantidad: 1, desc: "Conjunto Regno", medida: "1,40 * 1,90", precio: 101899, img: `./multimedia/conjuntoregno.png`},
    {id: 7, nombre: "Conjunto Nantes", tipo: "colchon", cantidad: 1, desc: "Conjunto Nantes", medida: "1,40 * 1,90", precio: 76599, img: `./multimedia/conjuntonantes.png`},
    {id: 8, nombre: "Conjunto Princess", tipo: "colchon", cantidad: 1, desc: "Conjunto Princess", medida: "1,40 * 1,90", precio: 59899, img: `./multimedia/conjuntoprincess.png`},
    {id: 9, nombre: "Conjunto Doral", tipo: "colchon", cantidad: 1, desc: "Conjunto Doral", medida: "1,40 * 1,90", precio: 120999, img: `./multimedia/conjuntodoral.png`},
]

const contenedorProductos = document.getElementById(`contenedor-productos`)
const contenedorCarrito = document.getElementById(`carrito-contenedor`)

let carrito = [];

stockProductos.forEach((producto) => {
    const div = document.createElement(`div`)
    div.classList.add (`producto`)
    div.innerHTML = `
    <img src=${producto.img} alt="">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p>Medida: ${producto.medida}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar</button>
    `
    contenedorProductos.appendChild(div)

    const boton = document.getElementById(`agregar${producto.id}`)
    boton.addEventListener(`click`, () =>{
        agregarAlCarrito(producto.id)
    })
})

const agregarAlCarrito = (prodId) => {
    const item = stockProductos.find((prod) => prod.id === prodId)
    carrito.push (item)
    actualizarCarrito()
    console.log(carrito);
}
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
}


const actualizarCarrito = () => {
    contenedorCarrito.innerHTML =""
    
    carrito.forEach((prod) =>{
        const div = document.createElement(`div`)
        div.className = (`productoEnCarrito`)
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio: ${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick = "eliminarDelCarrito(${prod.id})" class="boton-eliminar"></button>
        `
        contenedorCarrito.appendChild(div)
    })
}
//<i class="fas fa-shopping-cart"</i>