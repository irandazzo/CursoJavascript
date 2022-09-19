const productos = [
    {nombre: "Conjunto Sublime", precio: 96199},
    {nombre: "Conjunto Exclusive", precio: 82699},
    {nombre: "Conjunto Tamesis", precio: 128399},
    {nombre: "Conjunto Montreaux", precio: 59999},
    {nombre: "Conjunto Sonno", precio: 78999},
    {nombre: "Conjunto Regno", precio: 101899},
    {nombre: "Conjunto Nantes", precio: 76599},
    {nombre: "Conjunto Princess", precio: 59899},
    {nombre: "Conjunto Doral", precio: 120999}
];

let carrito = []

let seleccion = prompt ("Hola, ¿Desea adquirir algún producto?")

while (seleccion != "si" && seleccion != "no"){
    alert ("Por favor ingresá si o no")
    seleccion = prompt("Hola, ¿Desea adquirir algún producto?");
}

if (seleccion == "si"){
    alert ("A continuación le mostraremos la lista de productos")
    let todoslosProductos = productos.map((producto) => producto.nombre + " $" + producto.precio);
    alert (todoslosProductos.join(" - "));
} else if (seleccion == "no"){
    alert("Gracias por confiar en nosotros, ¡te esperamos la próxima!");
}

while (seleccion != "no"){
    let producto = prompt ("Agregá un producto a tu carrito");
    let precio = 0;

    if (producto == "Conjunto Sublime" 
    || producto == "Conjunto Exclusive" 
    || producto == "Conjunto Tamesis" 
    || producto == "Conjunto Montreaux" 
    || producto == "Conjunto Sonno"
    || producto == "Conjunto Regno"
    || producto == "Conjunto Nantes"
    || producto == "Conjunto Princess"
    || producto == "Conjunto Doral"){
        switch (producto){
            case "Conjunto Sublime":
                precio = 96199;
                break;
            case "Conjunto Exclusive":
                precio = 82699;
                break;
            case "Conjunto Tamesis":
                precio = 128399;
                break;
            case "Conjunto Montreaux":
                precio = 59999;
                break;
            case "Conjunto Sonno":
                precio = 78999;
                break;
            case "Conjunto Regno":
                precio = 101899;
                break;
            case "Conjunto Nantes":
                precio = 76599;
                break;
            case "Conjunto Princess":
                precio = 59899;
                break;
            case "Conjunto Doral":
                precio = 120999;
                break;
            
            default:
                break;
        }
        let unidades = parseInt (prompt ("Ingrese la cantidad de unidades"))
        
        carrito.push({producto, unidades, precio})
        console.log(carrito);
    }else {
        alert ("Producto sin stock")
    }

    seleccion = prompt ("¿Desea seguir comprando?")

    while (seleccion === "no"){
        alert ("Gracias por su compra, ¡lo esperamos pronto!")
        carrito.forEach(carritoFinal =>{
            alert(`Producto: ${carritoFinal.producto}, Unidades: ${carritoFinal.unidades}, Precio: $ ${carritoFinal.precio}
                , Total a pagar por producto: $ ${carritoFinal.unidades * carritoFinal.precio}`)
        })
        break;
    }
}