import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from '../utils/AxiosInstance';

export const useHistorialLogic = () => {
  const { accessToken } = useContext(AuthContext);

  const [tipoMarcacion, setTipoMarcacion] = useState('');
  const [estadoMarcacion, setEstadoMarcacion] = useState('');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [registros, setRegistros] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [columnaOrden, setColumnaOrden] = useState('');
  const [direccionOrden, setDireccionOrden] = useState('asc');

  const registrosPorPagina = 10;
  const fechasInvalidas = fechaDesde && fechaHasta && fechaDesde > fechaHasta;

  const limpiarFiltros = () => {
    setTipoMarcacion('');
    setEstadoMarcacion('');
    setFechaDesde('');
    setFechaHasta('');
    setPaginaActual(1);
  };

  const obtenerMarcaciones = async () => {
    setCargando(true);
    try {
      const response = await axiosInstance.get("https://backend-asistencia-pattern.onrender.com/api/historial/", {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          tipo: tipoMarcacion,
          estado: estadoMarcacion,
          desde: fechaDesde,
          hasta: fechaHasta,
        },
      });
      setRegistros(response.data);
    } catch (error) {
      console.error("Error al obtener marcaciones:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (accessToken) obtenerMarcaciones();
  }, [accessToken, tipoMarcacion, estadoMarcacion, fechaDesde, fechaHasta]);

  const manejarOrden = (columna) => {
    if (columna === columnaOrden) {
      setDireccionOrden(direccionOrden === 'asc' ? 'desc' : 'asc');
    } else {
      setColumnaOrden(columna);
      setDireccionOrden('asc');
    }
  };

  const obtenerClaseEstado = (estado) => {
    switch (estado) {
      case "A tiempo": return "a-tiempo";
      case "Antes de tiempo": return "antes-de-tiempo";
      case "Fuera de tiempo": return "fuera-de-tiempo";
      case "No determinado": return "no-determinado";
      default: return "";
    }
  };

  const registrosOrdenados = [...registros].sort((a, b) => {
    if (!columnaOrden) return 0;
    const valorA = a[columnaOrden] || '';
    const valorB = b[columnaOrden] || '';
    if (valorA < valorB) return direccionOrden === 'asc' ? -1 : 1;
    if (valorA > valorB) return direccionOrden === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPaginas = Math.ceil(registrosOrdenados.length / registrosPorPagina);
  const indiceInicio = (paginaActual - 1) * registrosPorPagina;
  const registrosPaginados = registrosOrdenados.slice(indiceInicio, indiceInicio + registrosPorPagina);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  const iconoOrden = (columna) => {
    if (columnaOrden !== columna) return '';
    return direccionOrden === 'asc' ? ' ▲' : ' ▼';
  };

  return {
    tipoMarcacion, estadoMarcacion, fechaDesde, fechaHasta,
    setTipoMarcacion, setEstadoMarcacion, setFechaDesde, setFechaHasta,
    paginaActual, setPaginaActual, cambiarPagina,
    registrosPaginados, cargando, fechasInvalidas,
    manejarOrden, iconoOrden, obtenerClaseEstado,
    totalPaginas, limpiarFiltros
  };
};
