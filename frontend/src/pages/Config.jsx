import React, { useState } from 'react';
import { Settings, Users, Database, Shield, Sliders, MapPin, Bell, Activity, Save, RotateCcw } from 'lucide-react';

const PoseidonConfig = () => {
  const [activeSection, setActiveSection] = useState('zones');
  const [hasChanges, setHasChanges] = useState(false);

  const zones = [
    { id: 1, name: 'Calais Nord', active: true, lat: 50.95, lon: 1.85, radius: 5, priority: 'high', sensors: 12 },
    { id: 2, name: 'Baie de Somme', active: true, lat: 50.2, lon: 1.6, radius: 8, priority: 'high', sensors: 15 },
    { id: 3, name: 'Dunkerque Est', active: true, lat: 51.03, lon: 2.37, radius: 6, priority: 'medium', sensors: 8 },
    { id: 4, name: 'Berck-sur-Mer', active: true, lat: 50.4, lon: 1.6, radius: 4, priority: 'medium', sensors: 6 },
    { id: 5, name: 'Boulogne-sur-Mer', active: false, lat: 50.73, lon: 1.61, radius: 5, priority: 'low', sensors: 4 }
  ];

  const users = [
    { id: 1, name: 'Col. Dupont', role: 'admin', unit: 'GGD Nord', lastAccess: '2025-10-17 09:30', active: true },
    { id: 2, name: 'Cpt. Martin', role: 'operator', unit: 'COG Calais', lastAccess: '2025-10-17 09:15', active: true },
    { id: 3, name: 'Lt. Bernard', role: 'operator', unit: 'Sémaphore Ault', lastAccess: '2025-10-17 08:45', active: true },
    { id: 4, name: 'Adj. Lefebvre', role: 'viewer', unit: 'Brigade Berck', lastAccess: '2025-10-16 22:30', active: true },
    { id: 5, name: 'Gd. Rousseau', role: 'viewer', unit: 'Brigade Dunkerque', lastAccess: '2025-10-16 18:20', active: true }
  ];

  const dataSources = [
    { name: 'Gov.uk Migration API', status: 'online', lastUpdate: '2min ago', frequency: '15min', health: 100 },
    { name: 'Open-Meteo Marine API', status: 'online', lastUpdate: '5min ago', frequency: '1h', health: 98 },
    { name: 'SHOM Marées', status: 'online', lastUpdate: '10min ago', frequency: '6h', health: 95 },
    { name: 'Meteostat', status: 'warning', lastUpdate: '45min ago', frequency: '30min', health: 75 },
    { name: 'Données terrain', status: 'online', lastUpdate: '1min ago', frequency: 'temps réel', health: 100 }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">POSÉIDON - Configuration & Administration</h1>
              <p className="text-sm text-slate-400">Paramètres système et gestion des utilisateurs</p>
            </div>
          </div>
          {hasChanges && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setHasChanges(false)}
                className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-sm font-medium">Annuler</span>
              </button>
              <button
                onClick={() => setHasChanges(false)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span className="text-sm font-medium">Enregistrer</span>
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-slate-800 border-r border-slate-700 overflow-y-auto">
          <div className="p-4 space-y-2">
            {[
              { id: 'zones', label: 'Zones de surveillance', icon: MapPin },
              { id: 'model', label: 'Modèle prédictif', icon: Sliders },
              { id: 'alerts', label: 'Seuils d\'alerte', icon: Bell },
              { id: 'data', label: 'Sources de données', icon: Database },
              { id: 'users', label: 'Utilisateurs', icon: Users },
              { id: 'security', label: 'Sécurité', icon: Shield },
              { id: 'performance', label: 'Performance', icon: Activity }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                  activeSection === id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeSection === 'zones' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Zones de Surveillance</h2>
                  <p className="text-slate-400">Configuration des zones géographiques surveillées</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
                  + Ajouter une zone
                </button>
              </div>

              <div className="grid gap-4">
                {zones.map((zone) => (
                  <div key={zone.id} className="bg-slate-800 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          zone.active ? 'bg-green-600' : 'bg-slate-600'
                        }`}>
                          <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-bold text-lg mb-1">{zone.name}</div>
                          <div className="text-sm text-slate-400">
                            {zone.sensors} capteurs actifs • Priorité {zone.priority === 'high' ? 'Élevée' : zone.priority === 'medium' ? 'Moyenne' : 'Faible'}
                          </div>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={zone.active}
                          onChange={() => setHasChanges(true)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Latitude</label>
                        <input
                          type="number"
                          value={zone.lat}
                          onChange={() => setHasChanges(true)}
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Longitude</label>
                        <input
                          type="number"
                          value={zone.lon}
                          onChange={() => setHasChanges(true)}
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Rayon (km)</label>
                        <input
                          type="number"
                          value={zone.radius}
                          onChange={() => setHasChanges(true)}
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm text-slate-400 mb-2">Niveau de priorité</label>
                      <select
                        value={zone.priority}
                        onChange={() => setHasChanges(true)}
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                      >
                        <option value="high">Élevée</option>
                        <option value="medium">Moyenne</option>
                        <option value="low">Faible</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'model' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Paramètres du Modèle Prédictif</h2>
                <p className="text-slate-400">Configuration des poids et seuils du modèle d'apprentissage</p>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="font-bold mb-4">Pondération des Facteurs</h3>
                <div className="space-y-6">
                  {[
                    { name: 'Hauteur des vagues', weight: 40, min: 0, max: 50 },
                    { name: 'Direction et vitesse du vent', weight: 30, min: 0, max: 50 },
                    { name: 'Coefficient de marée', weight: 15, min: 0, max: 30 },
                    { name: 'Fenêtre post-marée haute', weight: 10, min: 0, max: 20 },
                    { name: 'Facteurs comportementaux', weight: 5, min: 0, max: 20 }
                  ].map((factor, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{factor.name}</span>
                        <span className="text-sm text-slate-400">{factor.weight}%</span>
                      </div>
                      <input
                        type="range"
                        min={factor.min}
                        max={factor.max}
                        value={factor.weight}
                        onChange={() => setHasChanges(true)}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-900 border border-blue-700 rounded">
                  <p className="text-sm">
                    <strong>Note:</strong> La somme des poids doit totaliser 100%. Les modifications nécessitent un recalibrage du modèle (environ 2 heures).
                  </p>
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="font-bold mb-4">Seuils Critiques</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Hauteur max vagues (m)</label>
                    <input
                      type="number"
                      defaultValue="1.0"
                      step="0.1"
                      onChange={() => setHasChanges(true)}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                    />
                    <p className="text-xs text-slate-500 mt-1">Au-delà: conditions défavorables</p>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Vitesse max vent (kt)</label>
                    <input
                      type="number"
                      defaultValue="20"
                      onChange={() => setHasChanges(true)}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                    />
                    <p className="text-xs text-slate-500 mt-1">Au-delà: conditions dangereuses</p>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Coef marée min</label>
                    <input
                      type="number"
                      defaultValue="70"
                      onChange={() => setHasChanges(true)}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                    />
                    <p className="text-xs text-slate-500 mt-1">En-dessous: conditions peu favorables</p>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Fenêtre post-PM (h)</label>
                    <input
                      type="number"
                      defaultValue="3"
                      onChange={() => setHasChanges(true)}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                    />
                    <p className="text-xs text-slate-500 mt-1">Durée fenêtre optimale</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="font-bold mb-4">Performance du Modèle</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-1">87.3%</div>
                    <div className="text-sm text-slate-400">Précision globale</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-1">24,567</div>
                    <div className="text-sm text-slate-400">Observations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400 mb-1">+2.1%</div>
                    <div className="text-sm text-slate-400">vs mois dernier</div>
                  </div>
                </div>
                <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-medium">
                  Lancer recalibrage du modèle
                </button>
              </div>
            </div>
          )}

          {activeSection === 'alerts' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Configuration des Alertes</h2>
                <p className="text-slate-400">Définition des seuils et niveaux d'alerte</p>
              </div>

              <div className="grid gap-4">
                {[
                  { level: 'Critique', color: 'red', threshold: 90, icon: '🔴' },
                  { level: 'Élevé', color: 'orange', threshold: 70, icon: '🟠' },
                  { level: 'Moyen', color: 'yellow', threshold: 50, icon: '🟡' },
                  { level: 'Faible', color: 'green', threshold: 30, icon: '🟢' }
                ].map((alert, idx) => (
                  <div key={idx} className="bg-slate-800 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{alert.icon}</span>
                      <div>
                        <div className="font-bold text-lg">Alerte {alert.level}</div>
                        <div className="text-sm text-slate-400">Probabilité ≥ {alert.threshold}%</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Seuil de probabilité (%)</label>
                        <input
                          type="number"
                          defaultValue={alert.threshold}
                          onChange={() => setHasChanges(true)}
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Délai d'escalade (min)</label>
                        <input
                          type="number"
                          defaultValue={alert.level === 'Critique' ? 5 : 15}
                          onChange={() => setHasChanges(true)}
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm text-slate-400 mb-2">Canaux de notification</label>
                      <div className="flex gap-2">
                        <label className="flex items-center gap-2 px-3 py-2 bg-slate-700 rounded cursor-pointer">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">Email</span>
                        </label>
                        <label className="flex items-center gap-2 px-3 py-2 bg-slate-700 rounded cursor-pointer">
                          <input type="checkbox" defaultChecked={alert.level === 'Critique'} />
                          <span className="text-sm">SMS</span>
                        </label>
                        <label className="flex items-center gap-2 px-3 py-2 bg-slate-700 rounded cursor-pointer">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">Push</span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'data' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Sources de Données</h2>
                <p className="text-slate-400">État et configuration des sources de données externes</p>
              </div>

              <div className="grid gap-4">
                {dataSources.map((source, idx) => (
                  <div key={idx} className="bg-slate-800 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          source.status === 'online' ? 'bg-green-600' :
                          source.status === 'warning' ? 'bg-yellow-600' : 'bg-red-600'
                        }`}>
                          <Database className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-bold text-lg">{source.name}</div>
                          <div className="text-sm text-slate-400">
                            Mise à jour: {source.lastUpdate} • Fréquence: {source.frequency}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold mb-1">{source.health}%</div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          source.status === 'online' ? 'bg-green-600' :
                          source.status === 'warning' ? 'bg-yellow-600' : 'bg-red-600'
                        }`}>
                          {source.status === 'online' ? 'EN LIGNE' :
                           source.status === 'warning' ? 'ATTENTION' : 'HORS LIGNE'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm">
                        Tester connexion
                      </button>
                      <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm">
                        Configurer
                      </button>
                      <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm">
                        Logs
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Gestion des Utilisateurs</h2>
                  <p className="text-slate-400">Comptes et autorisations d'accès</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
                  + Nouvel utilisateur
                </button>
              </div>

              <div className="bg-slate-800 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="px-6 py-3 text-left">Nom</th>
                      <th className="px-6 py-3 text-left">Rôle</th>
                      <th className="px-6 py-3 text-left">Unité</th>
                      <th className="px-6 py-3 text-left">Dernier accès</th>
                      <th className="px-6 py-3 text-center">Statut</th>
                      <th className="px-6 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-750">
                        <td className="px-6 py-4 font-medium">{user.name}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.role === 'admin' ? 'bg-purple-600' :
                            user.role === 'operator' ? 'bg-blue-600' : 'bg-slate-600'
                          }`}>
                            {user.role === 'admin' ? 'Admin' :
                             user.role === 'operator' ? 'Opérateur' : 'Lecteur'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-400">{user.unit}</td>
                        <td className="px-6 py-4 text-sm text-slate-400">{user.lastAccess}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.active ? 'bg-green-600' : 'bg-red-600'
                          }`}>
                            {user.active ? 'Actif' : 'Inactif'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded">✏️</button>
                            <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded">🔒</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Sécurité</h2>
                <p className="text-slate-400">Paramètres de sécurité et conformité</p>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="font-bold mb-4">Authentification</h3>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 bg-slate-700 rounded-lg cursor-pointer">
                    <div>
                      <div className="font-medium">Authentification multi-facteurs (MFA)</div>
                      <div className="text-sm text-slate-400">Obligatoire pour tous les utilisateurs</div>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </label>
                  <label className="flex items-center justify-between p-4 bg-slate-700 rounded-lg cursor-pointer">
                    <div>
                      <div className="font-medium">Expiration de session</div>
                      <div className="text-sm text-slate-400">Déconnexion après 30min d'inactivité</div>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </label>
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="font-bold mb-4">Audit et Conformité</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700 p-4 rounded-lg">
                    <div className="text-2xl font-bold mb-1">2,847</div>
                    <div className="text-sm text-slate-400">Connexions (30j)</div>
                  </div>
                  <div className="bg-slate-700 p-4 rounded-lg">
                    <div className="text-2xl font-bold mb-1">156</div>
                    <div className="text-sm text-slate-400">Actions sensibles</div>
                  </div>
                </div>
                <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg">
                  Télécharger logs d'audit
                </button>
              </div>
            </div>
          )}

          {activeSection === 'performance' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Performance Système</h2>
                <p className="text-slate-400">Monitoring et optimisation</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="text-sm text-slate-400 mb-2">Temps de réponse moyen</div>
                  <div className="text-3xl font-bold text-green-400">1.2s</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="text-sm text-slate-400 mb-2">Disponibilité (30j)</div>
                  <div className="text-3xl font-bold text-green-400">99.7%</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="text-sm text-slate-400 mb-2">Requêtes/jour</div>
                  <div className="text-3xl font-bold text-blue-400">12.4K</div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="font-bold mb-4">Utilisation des Ressources</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">CPU</span>
                      <span className="text-sm text-slate-400">45%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Mémoire</span>
                      <span className="text-sm text-slate-400">62%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '62%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Stockage</span>
                      <span className="text-sm text-slate-400">38%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '38%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PoseidonConfig;