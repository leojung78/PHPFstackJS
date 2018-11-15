<?php
	require_once 'pelicula.class.php';

	header("Content-Type: application/json");

	echo json_encode( Pelicula::Obtener() );

?>