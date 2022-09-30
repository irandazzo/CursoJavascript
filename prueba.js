const contenedorCarrito = document.getElementById("carrito-contenedor");
const borrarItemCarrito = document.getElementById("trash");
const vaciarCarrito = document.getElementById("vaciar-carrito");
const contadorCarrito = document.getElementById("contador");
const contadorCarrito1 = document.getElementById("contador1");
const precioTotal = document.getElementById("precio-total");

let carrito = [];

/* get local storage */
 document.addEventListener('DOMContentLoaded', () =>{
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'));
       actualizarCarrito();
   }
  })

class Producto{
    constructor(id,nombre,tipo, promo, rating, medida, descripcion,precio,img,cantidad){
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.promo = promo;
        this.rating = rating;
        this.medida = medida;
        this.descripcion = descripcion;
        this.precio = precio;
        this.img = img;
        this.cantidad = cantidad;
    }
}

const productos = [];

let producto1 = new Producto(1,'Conjunto Sublime','colchon',"15% OFF", "★★★★☆", "1,40 *1,90", "Conjunto Sublime", 96.199, `./img/conjuntosublime.jpg`);
let producto2 = new Producto(2,'Conjunto Exclusive','colchon',"18% OFF", "★★★☆☆", "1,40 *1,90", "Conjunto Exclusive", 82.699, `./img/conjuntoexclusive.jpg`);
let producto3 = new Producto(3,"Conjunto Támesis",'colchon',"25% OFF","★★★☆☆", "1,40 *1,90", "Conjunto Támesis", 128.399, `./img/conjuntotamesis.jpg`);
let producto4 = new Producto(4,'Conjunto Montreaux','colchon',"30% OFF","★★★★★", "1,40 *1,90", "Conjunto Montreaux", 59.999, `./img/conjuntomontreaux.jpg`);
let producto5 = new Producto(5,'Conjunto Sonno','colchon',"20% OFF","★★★☆☆", "1,40 *1,90", "Conjunto Sonno", 78.999, `./img/conjuntosonno.jpg`);
let producto6 = new Producto(6,'Conjunto Regno','colchon',"25% OFF","★★★★☆", "1,40 *1,90", "Conjunto Regno", 101.899, `./img/conjuntoregno.jpg`);
let producto7 = new Producto(7,'Conjunto Nantes','colchon',"10% OFF","★★★★☆", "1,40 *1,90", "Conjunto Nantes", 76.599, `./img/conjuntonantes.jpg`);
let producto8 = new Producto(8,'Conjunto Princess','colchon',"15% OFF","★★☆☆☆", "1,40 *1,90", "Conjunto Princess", 59.899, `./img/conjuntoprincess.jpg`);
let producto9 = new Producto(9,'Conjunto Doral','colchon',"25% OFF","★★★☆☆", "1,40 *1,90", "Conjunto Doral", 120.999, `./img/conjuntodoral.jpg`);

productos.push(producto1,producto2,producto3,producto4,producto5,producto6,producto7,producto8, producto9);

console.log(productos);

let div = document.getElementById('contenedor-div');


productos.forEach(el=>{
    let productoRenderizado = document.createElement('div');
    productoRenderizado.innerHTML=`
    <div class="my-2 px-2">
        <div class="card wimg" style="width: 15rem;">
            <img src="${el.img}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title text-decoration-underline text-center">${el.nombre}</h5>
                <p class="card-text text-center">${el.descripcion}.</p>
                <p class="card-text text-center ">Precio: $${el.precio}.</p>
                <a href="#" class="btn btn-primary btn-carrito" id="${el.id}">Agregar al carrito</a>
            </div>
        </div>
    </div>
    `
    div.append(productoRenderizado);
    
    const boton = document.getElementById(el.id);

    boton.addEventListener("click", ()=> {
        let productoExiste = carrito.find(item => item.id === el.id);
        console.log(el.id);
        if(productoExiste !== undefined){
            productoExiste.precio = productoExiste.precio + el.precio;
            productoExiste.cantidad = productoExiste.cantidad + 1;
        }else{
            carrito.push({
                id: el.id,
                nombre: el.nombre,
                descripcion: el.descripcion,
                precio: el.precio,
                img: el.img,
                cantidad: el.cantidad +1
            })
            
        }
        actualizarCarrito();    
     console.log(carrito);       
    });

    
})


const actualizarCarrito = () => {

    contenedorCarrito.innerHTML="";
    carrito.forEach(prod =>{
    
    const carritoActualizado = document.createElement("div");
     carritoActualizado.innerHTML =`
     <div class="card mb-3" style="max-width: 600px;">
         <div class="row g-0">
             <div class="col-md-4 align-items-center">
                <img src="${prod.img}" class="img-fluid rounded-start" alt="...">
    </div>
        <div class="col-md-8">
        <div class="card-body card-carrito">
            <h5 class="card-title">${prod.nombre}</h5>
            <p class="card-text">${prod.descripcion}.</p>
            <p class="card-text"><small class="text-muted">Cantidad: ${prod.cantidad}</small></p>
            <p class="card-text"><small class="text-muted">Precio: $${prod.precio}</small></p>
            
            <button id="trash" onclick="borrarItemCarr(${prod.id})"><i class="fas fa-trash-alt mr-3"></i></button>
        </div>
        </div>
    </div>
    </div>
     `
    
    //  <a href="#" class="btn btn-primary btn-sm" id="${prod.id}">Borrar compra</a>
    contenedorCarrito.appendChild(carritoActualizado);
    
     
    })
    localStorage.setItem("carrito", JSON.stringify(carrito));

    contadorCarrito.innerText = carrito.length;
    contadorCarrito1.innerText= carrito.length;
    precioTotal.innerText = carrito.reduce((acum, el) => acum + el.precio,0);
}

const borrarItemCarr = (prod) => {
    const item = carrito.find(el=> el.id === prod.id);
    const indice = carrito.indexOf(item);
    carrito.splice(indice,1);
    actualizarCarrito();
}

vaciarCarrito.addEventListener("click", ()=> {
    carrito.length = 0;
    actualizarCarrito();
})