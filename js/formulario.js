const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");
 
const destino = document.getElementById("destino");
const adultos = document.getElementById("adultos");
const ninos = document.getElementById("ninos");

const expresiones = {
	usuario: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/,
	destino: /^[1-9]\d*$/,
	adultos: /^(0|[1-9]\d*)$/,
	ninos: /^[0-9]+$/,
}

const campos = {
	usuario: false,
	nombre: false,
	correo: false,
	telefono: false,
	destino: false,
	adultos: false,
	ninos: false,
	RadiosClases: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "usuario":
			validarCampo(expresiones.usuario, e.target, "usuario");
			break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, "nombre");
			break;
		case "correo":
			validarCampo(expresiones.correo, e.target, "correo");
			break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, "telefono");
			break; 
	}
}
 
const validarCampo = (expresion, input, campo) => {
	if (expresion.test(input.value)) {
		document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto");
		document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-correcto");
		document.querySelector(`#grupo__${campo} i`).classList.remove("fa-circle-xmark");
		document.querySelector(`#grupo__${campo} i`).classList.add("fa-circle-check");
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto");
		document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-correcto");
		document.querySelector(`#grupo__${campo} i`).classList.add("fa-circle-xmark");
		document.querySelector(`#grupo__${campo} i`).classList.remove("fa-circle-check");
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
		campos[campo] = false;
	}
}

inputs.forEach((input) => {
	input.addEventListener("keyup", validarFormulario);
	input.addEventListener("blur", validarFormulario);
});



formulario.addEventListener("submit", (e) => {
	e.preventDefault();
	validarSelects();
	validarRadios(); 

	if (campos.usuario && campos.nombre && campos.correo && campos.telefono && campos.destino && campos.adultos && campos.ninos && campos.RadiosClases) {
		formulario.reset();

		document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");
		setTimeout(() => {
			document.getElementById("formulario__mensaje-exito").classList.remove("formulario__mensaje-exito-activo");
		}, 5000);

		document.querySelectorAll(".formulario__grupo-correcto").forEach((icono) => {
			icono.classList.remove("formulario__grupo-correcto");
		})
	} else {
		document.getElementById("formulario__mensaje").classList.add("formulario__mensaje-activo");
		setTimeout(() => {
			document.getElementById("formulario__mensaje").classList.remove("formulario__mensaje-activo");
		}, 5000);
	}
});


function validarSelects() {
	destino.value !== ''
		? ( 
			document.getElementById("alertErrorDestino").innerHTML = "",
			campos.destino = true
		)
		: ( 
			document.getElementById("alertErrorDestino").innerHTML = "Selecciona un destino turístico",
			campos.destino = false
			);


	adultos.value !== ''
		? ( 
			document.getElementById("alertErrorAdulto").innerHTML = "",
			campos.adultos = true
			)
		: ( 
			document.getElementById("alertErrorAdulto").innerHTML = "Selecciona cantidad de adultos",
			campos.adultos =  false
		);

	ninos.value !== ''
		? ( 
			document.getElementById("alertErrorNinos").innerHTML = "",
			campos.ninos = true
		)
		: ( 
			document.getElementById("alertErrorNinos").innerHTML = "Selecciona cantidad de niños",
			campos.ninos = false
		);
 
}

function validarRadios() {

	var respuesta = "no";
	for (let i = 0; i < document.formulario.RadiosClases.length; i++){
		if (document.formulario.RadiosClases[i].checked){
			document.getElementById("alertErrorClase").innerHTML = "";
			respuesta = "si";
			campos.RadiosClases = true
		}
	}
	if (respuesta == "no"){
		document.getElementById("alertErrorClase").innerHTML = "Selecciona una clase"
		campos.RadiosClases = false
	}

}