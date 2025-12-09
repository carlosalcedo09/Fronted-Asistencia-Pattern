// src/hooks/InicioLogic.js
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/AxiosInstance';

export const useInicioLogic = () => {
  const [resumen, setResumen] = useState(null);

  const obtenerResumen = async () => {
    try {
      const response = await axiosInstance.get('resumen-hoy/');
      setResumen(response.data);
    } catch (error) {
      console.error("Error al obtener el resumen:", error);
    }
  };

  useEffect(() => {
    obtenerResumen();
  }, []);

  const nombre_empleado = resumen ? resumen.nombre.split(' ')[0] : '';
  const tiempo_empresa = resumen ? resumen.tiempo_empresa : '';

  const cardsData = resumen ? [
    {
      id: 1,
      cantidad: resumen.dias_restantes,
      texto: "Días restantes",
      mostrarBoton: false,
      imagen: "src/assets/365.png",
    },
    {
      id: 2,
      cantidad: resumen.asistencias,
      texto: "Asistencias",
      mostrarBoton: false,
      imagen: "src/assets/asistencia.png",
    },
    {
      id: 3,
      cantidad: resumen.faltas,
      texto: "Faltas",
      mostrarBoton: false,
      imagen: "src/assets/ausencia.png",
    },
    {
      id: 4,
      cantidad: resumen.tardanzas,
      texto: "Tardanzas",
      mostrarBoton: false,
      imagen: "src/assets/tarde.png",
    },
    {
      id: 5,
      cantidad: resumen.horas_extra,
      texto: "Horas Extra",
      mostrarBoton: false,
      imagen: "src/assets/tiempo-extra.png",
    },
    {
      id: 6,
      cantidad: resumen.horas_trabajadas,
      texto: "Horas trabajadas",
      mostrarBoton: false,
      imagen: "src/assets/calendario.png",
    },
  ] : [];

  return {
    resumen,
    nombre_empleado,
    tiempo_empresa,
    cardsData
  };
};