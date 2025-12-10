import { useNavigate } from 'react-router-dom';
import { Slidebar } from '../components/Slidebar';
import Reloj from '../components/Reloj';
import { CardHorario } from '../components/Card-horario';
import { useMarcacionesLogic } from '../hooks/MarcacionesLogic';
import '../styles/Marcaciones.css';

export const Marcaciones = () => {
  const navigate = useNavigate();
  const {
    marcaciones,
    estadoMarcaciones,
    manejarMarcacion,
    getButtonClass,
  } = useMarcacionesLogic();

  return (
    <div className="inicio-container">
      <Slidebar />
      <main className="main">
        <div className="main-encabezado">
          <div>
            <h1>Registro de marcaciones</h1>
            <p className="especial-content">Realiza las marcaciones del día de acuerdo a tu horario laboral</p>
          </div>
        </div>

        <div className="column">
          <div className="column-seccion-a">
            <div className="acciones-marcacion">
              <div className="accciones-content">
                <button
                  className={getButtonClass(!estadoMarcaciones.ingreso, false, true)}
                  onClick={() => manejarMarcacion('Ingreso')}
                  disabled={estadoMarcaciones.ingreso}
                >
                  INGRESO
                </button>
              </div>

              <div className="accciones-content">
                <button
                  className={getButtonClass(estadoMarcaciones.ingreso && !estadoMarcaciones.inicioReceso)}
                  onClick={() => manejarMarcacion('Inicio de receso')}
                  disabled={!estadoMarcaciones.ingreso || estadoMarcaciones.inicioReceso}
                >
                  <i className="fa fa-clock"></i> Inicio de Receso
                </button>

                <button
                  className={getButtonClass(estadoMarcaciones.inicioReceso && !estadoMarcaciones.finReceso)}
                  onClick={() => manejarMarcacion('Fin de receso')}
                  disabled={!estadoMarcaciones.inicioReceso || estadoMarcaciones.finReceso}
                >
                  <i className="fa fa-clock"></i> Fin de Receso
                </button>

                <button
                  className={getButtonClass(
                    estadoMarcaciones.salida && estadoMarcaciones.horasExtraCount < 2,
                    estadoMarcaciones.horasExtraCount >= 2
                  )}
                  onClick={() => manejarMarcacion('Horas extra')}
                  disabled={estadoMarcaciones.horasExtraCount >= 2 || !estadoMarcaciones.salida}
                >
                  <i className="fa fa-check-circle"></i> Horas extra
                </button>
              </div>

              <div className="accciones-content">
                <button
                  className={getButtonClass(estadoMarcaciones.finReceso && !estadoMarcaciones.salida, false, true)}
                  onClick={() => manejarMarcacion('Salida')}
                  disabled={!estadoMarcaciones.finReceso || estadoMarcaciones.salida}
                >
                  SALIDA
                </button>
              </div>
            </div>

            <div>
              <p>Tus marcaciones del día</p>
              <div className="content-marcaciones">
                <div className="list-marcaciones">
                  {marcaciones.map((marcacion, idx) => {
                    const estado = marcacion.estado?.toLowerCase().replace(/\s/g, '-');
                    const claseEstado = `detail-marcation estado-${estado}`;

                    return (
                      <div key={idx} className={claseEstado}>
                        <strong>Marcación de {marcacion.tipo}</strong>: {marcacion.hora} ({marcacion.estado})
                      </div>
                    );
                  })}
                </div>

                <button className="ver-detalle" onClick={() => navigate('/historial-marcaciones')}>
                  Ver Historial de Marcaciones
                </button>
              </div>
            </div>
          </div>

          <div className="column-seccion-b">
            <div className="content-cronometro">
              <Reloj />
            </div>
            <CardHorario />
          </div>
        </div>
      </main>
    </div>
  );
};
