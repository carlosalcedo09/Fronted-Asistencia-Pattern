
import { useContext,useState } from "react";
import {Link,useLocation} from 'react-router-dom'
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

import "../styles/Slidebar.css";

export const Slidebar= () => {
    
    const location = useLocation();
    const rutaActual = location.pathname;
    

    const { logout } = useContext(AuthContext);

    const nombre_empleado= (localStorage.getItem("nombre_empleado") || '').trim().split(' ');

    const iniciales = nombre_empleado.map(p => p[0]).join('').slice(0, 2).toUpperCase();

    const handleLogout = async () => {
        const token = localStorage.getItem("access_token");
        try {
        await axios.post(
            "http://localhost:8000/api/logout-all/",
            {},
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );
        } catch (error) {
        console.error("Error cerrando sesiones", error);
        } finally {
        logout(); 
        }
    };

    return (
        <>
        
        {/* Sidebar */}
        <aside className="sidebar">
            <div>
                <nav className="nav">
                    <div className={`nav-button ${rutaActual === '/' ? 'active' : ''}`}>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="i-icon-2x i-icon-white"><path fill="#1A212A" fillRule="evenodd" d="M11.386 1.21a1 1 0 0 1 1.228 0l9 7A1 1 0 0 1 22 9v11a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V9a1 1 0 0 1 .386-.79zM4 9.49V20a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9.49l-8-6.223z" clipRule="evenodd"></path><path fill="#1A212A" fillRule="evenodd" d="M8 12a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0v-9h-4v9a1 1 0 1 1-2 0z" clipRule="evenodd"></path></svg>
                        <Link to="/home" className="nav-text" >Inicio</Link>
                    </div>
                    <div className={`nav-button ${rutaActual === '/marcaciones' ? 'active' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="i-icon-2x i-icon-white"><g fill="#1A212A" fillRule="evenodd" clipRule="evenodd"><path d="M3.879 1.879A3 3 0 0 1 6 1h8a1 1 0 0 1 .707.293l6 6A1 1 0 0 1 21 8v5a1 1 0 1 1-2 0V8.414L13.586 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h5a1 1 0 1 1 0 2H6a3 3 0 0 1-3-3V4a3 3 0 0 1 .879-2.121"></path><path d="M14 1a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1M17.111 17a2.111 2.111 0 1 0 0 4.222 2.111 2.111 0 0 0 0-4.222M13 19.111a4.111 4.111 0 1 1 8.222 0 4.111 4.111 0 0 1-8.222 0"></path><path d="M18.601 20.601a1 1 0 0 1 1.415 0l1.691 1.692a1 1 0 0 1-1.414 1.414L18.6 22.015a1 1 0 0 1 0-1.414"></path></g></svg>
                        <Link to="/marcaciones" className="nav-text">Marcaciones</Link>
                    </div>
                    <div className={`nav-button ${rutaActual === '/historial-marcaciones' ? 'active' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="i-icon-2x i-icon-white"><path fill="#1A212A" fillRule="evenodd" d="M3.879 1.879A3 3 0 0 1 6 1h8a1 1 0 0 1 .707.293l6 6A1 1 0 0 1 21 8v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V4a3 3 0 0 1 .879-2.121M6 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8.414L13.586 3z" clipRule="evenodd"></path><path fill="#1A212A" fillRule="evenodd" d="M14 1a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1M7 13a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1M7 17a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1M7 9a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1" clipRule="evenodd"></path></svg>
                         <Link to="/historial-marcaciones" className="nav-text">Historial de Marcaciones</Link>
                    </div>
                    <div className={`nav-button ${rutaActual === '/dashboard' ? 'active' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="i-icon-2x i-icon-white"><path fill="#1A212A" fillRule="evenodd" d="M12 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1A11 11 0 0 0 12 1m1 10V3.056A9 9 0 0 1 20.944 11zM8.4 3.747a1 1 0 0 0-.8-1.833A11 11 0 1 0 22.131 16.28a1 1 0 0 0-1.842-.78A9 9 0 1 1 8.399 3.748" clipRule="evenodd"></path></svg>
                        <Link to="/dashboard" className="nav-text">Dashboard</Link>
                    </div>
                    <div className={`nav-button ${rutaActual === '/perfil' ? 'active' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="i-icon-2x i-icon-white"><path fill="#1A212A" fillRule="evenodd" d="M4.464 15.465A5 5 0 0 1 8 14h8a5 5 0 0 1 5 5v2a1 1 0 1 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 1 1-2 0v-2a5 5 0 0 1 1.464-3.536M12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6M7 7a5 5 0 1 1 10 0A5 5 0 0 1 7 7" clipRule="evenodd"></path></svg>
                        <Link to="/perfil" className="nav-text">Perfil</Link>
                    </div>
                    
                </nav>
            </div>
            <div className="sidebar-footer">
                <div className="sidebar-divider"></div>
                <div className="logout" onClick={handleLogout}>
                    <div className="user-circle">{iniciales}</div>
                    <span>Cerrar sesión</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="i-icon-2x i-icon-white"><path fill="#1A212A" fillRule="evenodd" d="M5 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4a1 1 0 1 1 0 2H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h4a1 1 0 0 1 0 2zM15.293 6.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414-1.414L19.586 12l-4.293-4.293a1 1 0 0 1 0-1.414" clipRule="evenodd"></path><path fill="#1A212A" fillRule="evenodd" d="M8 12a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1" clipRule="evenodd"></path></svg>
                </div>
            </div>
</aside>
                    {/* -------- FOOTER MOBILE -------- */}
            <nav className="bottom-nav-mobile">
                <Link to="/home" className={`bn-item ${rutaActual === "/home" ? "active" : ""}`}>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="i-icon-2x i-icon-white"><path fill="#ffffffff" fillRule="evenodd" d="M11.386 1.21a1 1 0 0 1 1.228 0l9 7A1 1 0 0 1 22 9v11a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V9a1 1 0 0 1 .386-.79zM4 9.49V20a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9.49l-8-6.223z" clipRule="evenodd"></path><path fill="#ffffffff" fillRule="evenodd" d="M8 12a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0v-9h-4v9a1 1 0 1 1-2 0z" clipRule="evenodd"></path></svg>
                </Link>

                <Link to="/marcaciones" className={`bn-item ${rutaActual === "/marcaciones" ? "active" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="i-icon-2x i-icon-white"><g fill="#ffffffff" fillRule="evenodd" clipRule="evenodd"><path d="M3.879 1.879A3 3 0 0 1 6 1h8a1 1 0 0 1 .707.293l6 6A1 1 0 0 1 21 8v5a1 1 0 1 1-2 0V8.414L13.586 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h5a1 1 0 1 1 0 2H6a3 3 0 0 1-3-3V4a3 3 0 0 1 .879-2.121"></path><path d="M14 1a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1M17.111 17a2.111 2.111 0 1 0 0 4.222 2.111 2.111 0 0 0 0-4.222M13 19.111a4.111 4.111 0 1 1 8.222 0 4.111 4.111 0 0 1-8.222 0"></path><path d="M18.601 20.601a1 1 0 0 1 1.415 0l1.691 1.692a1 1 0 0 1-1.414 1.414L18.6 22.015a1 1 0 0 1 0-1.414"></path></g></svg>
                </Link>

                <Link to="/historial-marcaciones" className={`bn-item ${rutaActual === "/historial-marcaciones" ? "active" : ""}`}>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="i-icon-2x i-icon-white"><path fill="#ffffffff" fillRule="evenodd" d="M3.879 1.879A3 3 0 0 1 6 1h8a1 1 0 0 1 .707.293l6 6A1 1 0 0 1 21 8v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V4a3 3 0 0 1 .879-2.121M6 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8.414L13.586 3z" clipRule="evenodd"></path><path fill="#ffffffff" fillRule="evenodd" d="M14 1a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1M7 13a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1M7 17a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1M7 9a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1" clipRule="evenodd"></path></svg>
                </Link>

                <Link to="/dashboard" className={`bn-item ${rutaActual === "/dashboard" ? "active" : ""}`}>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="i-icon-2x i-icon-white"><path fill="#ffffffff" fillRule="evenodd" d="M12 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1A11 11 0 0 0 12 1m1 10V3.056A9 9 0 0 1 20.944 11zM8.4 3.747a1 1 0 0 0-.8-1.833A11 11 0 1 0 22.131 16.28a1 1 0 0 0-1.842-.78A9 9 0 1 1 8.399 3.748" clipRule="evenodd"></path></svg>
                </Link>

                <Link to="/perfil" className={`bn-item ${rutaActual === "/perfil" ? "active" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="i-icon-2x i-icon-white"><path fill="#ffffffff" fillRule="evenodd" d="M4.464 15.465A5 5 0 0 1 8 14h8a5 5 0 0 1 5 5v2a1 1 0 1 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 1 1-2 0v-2a5 5 0 0 1 1.464-3.536M12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6M7 7a5 5 0 1 1 10 0A5 5 0 0 1 7 7" clipRule="evenodd"></path></svg>
                </Link>
            </nav>

      
        </>
    )
}