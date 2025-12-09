import React from "react";
import "../styles/Card-acciones.css";
import { useNavigate } from 'react-router-dom';


export const CardAcciones = () => {
     const navigate = useNavigate();
     return (
     <div className="card-lugar">
        <div className="content-accion">
         <p className="lugar-encabezado">
           Agregar lugar de marcación
        </p>
          <p className="lugar-content">
            Esta acción te ayuda a llevar un control más preciso y eficiente de tu progreso. Si decides incluir esta información, puedes hacerlo fácilmente desde la sección 'Mi perfil'.
         </p>
            <button className="ver-detalle" onClick={() => navigate('/perfil')}>Ver perfil +</button>
        </div>
        
        
        <div className="content-accion">
         <p className="lugar-encabezado">
           Visualizar hisotrial de marcaciones
        </p>
          <p className="lugar-content">
            Es un espacio en el que puedes conocer todos los registros de asistencia que han logrado realizar en tu periodo trabajando con nosotros.
         </p>
            <button className="ver-detalle" onClick={() => navigate('/historial-marcaciones')}>Ver Historial +</button>
        </div>

     </div>
     );
};
