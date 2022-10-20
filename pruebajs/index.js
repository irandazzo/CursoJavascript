const productos = document.getElementById("productos");
const botonCarrito = document.getElementById("botonCarrito");
const numeroCarrito = document.getElementById("numeroCarrito");
const contenidoCarrito = document.getElementById("contenidoCarrito");
const botonVaciarCarrito = document.getElementById("botonVaciarCarrito");
const formBuscador = document.getElementById("formBuscador");
const botonBuscador = document.getElementById("botonBuscador");
const filtro = document.getElementById("filtro");


    /* Creación de productos */
/* class Conjunto {
    constructor(id, modelo, precio, rating, imagen) {
    this.id = id;
    this.modelo = modelo;
    this.precio = precio;
    this.rating = rating;
    this.imagen = imagen;
    }
} */


/* let conjuntos = []; */

/* const conjunto1 = new Conjunto(1, "Conjunto Sublime", 96199, "★★★★☆",  "./multimedia/conjuntosublime.jpg");
const conjunto2 = new Conjunto(2, "Conjunto Exclusive", 82699, "★★★☆☆", "./multimedia/conjuntoexclusive.jpg");
const conjunto3 = new Conjunto(3, "Conjunto Támesis", 128399, "★★☆☆☆", "./multimedia/conjuntotamesis.jpg");
const conjunto4 = new Conjunto(4, "Conjunto Montreaux", 59999, "★★★★★", "./multimedia/conjuntomontreaux.jpg");
const conjunto5 = new Conjunto(5, "Conjunto Sonno", 78999, "★★★☆☆", "./multimedia/conjuntosonno.jpg");
const conjunto6 = new Conjunto(6, "Conjunto Regno", 101899, "★★★★☆", "./multimedia/conjuntoregno.jpg");
const conjunto7 = new Conjunto(7, "Conjunto Nantes", 76599, "★★★★☆", "./multimedia/conjuntonantes.jpg");
const conjunto8 = new Conjunto(8, "Conjunto Princess", 59899, "★★☆☆☆", "./multimedia/conjuntoprincess.jpg");
const conjunto9 = new Conjunto(9, "Conjunto Doral", 120999, "★★★☆☆", "./multimedia/conjuntodoral.jpg");
 */

/* conjuntos.push(conjunto1, conjunto2, conjunto3, conjunto4, conjunto5, conjunto6, conjunto7, conjunto8, conjunto9);
    switch (filtro?.value) {
        case "recientemente":
        conjuntos.sort((a, b) => b.id - a.id);
        break;
        case "mayor":
        conjuntos.sort((a, b) => b.precio - a.precio);
        break;
        case "menor":
        conjuntos.sort((a, b) => a.precio - b.precio);
        break;
    }
 */
/* Renderizar Productos */
const renderizarProductos = async () =>{
  let results = await fetch("../conjuntos/conjuntos.json");
  let conjuntos = await results.json();


  /* Filtro */
/*   switch (filtro?.value) {
    case "recientemente":
    conjuntos.sort((a, b) => b.id - a.id);
    break;
    case "mayor":
    conjuntos.sort((a, b) => b.precio - a.precio);
    break;
    case "menor":
    conjuntos.sort((a, b) => a.precio - b.precio);
    break;
} */

conjuntos.forEach(item => {
  let article = document.createElement("article");
  article.classList="mx-auto"
  article.innerHTML = `
  <div class="card text-center m-3" style="width: 18rem;">
    <img src="${item.imagen}" class="imgConjuntos mt-3 mx-auto" alt="${item.modelo}">
    <div class="card-body">
        <h5 class="card-title">${item.modelo}</h5>
        <h5 class="card-title">${item.rating}</h5>
        <h5 class="card-precio">$${item.precio}</h5>
        <button type="button" id="${"btnAgregarCarrito" + item.id}" class="btn btn-primary btn-agregarCarrito">Agregar al carrito</button>
    </div>
  </div>
  `
  productos?.append(article);
  let botonAgregarACarrito = document.getElementById("btnAgregarCarrito" + item.id);
  botonAgregarACarrito?.addEventListener("click", () => agregarACarrito(item));
})
}

