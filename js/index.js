const productos = document.getElementById("productos");
const botonCarrito = document.getElementById("botonCarrito");
const numeroCarrito = document.getElementById("numeroCarrito");
const contenidoCarrito = document.getElementById("contenidoCarrito");
const botonVaciarCarrito = document.getElementById("botonVaciarCarrito");
/* const formBuscador = document.getElementById("formBuscador"); */
/* const botonBuscador = document.getElementById("botonBuscador"); */
const ordenador = document.getElementById("ordenador");
const pagar = document.getElementById("botonPagar")

/* Renderizar Productos */
const renderizarProductos = async () =>{
  let results = await fetch("../conjuntos/conjuntos.json");
  let conjuntos = await results.json();


  /* Filtro */
  switch (ordenador?.value) {
    case "reciente":
    conjuntos.sort((a, b) => b.id - a.id);
    break;
    case "mayorMenor":
    conjuntos.sort((a, b) => b.precio - a.precio);
    break;
    case "menorMayor":
    conjuntos.sort((a, b) => a.precio - b.precio);
    break;
}

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
      title: 'Agregado al Carrito',
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
      window.location.href= "../conjuntos/conjuntos.json";
    }
    let buscado = conjuntos.filter(conj => (`${conj.modelo}`).toLowerCase().includes(prod));
    productos.innerHTML= "";
    renderizarProductos(buscado);
    console.log(buscado);
  }
  
  /* Ordenar Productos */
  const ordenarProductos =  async orden => {
    try{
    let result = await fetch ("../conjuntos/conjuntos.json")
    let prods = await result.json();
    switch (orden) {
      case "reciente":
        prods.sort((a, b) => b.id - a.id);
        break;
      case "mayorMenor":
        prods.sort((a, b) => b.precio - a.precio);
        break;
      case "menorMayor":
        prods.sort((a, b) => a.precio - b.precio);
        break;
    }
    productos.innerHTML = "";
    renderizarProductos();
  } catch (error) {
    console.log(error);
  }
}
  
/*     switch (orden) {
      case "reciente":
        prods.sort((a, b) => b.id - a.id);
        break;
      case "mayorMenor":
        prods.sort((a, b) => b.precio - a.precio);
        break;
      case "menorMayor":
        prods.sort((a, b) => a.precio - b.precio);
        break;
    }
    productos.innerHTML = "";
    renderizarProductos();
  } */
  
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
      position: 'center',
      icon: 'success',
      title: 'Eliminado correctamente',
      showConfirmButton: false,
      timer: 1500
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
ordenador?.addEventListener("change",() => ordenarProductos(conjuntos,ordenador.value));
