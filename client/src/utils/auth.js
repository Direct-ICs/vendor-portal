import decode from 'jwt-decode';

class AuthService {
    getProfile() {
      return decode(this.getToken());
    }

    getAccountLength() {
      return this.getProfile().account_id;
    }
  
    loggedIn() {
      // Checks if there is a saved token and it's still valid
      const token = this.getToken();
      return !!token && !this.isTokenExpired(token);
    }
  
    isTokenExpired(token) {
      try {
        const decoded = decode(token);
        if (decoded.exp * 10800 <= Date.now()) {
          return true;
        } else return false;
      } catch (err) {
        return false;
      }
    }
  
    getToken() {
      // Retrieves the user token from localStorage
      return localStorage.getItem('token');
    }
  
    login(idToken) {
      // Saves user token to localStorage
      localStorage.setItem('token', idToken);
    }
  
    logout() {
      // Clear user token and profile data from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('accindex');
      // Clear session storage
      sessionStorage.clear();
      // this will reload the page and reset the state of the application
      window.location.assign('/login');
    }

    async reAuth() {
      const response = await fetch('/auth/reauth', {
        method: 'get'
      });
      const data = await response.json();
      if (response.ok) {
        window.location.reload();
      } else {
        console.log('Error: ' + data.message);
      }
    }
  }
  
  export default new AuthService();