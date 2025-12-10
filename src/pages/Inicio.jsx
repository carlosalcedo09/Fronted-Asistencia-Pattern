import "../styles/Inicio.css";
import { useEffect, useState } from 'react';
import { Slidebar } from '../components/Slidebar';
import { CardHorario } from "../components/Card-horario";
import { CardAcciones } from "../components/Card-accciones";
import { ContadorAnimado } from "../components/ContadorAnimado"; 
import { useInicioLogic } from '../hooks/InicioLogic';

export const Inicio = () => {
  const {
    resumen,
    nombre_empleado,
    tiempo_empresa,
    cardsData
  } = useInicioLogic();

  if (!resumen) {
    return <div className="inicio-container"><p>Cargando resumen...</p></div>;
  }

  return (
    <div className="inicio-container">
      <Slidebar />
      <main className="main">
        <div className="card-bienvenida">
          <div>
            <h1>Hola {nombre_empleado},</h1>
            <p>Bienvenido a tu gestor de Asistencias</p>
          </div>
          <div className="ahorro-total">
            <p>Tienes trabajando en la empresa</p>
            <h2>{tiempo_empresa}</h2>
          </div>
        </div>

        <p className="text-bold">Tu resumen en este mes: </p>

        <div className="cards-container">
          {cardsData.map((card) => (
            <div className="card fondo" key={card.id}>
              <div>
                <img src={card.imagen} className="icon-dashboard" alt={card.texto} />
              </div>
              <div className="content-card">
                <h2><ContadorAnimado final={card.cantidad} duracion={1000} /></h2>
                <h3>{card.texto}</h3>
                {card.mostrarBoton && <button className="ver-detalle">Ver detalle +</button>}
              </div>
            </div>
          ))}
        </div>

        <div className="cards">
          <CardAcciones />
          <CardHorario />
        </div>
      </main>
    </div>
  );
};