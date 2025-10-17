import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { AlertTriangle, Waves } from 'lucide-react';

export default function PoseidonDashboard() {
  const { data: zones, isLoading } = useQuery({
    queryKey: ['zones'],
    queryFn: async () => {
      const response = await api.get('/zones');
      return response.data;
    }
  });

  if (isLoading) {
    return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      Chargement...
    </div>;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Waves className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">POSÉIDON</h1>
            <p className="text-sm text-slate-400">Dashboard Opérationnel</p>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="grid grid-cols-3 gap-6">
          {zones?.map((zone) => (
            <div key={zone.id} className="bg-slate-800 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-2">{zone.name}</h3>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                <span className="text-2xl font-bold">{zone.current_probability}%</span>
              </div>
              <p className="text-sm text-slate-400 mt-2">
                {zone.active_patrols} patrouilles actives
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}