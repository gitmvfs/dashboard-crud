import axios from 'axios'

 const api = axios.create({
    baseURL: 'https://api-crud-ecommerce.cyclic.app',
})

export default api