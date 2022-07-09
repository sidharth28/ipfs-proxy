import axios from "axios";

const API_URL = "http://localhost:5011";

class AuthService {
  login(username: string, password: string) {
    return axios
      .post(API_URL + "/v1/api/auth", {
        username,
        password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string) {
    return axios.post(API_URL + "/v1/api/user/register", {
      username,
      password,
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
