export class ApiService {
  static API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  static async post(url: string, options?: RequestInit) {
    const defaultOptions: RequestInit = {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    return fetch(this.API_BASE_URL + url, { ...defaultOptions, ...options });
  }

  static async get(url: string, options?: RequestInit) {
    const defaultOptions: RequestInit = {
      method: 'GET',
      mode: 'cors',
    };

    return fetch(this.API_BASE_URL + url, { ...defaultOptions, ...options });
  }
}
