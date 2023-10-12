/**
 * Estructura esperada de la respuesta de la
 * API para un usuario loggeado
 */
export class LoggedUser{
	id= 0;
	firstName= "";
	lastName = "";
	email = "";
	token = "";

	constructor(id,firstName,lastName,email,token){
		this.id= id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.token = token;
	}
	
}

