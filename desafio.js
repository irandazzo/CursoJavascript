const div = document.getElementById("div")
const boton = document.getElementById("boton")


let stockProductos = [
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

stockProductos.forEach(producto =>{
    let productoRenderizado = document.createElement("div") 
    productoRenderizado.innerHTML = `
    <div id="card" class="card productos">
          <a href="#">
            <div class="img-container">
              <img src="${producto.img}" alt="">
              <span class="promo">${producto.promo}</span>
            </div>
          </a>
          <div class="info-container">
            <h3>${producto.nombre}</h3>
            <strong>$ ${producto.precio}</strong>
            <span class="rating">${producto.rating}</span>
            <button id=${producto.id}class="btn-comprar">Comprar</button>
          </div>
        </div>
    `
    div.append(productoRenderizado)
    const boton = document.getElementById (producto.id)
    boton.addEventListener("click", () => comprarProducto (producto))
})

const comprarProducto = (producto) => {
  let productoExiste = carrito.find (item => item.id === producto.id)
  if (productoExiste !== undefined){
    productoExiste.precio = productoExiste.precio + producto.precio
    productoExiste.cantidad = productoExiste.cantidad + 1
  }else{
    carrito.push({
      id: producto.id,
      nombre:producto.nombre,
      precio: producto.precio,
      img: producto.img,
      cantidad: 1
    })
  }
}

/* boton.addEventListener("click", () => console.log(carrito)); */