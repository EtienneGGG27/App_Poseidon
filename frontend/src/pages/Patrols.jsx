import React, { useState } from 'react';
import { Users, MapPin, Calendar, Clock, Shield, Car, AlertCircle, CheckCircle, Navigation, Radio, Plus, Edit } from 'lucide-react';

const PoseidonPatrols = () => {
  const [activeView, setActiveView] = useState('planning');
  const [selectedPatrol, setSelectedPatrol] = useState(null);

  const patrols = [
    {
      id: 1,
      name: 'Patrouille Alpha',
      zone: 'Calais Nord',
      status: 'active',
      personnel: 4,
      vehicle: 'VL-GN-245',
      start: '06:00',
      end: '14:00',
      position: { lat: 50.95, lon: 1.85 },
      lastUpdate: '2min ago',
      priority: 'high',
      equipment: ['Jumelles', 'Radio', 'Drone'],
      incidents: 2
    },
    {
      id: 2,
      name: 'Patrouille Bravo',
      zone: 'Baie de Somme',
      status: 'active',
      personnel: 3,
      vehicle: 'VL-GN-312',
      start: '06:00',
      end: '14:00',
      position: { lat: 50.2, lon: 1.6 },
      lastUpdate: '5min ago',
      priority: 'high',
      equipment: ['Jumelles', 'Radio', 'Caméra thermique'],
      incidents: 1
    },
    {
      id: 3,
      name: 'Patrouille Charlie',
      zone: 'Dunkerque Est',
      status: 'standby',
      personnel: 4,
      vehicle: 'VL-GN-178',
      start: '14:00',
      end: '22:00',
      position: null,
      lastUpdate: 'En attente',
      priority: 'medium',
      equipment: ['Jumelles', 'Radio'],
      incidents: 0
    },
    {
      id: 4,
      name: 'Patrouille Delta',
      zone: 'Berck-sur-Mer',
      status: 'completed',
      personnel: 3,
      vehicle: 'VL-GN-089',
      start: '22:00',
      end: '06:00',
      position: null,
      lastUpdate: 'Terminée',
      priority: 'low',
      equipment: ['Jumelles', 'Radio'],
      incidents: 0
    },
    {
      id: 5,
      name: 'Sémaphore Ault',
      zone: 'Baie de Somme',
      status: 'active',
      personnel: 2,
      vehicle: 'Fixe',
      start: '00:00',
      end: '23:59',
      position: { lat: 50.1, lon: 1.45 },
      lastUpdate: '1min ago',
      priority: 'high',
      equipment: ['Longue-vue', 'Radio', 'Radar'],
      incidents: 3
    }
  ];

  const schedule = [
    { time: '00:00-06:00', zones: ['Calais Nord', 'Baie de Somme'], patrols: 2, status: 'low' },
    { time: '06:00-12:00', zones: ['Calais Nord', 'Baie de Somme', 'Dunkerque'], patrols: 5, status: 'critical' },
    { time: '12:00-18:00', zones: ['Calais Nord', 'Baie de Somme', 'Dunkerque', 'Berck'], patrols: 6, status: 'high' },
    { time: '18:00-24:00', zones: ['Calais Nord', 'Baie de Somme'], patrols: 3, status: 'medium' }
  ];

  const recommendations = [
    {
      id: 1,
      zone: 'Calais Nord',
      timeSlot: '12:00-17:00',
      probability: 92,
      recommendation: 'Renforcer dispositif',
      currentCoverage: 2,
      recommendedCoverage: 4,
      priority: 'critical',
      reason: 'Conditions critiques + marée haute 14:35'
    },
    {
      id: 2,
      zone: 'Baie de Somme',
      timeSlot: '12:00-17:00',
      probability: 85,
      recommendation: 'Maintenir dispositif renforcé',
      currentCoverage: 3,
      recommendedCoverage: 3,
      priority: 'high',
      reason: 'Fenêtre favorable prolongée'
    },
    {
      id: 3,
      zone: 'Dunkerque Est',
      timeSlot: '14:00-18:00',
      probability: 78,
      recommendation: 'Activer patrouille supplémentaire',
      currentCoverage: 1,
      recommendedCoverage: 2,
      priority: 'high',
      reason: 'Conditions favorables émergentes'
    },
    {
      id: 4,
      zone: 'Berck-sur-Mer',
      timeSlot: '10:00-16:00',
      probability: 58,
      recommendation: 'Surveillance standard',
      currentCoverage: 1,
      recommendedCoverage: 1,
      priority: 'medium',
      reason: 'Risque modéré'
    }
  ];

  const resources = [
    { type: 'Personnel', available: 24, deployed: 16, standby: 8, status: 'adequate' },
    { type: 'Véhicules', available: 12, deployed: 5, standby: 7, status: 'good' },
    { type: 'Drones', available: 4, deployed: 2, standby: 2, status: 'good' },
    { type: 'Caméras thermiques', available: 6, deployed: 3, standby: 3, status: 'adequate' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-600';
      case 'standby': return 'bg-yellow-600';
      case 'completed': return 'bg-slate-600';
      case 'incident': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'active': return 'En cours';
      case 'standby': return 'En attente';
      case 'completed': return 'Terminée';
      case 'incident': return 'Incident';
      default: return 'Inconnu';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'critical': return { bg: 'bg-red-600', text: 'text-red-400', border: 'border-red-500' };
      case 'high': return { bg: 'bg-orange-500', text: 'text-orange-400', border: 'border-orange-500' };
      case 'medium': return { bg: 'bg-yellow-500', text: 'text-yellow-400', border: 'border-yellow-500' };
      case 'low': return { bg: 'bg-green-500', text: 'text-green-400', border: 'border-green-500' };
      default: return { bg: 'bg-gray-500', text: 'text-gray-400', border: 'border-gray-500' };
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">POSÉIDON - Gestion des Patrouilles</h1>
              <p className="text-sm text-slate-400">Planification et coordination des moyens</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-slate-700 px-4 py-2 rounded-lg">
              <div className="text-xs text-slate-400">Patrouilles actives</div>
              <div className="text-2xl font-bold text-green-400">3</div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Nouvelle patrouille</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-slate-800 border-b border-slate-700 px-6">
        <div className="flex gap-6">
          {[
            { id: 'planning', label: 'Planification', icon: Calendar },
            { id: 'live', label: 'En cours', icon: Radio },
            { id: 'recommendations', label: 'Recommandations', icon: AlertCircle },
            { id: 'resources', label: 'Ressources', icon: Users }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveView(id)}
              className={`py-3 px-4 font-medium border-b-2 transition-colors flex items-center gap-2 ${
                activeView === id
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </nav>

      <main className="p-6">
        {activeView === 'planning' && (
          <div className="space-y-6">
            {/* Planification par créneau */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Planification 24h</h2>
              <div className="space-y-4">
                {schedule.map((slot, idx) => {
                  const colors = getPriorityColor(slot.status);
                  return (
                    <div key={idx} className={`border-l-4 ${colors.border} bg-slate-700 rounded-lg p-4`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-blue-400" />
                          <div>
                            <div className="font-bold text-lg">{slot.time}</div>
                            <div className="text-sm text-slate-400">{slot.zones.join(', ')}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-2xl font-bold">{slot.patrols}</div>
                            <div className="text-xs text-slate-400">patrouilles</div>
                          </div>
                          <span className={`px-3 py-1 ${colors.bg} rounded-full text-xs font-bold uppercase`}>
                            {slot.status === 'critical' ? 'Critique' :
                             slot.status === 'high' ? 'Élevé' :
                             slot.status === 'medium' ? 'Moyen' : 'Faible'}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded text-sm">
                          Voir détails
                        </button>
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm">
                          Modifier planning
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Vue calendrier semaine */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Calendrier Hebdomadaire</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="px-4 py-3 text-left">Horaire</th>
                      <th className="px-4 py-3 text-center">Lun 14</th>
                      <th className="px-4 py-3 text-center">Mar 15</th>
                      <th className="px-4 py-3 text-center">Mer 16</th>
                      <th className="px-4 py-3 text-center bg-blue-900">Jeu 17</th>
                      <th className="px-4 py-3 text-center">Ven 18</th>
                      <th className="px-4 py-3 text-center">Sam 19</th>
                      <th className="px-4 py-3 text-center">Dim 20</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {['00:00-06:00', '06:00-12:00', '12:00-18:00', '18:00-24:00'].map((time, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-3 font-medium">{time}</td>
                        {[1,2,3,4,5,6,7].map((day) => (
                          <td key={day} className={`px-4 py-3 text-center ${day === 4 ? 'bg-slate-750' : ''}`}>
                            <div className="inline-block bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
                              {Math.floor(Math.random() * 4) + 2}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeView === 'live' && (
          <div className="space-y-6">
            {/* Carte de situation */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Situation Temps Réel</h2>
              <div className="bg-slate-900 rounded-lg h-96 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                    <p className="text-slate-400">Carte avec positions des patrouilles en temps réel</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Liste des patrouilles actives */}
            <div className="grid grid-cols-2 gap-6">
              {patrols.filter(p => p.status === 'active' || p.status === 'standby').map((patrol) => {
                const colors = getPriorityColor(patrol.priority);
                return (
                  <div key={patrol.id} className="bg-slate-800 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-lg ${getStatusColor(patrol.status)} flex items-center justify-center`}>
                          <Shield className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-bold text-lg">{patrol.name}</div>
                          <div className="text-sm text-slate-400">{patrol.zone}</div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 ${getStatusColor(patrol.status)} rounded-full text-xs font-bold`}>
                        {getStatusText(patrol.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-slate-700 rounded-lg p-3">
                        <div className="text-xs text-slate-400 mb-1">Personnel</div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span className="font-bold">{patrol.personnel}</span>
                        </div>
                      </div>
                      <div className="bg-slate-700 rounded-lg p-3">
                        <div className="text-xs text-slate-400 mb-1">Véhicule</div>
                        <div className="flex items-center gap-2">
                          <Car className="w-4 h-4" />
                          <span className="font-bold text-sm">{patrol.vehicle}</span>
                        </div>
                      </div>
                      <div className="bg-slate-700 rounded-lg p-3">
                        <div className="text-xs text-slate-400 mb-1">Horaire</div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span className="font-bold text-sm">{patrol.start}-{patrol.end}</span>
                        </div>
                      </div>
                      <div className="bg-slate-700 rounded-lg p-3">
                        <div className="text-xs text-slate-400 mb-1">Incidents</div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          <span className="font-bold">{patrol.incidents}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-xs text-slate-400 mb-2">Équipement</div>
                      <div className="flex flex-wrap gap-2">
                        {patrol.equipment.map((item, idx) => (
                          <span key={idx} className="px-2 py-1 bg-slate-700 rounded text-xs">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 mb-3">
                      Dernière MAJ: {patrol.lastUpdate}
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded text-sm font-medium flex items-center justify-center gap-2">
                        <Radio className="w-4 h-4" />
                        Contacter
                      </button>
                      <button className="flex-1 bg-slate-700 hover:bg-slate-600 py-2 rounded text-sm font-medium flex items-center justify-center gap-2">
                        <Navigation className="w-4 h-4" />
                        Position
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeView === 'recommendations' && (
          <div className="space-y-6">
            {/* Alerte globale */}
            <div className="bg-red-900 border border-red-700 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="w-8 h-8 text-red-400" />
                <div>
                  <div className="font-bold text-xl">Ajustement recommandé du dispositif</div>
                  <div className="text-sm text-red-200">3 zones nécessitent un renforcement dans les prochaines 6h</div>
                </div>
              </div>
              <button className="bg-red-700 hover:bg-red-600 px-6 py-2 rounded-lg font-medium">
                Appliquer les recommandations automatiquement
              </button>
            </div>

            {/* Recommandations par zone */}
            <div className="space-y-4">
              {recommendations.map((rec) => {
                const colors = getPriorityColor(rec.priority);
                return (
                  <div key={rec.id} className={`bg-slate-800 border-l-4 ${colors.border} rounded-lg p-6`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="font-bold text-xl mb-2">{rec.zone}</div>
                        <div className="text-sm text-slate-400 mb-1">Créneau: {rec.timeSlot}</div>
                        <div className="text-sm text-slate-400">Probabilité: <span className="font-bold text-white">{rec.probability}%</span></div>
                      </div>
                      <span className={`px-4 py-2 ${colors.bg} rounded-lg text-sm font-bold uppercase`}>
                        {rec.priority === 'critical' ? 'Critique' :
                         rec.priority === 'high' ? 'Élevé' :
                         rec.priority === 'medium' ? 'Moyen' : 'Faible'}
                      </span>
                    </div>

                    <div className="bg-slate-700 rounded-lg p-4 mb-4">
                      <div className="font-bold mb-2 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-blue-400" />
                        Recommandation
                      </div>
                      <div className="text-lg mb-2">{rec.recommendation}</div>
                      <div className="text-sm text-slate-400">{rec.reason}</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="bg-slate-700 rounded-lg p-3 text-center">
                        <div className="text-xs text-slate-400 mb-1">Couverture actuelle</div>
                        <div className="text-2xl font-bold">{rec.currentCoverage}</div>
                      </div>
                      <div className="bg-blue-900 rounded-lg p-3 text-center">
                        <div className="text-xs text-blue-300 mb-1">Recommandé</div>
                        <div className="text-2xl font-bold text-blue-400">{rec.recommendedCoverage}</div>
                      </div>
                      <div className={`rounded-lg p-3 text-center ${
                        rec.recommendedCoverage > rec.currentCoverage ? 'bg-orange-900' : 'bg-green-900'
                      }`}>
                        <div className="text-xs mb-1">Ajustement</div>
                        <div className="text-2xl font-bold">
                          {rec.recommendedCoverage > rec.currentCoverage ? '+' : ''}{rec.recommendedCoverage - rec.currentCoverage}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded font-medium">
                        Appliquer cette recommandation
                      </button>
                      <button className="px-4 bg-slate-700 hover:bg-slate-600 rounded">
                        <Edit className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Statistiques d'efficacité */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="font-bold mb-4">Efficacité des Recommandations (30 derniers jours)</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-slate-700 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-1">91%</div>
                  <div className="text-sm text-slate-400">Taux de réussite</div>
                </div>
                <div className="bg-slate-700 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-1">156</div>
                  <div className="text-sm text-slate-400">Recommandations</div>
                </div>
                <div className="bg-slate-700 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-1">142</div>
                  <div className="text-sm text-slate-400">Appliquées</div>
                </div>
                <div className="bg-slate-700 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-1">-28%</div>
                  <div className="text-sm text-slate-400">Économie moyens</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'resources' && (
          <div className="space-y-6">
            {/* Vue d'ensemble des ressources */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">État des Ressources</h2>
              <div className="space-y-4">
                {resources.map((resource, idx) => (
                  <div key={idx} className="bg-slate-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-bold text-lg">{resource.type}</div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        resource.status === 'good' ? 'bg-green-600' :
                        resource.status === 'adequate' ? 'bg-yellow-600' : 'bg-red-600'
                      }`}>
                        {resource.status === 'good' ? 'Bon' :
                         resource.status === 'adequate' ? 'Suffisant' : 'Critique'}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <div className="text-xs text-slate-400 mb-1">Disponible</div>
                        <div className="text-2xl font-bold text-blue-400">{resource.available}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 mb-1">Déployé</div>
                        <div className="text-2xl font-bold text-green-400">{resource.deployed}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 mb-1">Réserve</div>
                        <div className="text-2xl font-bold text-orange-400">{resource.standby}</div>
                      </div>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full transition-all"
                        style={{ width: `${(resource.deployed / resource.available) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Personnel disponible */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="font-bold mb-4">Personnel par Unité</h3>
                <div className="space-y-3">
                  {[
                    { unit: 'GGD Nord', available: 12, deployed: 8 },
                    { unit: 'COG Calais', available: 8, deployed: 5 },
                    { unit: 'Brigade Berck', available: 6, deployed: 3 },
                    { unit: 'Brigade Dunkerque', available: 8, deployed: 0 }
                  ].map((unit, idx) => (
                    <div key={idx} className="bg-slate-700 rounded p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{unit.unit}</span>
                        <span className="text-sm text-slate-400">{unit.deployed}/{unit.available}</span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(unit.deployed / unit.available) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="font-bold mb-4">Équipements Critiques</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Drones opérationnels', count: 2, total: 4, status: 'warning' },
                    { name: 'Caméras thermiques', count: 3, total: 6, status: 'good' },
                    { name: 'Radios chiffrées', count: 16, total: 20, status: 'good' },
                    { name: 'Jumelles nocturnes', count: 8, total: 12, status: 'good' }
                  ].map((equip, idx) => (
                    <div key={idx} className="bg-slate-700 rounded p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{equip.name}</div>
                          <div className="text-xs text-slate-400">{equip.count} disponibles sur {equip.total}</div>
                        </div>
                        <span className={`w-3 h-3 rounded-full ${
                          equip.status === 'good' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PoseidonPatrols;