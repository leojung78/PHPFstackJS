<?php

	class Pelicula {
		public $idPelicula = null;
		public $Titulo = null;
		public $Descripcion = null;
		public $Estreno = null;
		public $Poster = null;
		public $Trailer = null;

		public static function Obtener(){

			$db = new PDO("mysql:dbname=nerdflix;host=localhost;charset=utf8", "root", "");

			$registros = $db->query("SELECT * FROM peliculas");

			$peliculas = $registros->fetchAll(PDO::FETCH_CLASS, "Pelicula");

			return $peliculas;

		}

	}




?>