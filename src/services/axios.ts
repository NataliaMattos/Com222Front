import axios from "axios"

const instance = axios.create({baseURL: 'https://backend-trabalho-com222.onrender.com/user',  })

export default instance;