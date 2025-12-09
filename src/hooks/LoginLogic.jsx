import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export const useLoginLogic = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [error, setError] = useState("");

  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user || localStorage.getItem("access_token")) {
      navigate("/home");
    }
  }, [user, navigate]);

  const togglePassword = () => {
    setMostrarPassword(!mostrarPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/api/token/", {
        username: usuario,
        password: password,
      });

      const { access, refresh } = response.data;

      const payload = JSON.parse(atob(access.split('.')[1]));
      localStorage.setItem("nombre_empleado", payload.full_name || '');
      localStorage.setItem("correo_empleado", payload.email || '');

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      login(access, refresh);
      navigate("/home");
    } catch (err) {
      setError("Usuario o contraseña incorrectos.");
      console.error(err);
    }
  };

  return {
    usuario,
    password,
    mostrarPassword,
    error,
    setUsuario,
    setPassword,
    togglePassword,
    handleLogin,
  };
};
