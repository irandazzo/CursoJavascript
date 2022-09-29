const div = document.getElementById("div")
const boton = document.getElementById("boton")
const inputAfter = document.getElementById("inputAfter")
const botonInput = document.getElementById("botonInput")
const formulario = document.getElementById ("formulario")

let producto = [
    {id: 1, nombre: "Conjunto Sublime", tipo: "colchon", promo: "15% OFF", rating: "★★★★☆", cantidad: 1, descr: "Conjunto Sublime", medida: "1,40 * 1,90", precio: 96.199, img: `./multimedia/conjuntosublime.png`},
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
let emails = []


producto.forEach(producto =>{
    let productoRenderizado = document.createElement("div")
    productoRenderizado.innerHTML = `
    <div class="card" style="width: 18rem;">
    <img src="${producto.img}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${producto.nombre}</h5>
    <p class="card-text">Precio: $${producto.precio}</p>
    <button id=${producto.id}>Comprar</button>
    </div>
</div>
    `
    div.append(productoRenderizado)
    const boton = document.getElementById(producto.id)
    boton.addEventListener("click", () => comprarProducto (producto))
})

comprarProducto = (producto) => {
    console.log(producto.id);
    let productoExiste = carrito.find (item => item.id === producto.id)
    console.log(productoExiste);
    if (productoExiste !== undefined){
        productoExiste.precio = productoExiste.precio + producto.precio
        productoExiste.cantidad = productoExiste.cantidad + 1
    }else{
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.img,
            cantidad: 1
        
    })
}
const buscarProducto = (string) => {
    console.log(string)
    let productoBuscado = producto.find (producto => producto.nombre.includes(string))
    console.log(productoBuscado);
    inputAfter.value = ''
}


}

const guardarEmail = (e) =>{
    e.preventDefault()
    let direccion = e.target.children[0].value;
    let mensaje = e.target.children[1].value
    emails.push({
        direccion: direccion,
        mensaje: mensaje
    })
    console.log(emails);
}

formulario.addEventListener("submit", (e) => guardarEmail (e))

boton.addEventListener("click", () => console.log(carrito))


botonInput.addEventListener("click", () => console.log((inputAfter.value)))

// BUSCADOR INTERACTIVO
// inputAfter.addEventListener("input", () => console.log((inputAfter.value)))