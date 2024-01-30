/*let titulo = document.querySelector('h1'); Así era antes para colocar texto en encabezado de la página              //DocumentObjectModel=DOM
titulo.innerHTML = 'Juego del número secreto';*/

/*let parrafo = document.querySelector('p');
parrafo.innerHTML = 'Indica un número del 1 al 10';*/
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento); /*El document.querySelector es un selectro generico de elementos*/                   
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento(){
    let numeroDeUsuario=parseInt(document.getElementById('valorUsuario').value);/*El getElementById es para obtener un elemento por ID*/
    
    console.log(intentos);
    if(numeroSecreto===numeroDeUsuario){         //el triple = es para comparar dos variables tanto en su valor como en el tipo, ya sea number o string
       asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos===1)?'vez':'veces'}`);//operador ternario.
       document.getElementById('reiniciar').removeAttribute('disabled');/*"reiniciar" es el ID en HTML, y "disabled" es el atributo en HTML(ambos en el botón de Nuevo Juego)*/
    } else {
        //No acertó el número secreto.
        if(numeroDeUsuario>numeroSecreto){
            asignarTextoElemento('p','El número secreto es menor');
        } else{
            asignarTextoElemento('p','El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    
    return;
}

function limpiarCaja(){
    //Esta es una forma de hacerlo pero es muy larga
    /*let valorCaja = document.querySelector('#valorUsuario'); Esto es para obtener un elemento. Especificamente por ID se utiliza la almohadilla
valorCaja.value='';*/
//Esta es más corta y mejor
document.querySelector('#valorUsuario').value='';
}

function generarNumeroSecreto(){
let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;      /*El operador return es para que se retorne algún valor al ejecutar alguna función*/
console.log(numeroGenerado);
console.log(listaNumerosSorteados);
//Si ya sortemaos todos los números entonces...
if(listaNumerosSorteados.length==numeroMaximo){
asignarTextoElemento('p','Ya se sortearon todos los números posibles');
} else{
    //Si el número generado está incluido en la lista se hace...
    if(listaNumerosSorteados.includes(numeroGenerado)){
    return generarNumeroSecreto();//Cuando llamas dentro de la funcón a la misma función, se llama recursividad. En este caso, si el número generado ya está dentro de la lista, se repite la función para que salga otro número distinto.
    } else{
    listaNumerosSorteados.push(numeroGenerado);
    return numeroGenerado;
    }
  }
}
function condicionesIniciales(){
    asignarTextoElemento('h1','Juego del número secreto!');
    asignarTextoElemento('p',`Indíca un número del 1 al ${numeroMaximo}`);
    numeroSecreto=generarNumeroSecreto();
    intentos=1;
}

function reiniciarJuego(){
    //limpiar caja
    limpiarCaja();
    //indicar mensaje de intervalo de números
    //generar el número aleatorio
    //Inicializar el número de intentos
    condicionesIniciales();
    //deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}
condicionesIniciales();