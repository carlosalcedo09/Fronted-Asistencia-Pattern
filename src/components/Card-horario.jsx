import React, { useEffect, useState, useContext } from "react";
import "../styles/Card-horario.css";
import axiosInstance from "../utils/AxiosInstance";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

export const CardHorario = () => {
  const [horario, setHorario] = useState(null);
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHorario = async () => {
      try {
        const response = await axiosInstance.get("https://backend-asistencia-pattern.onrender.com/api/horario-hoy/", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setHorario(response.data);
      } catch (error) {
        console.error("Error al obtener el horario:", error);
      }
    };

    fetchHorario();
  }, [accessToken]);

  if (!horario) return null;

  return (
    <div className="card publicidad">
      <p className="pub-text-especial">
        Tu Horario de <span> Hoy {horario.fecha}</span>
      </p>

      <div className="pub-item">
        {/* Icono ingreso */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="i-icon-2x i-icon-white">
          <path fill="#1A212A" fillRule="evenodd" d="M5 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4a1 1 0 1 1 0 2H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h4a1 1 0 0 1 0 2zM15.293 6.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414-1.414L19.586 12l-4.293-4.293a1 1 0 0 1 0-1.414" clipRule="evenodd" />
          <path fill="#1A212A" fillRule="evenodd" d="M8 12a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1" clipRule="evenodd" />
        </svg>
        <p className="pub-text">Hora de Ingreso</p>
        <p className="pub-resp">{horario.hora_ingreso} AM</p>
      </div>

      <div className="pub-item">
        {/* Icono salida */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="i-icon-2x i-icon-white">
          <path fill="#1A212A" fillRule="evenodd" d="M5 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4a1 1 0 1 1 0 2H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h4a1 1 0 0 1 0 2zM15.293 6.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414-1.414L19.586 12l-4.293-4.293a1 1 0 0 1 0-1.414" clipRule="evenodd" />
          <path fill="#1A212A" fillRule="evenodd" d="M8 12a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1" clipRule="evenodd" />
        </svg>
        <p className="pub-text">Hora de Salida</p>
        <p className="pub-resp">{horario.hora_salida} PM</p>
      </div>

      <div className="pub-item">
        {/* Icono receso */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="i-icon-2x i-icon-white">
          <path fill="#1A212A" fillRule="evenodd" d="M12 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1A11 11 0 0 0 12 1m1 10V3.056A9 9 0 0 1 20.944 11zM8.4 3.747a1 1 0 0 0-.8-1.833A11 11 0 1 0 22.131 16.28a1 1 0 0 0-1.842-.78A9 9 0 1 1 8.399 3.748" clipRule="evenodd" />
        </svg>
        <p className="pub-text">Tiempo de Receso</p>
        <p className="pub-resp">{horario.tiempo_receso}</p>
      </div>

      <button className="empieza-btn" onClick={() => navigate('/marcaciones')}>Marcar asistencias de hoy</button>
    </div>
  );
};
