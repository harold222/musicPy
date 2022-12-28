import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    'Content-Type' : 'application/x-www-form-urlencoded'
  },
});