const contenedorProductos = document.getElementById("contenedor-productos")
const contenedorCarrito = document.getElementById("carrito-contenedor")
const botonVaciar = document.getElementById("vaciar-carrito")
const contadorCarrito = document.getElementById("contadorCarrito")
const precioTotal = document.getElementById("precioTotal")

let stockProductos = [
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

let carrito = []

botonVaciar.addEventListener(`click`, () => {
    carrito.length = 0
    actualizarCarrito()
})

stockProductos.forEach((producto) => {
    const div = document.createElement("div")
    div.classList.add ("producto")
    div.innerHTML = `
    <div id="card" class="card productos">
        <a href="#">
            <div class="img-container">
                <img src=${producto.img} alt="">
                <span   span class="promo">${producto.promo}</span>
            </div>
        </a>
            <div class="info-container">
                <h3>${producto.nombre}</h3>
                <p>${producto.desc}</p>
                <strong class="precioProducto">Precio: $${producto.precio}</strong>
                <span class="rating">${producto.rating}</span>
                <button id="agregar${producto.id}" class="boton-agregar">Agregar al carrito</button>
            </div>
    `
    contenedorProductos.appendChild(div)

    const boton = document.getElementById(`agregar${producto.id}`)
    boton.addEventListener(`click`, () => {
        agregarAlCarrito(producto.id)
    })

})

const agregarAlCarrito = (prodId) => {
    const item = stockProductos.find ((prod) => prod.id === prodId)
    carrito.push (item)
    actualizarCarrito()
    console.log(carrito);
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice (indice, 1)
    actualizarCarrito()
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""

    carrito.forEach((prod) => {
        const div = document.createElement("div")
        div.className = (`productoEnCarrito`)
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio: $${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick = "eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fa-solid fa-trash"></i></button>
        `

        contenedorCarrito.appendChild(div)
    })
    contadorCarrito.innerText = carrito.length
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0)
}

