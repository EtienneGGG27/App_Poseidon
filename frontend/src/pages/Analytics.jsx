import React, { useState } from 'react';
import { TrendingUp, BarChart3, Activity, Calendar, AlertCircle, Brain, Target, Download } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const PoseidonAnalytics = () => {
  const [timeframe, setTimeframe] = useState('7days');
  const [analysisType, setAnalysisType] = useState('correlation');

  // Données de corrélation vagues/départs
  const waveCorrelationData = [
    { waveHeight: 0.3, departures: 245, probability: 95 },
    { waveHeight: 0.5, departures: 312, probability: 92 },
    { waveHeight: 0.7, departures: 287, probability: 88 },
    { waveHeight: 0.9, departures: 156, probability: 65 },
    { waveHeight: 1.1, departures: 45, probability: 35 },
    { waveHeight: 1.3, departures: 12, probability: 15 },
    { waveHeight: 1.5, departures: 3, probability: 5 },
    { waveHeight: 1.8, departures: 0, probability: 2 }
  ];

  // Données historiques avec conditions météo
  const historicalData = [
    { date: '01 Oct', departures: 142, waveHeight: 0.6, windSpeed: 12, probability: 78 },
    { date: '02 Oct', departures: 87, waveHeight: 0.8, windSpeed: 15, probability: 62 },
    { date: '03 Oct', departures: 203, waveHeight: 0.5, windSpeed: 10, probability: 89 },
    { date: '04 Oct', departures: 45, waveHeight: 1.2, windSpeed: 18, probability: 35 },
    { date: '05 Oct', departures: 178, waveHeight: 0.7, windSpeed: 13, probability: 82 },
    { date: '06 Oct', departures: 0, waveHeight: 1.5, windSpeed: 22, probability: 8 },
    { date: '07 Oct', departures: 156, waveHeight: 0.6, windSpeed: 11, probability: 85 },
    { date: '08 Oct', departures: 234, waveHeight: 0.4, windSpeed: 9, probability: 92 },
    { date: '09 Oct', departures: 98, waveHeight: 0.9, windSpeed: 16, probability: 58 },
    { date: '10 Oct', departures: 267, waveHeight: 0.5, windSpeed: 10, probability: 90 },
    { date: '11 Oct', departures: 189, waveHeight: 0.7, windSpeed: 12, probability: 83 },
    { date: '12 Oct', departures: 145, waveHeight: 0.8, windSpeed: 14, probability: 72 },
    { date: '13 Oct', departures: 312, waveHeight: 0.4, windSpeed: 8, probability: 94 },
    { date: '14 Oct', departures: 67, waveHeight: 1.1, windSpeed: 19, probability: 42 }
  ];

  // Données de prévision
  const forecastData = [
    { date: '17 Oct', predicted: 245, lower: 210, upper: 280, probability: 87 },
    { date: '18 Oct', predicted: 156, lower: 130, upper: 182, probability: 72 },
    { date: '19 Oct', predicted: 312, lower: 285, upper: 340, probability: 93 },
    { date: '20 Oct', predicted: 89, lower: 65, upper: 115, probability: 58 },
    { date: '21 Oct', predicted: 198, lower: 175, upper: 225, probability: 81 },
    { date: '22 Oct', predicted: 267, lower: 240, upper: 295, probability: 89 },
    { date: '23 Oct', predicted: 134, lower: 110, upper: 160, probability: 68 }
  ];

  // Données d'impact du vent par direction
  const windDirectionData = [
    { direction: 'N', departures: 45, favorable: 30 },
    { direction: 'NE', departures: 78, favorable: 45 },
    { direction: 'E', departures: 123, favorable: 65 },
    { direction: 'SE', departures: 189, favorable: 85 },
    { direction: 'S', departures: 234, favorable: 92 },
    { direction: 'SW', departures: 267, favorable: 95 },
    { direction: 'W', departures: 198, favorable: 82 },
    { direction: 'NW', departures: 89, favorable: 55 }
  ];

  // Données facteurs multiples
  const multiFactorData = [
    { factor: 'Vagues <0.8m', score: 95, weight: 40 },
    { factor: 'Vent SW/S', score: 88, weight: 30 },
    { factor: 'Coef marée >80', score: 82, weight: 15 },
    { factor: 'Fenêtre 3h PM', score: 78, weight: 10 },
    { factor: 'Pression groupe', score: 65, weight: 5 }
  ];

  // Données mensuelle comparative
  const monthlyComparison = [
    { month: 'Avr', '2023': 2845, '2024': 3124, '2025': 3456 },
    { month: 'Mai', '2023': 3234, '2024': 3567, '2025': 3892 },
    { month: 'Juin', '2023': 4123, '2024': 4567, '2025': 5012 },
    { month: 'Juil', '2023': 4567, '2024': 5123, '2025': 5678 },
    { month: 'Août', '2023': 5234, '2024': 5789, '2025': 6123 },
    { month: 'Sept', '2023': 4789, '2024': 5234, '2025': 5567 },
    { month: 'Oct', '2023': 3456, '2024': 3789, '2025': 4123 }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">POSÉIDON - Analyses & Prédictions</h1>
              <p className="text-sm text-slate-400">Intelligence artificielle et modèles prédictifs</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-sm"
            >
              <option value="7days">7 derniers jours</option>
              <option value="30days">30 derniers jours</option>
              <option value="90days">3 derniers mois</option>
              <option value="year">Année en cours</option>
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Exporter rapport</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Analyses */}
      <nav className="bg-slate-800 border-b border-slate-700 px-6">
        <div className="flex gap-6">
          {[
            { id: 'correlation', label: 'Corrélations', icon: Activity },
            { id: 'forecast', label: 'Prévisions', icon: Brain },
            { id: 'trends', label: 'Tendances', icon: TrendingUp },
            { id: 'factors', label: 'Facteurs', icon: Target }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setAnalysisType(id)}
              className={`py-3 px-4 font-medium border-b-2 transition-colors flex items-center gap-2 ${
                analysisType === id
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

      {/* Main Content */}
      <main className="p-6">
        {/* KPIs principaux */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Précision Modèle</span>
              <Brain className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold mb-1">87.3%</div>
            <div className="text-xs text-green-400">+2.1% vs mois dernier</div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Départs Prédits</span>
              <Target className="w-5 h-5 text-orange-400" />
            </div>
            <div className="text-3xl font-bold mb-1">245</div>
            <div className="text-xs text-slate-400">Prochaines 24h</div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Fenêtres Actives</span>
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <div className="text-3xl font-bold mb-1">3</div>
            <div className="text-xs text-red-400">CODE ROUGE</div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Total Octobre</span>
              <Calendar className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-3xl font-bold mb-1">4,123</div>
            <div className="text-xs text-green-400">+18% vs 2024</div>
          </div>
        </div>

        {/* Contenu selon type d'analyse */}
        {analysisType === 'correlation' && (
          <div className="grid grid-cols-2 gap-6">
            {/* Corrélation Hauteur Vagues / Départs */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Corrélation: Hauteur des Vagues ↔ Départs</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={waveCorrelationData}>
                  <defs>
                    <linearGradient id="colorDepartures" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis 
                    dataKey="waveHeight" 
                    stroke="#94a3b8"
                    label={{ value: 'Hauteur vagues (m)', position: 'insideBottom', offset: -5, fill: '#94a3b8' }}
                  />
                  <YAxis stroke="#94a3b8" label={{ value: 'Départs', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#94a3b8' }}
                  />
                  <Area type="monotone" dataKey="departures" stroke="#3b82f6" fillOpacity={1} fill="url(#colorDepartures)" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-4 p-3 bg-blue-900 border border-blue-700 rounded">
                <p className="text-sm"><strong>Insight:</strong> Chute drastique des départs au-delà de 1.0m de vagues (r = -0.92)</p>
              </div>
            </div>

            {/* Impact Direction du Vent */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Impact de la Direction du Vent</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={windDirectionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="direction" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Bar dataKey="departures" fill="#3b82f6" name="Départs totaux" />
                  <Bar dataKey="favorable" fill="#10b981" name="Conditions favorables" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 p-3 bg-green-900 border border-green-700 rounded">
                <p className="text-sm"><strong>Insight:</strong> Directions SW et S montrent 95% de conditions favorables</p>
              </div>
            </div>

            {/* Historique avec conditions multiples */}
            <div className="col-span-2 bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Historique Départs vs Conditions Météo-Marines</h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" stroke="#94a3b8" />
                  <YAxis yAxisId="left" stroke="#94a3b8" label={{ value: 'Départs', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                  <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" label={{ value: 'Hauteur (m) / Vent (kt)', angle: 90, position: 'insideRight', fill: '#94a3b8' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="departures" stroke="#3b82f6" strokeWidth={3} name="Départs" />
                  <Line yAxisId="right" type="monotone" dataKey="waveHeight" stroke="#10b981" strokeWidth={2} name="Vagues (m)" strokeDasharray="5 5" />
                  <Line yAxisId="right" type="monotone" dataKey="windSpeed" stroke="#f59e0b" strokeWidth={2} name="Vent (kt)" strokeDasharray="3 3" />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="p-3 bg-blue-900 border border-blue-700 rounded text-center">
                  <div className="text-sm text-slate-300">Corrélation vagues</div>
                  <div className="text-2xl font-bold">-0.92</div>
                </div>
                <div className="p-3 bg-orange-900 border border-orange-700 rounded text-center">
                  <div className="text-sm text-slate-300">Corrélation vent</div>
                  <div className="text-2xl font-bold">-0.76</div>
                </div>
                <div className="p-3 bg-green-900 border border-green-700 rounded text-center">
                  <div className="text-sm text-slate-300">Précision modèle</div>
                  <div className="text-2xl font-bold">87%</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {analysisType === 'forecast' && (
          <div className="grid grid-cols-1 gap-6">
            {/* Prédictions 7 jours */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Prédictions des Départs - 7 Prochains Jours</h3>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={forecastData}>
                  <defs>
                    <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    </linearGradient>
                    <linearGradient id="colorUncertainty" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" label={{ value: 'Départs prédits', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    formatter={(value, name) => {
                      if (name === 'Intervalle confiance') return null;
                      return [value, name];
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="upper" 
                    stroke="none" 
                    fillOpacity={1} 
                    fill="url(#colorUncertainty)"
                    name="Intervalle confiance"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="lower" 
                    stroke="none" 
                    fillOpacity={1} 
                    fill="#1e293b"
                    name="Intervalle confiance"
                  />
                  <Line type="monotone" dataKey="predicted" stroke="#3b82f6" strokeWidth={3} name="Prédiction" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Détails prévisions par jour */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Détails des Prévisions Journalières</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="px-4 py-3 text-left">Date</th>
                      <th className="px-4 py-3 text-center">Prédiction</th>
                      <th className="px-4 py-3 text-center">Intervalle (95%)</th>
                      <th className="px-4 py-3 text-center">Probabilité</th>
                      <th className="px-4 py-3 text-center">Niveau Risque</th>
                      <th className="px-4 py-3 text-center">Confiance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {forecastData.map((day, idx) => (
                      <tr key={idx} className="hover:bg-slate-750">
                        <td className="px-4 py-3 font-medium">{day.date}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="text-xl font-bold text-blue-400">{day.predicted}</span>
                        </td>
                        <td className="px-4 py-3 text-center text-sm text-slate-400">
                          {day.lower} - {day.upper}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="text-lg font-semibold">{day.probability}%</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            day.probability >= 85 ? 'bg-red-600' :
                            day.probability >= 70 ? 'bg-orange-500' :
                            day.probability >= 50 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}>
                            {day.probability >= 85 ? 'ÉLEVÉ' :
                             day.probability >= 70 ? 'MOYEN-ÉLEVÉ' :
                             day.probability >= 50 ? 'MOYEN' : 'FAIBLE'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${Math.max(70, 100 - (day.upper - day.lower) / 3)}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {analysisType === 'trends' && (
          <div className="grid grid-cols-1 gap-6">
            {/* Comparaison mensuelle multi-années */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Tendances Mensuelles - Comparaison Multi-Années</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyComparison}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" label={{ value: 'Départs mensuels', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="2023" stroke="#64748b" strokeWidth={2} name="2023" strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="2024" stroke="#3b82f6" strokeWidth={2} name="2024" />
                  <Line type="monotone" dataKey="2025" stroke="#10b981" strokeWidth={3} name="2025" />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="p-3 bg-slate-700 rounded">
                  <div className="text-sm text-slate-400">Croissance 2024→2025</div>
                  <div className="text-2xl font-bold text-green-400">+18.3%</div>
                </div>
                <div className="p-3 bg-slate-700 rounded">
                  <div className="text-sm text-slate-400">Pic historique</div>
                  <div className="text-2xl font-bold text-orange-400">Août 2025</div>
                </div>
                <div className="p-3 bg-slate-700 rounded">
                  <div className="text-sm text-slate-400">Total année projeté</div>
                  <div className="text-2xl font-bold text-blue-400">~52,000</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {analysisType === 'factors' && (
          <div className="grid grid-cols-2 gap-6">
            {/* Poids des facteurs */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Poids des Facteurs Prédictifs</h3>
              <div className="space-y-4">
                {multiFactorData.map((factor, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{factor.factor}</span>
                      <span className="text-sm text-slate-400">{factor.weight}% du modèle</span>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-slate-700 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-blue-400 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${factor.score}%` }}
                        ></div>
                      </div>
                      <span className="absolute right-2 top-0 text-xs font-bold">{factor.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-900 border border-blue-700 rounded">
                <h4 className="font-bold mb-2">Modèle Prédictif</h4>
                <p className="text-sm text-slate-300">
                  Le modèle utilise une régression multi-variée avec pondération adaptative basée sur 
                  les données historiques depuis 2018 (n=24,567 observations).
                </p>
              </div>
            </div>

            {/* Visualisation radar multi-facteurs */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Profil de Favorabilité Actuel</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={multiFactorData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="factor" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#94a3b8" />
                  <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 bg-green-900 border border-green-700 rounded text-center">
                <div className="text-sm text-slate-300 mb-1">Score Global de Favorabilité</div>
                <div className="text-4xl font-bold text-green-400">84.2%</div>
                <div className="text-xs text-green-300 mt-1">Conditions hautement favorables</div>
              </div>
            </div>

            {/* Matrice de sensibilité */}
            <div className="col-span-2 bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Matrice de Sensibilité des Facteurs</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="px-4 py-3 text-left">Facteur</th>
                      <th className="px-4 py-3 text-center">Valeur Actuelle</th>
                      <th className="px-4 py-3 text-center">Seuil Optimal</th>
                      <th className="px-4 py-3 text-center">Impact si Optimal</th>
                      <th className="px-4 py-3 text-center">État</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    <tr>
                      <td className="px-4 py-3">Hauteur des vagues</td>
                      <td className="px-4 py-3 text-center font-semibold">0.7m</td>
                      <td className="px-4 py-3 text-center text-slate-400">&lt; 0.8m</td>
                      <td className="px-4 py-3 text-center text-green-400">+2%</td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-2 py-1 bg-green-600 rounded text-xs">OPTIMAL</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Vitesse du vent</td>
                      <td className="px-4 py-3 text-center font-semibold">12 kt</td>
                      <td className="px-4 py-3 text-center text-slate-400">8-14 kt</td>
                      <td className="px-4 py-3 text-center text-green-400">+1%</td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-2 py-1 bg-green-600 rounded text-xs">OPTIMAL</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Coefficient marée</td>
                      <td className="px-4 py-3 text-center font-semibold">87</td>
                      <td className="px-4 py-3 text-center text-slate-400">&gt; 80</td>
                      <td className="px-4 py-3 text-center text-green-400">—</td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-2 py-1 bg-green-600 rounded text-xs">OPTIMAL</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Direction vent</td>
                      <td className="px-4 py-3 text-center font-semibold">SW</td>
                      <td className="px-4 py-3 text-center text-slate-400">SW/S</td>
                      <td className="px-4 py-3 text-center text-green-400">—</td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-2 py-1 bg-green-600 rounded text-xs">OPTIMAL</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Fenêtre temporelle</td>
                      <td className="px-4 py-3 text-center font-semibold">+2h PM</td>
                      <td className="px-4 py-3 text-center text-slate-400">0-3h post-PM</td>
                      <td className="px-4 py-3 text-center text-green-400">—</td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-2 py-1 bg-green-600 rounded text-xs">OPTIMAL</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-4 bg-green-900 border-l-4 border-green-500 rounded">
                <p className="font-bold text-green-300 mb-1">✓ Tous les facteurs sont actuellement dans leur plage optimale</p>
                <p className="text-sm text-green-200">Probabilité maximale de tentatives de traversée dans les prochaines heures</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PoseidonAnalytics;