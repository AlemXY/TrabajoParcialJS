const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

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
	destino: false
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
		case "adultos":
            validarCampo(expresiones.adultos, e.target, "adultos");
        break;
        case "destino":
            validarCampo(expresiones.destino, e.target, "destino");
        break;
        case "ninos":
            validarCampo(expresiones.ninos, e.target, "ninos");
        break;
	}
}

const ninos = document.getElementById("ninos");
ninos.addEventListener("change", validarFormulario);

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
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

	const adultos = document.getElementById("adultos");
	const ninos = document.getElementById("ninos");

	adultos.addEventListener("change", validarFormulario);
	ninos.addEventListener("change", validarFormulario);

	if(campos.usuario && campos.nombre && campos.correo && campos.telefono && campos.ninos && campos.adultos && campos.destino){
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