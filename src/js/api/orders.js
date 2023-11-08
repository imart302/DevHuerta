import { LOGGED_USER_LS_KEY } from '../utils/constants';
import { CreateOrderDto } from './dtos/createOrder';
import { BE_URL } from '../utils/constants';
import { OrderDbDto, OrderItemDbDto } from './dtos/orderDbDto';

/**
 *
 * @param {CreateOrderDto} order
 */
export async function createOrder(order) {
  try {
    const myHeaders = new Headers();

    const loggedUser = JSON.parse(localStorage.getItem(LOGGED_USER_LS_KEY));

    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${loggedUser.token}`);

    const raw = JSON.stringify(order);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const response = await fetch(`${BE_URL}/order`, requestOptions);
    const json = await response.json();

    return json;
  } catch (error) {
    console.log(error);
  }
}

/**
 *
 * @returns {OrderDbDto[]}
 */
export async function getOrders() {
  try {
    const myHeaders = new Headers();
    const loggedUser = JSON.parse(localStorage.getItem(LOGGED_USER_LS_KEY));

    myHeaders.append('Authorization', `Bearer ${loggedUser.token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    const response = await fetch(`${BE_URL}/order`, requestOptions);
    const json = await response.json();

    const orderDtos = json.map((order) => {
      return new OrderDbDto(
        order.id,
        order.totalGross,
        order.createdAt,
        order.orderItems.map(
          (oItem) => new OrderItemDbDto(oItem.productId, oItem.quantity)
        )
      );
    });

    return orderDtos;
  } catch (error) {
    console.log(error);
  }
}

/**
 *
 * @param {Number} orderId
 */
export async function deleteOrder(orderId) {
  try {
    const myHeaders = new Headers();
    const loggedUser = JSON.parse(localStorage.getItem(LOGGED_USER_LS_KEY));

    myHeaders.append('Authorization', `Bearer ${loggedUser.token}`);

    const requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
    };

    const response = await fetch(`${BE_URL}/order/${orderId}`, requestOptions)
    const ok = await response.text();
    return ok;
  } catch (error) {
    console.log(error);
  }
}
