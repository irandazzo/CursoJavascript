/* ------ CONVERSOR DE DIVISAS ---------*/ 
let saludo = prompt ("Bienvenido, desea realizar alguna operación?")


while (saludo != "si" && saludo != "no"){
    alert ("Por favor ingresa si o no")
    saludo = prompt ("Bienvenido, desea realizar alguna operación?")
}

if (saludo == "si"){
    alert ("Gracias por elegirnos, a continuación podrá comenzar a operar")
    
}else if (saludo == "no"){
    alert ("Gracias por responder, lo esperamos la próxima!")
}

while (saludo != "no"){
    let tipoMoneda = prompt("Ingresar tipo de moneda a operar (ars, real, euro)");
    while (tipoMoneda != "ars" && tipoMoneda != "real" && tipoMoneda != "euro"){
      alert ("Por favor Ingresar tipo de moneda a operar (ars, real, euro)")
      tipoMoneda = prompt("Ingresar tipo de moneda a operar (ars, real, euro)");
  }
    let cotizacion = parseInt(prompt("Ingrese la cantidad que quiere convertir"));

    if (tipoMoneda == "ars" || tipoMoneda == "real" || tipoMoneda == "euro"){
        switch(tipoMoneda){
            case "ars":
                let resultadoArs = cotizacion / 280;
                alert("Recibirás USD " + resultadoArs);
                break;
            case "real":
                let resultadoReal = cotizacion / 280;
                alert("Recibirás USD " + resultadoReal);
                break;
            case "euro":
                let resultadoEuro = cotizacion / 280;
                alert("Recibirás USD " + resultadoEuro);
                break;
        }
    }
    saludo = prompt ("¿Desea seguír operando?")
    while (saludo ==="no"){
        alert ("Gracias por operar con nosotros, hasta la próxima!")
        break;
    }
}


