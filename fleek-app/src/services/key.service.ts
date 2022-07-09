import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5011";

class KeyService {
  getKeys() {
    return axios.get(API_URL + "/v1/api/key", { headers: authHeader() });
  }

  addKey() {
    return fetch(API_URL + "/v1/api/key", {
      method: "PUT",
      headers: {
        Authorization: authHeader()["Authorization"],
        "Content-Type": "application/json",
      },
    });
  }

  updateKey(key: any) {
    return fetch(API_URL + "/v1/api/key/" + key, {
      method: "POST",
      headers: {
        Authorization: authHeader()["Authorization"],
        "Content-Type": "application/json",
      },
    });
  }

  getApiLogs(key: any) {
    return axios.get(API_URL + "/v1/api/key/logs/" + key, {
      headers: authHeader(),
    });
  }
}

export default new KeyService();
