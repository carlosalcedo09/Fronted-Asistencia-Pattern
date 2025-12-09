import { useState, useEffect } from 'react';
import axiosInstance from '../utils/AxiosInstance';
import Swal from 'sweetalert2';

export const useMarcacionesLogic = () => {
  const [marcaciones, setMarcaciones] = useState([]);
  const [estadoMarcaciones, setEstadoMarcaciones] = useState({
    ingreso: false,
    inicioReceso: false,
    finReceso: false,
    salida: false,
    horasExtraCount: 0,
  });

  const obtenerMarcaciones = async () => {
    try {
      const response = await axiosInstance.get('marcaciones-hoy/');
      setMarcaciones(response.data);

      const tipos = response.data.map(m => m.tipo.toLowerCase());
      const horasExtraCount = tipos.filter(t => t === 'horas extra').length;

      setEstadoMarcaciones({
        ingreso: tipos.includes('ingreso'),
        inicioReceso: tipos.includes('inicio de receso'),
        finReceso: tipos.includes('fin de receso'),
        salida: tipos.includes('salida'),
        horasExtraCount,
      });
    } catch (error) {
      Swal.fire('Error', 'No se pudo obtener las marcaciones del día.', 'error');
    }
  };

  useEffect(() => {
    obtenerMarcaciones();
  }, []);

  const manejarMarcacion = async (tipo) => {
    try {
      await axiosInstance.post('registrar-marcacion/', {
        tipo_marcacion: tipo,
        observacion: "Ninguna",
      });
      Swal.fire('Marcación registrada', `Tipo: ${tipo}`, 'success');
      obtenerMarcaciones();
    } catch (error) {
      Swal.fire('Error', 'No se pudo registrar la marcación.', 'error');
      console.error("Error al registrar marcación:", error);
    }
  };

  const getButtonClass = (habilitado, deshabilitadoExtra = false, grande = false) => {
    let clases = 'btn-marcacion';
    if (grande) clases += ' grande';
    if (!habilitado || deshabilitadoExtra) {
      clases += ' deshabilitado';
    } else {
      clases += ' activo';
    }
    return clases;
  };

  return {
    marcaciones,
    estadoMarcaciones,
    manejarMarcacion,
    getButtonClass,
  };
};
