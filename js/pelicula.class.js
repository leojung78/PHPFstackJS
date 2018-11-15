class Pelicula {

	constructor(id, t, d, e, p, tr){
		this.idPelicula = id;
		this.Titulo = t;
		this.Descripcion = d;
		this.Estreno = e;
		this.Poster = p;
		this.Trailer = tr;
	}
	Mostrar(area){
		//Guardar una referencia al objeto "Pelicula" mediante una variable auxiliar
		let self = this;

		//console.log(`Hola, soy ${this.Titulo} (${this.Estreno})`);
		let ficha = document.querySelector(".pelicula").cloneNode(true);

		//Manipulaciones del DOM (indirecta)
		ficha.querySelector("h4").innerText = self.Titulo; //<-- Manipulacion de Contenido
		ficha.querySelector("p").innerText = self.Estreno; //<-- Manipulacion de Contenido

		ficha.querySelector("img").src = self.Poster; //<-- Manipulacion de Estructura

		//Function adentro de otra Function ---> "closure"
		ficha.querySelector("a").onclick = function(e){ //<-- Manipulacion de Comportamiento
			e.preventDefault();

			let reproducir = new Promise((resolve, reject) => {
				//1) ↓ Chequear si esta logeado
				if( auth2.currentUser.get().isSignedIn() ){

					let usuario = auth2.currentUser.get().getBasicProfile();
					resolve(usuario);
				} else { //2) ↓ Si no esta logueado, mostrar el Popup de logeo...
					auth2.signIn().then(()=>{

						let usuario = auth2.currentUser.get().getBasicProfile();
						resolve(usuario);

					});
				}
			});

			reproducir.then((usuario)=>{
				document.querySelector("#usuario").innerHTML = 'Bienvenido <strong>' + usuario.getGivenName() + '</strong>';
				console.log( );

				let reproductor = document.querySelector("#playMovie");

				reproductor.querySelector("#titulo").innerText = `${self.Titulo} (${self.Estreno})`;
				reproductor.querySelector("iframe").src = self.Trailer;
				reproductor.querySelector("#descripcion").innerText = self.Descripcion;
				reproductor.querySelector("#imagen").src = self.Poster;

				reproductor.classList.remove("hide");

				window.scroll({ top : reproductor.offsetTop, behavior : "smooth" });
			});


		}

		ficha.classList.remove("hide"); //<-- Manipulacion de Estructura

		//Anexar la ficha clonada al documento... (Manipulacion Directa)
		document.querySelector(area).appendChild(ficha);

	}
	static parse(json){

		if( json instanceof Array ){

			let peliculas = new Array();

			json.forEach(function(item){

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

		} else if( json instanceof Object ){
			
			return new Pelicula(json.idPelicula, json.Titulo, json.Descripcion, json.Estreno, json.Poster, json.Trailer);

		} else if( json instanceof Pelicula ){
			console.error("ERROR: el objeto ya es una Pelicula");
		} else {
			console.error("ERROR: el parametro no puede ser convertido a Pelicula");
		}
	}

}