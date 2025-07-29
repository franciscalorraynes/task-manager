import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

// Função para decodificar JWT e extrair informações do usuário
const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Erro ao decodificar JWT:', error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      apiService.setToken(token);
      
      // Extrair informações do usuário do token JWT
      const decodedToken = decodeJWT(token);
      if (decodedToken) {
        const userInfo = {
          email: decodedToken.email || 'Email não disponível',
          name: decodedToken.name || decodedToken.given_name || decodedToken.email?.split('@')[0] || 'Usuário',
          userId: decodedToken.sub || decodedToken.username
        };
        
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        setUser(userInfo);
        setIsAuthenticated(true);
      } else {
        // Token inválido, limpar dados
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        apiService.setToken(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await apiService.login(credentials);
      
      // Extrair o token da resposta do Cognito
      const token = response.authenticationResult?.AccessToken;
      const idToken = response.authenticationResult?.IdToken;
      
      if (!token) {
        throw new Error('Token não encontrado na resposta do login');
      }
      
      // Decodificar o ID Token para obter informações do usuário (incluindo o nome)
      const decodedIdToken = decodeJWT(idToken);
      const decodedAccessToken = decodeJWT(token);
      
      // Criar objeto de usuário com informações reais do token
      const userInfo = {
        email: decodedIdToken?.email || credentials.email,
        name: decodedIdToken?.name || decodedIdToken?.given_name || credentials.email.split('@')[0],
        userId: decodedAccessToken?.sub || decodedAccessToken?.username
      };
      
      // Salvar token e informações do usuário
      apiService.setToken(token);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      setUser(userInfo);
      setIsAuthenticated(true);
      
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiService.register(userData);
      
      // Após o registro, fazer login automaticamente
      await login({
        email: userData.email,
        password: userData.password
      });
      
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    apiService.setToken(null);
    localStorage.removeItem('userInfo');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};