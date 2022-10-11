;(function(){
	'use strict'
	var palabras = [
		'ALURA',
		'ORACLE',
		'NEXONE',
		'JAVASCRIPT',
		'CSS',
		'HTML',
		'LATAM'
	];
	//Variable para almacenar configuracion
	var juego = null;
	//Saber si se ha enviaro un alert
	var finalizado = false;
	/*
	var juego ={
		palabra: "ALURA",
		estado:7,
		adivinado:['A','L'],
		errado:['B','J','K']
	}
*/
	var $html = {
		hombre: document.getElementById("hombre"),
		adivinado: document.querySelector(".adivinado"),
		errado: document.querySelector(".errado"),
	}

	function dibujar(juego){
		var $elem;
		//Actualizar estado del hombre
		$elem = $html.hombre;

		var estado = juego.estado;
		if (estado==8) {
			estado=juego.previo;
		}
		$elem.src = "images/figuras/"+estado+".png";
		//Letras adivinadas
		var palabra = juego.palabra;
		var adivinado = juego.adivinado;
		//Borramos los elementos anteriores
		$elem = $html.adivinado;
		$elem.innerHTML ='';
		for(let letra of palabra){
			let $span = document.createElement("span");
			let $txt = document.createTextNode("");
			if (adivinado.indexOf(letra)>=0) {
				$txt.nodeValue = letra;
			}
			$span.setAttribute("class","letra adivinada");
			$span.appendChild($txt);
			$elem.appendChild($span);
		}
		//Letras erradas
		var errado = juego.errado;
		$elem = $html.errado;
		$elem.innerHTML ='';
		for (let letra of errado) {
			let $span = document.createElement('span');
			let $txt = document.createTextNode(letra);
			$span.setAttribute('class','letra errada');
			$span.appendChild($txt);
			$elem.appendChild($span);
		}

	}

function adivinar(juego,letra){
	var estado = juego.estado;
	//Si ya se ha perdido o ganado
	if(estado==1 || estado==8){
		return;
	}
	//Si ya se ha adivinado o errado la letra no hay que hacer nada
	var adivinado = juego.adivinado;
	var errado = juego.errado;
	if (adivinado.indexOf(letra)>=0 || errado.indexOf(letra)>=0) {
		return;
	}

	var palabra = juego.palabra;
	//Si es letra de la palabra
	if (palabra.indexOf(letra)>=0) {
		let ganado = true;
		//Ver si llegamos al estado ganada
		for (let l of palabra) {
			if (adivinado.indexOf(l)<0 && l!=letra) {
				ganado=false;
				juego.previo = juego.estado;
				break;
			}
		}
		//Si ya se ha ganada, indicarlo
		if (ganado) {
			juego.estado=8;
		}
		//Agregar la letra a la lista de letras adivinadas
		adivinado.push(letra);
	}else{
		//Si no es letra de la palabra, y el hombre avanza un paso
		juego.estado--;
		//Letra a la lista de letras erradas
		errado.push(letra);
	}

}
document.addEventListener('keydown', function(event) {
  if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
    alert('Undo!')
  }
});

document.addEventListener('keydown', function(e) {
	var letra = e.key;
	letra = letra.toUpperCase();
	

	
	adivinar(juego,letra);
	var estado = juego.estado;
	if (estado==8 && !finalizado) {
		setTimeout(alertaGanado,300);
		finalizado=true;
	}else if(estado==1 && !finalizado){
		let palabra = juego.palabra;
		let fn = alertaPerdido.bind(undefined,palabra);
		setTimeout(fn,300);
		finalizado=true;
	}

	dibujar(juego);
});
/*
window.onkeypress = function adivinarLetra(e){
	var letra = e.key;
	letra = letra.toUpperCase();
	
	if (/[ˆA-ZÑ]/.test(letra)) {
		return;
	}
	
	adivinar(juego,letra);
	dibujar(juego);

}
*/
window.nuevoJuego=function nuevoJuego(){
 var palabra = palabraAleatoria();
 juego = {};
 juego.palabra = palabra;
 juego.estado = 7;
 juego.adivinado = [];
 juego.errado = [];
 finalizado=false;
 dibujar(juego);
 console.log(juego);
}
///
function palabraAleatoria(){
	var index = ~~(Math.random()*palabras.length);
	return palabras[index];
}
//
 function alertaGanado(){
 	alert('Felicidades.');

 }
 //
 function alertaPerdido(palabra){
	alert('Perdiste, la palabra era, '+palabra)


 }
//
nuevoJuego();
console.log(juego);
}())
