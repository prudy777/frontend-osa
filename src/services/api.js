// api.js

const backendUrl = 'https://your-backend-domain.com'; // Update this with your backend URL

export const fetchData = () => {
  return fetch(`${backendUrl}/api/data`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}
