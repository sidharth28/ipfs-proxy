import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5011";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "/test");
  }
}

export default new UserService();
