import React, { useState } from 'react';
import { FileText, Bell, Download, Calendar, Clock, AlertTriangle, CheckCircle, Send, Printer, Mail, Filter } from 'lucide-react';

const PoseidonReports = () => {
  const [activeTab, setActiveTab] = useState('reports');
  const [selectedReport, setSelectedReport] = useState(null);

  const reports = [
    {
      id: 1,
      title: 'Rapport Quotidien - 17 Octobre 2025',
      type: 'daily',
      date: '2025-10-17',
      status: 'ready',
      zones: 5,
      alerts: 3,
      departures: 156,
      size: '2.4 MB'
    },
    {
      id: 2,
      title: 'Analyse Hebdomadaire S42',
      type: 'weekly',
      date: '2025-10-16',
      status: 'ready',
      zones: 5,
      alerts: 12,
      departures: 856,
      size: '8.7 MB'
    },
    {
      id: 3,
      title: 'Rapport Mensuel - Septembre 2025',
      type: 'monthly',
      date: '2025-10-01',
      status: 'ready',
      zones: 5,
      alerts: 45,
      departures: 5234,
      size: '15.2 MB'
    },
    {
      id: 4,
      title: 'Rapport d\'Incident - Zone Calais',
      type: 'incident',
      date: '2025-10-16',
      status: 'ready',
      zones: 1,
      alerts: 8,
      departures: 312,
      size: '3.1 MB'
    },
    {
      id: 5,
      title: 'Analyse Prédictive - Semaine à venir',
      type: 'forecast',
      date: '2025-10-17',
      status: 'generating',
      zones: 5,
      alerts: 0,
      departures: 0,
      size: '—'
    }
  ];

  const alerts = [
    {
      id: 1,
      timestamp: '2025-10-17 09:15',
      level: 'critical',
      zone: 'Calais Nord',
      message: 'Conditions critiques détectées - Probabilité 92%',
      conditions: {
        wave: 0.6,
        wind: 10,
        tide: 87
      },
      status: 'active',
      prediction: '12 départs estimés dans les 3h'
    },
    {
      id: 2,
      timestamp: '2025-10-17 08:45',
      level: 'high',
      zone: 'Baie de Somme',
      message: 'Fenêtre favorable ouverte - Probabilité 85%',
      conditions: {
        wave: 0.7,
        wind: 12,
        tide: 85
      },
      status: 'active',
      prediction: '8-10 départs possibles'
    },
    {
      id: 3,
      timestamp: '2025-10-17 07:30',
      level: 'high',
      zone: 'Dunkerque Est',
      message: 'Conditions favorables émergentes',
      conditions: {
        wave: 0.8,
        wind: 14,
        tide: 82
      },
      status: 'active',
      prediction: '5-7 départs estimés'
    },
    {
      id: 4,
      timestamp: '2025-10-17 06:20',
      level: 'medium',
      zone: 'Berck-sur-Mer',
      message: 'Surveillance renforcée recommandée',
      conditions: {
        wave: 0.9,
        wind: 15,
        tide: 79
      },
      status: 'acknowledged',
      prediction: '2-4 départs possibles'
    },
    {
      id: 5,
      timestamp: '2025-10-16 22:15',
      level: 'critical',
      zone: 'Calais Nord',
      message: 'Activité intense confirmée',
      conditions: {
        wave: 0.5,
        wind: 9,
        tide: 89
      },
      status: 'resolved',
      prediction: '15 départs confirmés'
    }
  ];

  const scheduledReports = [
    { day: 'Lundi-Vendredi', time: '06:00', type: 'Rapport quotidien', recipients: 5, active: true },
    { day: 'Lundi', time: '08:00', type: 'Analyse hebdomadaire', recipients: 8, active: true },
    { day: '1er du mois', time: '09:00', type: 'Rapport mensuel', recipients: 12, active: true },
    { day: 'Sur alerte', time: 'Immédiat', type: 'Notification urgente', recipients: 15, active: true }
  ];

  const getLevelColor = (level) => {
    switch(level) {
      case 'critical': return { bg: 'bg-red-600', text: 'text-red-400', border: 'border-red-500' };
      case 'high': return { bg: 'bg-orange-500', text: 'text-orange-400', border: 'border-orange-500' };
      case 'medium': return { bg: 'bg-yellow-500', text: 'text-yellow-400', border: 'border-yellow-500' };
      case 'low': return { bg: 'bg-green-500', text: 'text-green-400', border: 'border-green-500' };
      default: return { bg: 'bg-gray-500', text: 'text-gray-400', border: 'border-gray-500' };
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return <span className="px-3 py-1 bg-red-600 text-white rounded-full text-xs font-semibold">ACTIF</span>;
      case 'acknowledged':
        return <span className="px-3 py-1 bg-yellow-600 text-white rounded-full text-xs font-semibold">ACQUITTÉ</span>;
      case 'resolved':
        return <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs font-semibold">RÉSOLU</span>;
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
            <div className="bg-blue-600 p-2 rounded-lg">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">POSÉIDON - Rapports & Alertes</h1>
              <p className="text-sm text-slate-400">Génération automatique et gestion des notifications</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-red-600 px-4 py-2 rounded-lg flex items-center gap-2">
              <Bell className="w-5 h-5 animate-pulse" />
              <div>
                <div className="text-xs text-red-200">Alertes actives</div>
                <div className="text-lg font-bold">3</div>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Exporter tout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-slate-800 border-b border-slate-700 px-6">
        <div className="flex gap-6">
          {[
            { id: 'reports', label: 'Rapports', icon: FileText },
            { id: 'alerts', label: 'Alertes en cours', icon: Bell, badge: 3 },
            { id: 'schedule', label: 'Planification', icon: Calendar },
            { id: 'history', label: 'Historique', icon: Clock }
          ].map(({ id, label, icon: Icon, badge }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`py-3 px-4 font-medium border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === id
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              {badge && (
                <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      <main className="p-6">
        {activeTab === 'reports' && (
          <div className="space-y-6">
            {/* Actions rapides */}
            <div className="grid grid-cols-4 gap-4">
              <button className="bg-slate-800 hover:bg-slate-700 p-6 rounded-lg text-center transition-colors">
                <FileText className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                <div className="font-bold mb-1">Rapport quotidien</div>
                <div className="text-xs text-slate-400">Générer maintenant</div>
              </button>
              <button className="bg-slate-800 hover:bg-slate-700 p-6 rounded-lg text-center transition-colors">
                <Calendar className="w-8 h-8 mx-auto mb-3 text-green-400" />
                <div className="font-bold mb-1">Analyse période</div>
                <div className="text-xs text-slate-400">Personnalisée</div>
              </button>
              <button className="bg-slate-800 hover:bg-slate-700 p-6 rounded-lg text-center transition-colors">
                <AlertTriangle className="w-8 h-8 mx-auto mb-3 text-orange-400" />
                <div className="font-bold mb-1">Rapport incident</div>
                <div className="text-xs text-slate-400">Zone spécifique</div>
              </button>
              <button className="bg-slate-800 hover:bg-slate-700 p-6 rounded-lg text-center transition-colors">
                <Download className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                <div className="font-bold mb-1">Export données</div>
                <div className="text-xs text-slate-400">CSV / Excel</div>
              </button>
            </div>

            {/* Liste des rapports */}
            <div className="bg-slate-800 rounded-lg">
              <div className="p-6 border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Rapports Disponibles</h2>
                  <div className="flex gap-3">
                    <select className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-sm">
                      <option>Tous les types</option>
                      <option>Quotidiens</option>
                      <option>Hebdomadaires</option>
                      <option>Mensuels</option>
                      <option>Incidents</option>
                    </select>
                    <button className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg">
                      <Filter className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-slate-700">
                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="p-6 hover:bg-slate-750 transition-colors cursor-pointer"
                    onClick={() => setSelectedReport(report)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          report.status === 'generating' ? 'bg-yellow-600' : 'bg-blue-600'
                        }`}>
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-bold mb-1">{report.title}</div>
                          <div className="flex gap-4 text-sm text-slate-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {report.date}
                            </span>
                            <span>{report.zones} zones</span>
                            <span>{report.alerts} alertes</span>
                            <span>{report.departures} départs</span>
                            <span>{report.size}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {report.status === 'generating' ? (
                          <span className="px-4 py-2 bg-yellow-900 text-yellow-300 rounded-lg text-sm font-medium">
                            Génération en cours...
                          </span>
                        ) : (
                          <>
                            <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg">
                              <Mail className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg">
                              <Printer className="w-4 h-4" />
                            </button>
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2">
                              <Download className="w-4 h-4" />
                              <span className="text-sm font-medium">Télécharger</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="space-y-6">
            {/* Résumé des alertes */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-red-900 border border-red-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-red-200">Critiques</span>
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div className="text-3xl font-bold">1</div>
              </div>
              <div className="bg-orange-900 border border-orange-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-orange-200">Élevées</span>
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                </div>
                <div className="text-3xl font-bold">2</div>
              </div>
              <div className="bg-yellow-900 border border-yellow-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-yellow-200">Moyennes</span>
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="text-3xl font-bold">1</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Résolues (24h)</span>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-3xl font-bold">12</div>
              </div>
            </div>

            {/* Flux d'alertes */}
            <div className="bg-slate-800 rounded-lg">
              <div className="p-6 border-b border-slate-700">
                <h2 className="text-xl font-bold">Flux d'Alertes en Temps Réel</h2>
              </div>

              <div className="divide-y divide-slate-700">
                {alerts.map((alert) => {
                  const colors = getLevelColor(alert.level);
                  return (
                    <div
                      key={alert.id}
                      className={`p-6 border-l-4 ${colors.border} ${
                        alert.status === 'active' ? 'bg-slate-750' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className={`w-6 h-6 ${colors.text} ${
                            alert.status === 'active' ? 'animate-pulse' : ''
                          }`} />
                          <div>
                            <div className="font-bold text-lg">{alert.zone}</div>
                            <div className="text-sm text-slate-400 flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {alert.timestamp}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusBadge(alert.status)}
                          <span className={`px-3 py-1 ${colors.bg} text-white rounded-full text-xs font-semibold uppercase`}>
                            {alert.level === 'critical' ? 'CRITIQUE' :
                             alert.level === 'high' ? 'ÉLEVÉ' :
                             alert.level === 'medium' ? 'MOYEN' : 'FAIBLE'}
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-base mb-2">{alert.message}</p>
                        <p className="text-sm text-blue-400 font-medium">{alert.prediction}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="bg-slate-700 rounded-lg p-3">
                          <div className="text-xs text-slate-400 mb-1">Vagues</div>
                          <div className="text-lg font-bold text-green-400">{alert.conditions.wave}m</div>
                        </div>
                        <div className="bg-slate-700 rounded-lg p-3">
                          <div className="text-xs text-slate-400 mb-1">Vent</div>
                          <div className="text-lg font-bold">{alert.conditions.wind} kt</div>
                        </div>
                        <div className="bg-slate-700 rounded-lg p-3">
                          <div className="text-xs text-slate-400 mb-1">Marée</div>
                          <div className="text-lg font-bold text-orange-400">{alert.conditions.tide}</div>
                        </div>
                      </div>

                      {alert.status === 'active' && (
                        <div className="flex gap-2">
                          <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-medium flex items-center justify-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Acquitter
                          </button>
                          <button className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded-lg font-medium flex items-center justify-center gap-2">
                            <Send className="w-4 h-4" />
                            Notifier équipes
                          </button>
                          <button className="px-4 bg-slate-700 hover:bg-slate-600 rounded-lg">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Rapports Planifiés</h2>
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2">
                  <span className="text-sm font-medium">+ Nouveau planning</span>
                </button>
              </div>

              <div className="space-y-4">
                {scheduledReports.map((schedule, idx) => (
                  <div key={idx} className="bg-slate-700 rounded-lg p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-600 p-3 rounded-lg">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold mb-1">{schedule.type}</div>
                        <div className="text-sm text-slate-400 flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {schedule.day}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {schedule.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {schedule.recipients} destinataires
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={schedule.active} className="sr-only peer" readOnly />
                        <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                      <button className="p-2 bg-slate-600 hover:bg-slate-500 rounded-lg">
                        ⚙️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Configuration des notifications */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">Configuration des Notifications</h2>
              
              <div className="space-y-4">
                <div className="bg-slate-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-red-400" />
                      <div>
                        <div className="font-bold">Alertes critiques</div>
                        <div className="text-sm text-slate-400">Probabilité &gt; 90%</div>
                      </div>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-slate-600 rounded text-xs">Email</span>
                    <span className="px-3 py-1 bg-slate-600 rounded text-xs">SMS</span>
                    <span className="px-3 py-1 bg-slate-600 rounded text-xs">Push</span>
                  </div>
                </div>

                <div className="bg-slate-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-orange-400" />
                      <div>
                        <div className="font-bold">Alertes élevées</div>
                        <div className="text-sm text-slate-400">Probabilité 70-90%</div>
                      </div>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-slate-600 rounded text-xs">Email</span>
                    <span className="px-3 py-1 bg-slate-600 rounded text-xs">Push</span>
                  </div>
                </div>

                <div className="bg-slate-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-blue-400" />
                      <div>
                        <div className="font-bold">Mises à jour quotidiennes</div>
                        <div className="text-sm text-slate-400">Résumé des 24h</div>
                      </div>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-slate-600 rounded text-xs">Email</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">Historique des Alertes (7 derniers jours)</h2>
            <div className="text-center py-12 text-slate-400">
              <Clock className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Affichage de l'historique complet avec filtres par date, zone, et niveau</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PoseidonReports;