import { Header } from './components/Header';
import { AppRouter } from './Router/AppRouter';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  const rutasSinHeader = ['/'];

  const mostrarHeader = !rutasSinHeader.includes(location.pathname);

  return (
    <>
      {mostrarHeader && <Header />}
      <AppRouter />
    </>
  );
}

export default App;
