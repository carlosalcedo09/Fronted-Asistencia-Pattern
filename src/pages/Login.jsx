import "../styles/Login.css";
import { useLoginLogic } from "../hooks/LoginLogic";
import Pattern from "../assets/Pattern.png";

export const Login = () => {
  const {
    usuario,
    password,
    mostrarPassword,
    error,
    handleLogin,
    setUsuario,
    setPassword,
    togglePassword,
  } = useLoginLogic();

  return (
    <div className="container">
      <div className="login-container">
        <div className="login">
          <img src={Pattern} className="img-logo-login" />
          <h2>Bienvenido a tu</h2>
          <h1>Sistema de Asistencia</h1>

          <form className="form-login" onSubmit={handleLogin}>
            <div className="campo">
              <label htmlFor="usuario">Usuario</label>
              <input
                type="text"
                id="usuario"
                placeholder="Ingresa tu usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </div>

            <div className="campo campo-password">
              <label htmlFor="password">Contraseña</label>
              <div className="input-con-icono">
                <input
                  type={mostrarPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span onClick={togglePassword} className="icono-ver">
                  {mostrarPassword ? (
                    <svg>{/* SVG ocultar */}</svg>
                  ) : (
                    <svg>{/* SVG mostrar */}</svg>
                  )}
                </span>
              </div>
            </div>

            {error && <p className="mensaje-error">{error}</p>}

            <button type="submit">Iniciar Sesión</button>
          </form>
        </div>
      </div>
      <div className="container-img"></div>
    </div>
  );
};
