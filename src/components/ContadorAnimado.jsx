import { useEffect, useState } from "react";

export const ContadorAnimado = ({ final, duracion = 1500 }) => {
  const [valor, setValor] = useState(0);

  useEffect(() => {
    let inicio = 0;
    const incremento = final / (duracion / 16); 
    let raf;

    const animar = () => {
      inicio += incremento;
      if (inicio < final) {
        setValor(Math.floor(inicio));
        raf = requestAnimationFrame(animar);
      } else {
        setValor(final);
        cancelAnimationFrame(raf);
      }
    };

    animar();

    return () => cancelAnimationFrame(raf);
  }, [final, duracion]);

  return <span>{valor}</span>;
};
