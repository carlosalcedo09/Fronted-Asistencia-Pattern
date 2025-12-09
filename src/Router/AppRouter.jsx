import {Routes,Route, Navigate} from 'react-router-dom'
import { Inicio } from '../pages/Inicio'
import { Perfil } from '../pages/Perfil'
import { Historial } from '../pages/Historial'
import { Marcaciones } from '../pages/Marcaciones'
import { Login } from '../pages/Login'
import { PrivateRoute } from '../components/PrivateRoute';
import { Dashboard } from '../pages/Dashboard';


export const AppRouter= () => {
    return (
        <>
        <Routes>
            <Route path = '/' element= {< Login/>}/>
             <Route
                path="/home"
                element={
                <PrivateRoute>
                    <Inicio />
                </PrivateRoute>
                }
            />
            <Route
                path="/perfil"
                element={
                <PrivateRoute>
                    <Perfil />
                </PrivateRoute>
                }
            />
             <Route
                path="/historial-marcaciones"
                element={
                <PrivateRoute>
                    <Historial />
                </PrivateRoute>
                }
            />
            <Route
                path="/marcaciones"
                element={
                <PrivateRoute>
                    <Marcaciones />
                </PrivateRoute>
                }
            />
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                    <Dashboard />
                    </PrivateRoute>
                }
            />
            <Route path='/*' element={<PrivateRoute><Navigate to = '/home'/></PrivateRoute>}/>
        </Routes>
        </>
    )
}