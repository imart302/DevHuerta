import {LoggedUser} from "./dtos/loggedUser.js"

/**
 * Funciones para llamar a todos los recursos
 * de la API de login o Register
 */


const userLoggedFake = new LoggedUser(123,"Alberto","Diaz","albertodiaz@hotmail.com","asdfgh");

/**
 * Funcion asincrona para llamar a POST /api/auth/login
 * @param {*} userData 
 */
export async function login(userData){
	userLoggedFake.email = userData.email;
	return userLoggedFake;
}