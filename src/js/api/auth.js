import { CreateUserDto } from './dtos/createUser.js';
import { LoggedUser } from './dtos/loggedUser.js';
import { BE_URL } from '../utils/constants.js';

/**
 * Funciones para llamar a todos los recursos
 * de la API de login o Register
 */

const userLoggedFake = new LoggedUser(
  123,
  'Alberto',
  'Diaz',
  'albertodiaz@hotmail.com',
  'asdfgh'
);

/**
 * Funcion asincrona para llamar a POST /api/auth/login
 * @param {*} userData
 */
export async function login(userData) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify(userData);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };


  const resp = await fetch(`${BE_URL}/auth/login`, requestOptions);
  const json = await resp.json();

  return json;
}

/**
 *
 * @param {CreateUserDto} userData
 * @returns
 */
export async function createUser(userData) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify(userData);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  const response = await fetch(`${BE_URL}/auth/register`, requestOptions);
  const json = await response.json();

  return json;
}
