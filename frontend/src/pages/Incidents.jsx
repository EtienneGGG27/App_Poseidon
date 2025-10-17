import React, { useState } from 'react';
import { AlertCircle, MapPin, Clock, Users, FileText, Camera, MessageSquare, CheckCircle, XCircle, AlertTriangle, Plus, Edit, Eye, Download } from 'lucide-react';

const PoseidonIncidents = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedIncident, setSelectedIncident] = useState(null);

  const incidents = [
    {
      id: 'INC-2025-1734',
      status: 'in_progress',
      priority: 'critical',
      type: 'detection',
      zone: 'Calais Nord',
      location: { lat: 50.95, lon: 1.85, address: 'Plage de Sangatte' },
      detected_at: '2025-10-17 09:15:00',
      reported_by: 'Patrouille Alpha',
      personnel: 4,
      estimated_persons: 12,
      vessels: 1,
      weather: { waves: 0.6, wind: 10, visibility: 'good' },
      actions_taken: ['Surveillance renforcée', 'Alerte UK Border Force', 'Drones déployés'],
      updates: 3,
      photos: 5,
      resolved: false
    },
    {
      id: 'INC-2025-1733',
      status: 'resolved',
      priority: 'high',
      type: 'interception',
      zone: 'Baie de Somme',
      location: { lat: 50.2, lon: 1.6, address: 'Ault - Secteur Maritime' },
      detected_at: '2025-10-17 08:45:00',
      resolved_at: '2025-10-17 10:30:00',
      reported_by: 'Patrouille Bravo',
      personnel: 3,
      estimated_persons: 8,
      actual_persons: 8,
      vessels: 1,
      weather: { waves: 0.7, wind: 12, visibility: 'good' },
      actions_taken: ['Interception réussie', 'Mise en sécurité 8 personnes', 'Embarcation saisie'],
      updates: 6,
      photos: 12,
      resolved: true,
      outcome: 'success'
    },
    {
      id: 'INC-2025-1732',
      status: 'in_progress',
      priority: 'high',
      type: 'detection',
      zone: 'Dunkerque Est',
      location: { lat: 51.03, lon: 2.37, address: 'Zone industrielle portuaire' },
      detected_at: '2025-10-17 07:30:00',
      reported_by: 'Sémaphore Dunkerque',
      personnel: 2,
      estimated_persons: 15,
      vessels: 1,
      weather: { waves: 0.8, wind: 14, visibility: 'moderate' },
      actions_taken: ['Surveillance continue', '2 patrouilles mobilisées'],
      updates: 4,
      photos: 3,
      resolved: false
    },
    {
      id: 'INC-2025-1731',
      status: 'resolved',
      priority: 'medium',
      type: 'false_alarm',
      zone: 'Berck-sur-Mer',
      location: { lat: 50.4, lon: 1.6, address: 'Plage Nord' },
      detected_at: '2025-10-17 06:20:00',
      resolved_at: '2025-10-17 07:00:00',
      reported_by: 'Patrouille Delta',
      personnel: 3,
      estimated_persons: 0,
      vessels: 0,
      weather: { waves: 0.9, wind: 15, visibility: 'good' },
      actions_taken: ['Vérification terrain', 'Fausse alerte confirmée'],
      updates: 2,
      photos: 2,
      resolved: true,
      outcome: 'false_alarm'
    }
  ];

  const incidentTypes = [
    { value: 'detection', label: 'Détection', count: 12, color: 'bg-orange-600' },
    { value: 'interception', label: 'Interception', count: 8, color: 'bg-red-600' },
    { value: 'rescue', label: 'Sauvetage', count: 3, color: 'bg-blue-600' },
    { value: 'false_alarm', label: 'Fausse alerte', count: 5, color: 'bg-green-600' }
  ];

  const statistics = {
    today: { total: 4, resolved: 2, in_progress: 2 },
    week: { total: 28, resolved: 22, in_progress: 6, avg_resolution: 145 },
    month: { total: 156, resolved: 142, in_progress: 14, success_rate: 94 }
  };

  const timeline = [
    { time: '09:15', event: 'Détection initiale', author: 'Patrouille Alpha', type: 'detection' },
    { time: '09:18', event: 'Confirmation visuelle', author: 'Patrouille Alpha', type: 'update' },
    { time: '09:22', event: 'Photos transmises', author: 'Patrouille Alpha', type: 'media' },
    { time: '09:25', event: 'Alerte UK Border Force', author: 'COG Calais', type: 'action' },
    { time: '09:30', event: 'Drones déployés', author: 'GGD Nord', type: 'action' },
    { time: '09:45', event: 'Mise à jour position', author: 'Patrouille Alpha', type: 'update' }
  ];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'critical': return { bg: 'bg-red-600', border: 'border-red-500', text: 'text-red-400' };
      case 'high': return { bg: 'bg-orange-500', border: 'border-orange-500', text: 'text-orange-400' };
      case 'medium': return { bg: 'bg-yellow-500', border: 'border-yellow-500', text: 'text-yellow-400' };
      case 'low': return { bg: 'bg-green-500', border: 'border-green-500', text: 'text-green-400' };
      default: return { bg: 'bg-gray-500', border: 'border-gray-500', text: 'text-gray-400' };
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'in_progress':
        return <span className="px-3 py-1 bg-orange-600 text-white rounded-full text-xs font-semibold">EN COURS</span>;
      case 'resolved':
        return <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs font-semibold">RÉSOLU</span>;
      case 'cancelled':
        return <span className="px-3 py-1 bg-slate-600 text-white rounded-full text-xs font-semibold">ANNULÉ</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-red-600 p-2 rounded-lg">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">POSÉIDON - Gestion des Incidents</h1>
              <p className="text-sm text-slate-400">Suivi et traçabilité opérationnelle</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-red-900 px-4 py-2 rounded-lg text-center">
                <div className="text-xs text-red-300">Critiques</div>
                <div className="text-2xl font-bold">1</div>
              </div>
              <div className="bg-orange-900 px-4 py-2 rounded-lg text-center">
                <div className="text-xs text-orange-300">En cours</div>
                <div className="text-2xl font-bold">2</div>
              </div>
              <div className="bg-green-900 px-4 py-2 rounded-lg text-center">
                <div className="text-xs text-green-300">Résolus/24h</div>
                <div className="text-2xl font-bold">2</div>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Nouvel incident</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-slate-800 border-b border-slate-700 px-6">
        <div className="flex gap-6">
          {[
            { id: 'active', label: 'Incidents actifs', count: 2 },
            { id: 'resolved', label: 'Résolus', count: 22 },
            { id: 'all', label: 'Tous', count: 156 },
            { id: 'statistics', label: 'Statistiques' }
          ].map(({ id, label, count }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`py-3 px-4 font-medium border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === id
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              {label}
              {count !== undefined && (
                <span className="bg-slate-700 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      <main className="p-6">
        {(activeTab === 'active' || activeTab === 'resolved' || activeTab === 'all') && (
          <div className="space-y-4">
            {/* Filtres rapides */}
            <div className="bg-slate-800 rounded-lg p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400">Type:</span>
                  {incidentTypes.map((type) => (
                    <button key={type.value} className={`px-3 py-1 ${type.color} rounded text-xs font-medium`}>
                      {type.label} ({type.count})
                    </button>
                  ))}
                </div>
                <div className="flex-1"></div>
                <input
                  type="text"
                  placeholder="Rechercher un incident..."
                  className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-sm w-64"
                />
              </div>
            </div>

            {/* Liste des incidents */}
            {incidents
              .filter(inc => {
                if (activeTab === 'active') return inc.status === 'in_progress';
                if (activeTab === 'resolved') return inc.status === 'resolved';
                return true;
              })
              .map((incident) => {
                const colors = getPriorityColor(incident.priority);
                return (
                  <div key={incident.id} className={`bg-slate-800 border-l-4 ${colors.border} rounded-lg p-6`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono font-bold text-lg">{incident.id}</span>
                          {getStatusBadge(incident.status)}
                          <span className={`px-3 py-1 ${colors.bg} rounded-full text-xs font-bold uppercase`}>
                            {incident.priority === 'critical' ? 'CRITIQUE' :
                             incident.priority === 'high' ? 'ÉLEVÉ' :
                             incident.priority === 'medium' ? 'MOYEN' : 'FAIBLE'}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {incident.zone} - {incident.location.address}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {incident.detected_at}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {incident.reported_by}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedIncident(incident)}
                          className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 mb-4">
                      <div className="bg-slate-700 rounded-lg p-3">
                        <div className="text-xs text-slate-400 mb-1">Type</div>
                        <div className="font-semibold capitalize">{incident.type.replace('_', ' ')}</div>
                      </div>
                      <div className="bg-slate-700 rounded-lg p-3">
                        <div className="text-xs text-slate-400 mb-1">Personnes estimées</div>
                        <div className="text-xl font-bold text-orange-400">{incident.estimated_persons}</div>
                      </div>
                      <div className="bg-slate-700 rounded-lg p-3">
                        <div className="text-xs text-slate-400 mb-1">Embarcations</div>
                        <div className="text-xl font-bold text-blue-400">{incident.vessels}</div>
                      </div>
                      <div className="bg-slate-700 rounded-lg p-3">
                        <div className="text-xs text-slate-400 mb-1">Conditions</div>
                        <div className="text-sm">Vagues {incident.weather.waves}m</div>
                      </div>
                      <div className="bg-slate-700 rounded-lg p-3">
                        <div className="text-xs text-slate-400 mb-1">Médias</div>
                        <div className="flex items-center gap-2">
                          <Camera className="w-4 h-4" />
                          <span className="font-bold">{incident.photos}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm text-slate-400 mb-2">Actions entreprises:</div>
                      <div className="flex flex-wrap gap-2">
                        {incident.actions_taken.map((action, idx) => (
                          <span key={idx} className="px-3 py-1 bg-blue-900 border border-blue-700 rounded text-sm">
                            ✓ {action}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4 text-blue-400" />
                          {incident.updates} mises à jour
                        </span>
                        {incident.resolved && (
                          <span className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            Résolu: {incident.resolved_at}
                          </span>
                        )}
                      </div>
                      {incident.status === 'in_progress' && (
                        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Clôturer incident
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        {activeTab === 'statistics' && (
          <div className="space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-slate-800 rounded-lg p-6">
                <div className="text-sm text-slate-400 mb-2">Incidents aujourd'hui</div>
                <div className="text-4xl font-bold mb-1">{statistics.today.total}</div>
                <div className="text-sm text-slate-400">
                  {statistics.today.resolved} résolus • {statistics.today.in_progress} en cours
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <div className="text-sm text-slate-400 mb-2">Cette semaine</div>
                <div className="text-4xl font-bold mb-1">{statistics.week.total}</div>
                <div className="text-sm text-green-400">
                  Taux de résolution: {(statistics.week.resolved / statistics.week.total * 100).toFixed(1)}%
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <div className="text-sm text-slate-400 mb-2">Ce mois</div>
                <div className="text-4xl font-bold mb-1">{statistics.month.total}</div>
                <div className="text-sm text-blue-400">
                  Success rate: {statistics.month.success_rate}%
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <div className="text-sm text-slate-400 mb-2">Temps résolution moyen</div>
                <div className="text-4xl font-bold mb-1">{statistics.week.avg_resolution}</div>
                <div className="text-sm text-slate-400">minutes</div>
              </div>
            </div>

            {/* Graphiques par type */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Répartition par Type (Ce mois)</h3>
              <div className="grid grid-cols-4 gap-4">
                {incidentTypes.map((type) => (
                  <div key={type.value} className="bg-slate-700 rounded-lg p-4">
                    <div className={`w-12 h-12 ${type.color} rounded-lg flex items-center justify-center mb-3`}>
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <div className="text-2xl font-bold mb-1">{type.count}</div>
                    <div className="text-sm text-slate-400">{type.label}</div>
                    <div className="mt-3 text-xs text-slate-500">
                      {(type.count / 28 * 100).toFixed(0)}% du total
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Répartition par zone */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Incidents par Zone (Ce mois)</h3>
              <div className="space-y-3">
                {[
                  { zone: 'Calais Nord', count: 89, resolved: 82, avg_time: 134 },
                  { zone: 'Baie de Somme', count: 34, resolved: 32, avg_time: 156 },
                  { zone: 'Dunkerque Est', count: 21, resolved: 19, avg_time: 142 },
                  { zone: 'Berck-sur-Mer', count: 12, resolved: 9, avg_time: 178 }
                ].map((zone, idx) => (
                  <div key={idx} className="bg-slate-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-bold">{zone.zone}</div>
                      <div className="text-sm text-slate-400">
                        {zone.resolved}/{zone.count} résolus ({(zone.resolved / zone.count * 100).toFixed(0)}%)
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm mb-2">
                      <span className="text-slate-400">Temps moyen: <span className="font-bold text-white">{zone.avg_time}min</span></span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(zone.resolved / zone.count * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Temps de résolution */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Performance Résolution</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Moins de 1h</span>
                      <span className="font-bold text-green-400">45%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">1-3h</span>
                      <span className="font-bold text-blue-400">38%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '38%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">3-6h</span>
                      <span className="font-bold text-yellow-400">12%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Plus de 6h</span>
                      <span className="font-bold text-red-400">5%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Issues / Résultats</h3>
                <div className="space-y-3">
                  {[
                    { outcome: 'Interception réussie', count: 89, color: 'bg-green-600' },
                    { outcome: 'Surveillance continue', count: 34, color: 'bg-blue-600' },
                    { outcome: 'Sauvetage', count: 12, color: 'bg-orange-600' },
                    { outcome: 'Fausse alerte', count: 21, color: 'bg-slate-600' }
                  ].map((outcome, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 ${outcome.color} rounded-full`}></div>
                        <span className="text-sm">{outcome.outcome}</span>
                      </div>
                      <span className="font-bold">{outcome.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal détails incident */}
      {selectedIncident && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-6">
          <div className="bg-slate-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">{selectedIncident.id}</h2>
                <p className="text-slate-400">{selectedIncident.zone}</p>
              </div>
              <button
                onClick={() => setSelectedIncident(null)}
                className="text-slate-400 hover:text-white"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Informations principales */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-700 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Statut</div>
                  {getStatusBadge(selectedIncident.status)}
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Priorité</div>
                  <span className={`px-3 py-1 ${getPriorityColor(selectedIncident.priority).bg} rounded-full text-xs font-bold uppercase`}>
                    {selectedIncident.priority}
                  </span>
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Type</div>
                  <div className="font-bold capitalize">{selectedIncident.type.replace('_', ' ')}</div>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="font-bold mb-4">Chronologie</h3>
                <div className="space-y-3">
                  {timeline.map((entry, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="text-sm text-slate-400 w-16">{entry.time}</div>
                      <div className={`w-3 h-3 rounded-full mt-1 ${
                        entry.type === 'detection' ? 'bg-red-500' :
                        entry.type === 'action' ? 'bg-blue-500' :
                        entry.type === 'media' ? 'bg-purple-500' : 'bg-green-500'
                      }`}></div>
                      <div className="flex-1">
                        <div className="font-medium">{entry.event}</div>
                        <div className="text-sm text-slate-400">{entry.author}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium">
                  Ajouter mise à jour
                </button>
                <button className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-lg font-medium">
                  Clôturer incident
                </button>
                <button className="px-6 bg-slate-700 hover:bg-slate-600 rounded-lg">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoseidonIncidents;