import React, { useState, useEffect } from 'react';

const Reloj = () => {
    const [horaActual, setHoraActual] = useState(new Date());

    useEffect(() => {
        const intervalo = setInterval(() => {
            setHoraActual(new Date());
        }, 1000); 

        return () => clearInterval(intervalo);
    }, []);

    const formatoHora = horaActual.toLocaleTimeString('es-PE', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });

    return (
        <div className="reloj-activo">
            {formatoHora}
        </div>
    );
};

export default Reloj;
