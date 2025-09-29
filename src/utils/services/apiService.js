import axios from "axios";

class ApiService {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL: baseURL || import.meta.env.VITE_API_BASE_URL,
      headers: {
        // "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error.response) {
          console.error("API Error:", error.response);
        } else if (error.request) {
          console.error("No response from server:", error.request);
        } else {
          console.error("Axios Error:", error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  // GET request
  get(url, params = {}, config = {}) {
    return this.api.get(url, { params, ...config });
  }

  // POST request
  post(url, data = {}, config = {}) {
    return this.api.post(url, data, config);
  }

  // PUT request
  put(url, data = {}, config = {}) {
    return this.api.put(url, data, config);
  }

  // PATCH request
  patch(url, data = {}, config = {}) {
    return this.api.patch(url, data, config);
  }

  // DELETE request
  delete(url, config = {}) {
    return this.api.delete(url, config);
  }
}

// Export instance default
const apiService = new ApiService();

export default apiService;
