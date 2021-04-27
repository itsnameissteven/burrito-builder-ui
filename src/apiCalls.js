export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
      .then(handleErrors)
}

export const submitOrder = (order) => {
  return fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order)
  })
    .then(handleErrors)
    .catch(err => alert(err))
}

const handleErrors = response => {
  if(!response.ok) {
    throw new Error(`oops something went wrong please try again 
    status code:${response.statusText}`);
  }
  return response.json();
}