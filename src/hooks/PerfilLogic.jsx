import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import axiosInstance from '../utils/AxiosInstance';

export const usePerfilLogic = () => {
  const [iniciales, setIniciales] = useState('');
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [cargo, setCargo] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [datosEmpleado, setDatosEmpleado] = useState({
    personales: {},
    laborales: {},
    ubicacion: {}
  });

  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await axiosInstance.get('/perfil/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = response.data;
        setNombreCompleto(data.nombre_completo || '');
        setCargo(data.cargo || '');
        setDatosEmpleado({
          personales: data.personales,
          laborales: data.laborales,
          ubicacion: data.ubicacion,
        });

        const palabras = (data.nombre_completo || '').trim().split(' ');
        const iniciales = palabras.map((p) => p[0]).join('').slice(0, 2).toUpperCase();
        setIniciales(iniciales);
      } catch (error) {
        console.error('Error al obtener perfil:', error);
      }
    };

    if (accessToken) {
      fetchDatos();
    }
  }, [accessToken]);

  const handleChange = (seccion, campo, nuevoValor) => {
    setDatosEmpleado((prev) => ({
      ...prev,
      [seccion]: {
        ...prev[seccion],
        [campo]: nuevoValor,
      },
    }));
  };

  const renderCampos = (datos, seccion, editable = true) =>
    Object.entries(datos).map(([label, value], index) => (
      <div className="floating-label" key={`${seccion}-${index}`}>
        <input
          type="text"
          value={value || ''}
          readOnly={!modoEdicion || !editable}
          placeholder=" "
          id={`input-${seccion}-${index}`}
          onChange={(e) => handleChange(seccion, label, e.target.value)}
        />
        <label htmlFor={`input-${seccion}-${index}`}>{label}</label>
      </div>
    ));

  const guardarCambios = async () => {
    try {
      await axiosInstance.put('/perfil/', datosEmpleado, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      Swal.fire({
        title: 'Actualización exitosa',
        text: 'Los datos han sido actualizados correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });

      setModoEdicion(false);
    } catch (error) {
      console.error('Error al actualizar datos:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudieron actualizar los datos.',
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
    }
  };

  return {
    iniciales,
    nombreCompleto,
    cargo,
    datosEmpleado,
    modoEdicion,
    setModoEdicion,
    renderCampos,
    guardarCambios,
  };
};
