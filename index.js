    let numero = parseInt(prompt("Ingrese el numero"));
    
    for(let index = 1; index <= 100; index++){
    
        let resultado = numero + index;
    
        let mensaje = `${numero} + ${index} = ${resultado}`;
    
        alert(mensaje);
}