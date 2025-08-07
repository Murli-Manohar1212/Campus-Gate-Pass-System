
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/v1", // my backend URL
  withCredentials: true, // to send cookies (JWT)
});

export default instance;
