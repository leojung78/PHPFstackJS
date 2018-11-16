//porque conviene programar en objetos?
//estandarizar la informacion, por ejemplo los metodos en los objetos


class Pelicula {
	
	constructor(id, t, d, e, p, tr){ //o idPelicula, Titulo, Descripcion, Estreno, Poster, Trailer
		this.idPelicula = id;
		this.Titulo = t;
		this.Descripcion = d;
		this.Estreno = e;
		this.Poster = p;
		this.Trailer = tr;
	}

	Mostrar(area){
		// GUARDAR UNA REFERENCIA AL OBJETO "Pelicula" MEDIANTE UNA VARIABLE AUXILIAR
		let self = this;

		//console.log(`Hola, soy ${this.Titulo} (${this.Estreno})`);
		//querySelector captura siempre al primer objeto ("bla bla").
		let ficha = document.querySelector(".pelicula").cloneNode(true); //cloneNode(); es un metodo de instancia (clona el objeto), pero solo el elemento vacio, para todo el contenido es clonNode(true)

		//MANIPULACION DEL DOM (indirecta) porque guarde en una variable
		ficha.querySelector("h4").innerText = self.Titulo; //MANIPULACION DE CONTENIDO
		ficha.querySelector("p").innerText = self.Estreno; //MANIPULACION DE CONTENIDO
		
		ficha.querySelector("img").src = self.Poster; //MANIPULACION DE ESTRUCTURA

		//FUNCTION ADENTRO DE OTRA FUNCTION  SE LO LLAMA "closure"
		ficha.querySelector("a").onclick = function (e){ //MANIPULACION DE COMPORTAMIENTO

			e.preventDefault();

			let reproducir = new Promise((resolve, reject)=>{
				//1) Chequear si esta logueado
				if (auth2.currentUser.get().isSignedIn()) {
					
					let usuario = auth2.currentUser.get().getBasicProfile();
					resolve(usuario);
				} else { //2) sino esta logueado mostrat el popup de logueo"
					
					auth2.signIn().then(()=>{
						//alert(`Vos queres ver esta pelicula: ${self.Titulo}`); //ACA EL this. ES function() del onclick.
						let usuario = auth2.currentUser.get().getBasicProfile();
						resolve(usuario);

					});
				}
			});

			reproducir.then((usuario)=>{
				
				document.querySelector("#usuario").innerHTML = "Bienvenido <strong>" + usuario.getGivenName() + "</strong>";
				
				//console.log("Vos sos: " + usuario.getGivenName());
				
				let reproductor = document.querySelector("#playMovie"); 

				reproductor.querySelector("#titulo").innerText = `${self.Titulo} (${self.Estreno})`;
				reproductor.querySelector("iframe").src = self.Trailer; //MANIPULACION DE ESTRUCTURA
				reproductor.querySelector("#descripcion").innerText = self.Descripcion;
				reproductor.querySelector("#imagen").src = self.Poster; //MANIPULACION DE ESTRUCTURA

				reproductor.classList.remove("hide"); //MANIPULACION DE ESTRUCTURA

				window.scroll({top: reproductor.offsetTop, behavior: "smooth"}); //reproductor.offsetTop obtiene lacantidad de pixels hasta
			});


		}

		ficha.classList.remove("hide"); //MANIPULACION DE ESTRUCTURA

		//ANEXAR LA FICHA CLONA AL DOCUMENTO (manipulacion directa) porque lo hace directo, no se guardo en una variable
		document.querySelector(area).appendChild(ficha);

		//console.log(ficha);
	}

	static parse(json){
		//console.log("Vos queres convertir estas peliculas");
		//console.log(json);
		
		if (json instanceof Array) {

			let peliculas = new Array();

			json.forEach (function(item) {

				peliculas.push(
					new Pelicula(
					item.idPelicula,
					item.Titulo,
					item.Descripcion,
					item.Estreno,
					item.Poster,
					item.Trailer)
				);

			});

			return peliculas;

		} else if (json instanceof Object) {

			return new Pelicula(json.idPelicula, json.Titulo, json.Descripcion, json.Estreno, json.Poster, json.Trailer);

		} else if (json instanceof Pelicula) { //la clase "Pelicula"
			
			console.error("ERROR: el objeto ya es una Pelicula");
		
		} else {
		
			console.error("ERROR: el parametro no puede ser convertido a Pelicula");
		
		}
	}
}