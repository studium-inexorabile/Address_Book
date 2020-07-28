import axios from 'axios';
 
// configures base URL for axios requests
export default axios.create({
    baseURL: 'http://localhost:3000/api'
});