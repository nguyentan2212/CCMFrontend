export function saveToken(userToken) {
    localStorage.setItem('capital-app-token', JSON.stringify(userToken));
    }
    
  export function getToken() {
      const tokenString = localStorage.getItem('capital-app-token');
      const userToken = JSON.parse(tokenString);
      return userToken;
  }
  
  export function removeToken() {
    localStorage.removeItem('capital-app-token');
  }

  export function isAdmin() {
    const token = getToken();
    return token.role === "admin";
  }

  export function isCurrentUser(id) {
    const token = getToken();
    const result = id === token.id;
    console.log(result);
    return result;
  }