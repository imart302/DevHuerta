
/**
 * Estructura para mandar a la API para que
 * nos registre un nuevo cliente o usuario
 */
export class CreateUserDto {
  firstName = ""
  lastName = ""
  email = ""
  password = ""

  /**
   * 
   * @param {String} firstName 
   * @param {String} lastName 
   * @param {String} email 
   * @param {String} password 
   */
  constructor(firstName, lastName, email, password){
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}