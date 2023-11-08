import { Review } from './dtos/review.js';

const URL = 'http://localhost:8081/api/review';

export async function getReviews(){
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}