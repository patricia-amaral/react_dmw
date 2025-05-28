import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const url = "http://localhost:3000";

  const login = async (email, senha) => {
    try {
    const response = await axios.post(`${url}/login`, { email, senha });
    localStorage.setItem('token', response.data.token);
    setUser({ email });
    navigate('/');
  } catch (err) {
    alert(err.response?.data?.erro || "Erro ao fazer login");
  }
};
  
  const register = async (nome, email, senha) => {
  try {
    await axios.post(`${url}/signup`, { nome, email, senha });
    await login(email, senha);
  } catch (err) {
    console.error("Erro no registro:", err.response?.data || err.message);
    alert(err.response?.data?.erro || "Erro ao registrar");
  }
};

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setUser({});
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);