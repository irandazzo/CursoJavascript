const div = document.getElementById("div")



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

stockProductos.forEach(producto =>{
    let productoRenderizado = document.createElement("div") 
    productoRenderizado.innerHTML = `
    <div id="card" class="card" style="width: 18rem">
        <img src="${producto.img}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">Precio: $${producto.precio}</p>
            </div>
            <button>Comprar</button>
    </div>
    `
    div.append(productoRenderizado)

})