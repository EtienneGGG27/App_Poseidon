import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Map from './pages/Map';
import Analytics from './pages/Analytics';
import Alerts from './pages/Alerts';
import Patrols from './pages/Patrols';
import Incidents from './pages/Incidents';
import Reports from './pages/Reports';
import Config from './pages/Config';
import Training from './pages/Training';

const queryClient = new QueryClient();

// Version simplifiée sans protection pour le développement
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/map" element={<Map />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/patrols" element={<Patrols />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/config" element={<Config />} />
          <Route path="/training" element={<Training />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;