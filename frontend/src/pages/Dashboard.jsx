import { Waves, AlertTriangle, MapPin, TrendingUp, Users, Calendar } from 'lucide-react';

export default function PoseidonDashboard() {
  // Données mockées pour le développement
  const zones = [
    {
      id: 1,
      name: 'Calais Nord',
      current_probability: 92,
      active_patrols: 3,
      risk_level: 'critical',
      last_update: '2min ago'
    },
    {
      id: 2,
      name: 'Baie de Somme',
      current_probability: 85,
      active_patrols: 2,
      risk_level: 'high',
      last_update: '5min ago'
    },
    {
      id: 3,
      name: 'Dunkerque Est',
      current_probability: 78,
      active_patrols: 2,
      risk_level: 'high',
      last_update: '3min ago'
    },
    {
      id: 4,
      name: 'Berck-sur-Mer',
      current_probability: 58,
      active_patrols: 1,
      risk_level: 'medium',
      last_update: '8min ago'
    },
    {
      id: 5,
      name: 'Boulogne-sur-Mer',
      current_probability: 35,
      active_patrols: 0,
      risk_level: 'low',
      last_update: '12min ago'
    }
  ];

  const getRiskColor = (level) => {
    switch(level) {
      case 'critical': return 'bg-red-900 border-red-500';
      case 'high': return 'bg-orange-900 border-orange-500';
      case 'medium': return 'bg-yellow-900 border-yellow-500';
      case 'low': return 'bg-green-900 border-green-500';
      default: return 'bg-slate-800 border-slate-600';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Waves className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">POSÉIDON</h1>
              <p className="text-sm text-slate-400">Dashboard Opérationnel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-red-600 px-4 py-2 rounded-lg">
              <div className="text-xs text-red-200">Alertes actives</div>
              <div className="text-2xl font-bold">3</div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation rapide */}
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-3">
        <div className="flex gap-4">
          <a href="/map" className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center gap-2 transition-colors">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">Carte</span>
          </a>
          <a href="/analytics" className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center gap-2 transition-colors">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Analyses</span>
          </a>
          <a href="/patrols" className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center gap-2 transition-colors">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">Patrouilles</span>
          </a>
          <a href="/incidents" className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center gap-2 transition-colors">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">Incidents</span>
          </a>
          <a href="/reports" className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center gap-2 transition-colors">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">Rapports</span>
          </a>
        </div>
      </nav>

      <main className="p-6">
        {/* KPIs */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-slate-800 rounded-lg p-6">
            <div className="text-sm text-slate-400 mb-2">Zones Surveillées</div>
            <div className="text-4xl font-bold mb-1">5</div>
            <div className="text-xs text-green-400">Toutes actives</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-6">
            <div className="text-sm text-slate-400 mb-2">Patrouilles Actives</div>
            <div className="text-4xl font-bold mb-1">8</div>
            <div className="text-xs text-blue-400">+2 en standby</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-6">
            <div className="text-sm text-slate-400 mb-2">Incidents (24h)</div>
            <div className="text-4xl font-bold mb-1">4</div>
            <div className="text-xs text-orange-400">2 en cours</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-6">
            <div className="text-sm text-slate-400 mb-2">Départs Estimés</div>
            <div className="text-4xl font-bold mb-1">245</div>
            <div className="text-xs text-red-400">Prochaines 24h</div>
          </div>
        </div>

        {/* Zones */}
        <div>
          <h2 className="text-xl font-bold mb-4">État des Zones</h2>
          <div className="grid grid-cols-3 gap-6">
            {zones.map((zone) => (
              <div 
                key={zone.id} 
                className={`rounded-lg p-6 border-l-4 ${getRiskColor(zone.risk_level)}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{zone.name}</h3>
                    <p className="text-sm text-slate-400">{zone.last_update}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={`w-5 h-5 ${
                      zone.risk_level === 'critical' ? 'text-red-400 animate-pulse' :
                      zone.risk_level === 'high' ? 'text-orange-400' :
                      zone.risk_level === 'medium' ? 'text-yellow-400' : 'text-green-400'
                    }`} />
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-4xl font-bold mb-2">{zone.current_probability}%</div>
                  <div className="text-sm text-slate-400">Probabilité de départ</div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Patrouilles actives</span>
                  <span className="font-bold">{zone.active_patrols}</span>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-700">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-medium text-sm">
                    Voir détails
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}