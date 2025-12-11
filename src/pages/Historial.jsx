import { Slidebar } from '../components/Slidebar';
import { useHistorialLogic } from '../hooks/HistorialLogic';
import "../styles/Historial.css";

import limpiarI from "../assets/reiniciar.png";

export const Historial = () => {
  const {
    tipoMarcacion,
    setTipoMarcacion,
    estadoMarcacion,
    setEstadoMarcacion,
    fechaDesde,
    setFechaDesde,
    fechaHasta,
    setFechaHasta,
    paginaActual,
    setPaginaActual,
    registrosPaginados,
    cargando,
    fechasInvalidas,
    totalPaginas,
    cambiarPagina,
    limpiarFiltros,
    manejarOrden,
    iconoOrden,
    obtenerClaseEstado,
  } = useHistorialLogic();

  return (
    <div className="inicio-container">
      <Slidebar />

      <main className="main">
        <h1 className="titulo-historial">Historial de Marcaciones</h1>

        <div className="filtros">
          <div className="campo-filtro">
            <label htmlFor="tipo-marcacion">Tipo de Marcación</label>
            <select id="tipo-marcacion" value={tipoMarcacion} onChange={(e) => { setTipoMarcacion(e.target.value); setPaginaActual(1); }}>
              <option value="">Todos</option>
              <option value="Ingreso">Ingreso</option>
              <option value="Inicio de Receso">Inicio de Receso</option>
              <option value="Fin de Receso">Fin de Receso</option>
              <option value="Salida">Salida</option>
              <option value="Horas Extra">Horas Extra</option>
            </select>
          </div>

          <div className="campo-filtro">
            <label htmlFor="estado-marcacion">Estado</label>
            <select id="estado-marcacion" value={estadoMarcacion} onChange={(e) => { setEstadoMarcacion(e.target.value); setPaginaActual(1); }}>
              <option value="">Todos</option>
              <option value="A tiempo">A tiempo</option>
              <option value="Antes de tiempo">Antes de tiempo</option>
              <option value="Fuera de tiempo">Fuera de tiempo</option>
              <option value="No determinado">No determinado</option>
            </select>
          </div>

          <div className="campo-filtro">
            <label htmlFor="fecha-desde">Desde</label>
            <input type="date" id="fecha-desde" value={fechaDesde} onChange={(e) => { setFechaDesde(e.target.value); setPaginaActual(1); }} />
          </div>

          <div className="campo-filtro">
            <label htmlFor="fecha-hasta">Hasta</label>
            <input type="date" id="fecha-hasta" value={fechaHasta} min={fechaDesde} onChange={(e) => { setFechaHasta(e.target.value); setPaginaActual(1); }} />
          </div>

          <div className="boton-limpiar">
            <img
              src={limpiarI}
              alt="Limpiar filtros"
              className="icon-reiniciar"
              onClick={limpiarFiltros}
              title="Limpiar filtros"
            />

            <button
              className="btn-limpiar-mobile"
              onClick={limpiarFiltros}
            >
              Limpiar filtros
            </button>
          </div>

        </div>

        <table className="tabla-marcaciones">
          <thead>
            <tr>
              <th onClick={() => manejarOrden('fecha')}>Fecha{iconoOrden('fecha')}</th>
              <th onClick={() => manejarOrden('tipo')}>Tipo{iconoOrden('tipo')}</th>
              <th onClick={() => manejarOrden('hora')}>Hora{iconoOrden('hora')}</th>
              <th onClick={() => manejarOrden('estado')}>Estado{iconoOrden('estado')}</th>
              <th onClick={() => manejarOrden('observacion')}>Observación{iconoOrden('observacion')}</th>
            </tr>
          </thead>

          <tbody className="tbody-responsive">
            {fechasInvalidas ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', color: 'gray' }}>La fecha "Desde" no puede ser mayor que la fecha "Hasta"</td></tr>
            ) : cargando ? (
              <tr><td colSpan="5" style={{ textAlign: 'center' }}>Cargando...</td></tr>
            ) : registrosPaginados.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center' }}>No hay registros</td></tr>
            ) : (
              registrosPaginados.map((r, i) => (
                <tr key={i}>
                  <td data-label="Fecha">{r.fecha}</td>
                  <td data-label="Tipo">{r.tipo}</td>
                  <td data-label="Hora">{r.hora || '-'}</td>
                  <td data-label="Estado">
                    <span className={`estado ${obtenerClaseEstado(r.estado)}`}>
                      {r.estado}
                    </span>
                  </td>
                  <td data-label="Observación">{r.observacion || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {totalPaginas > 1 && !fechasInvalidas && (
          <div className="paginacion">
            <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>Anterior</button>
            <span>Página {paginaActual} de {totalPaginas}</span>
            <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>Siguiente</button>
          </div>
        )}
      </main>
    </div>
  );
};
