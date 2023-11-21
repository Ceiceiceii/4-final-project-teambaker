import axios from "axios"
// TODO: store url in .env
const serverURL = "http://localhost:3000";

const axiosProvider = axios.create({
  baseURL: serverURL,
  // withCredentials: true
});

const axiosPrivateProvider = axios.create({
  baseURL: serverURL,
})

export default axiosProvider;
export {axiosPrivateProvider};