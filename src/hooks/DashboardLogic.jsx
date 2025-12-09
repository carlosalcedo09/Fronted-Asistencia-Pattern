import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from '../utils/AxiosInstance';

export const useDashboardLogic = () => {
  const { accessToken } = useContext(AuthContext);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const [dataAsistenciaMensual, setDataAsistenciaMensual] = useState([]);
  const [dataPuntualidad, setDataPuntualidad] = useState([]);
  const [dataTipoMarcacion, setdataTipoMarcacion] = useState([]);
  const [dataRotacionEmpleados, setDataRotacionEmpleados] = useState([]);
  const [dataRadar, setDataRadar] = useState([]);
  const [dataDonut, setDataDonut] = useState([
    { name: "Asistencias", value: 0 },
    { name: "Ausencias", value: 0 },
  ]);

  const [resumen, setResumen] = useState({
    total_empleados: 0,
    total_asistencias: 0,
    total_ausencias: 0,
    total_tardanzas: 0,
    total_horas_extra: 0,
  });

  const donutColors = ["#2e7d32", "#d32f2f"];

  // ======================== API CALLS ========================

  const obtenerResumen = async () => {
    try {
      const res = await axiosInstance.get("/dashboard/resumen-general/", {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { year: selectedYear, month: selectedMonth },
      });
      setResumen(res.data);

      // Actualizar gráfico de dona
      setDataDonut([
        { name: "Asistencias", value: res.data.total_asistencias },
        { name: "Ausencias", value: res.data.total_ausencias },
      ]);
    } catch (err) {
      console.error("Error al obtener resumen general:", err);
    }
  };

  const obtenerResumenAsistencias = async () => {
    try {
      const res = await axiosInstance.get("/dashboard/resumen-mensual-asistencias/", {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { year: selectedYear, month: selectedMonth },
      });
      setDataAsistenciaMensual(res.data);
    } catch (err) {
      console.error("Error al obtener resumen asistencias:", err);
    }
  };

  const obtenerResumenPuntualidad = async () => {
    try {
      const res = await axiosInstance.get("/dashboard/resumen-mensual-puntualidad/", {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { year: selectedYear, month: selectedMonth },
      });
      setDataPuntualidad(res.data);
    } catch (err) {
      console.error("Error al obtener resumen puntualidad:", err);
    }
  };

  const obtenerResumenMensualAsistencia = async () => {
    try {
      const res = await axiosInstance.get("/dashboard/resumen-asistencia/", {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { year: selectedYear, month: selectedMonth },
      });
      setDataRadar(res.data);
    } catch (err) {
      console.error("Error al obtener asistencia por área:", err);
    }
  };

  const obtenerResumenTipoMarcacion = async () => {
    try {
      const res = await axiosInstance.get("/dashboard/resumen-tipo-marcacion/", {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { year: selectedYear, month: selectedMonth },
      });
      setdataTipoMarcacion([
        { area: "Ingreso", Registros: res.data.Ingreso || 0 },
        { area: "Salida", Registros: res.data.Salida || 0 },
        { area: "Horas Extra", Registros: res.data.Horas_Extra || 0 },
      ]);
    } catch (err) {
      console.error("Error al obtener tipos de marcación:", err);
    }
  };

  const obtenerResumenNomina = async () => {
    try {
      const res = await axiosInstance.get("/dashboard/resumen-nomina/", {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { year: selectedYear, month: selectedMonth },
      });
      setDataRotacionEmpleados(res.data);
      console.log(res.data)
    } catch (err) {
      console.error("Error al obtener resumen puntualidad:", err);
    }
  };

  // ======================== USE EFFECT ========================

  useEffect(() => {
    if (accessToken) {
      obtenerResumen();
      obtenerResumenAsistencias();
      obtenerResumenPuntualidad();
      obtenerResumenMensualAsistencia();
      obtenerResumenTipoMarcacion();
      obtenerResumenNomina();
    }
  }, [accessToken, selectedYear, selectedMonth]);

  // ======================== TARJETAS ========================

  const stats = [
    { label: "N° Empleados", value: resumen.total_empleados, bgColor: "#1976d2" },
    { label: "Asistencias este mes", value: resumen.total_asistencias, bgColor: "#2e7d32" },
    { label: "Ausencias este mes", value: resumen.total_ausencias, bgColor: "#d32f2f" },
    { label: "Tardanzas este mes", value: resumen.total_tardanzas, bgColor: "orange" },
    { label: "Horas extra este mes", value: resumen.total_horas_extra, bgColor: "green" },
  ];


  // ======================== RETORNO ========================

  return {
    selectedYear, setSelectedYear,
    selectedMonth, setSelectedMonth,
    stats,
    dataAsistenciaMensual,
    dataPuntualidad,
    dataTipoMarcacion,
    dataRotacionEmpleados,
    dataRadar,
    dataDonut,
    donutColors,
  };
};
