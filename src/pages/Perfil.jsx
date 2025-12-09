import { Slidebar } from '../components/Slidebar';
import { usePerfilLogic } from '../hooks/PerfilLogic';
import "../styles/Perfil.css";

export const Perfil = () => {
  const {
    iniciales,
    nombreCompleto,
    cargo,
    datosEmpleado,
    modoEdicion,
    setModoEdicion,
    renderCampos,
    guardarCambios,
  } = usePerfilLogic();

  return (
    <div className="inicio-container">
      <Slidebar />
      <main className="main">
        <div className="contenedor-avatar-card">
          <div className="avatar">{iniciales}</div>
          <div className="card-inicial">
            <h1>{nombreCompleto}</h1>
            <p>{cargo}</p>
            <img
              src="src/assets/edit_icon_128873.svg"
              alt="Editar"
              className="icono-editar"
              onClick={() => setModoEdicion(!modoEdicion)}
              title="Editar"
            />
          </div>
        </div>

        <div className="contenedor-datos">
          <div className="seccion">
            <div className='titulo-seccion'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="i-icon-2x i-icon-white">
                <path fill="#1A212A" fillRule="evenodd" d="M4.464 15.465A5 5 0 0 1 8 14h8a5 5 0 0 1 5 5v2a1 1 0 1 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 1 1-2 0v-2a5 5 0 0 1 1.464-3.536M12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6M7 7a5 5 0 1 1 10 0A5 5 0 0 1 7 7" clipRule="evenodd"></path>
              </svg>
              <h3>Datos Personales</h3>
            </div>
            <div className="grupo-inputs">
              {renderCampos(datosEmpleado.personales, 'personales')}
            </div>
          </div>

          <div className="seccion">
            <div className='titulo-seccion'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="i-icon-2x i-icon-white">
                <g fill="#1A212A" fillRule="evenodd" clipRule="evenodd">
                  <path d="M3.879 1.879A3 3 0 0 1 6 1h8a1 1 0 0 1 .707.293l6 6A1 1 0 0 1 21 8v5a1 1 0 1 1-2 0V8.414L13.586 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h5a1 1 0 1 1 0 2H6a3 3 0 0 1-3-3V4a3 3 0 0 1 .879-2.121"></path>
                  <path d="M14 1a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1M17.111 17a2.111 2.111 0 1 0 0 4.222 2.111 2.111 0 0 0 0-4.222M13 19.111a4.111 4.111 0 1 1 8.222 0 4.111 4.111 0 0 1-8.222 0"></path>
                  <path d="M18.601 20.601a1 1 0 0 1 1.415 0l1.691 1.692a1 1 0 0 1-1.414 1.414L18.6 22.015a1 1 0 0 1 0-1.414"></path>
                </g>
              </svg>
              <h3>Datos Laborales</h3>
            </div>
            <div className="grupo-inputs">
              {renderCampos(datosEmpleado.laborales, 'laborales', false)}
            </div>
          </div>
        </div>

        <div className="contenedor-ubicacion">
          <div className="seccion-ubicacion">
            <div className='titulo-seccion'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="i-icon-blue i-icon-3x">
                <path fill="#1A212A" fillRule="evenodd" d="M12 2a8 8 0 0 0-8 8c0 3.098 2.016 6.104 4.226 8.437A29.4 29.4 0 0 0 12 21.773a29.412 29.412 0 0 0 3.774-3.335C17.984 16.103 20 13.097 20 10a8 8 0 0 0-8-8m0 21-.555.832-.003-.002-.007-.005-.023-.015-.082-.057q-.109-.074-.302-.214a31.428 31.428 0 0 1-4.254-3.727C4.484 17.397 2 13.903 2 10a10 10 0 0 1 20 0c0 3.902-2.484 7.396-4.774 9.813a31.4 31.4 0 0 1-4.254 3.726 19 19 0 0 1-.384.27l-.023.016-.007.005-.002.001s-.001.001-.556-.831m0 0 .555.832a1 1 0 0 1-1.11 0z" clipRule="evenodd"></path>
                <path fill="#1A212A" fillRule="evenodd" d="M12 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-4 2a4 4 0 1 1 8 0 4 4 0 0 1-8 0" clipRule="evenodd"></path>
              </svg>
              <h3>Lugar de marcación</h3>
            </div>
            <div className="grupo-inputs">
              {renderCampos(datosEmpleado.ubicacion, 'ubicacion')}
            </div>
          </div>
        </div>

        {modoEdicion && (
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <button onClick={guardarCambios} className="btn-guardar">
              Actualizar datos
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
