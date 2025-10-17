import React, { useState } from 'react';
import { MapPin, Waves, Wind, Navigation, Zap, Eye, Layers, Filter, Download, Bell } from 'lucide-react';

const PoseidonMap = () => {
  const [selectedLayer, setSelectedLayer] = useState({
    zones: true,
    meteo: true,
    courants: true,
    historique: false
  });
  const [timeRange, setTimeRange] = useState('6h');
  const [selectedZone, setSelectedZone] = useState(null);

  const zones = [
    { 
      id: 1, 
      name: 'Calais Nord', 
      coords: { x: 320, y: 140 },
      risk: 'critical',
      probability: 92,
      waveHeight: 0.6,
      windSpeed: 10,
      windDir: 'SW',
      tideTime: '14:35',
      tideCoef: 87,
      lastDeparture: '2h ago',
      activeSites: 3
    },
    { 
      id: 2, 
      name: 'Baie de Somme', 
      coords: { x: 200, y: 180 },
      risk: 'high',
      probability: 85,
      waveHeight: 0.7,
      windSpeed: 12,
      windDir: 'W',
      tideTime: '14:20',
      tideCoef: 85,
      lastDeparture: '45min ago',
      activeSites: 4
    },
    { 
      id: 3, 
      name: 'Dunkerque Est', 
      coords: { x: 390, y: 110 },
      risk: 'high',
      probability: 78,
      waveHeight: 0.8,
      windSpeed: 14,
      windDir: 'WSW',
      tideTime: '14:50',
      tideCoef: 82,
      lastDeparture: '3h ago',
      activeSites: 2
    },
    { 
      id: 4, 
      name: 'Berck-sur-Mer', 
      coords: { x: 160, y: 220 },
      risk: 'medium',
      probability: 58,
      waveHeight: 0.9,
      windSpeed: 15,
      windDir: 'W',
      tideTime: '14:10',
      tideCoef: 79,
      lastDeparture: '6h ago',
      activeSites: 1
    },
    { 
      id: 5, 
      name: 'Boulogne-sur-Mer', 
      coords: { x: 240, y: 200 },
      risk: 'low',
      probability: 35,
      waveHeight: 1.1,
      windSpeed: 18,
      windDir: 'NW',
      tideTime: '13:55',
      tideCoef: 75,
      lastDeparture: '12h ago',
      activeSites: 0
    }
  ];

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'critical': return { bg: 'bg-red-600', border: 'border-red-500', pulse: 'animate-pulse' };
      case 'high': return { bg: 'bg-orange-500', border: 'border-orange-400', pulse: '' };
      case 'medium': return { bg: 'bg-yellow-500', border: 'border-yellow-400', pulse: '' };
      case 'low': return { bg: 'bg-green-500', border: 'border-green-400', pulse: '' };
      default: return { bg: 'bg-gray-500', border: 'border-gray-400', pulse: '' };
    }
  };

  const meteoPoints = [
    { x: 150, y: 200, wind: 12, dir: 225, wave: 0.7 },
    { x: 250, y: 180, wind: 14, dir: 240, wave: 0.8 },
    { x: 350, y: 150, wind: 10, dir: 225, wave: 0.6 },
    { x: 200, y: 240, wind: 16, dir: 270, wave: 0.9 }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">POSÉIDON - Cartographie Opérationnelle</h1>
              <p className="text-sm text-slate-400">Surveillance et prédiction en temps réel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="text-sm font-medium">3 Alertes actives</span>
            </button>
            <button className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar Contrôles */}
        <div className="w-80 bg-slate-800 border-r border-slate-700 overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* Fenêtre Temporelle */}
            <div>
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400" />
                Fenêtre de Prédiction
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {['3h', '6h', '12h', '24h', '48h', '72h'].map((time) => (
                  <button
                    key={time}
                    onClick={() => setTimeRange(time)}
                    className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                      timeRange === time
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Couches Cartographiques */}
            <div>
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400" />
                Couches d'Information
              </h3>
              <div className="space-y-2">
                {[
                  { key: 'zones', label: 'Zones de départ', icon: MapPin },
                  { key: 'meteo', label: 'Conditions météo', icon: Wind },
                  { key: 'courants', label: 'Courants marins', icon: Waves },
                  { key: 'historique', label: 'Données historiques', icon: Navigation }
                ].map(({ key, label, icon: Icon }) => (
                  <label key={key} className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg cursor-pointer hover:bg-slate-600">
                    <input
                      type="checkbox"
                      checked={selectedLayer[key]}
                      onChange={(e) => setSelectedLayer({...selectedLayer, [key]: e.target.checked})}
                      className="w-4 h-4"
                    />
                    <Icon className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filtres de Risque */}
            <div>
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Filter className="w-4 h-4 text-blue-400" />
                Filtres de Risque
              </h3>
              <div className="space-y-2">
                {[
                  { level: 'Critique', color: 'bg-red-600', count: 1 },
                  { level: 'Élevé', color: 'bg-orange-500', count: 2 },
                  { level: 'Moyen', color: 'bg-yellow-500', count: 1 },
                  { level: 'Faible', color: 'bg-green-500', count: 1 }
                ].map(({ level, color, count }) => (
                  <label key={level} className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg cursor-pointer hover:bg-slate-600">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <div className={`w-3 h-3 ${color} rounded-full`}></div>
                    <span className="text-sm flex-1">{level}</span>
                    <span className="text-xs text-slate-400">{count}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Statistiques Globales */}
            <div className="bg-slate-700 rounded-lg p-4">
              <h3 className="font-bold mb-3">Situation Globale</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Zones surveillées</span>
                  <span className="font-bold text-lg">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Sites actifs</span>
                  <span className="font-bold text-lg text-red-400">10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Tentatives (24h)</span>
                  <span className="font-bold text-lg text-orange-400">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Risque moyen</span>
                  <span className="font-bold text-lg text-red-400">69%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Zone Carte Principale */}
        <div className="flex-1 relative">
          {/* Carte */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
            <svg className="w-full h-full" viewBox="0 0 600 400">
              {/* Mer - gradient */}
              <defs>
                <linearGradient id="seaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e3a5f" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <pattern id="waves" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
                  <path d="M0 10 Q10 5 20 10 T40 10" stroke="#334155" strokeWidth="0.5" fill="none" opacity="0.3"/>
                </pattern>
              </defs>
              
              <rect width="600" height="400" fill="url(#seaGradient)" />
              <rect width="600" height="400" fill="url(#waves)" />

              {/* Côte française */}
              <path
                d="M 50 300 Q 100 280 150 260 Q 200 250 250 240 Q 300 230 350 220 Q 400 210 450 190"
                stroke="#64748b"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M 50 300 Q 100 280 150 260 Q 200 250 250 240 Q 300 230 350 220 Q 400 210 450 190 L 450 400 L 50 400 Z"
                fill="#1e293b"
                opacity="0.8"
              />

              {/* Côte britannique */}
              <path
                d="M 100 50 Q 200 60 300 55 Q 400 50 500 60"
                stroke="#64748b"
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M 100 50 Q 200 60 300 55 Q 400 50 500 60 L 500 0 L 100 0 Z"
                fill="#1e293b"
                opacity="0.6"
              />

              {/* Labels */}
              <text x="20" y="350" fill="#94a3b8" fontSize="14" fontWeight="bold">FRANCE</text>
              <text x="520" y="30" fill="#94a3b8" fontSize="14" fontWeight="bold">UK</text>
              <text x="250" y="150" fill="#64748b" fontSize="12" opacity="0.7">MANCHE / ENGLISH CHANNEL</text>

              {/* Lignes de courants maritimes si activé */}
              {selectedLayer.courants && (
                <g opacity="0.4">
                  <path d="M 150 250 Q 250 180 350 120" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" fill="none">
                    <animate attributeName="stroke-dashoffset" from="0" to="10" dur="2s" repeatCount="indefinite" />
                  </path>
                  <path d="M 200 260 Q 300 190 400 130" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" fill="none">
                    <animate attributeName="stroke-dashoffset" from="0" to="10" dur="2s" repeatCount="indefinite" />
                  </path>
                  <path d="M 250 270 Q 350 200 450 140" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" fill="none">
                    <animate attributeName="stroke-dashoffset" from="0" to="10" dur="2s" repeatCount="indefinite" />
                  </path>
                </g>
              )}

              {/* Indicateurs météo */}
              {selectedLayer.meteo && meteoPoints.map((point, idx) => (
                <g key={idx}>
                  <circle cx={point.x} cy={point.y} r="3" fill="#60a5fa" opacity="0.6" />
                  <line
                    x1={point.x}
                    y1={point.y}
                    x2={point.x + Math.cos((point.dir - 90) * Math.PI / 180) * 20}
                    y2={point.y + Math.sin((point.dir - 90) * Math.PI / 180) * 20}
                    stroke="#60a5fa"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                </g>
              ))}
              
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa" />
                </marker>
              </defs>
            </svg>

            {/* Zones de départ superposées */}
            {selectedLayer.zones && zones.map((zone) => {
              const colors = getRiskColor(zone.risk);
              return (
                <div
                  key={zone.id}
                  className="absolute cursor-pointer"
                  style={{ left: `${zone.coords.x}px`, top: `${zone.coords.y}px`, transform: 'translate(-50%, -50%)' }}
                  onClick={() => setSelectedZone(zone)}
                >
                  {/* Cercle de rayonnement */}
                  <div className={`absolute inset-0 w-32 h-32 ${colors.bg} rounded-full opacity-20 ${colors.pulse}`}></div>
                  <div className={`absolute inset-0 w-24 h-24 ${colors.bg} rounded-full opacity-30 ${colors.pulse}`}></div>
                  
                  {/* Marqueur principal */}
                  <div className={`relative w-16 h-16 ${colors.bg} rounded-full border-4 ${colors.border} flex items-center justify-center font-bold text-lg shadow-lg ${colors.pulse}`}>
                    {zone.probability}%
                  </div>
                  
                  {/* Label de la zone */}
                  <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-slate-800 px-3 py-1 rounded-lg border border-slate-600 whitespace-nowrap shadow-lg">
                    <div className="font-bold text-sm">{zone.name}</div>
                    <div className="text-xs text-slate-400">{zone.activeSites} sites actifs</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Légende flottante */}
          <div className="absolute bottom-6 left-6 bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-xl">
            <h4 className="font-bold mb-3 text-sm">Légende</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
                <span className="text-xs">Risque Critique (&gt;90%)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <span className="text-xs">Risque Élevé (70-90%)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="text-xs">Risque Moyen (50-70%)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-xs">Risque Faible (&lt;50%)</span>
              </div>
              {selectedLayer.meteo && (
                <div className="flex items-center gap-3 pt-2 border-t border-slate-700">
                  <Wind className="w-4 h-4 text-blue-400" />
                  <span className="text-xs">Vecteur vent</span>
                </div>
              )}
              {selectedLayer.courants && (
                <div className="flex items-center gap-3">
                  <Waves className="w-4 h-4 text-blue-400" />
                  <span className="text-xs">Courants marins</span>
                </div>
              )}
            </div>
          </div>

          {/* Échelle */}
          <div className="absolute bottom-6 right-6 bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl">
            <div className="flex items-end gap-2">
              <div className="w-1 h-20 bg-white"></div>
              <div>
                <div className="text-xs font-mono">20 km</div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel Détails Zone Sélectionnée */}
        {selectedZone && (
          <div className="w-96 bg-slate-800 border-l border-slate-700 overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">{selectedZone.name}</h2>
                <button
                  onClick={() => setSelectedZone(null)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Niveau de risque */}
              <div className={`p-4 rounded-lg mb-6 ${getRiskColor(selectedZone.risk).bg}`}>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">{selectedZone.probability}%</div>
                  <div className="text-sm uppercase tracking-wide">
                    {selectedZone.risk === 'critical' ? 'CRITIQUE' : 
                     selectedZone.risk === 'high' ? 'ÉLEVÉ' :
                     selectedZone.risk === 'medium' ? 'MOYEN' : 'FAIBLE'}
                  </div>
                </div>
              </div>

              {/* Informations détaillées */}
              <div className="space-y-4">
                <div className="bg-slate-700 rounded-lg p-4">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Waves className="w-4 h-4 text-blue-400" />
                    Conditions Marines
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Hauteur vagues</span>
                      <span className="font-semibold">{selectedZone.waveHeight}m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">État de la mer</span>
                      <span className="font-semibold text-green-400">Favorable</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700 rounded-lg p-4">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Wind className="w-4 h-4 text-blue-400" />
                    Conditions Météo
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Vent</span>
                      <span className="font-semibold">{selectedZone.windSpeed} kt {selectedZone.windDir}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Direction</span>
                      <span className="font-semibold text-green-400">Favorable</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700 rounded-lg p-4">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-blue-400" />
                    Marée
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Prochaine PM</span>
                      <span className="font-semibold">{selectedZone.tideTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Coefficient</span>
                      <span className="font-semibold text-orange-400">{selectedZone.tideCoef}</span>
                    </div>
                    <div className="mt-2 p-2 bg-orange-900 rounded text-sm text-center">
                      Fenêtre optimale: 12:00 - 17:00
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700 rounded-lg p-4">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-blue-400" />
                    Activité Récente
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Sites actifs</span>
                      <span className="font-semibold text-red-400">{selectedZone.activeSites}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Dernier départ</span>
                      <span className="font-semibold">{selectedZone.lastDeparture}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium">
                    Activer surveillance
                  </button>
                  <button className="px-4 bg-slate-700 hover:bg-slate-600 rounded-lg">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PoseidonMap;