/* const renderizarProductos = (prods) => {
    prods.forEach(item => {
        let article = document.createElement("article");
        article.innerHTML = `
            <div class="card text-center m-3" style="width: 18rem;">
                <img src="${item.imagen}" class="imgConjuntos mt-3 mx-auto" alt="${item.modelo}">
                <div class="card-body">
                    <h5 class="card-title">${item.modelo}</h5>
                    <h5 class="card-title">${item.rating}</h5>
                    <h5 class="card-precio">$${item.precio}</h5>
                    <button type="button" id="${"btnAgregarCarrito" + item.id}" class="btn btn-primary btn-agregarCarrito">Agregar al carrito</button>
                </div>
            </div>
                `
        productos?.append(article);
        let botonAgregarACarrito = document.getElementById("btnAgregarCarrito" + item.id);
        botonAgregarACarrito?.addEventListener("click", () => agregarACarrito(item));
        
    })
}
 */

    /* Agregar al carrito */
const agregarACarrito = producto => {
    let productoExiste = carritoStorage.find(item => item.id === producto.id);
    if (!productoExiste) {
    carritoStorage.push({
        id: producto.id,
        modelo: producto.modelo,
        precioUnitario: producto.precio,
        cantidad: 1,
        subtotal: producto.precio,
        imagen: producto.imagen,
    })
    } else {
    productoExiste.cantidad++;
    productoExiste.subtotal += productoExiste.precioUnitario;
    }
    localStorage.setItem("carritoStorage", JSON.stringify(carritoStorage));
    localStorage.setItem("numeroCarritoStorage", JSON.stringify(parseInt(numeroCarrito.innerHTML) + 1));
    numeroCarrito.innerHTML = JSON.parse(localStorage.getItem("numeroCarritoStorage"));
    renderizarCarrito();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  }
  
  /* Renderizar Carrito */
  const renderizarCarrito = () => {
    contenidoCarrito.innerHTML = "";
    carritoStorage.forEach(item => {
      let article = document.createElement("article");
      article.innerHTML = `
      <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4 d-flex">
            <img src="${item.imagen}" class="img-fluid align-self-center" alt="${item.marca} ${item.modelo}">
          </div>
          <div class="col-md-7">
            <div class="card-body">
              <h5 class="card-title">${item.modelo}</h5>
              <span>Precio: $${item.precioUnitario}</span>
              <div class="d-flex align-items-center my-1">
                <span>Cantidad: ${item.cantidad}</span>
                <div>
                  <button id="${"btnRestar" + item.id}" class="btn btn-outline-danger ms-2 rounded-5">-</button>
                  <button id="${"btnSumar" + item.id}" class="btn btn-outline-success rounded-5">+</button>
                </div>
              </div>
              <span class="fw-bold">Subtotal: $${item.subtotal}</span>
            </div>
          </div>
          <div class="col-md-1">
            <button id="${"btnQuitar" + item.id}" class="mt-3 btn btn-warning p-1 rounded-5"><i class="fa fa-trash"></i></button>
          </div>
        </div>
      </div>
      `
      contenidoCarrito.append(article);
      let botonRestarItemCarrito = document.getElementById("btnRestar" + item.id);
      let botonSumarItemCarrito = document.getElementById("btnSumar" + item.id);
      let botonQuitarItemCarrito = document.getElementById("btnQuitar" + item.id);
      botonRestarItemCarrito.addEventListener("click", () => restarItemCarrito(item));
      botonSumarItemCarrito.addEventListener("click", () => sumarItemCarrito(item));
      botonQuitarItemCarrito.addEventListener("click", () => quitarItemCarrito(item));

    })
    if (parseInt(numeroCarrito.innerHTML) != 0) {
      botonVaciarCarrito.style.display = "inline";
    }
    let totalCompra = document.createElement("div");
    let resultado = carritoStorage.reduce((acc, elem) => acc + elem.subtotal, 0);
    totalCompra.innerHTML = `<h5 class="fw-bold text-center">Total: $${resultado} </h5>`
    contenidoCarrito.append(totalCompra);
    if(carritoStorage.length === 0){
      contenidoCarrito.innerHTML = "<h3>Su carrito está vacío</h3>";
      botonVaciarCarrito.style.display ="none";
    }
  }
  
  /* Vaciar carrito */
  const vaciarCarrito = () => {
    Swal.fire({
      title: 'Desea vaciar su carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, vaciarlo',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: () => {
        const popup = Swal.getPopup()
        popup.classList.remove('swal2-show')
        setTimeout(() => {
          popup.classList.add('animate__animated', 'animate__headShake')
        })
        setTimeout(() => {
          popup.classList.remove('animate__animated', 'animate__headShake')
        }, 500)
        return false
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '',
          'Su carrito ha sido vaciado',
          'success'
        )
        localStorage.removeItem("carritoStorage");
        localStorage.setItem("numeroCarritoStorage", 0)
        contenidoCarrito.innerHTML = `<h3>Su carrito está vacío</h3>`
        carritoStorage = [];
        numeroCarrito.innerHTML = 0;
        botonVaciarCarrito.style.display = "none";
      }
    })
  }
  
  /* Buscar Productos */
  const buscarProductos = (prod) => {
    if(window.location.pathname === "/index.html"){
      window.location.href= "./PAGES/products.html";
    }
    let buscado = conjuntos.filter(conj => (`${conj.marca} ${conj.modelo}`).toLowerCase().includes(prod));
    productos.innerHTML= "";
    renderizarProductos(buscado);
    console.log(buscado);
  }
  
  /* Ordenar Productos */
  const ordenarProductos = (prods, orden) => {
    switch (orden) {
      case "recientemente":
        prods.sort((a, b) => b.id - a.id);
        break;
      case "mayor":
        prods.sort((a, b) => b.precio - a.precio);
        break;
      case "menor":
        prods.sort((a, b) => a.precio - b.precio);
        break;
    }
    productos.innerHTML = "";
    renderizarProductos(prods);
  }
  
  /* Sumar Item Carrito*/
  const sumarItemCarrito = (producto) => {
    producto.cantidad ++;
    producto.subtotal += producto.precioUnitario;
    localStorage.setItem("numeroCarritoStorage", JSON.stringify(parseInt(numeroCarrito.innerHTML) + 1));
    localStorage.setItem("carritoStorage",JSON.stringify(carritoStorage));
    numeroCarrito.innerHTML = JSON.parse(localStorage.getItem("numeroCarritoStorage"));
    renderizarCarrito();
  }
  
  /* Restar Item Carrito */
  const restarItemCarrito = (producto) => {
    if (producto.cantidad > 1){
      producto.cantidad --;
      producto.subtotal -= producto.precioUnitario;
      localStorage.setItem("carritoStorage",JSON.stringify(carritoStorage));
      localStorage.setItem("numeroCarritoStorage", JSON.stringify(parseInt(numeroCarrito.innerHTML) - 1));
      numeroCarrito.innerHTML = JSON.parse(localStorage.getItem("numeroCarritoStorage"));
      renderizarCarrito();
    }
  }
  
  /* Quitar Item Carrito */
  const quitarItemCarrito = (producto) => {
    let indice = carritoStorage.indexOf(producto);
    localStorage.setItem("numeroCarritoStorage",JSON.stringify(parseInt(numeroCarrito.innerHTML) - producto.cantidad));
    numeroCarrito.innerHTML = JSON.parse(localStorage.getItem("numeroCarritoStorage"));
    carritoStorage.splice(indice,1);
    localStorage.setItem("carritoStorage",JSON.stringify(carritoStorage));
    renderizarCarrito();
    Swal.fire({
        title: 'Sweet!',
        text: 'Modal with a custom image.',
        imageUrl: 'https://unsplash.it/400/200',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
  }

  /* Acceso al localStorage */
let numeroCarritoStorage = JSON.parse(localStorage.getItem("numeroCarritoStorage"));
let carritoStorage = JSON.parse(localStorage.getItem("carritoStorage")) || [];

/* Inicialización del carrito */
numeroCarritoStorage ? numeroCarrito.innerHTML = numeroCarritoStorage : numeroCarrito.innerHTML = 0;

renderizarCarrito();

if (parseInt(numeroCarrito.innerHTML) === 0) {
  botonVaciarCarrito.style.display = "none";
}

/* Renderizado de Productos */
renderizarProductos();


/* Evento vaciar carrito */
botonVaciarCarrito.addEventListener("click", vaciarCarrito);

/* Buscador */
botonBuscador.addEventListener("click", () => buscarProductos(formBuscador.value.toLowerCase()));

formBuscador.addEventListener("keypress", (e) => {
  if (e.code === "Enter") {
    e.preventDefault();
    buscarProductos(formBuscador.value.toLowerCase());
  }
});

/* Ordenador */
filtro?.addEventListener("change",() => ordenarProductos(conjuntos,filtro.value));
