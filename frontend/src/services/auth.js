export const authService = {
  async login(email, password) {
    // Vérification en dur pour le développement
    if (email === 'root' && password === 'root') {
      const mockData = {
        access_token: 'mock-jwt-token-for-development',
        user: {
          id: 1,
          email: 'root',
          name: 'Administrateur',
          role: 'admin'
        }
      };
      
      localStorage.setItem('access_token', mockData.access_token);
      localStorage.setItem('user', JSON.stringify(mockData.user));
      
      return mockData;
    } else {
      // Simuler une erreur d'authentification
      throw new Error('Identifiants incorrects');
    }
  },
  
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  isAuthenticated() {
    return !!localStorage.getItem('access_token');
  }
};