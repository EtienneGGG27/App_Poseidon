import React, { useState } from 'react';
import { BookOpen, Video, CheckCircle, Play, FileText, Award, Target, Users, AlertCircle, Clock, ChevronRight, Download } from 'lucide-react';

const PoseidonTraining = () => {
  const [activeModule, setActiveModule] = useState(null);
  const [completedModules, setCompletedModules] = useState([1, 2]);
  const [currentLesson, setCurrentLesson] = useState(null);

  const trainingModules = [
    {
      id: 1,
      title: 'Introduction à POSÉIDON',
      description: 'Découvrez les fondamentaux du système',
      duration: '30 min',
      level: 'Débutant',
      lessons: 5,
      icon: BookOpen,
      color: 'bg-blue-600',
      content: [
        { id: 1, title: 'Vue d\'ensemble du projet', type: 'video', duration: '8 min' },
        { id: 2, title: 'Architecture du système', type: 'text', duration: '5 min' },
        { id: 3, title: 'Interface utilisateur', type: 'interactive', duration: '10 min' },
        { id: 4, title: 'Glossaire et terminologie', type: 'text', duration: '5 min' },
        { id: 5, title: 'Quiz d\'évaluation', type: 'quiz', duration: '2 min' }
      ]
    },
    {
      id: 2,
      title: 'Dashboard Opérationnel',
      description: 'Maîtrisez la vue d\'ensemble et les KPIs',
      duration: '45 min',
      level: 'Débutant',
      lessons: 6,
      icon: Target,
      color: 'bg-green-600',
      content: [
        { id: 1, title: 'Navigation dans le dashboard', type: 'video', duration: '10 min' },
        { id: 2, title: 'Lecture des alertes', type: 'interactive', duration: '12 min' },
        { id: 3, title: 'Interprétation des KPIs', type: 'text', duration: '8 min' },
        { id: 4, title: 'Fenêtres de favorabilité', type: 'video', duration: '10 min' },
        { id: 5, title: 'Exercice pratique', type: 'exercise', duration: '3 min' },
        { id: 6, title: 'Quiz d\'évaluation', type: 'quiz', duration: '2 min' }
      ]
    },
    {
      id: 3,
      title: 'Cartographie Interactive',
      description: 'Exploitez la vue géospatiale',
      duration: '40 min',
      level: 'Intermédiaire',
      lessons: 5,
      icon: Target,
      color: 'bg-purple-600',
      content: [
        { id: 1, title: 'Navigation sur la carte', type: 'interactive', duration: '12 min' },
        { id: 2, title: 'Couches d\'information', type: 'video', duration: '10 min' },
        { id: 3, title: 'Filtres et recherche', type: 'text', duration: '8 min' },
        { id: 4, title: 'Analyse de zones', type: 'exercise', duration: '8 min' },
        { id: 5, title: 'Quiz d\'évaluation', type: 'quiz', duration: '2 min' }
      ]
    },
    {
      id: 4,
      title: 'Gestion des Alertes',
      description: 'Réagissez efficacement aux alertes',
      duration: '35 min',
      level: 'Intermédiaire',
      lessons: 6,
      icon: AlertCircle,
      color: 'bg-red-600',
      content: [
        { id: 1, title: 'Types d\'alertes', type: 'text', duration: '5 min' },
        { id: 2, title: 'Procédures de réponse', type: 'video', duration: '12 min' },
        { id: 3, title: 'Acquittement et escalade', type: 'interactive', duration: '10 min' },
        { id: 4, title: 'Communication inter-unités', type: 'text', duration: '5 min' },
        { id: 5, title: 'Cas pratiques', type: 'exercise', duration: '1 min' },
        { id: 6, title: 'Quiz d\'évaluation', type: 'quiz', duration: '2 min' }
      ]
    },
    {
      id: 5,
      title: 'Analyses & Prédictions',
      description: 'Comprenez le modèle prédictif',
      duration: '50 min',
      level: 'Avancé',
      lessons: 7,
      icon: Target,
      color: 'bg-orange-600',
      content: [
        { id: 1, title: 'Modèle prédictif : principes', type: 'video', duration: '15 min' },
        { id: 2, title: 'Facteurs de prédiction', type: 'text', duration: '10 min' },
        { id: 3, title: 'Lecture des corrélations', type: 'interactive', duration: '10 min' },
        { id: 4, title: 'Interprétation des prévisions', type: 'video', duration: '8 min' },
        { id: 5, title: 'Limites du modèle', type: 'text', duration: '4 min' },
        { id: 6, title: 'Exercice d\'analyse', type: 'exercise', duration: '1 min' },
        { id: 7, title: 'Quiz d\'évaluation', type: 'quiz', duration: '2 min' }
      ]
    },
    {
      id: 6,
      title: 'Gestion des Patrouilles',
      description: 'Coordonnez les moyens terrain',
      duration: '40 min',
      level: 'Avancé',
      lessons: 6,
      icon: Users,
      color: 'bg-indigo-600',
      content: [
        { id: 1, title: 'Planification des patrouilles', type: 'video', duration: '12 min' },
        { id: 2, title: 'Recommandations automatiques', type: 'interactive', duration: '10 min' },
        { id: 3, title: 'Suivi temps réel', type: 'text', duration: '8 min' },
        { id: 4, title: 'Gestion des ressources', type: 'video', duration: '7 min' },
        { id: 5, title: 'Scénario pratique', type: 'exercise', duration: '1 min' },
        { id: 6, title: 'Quiz d\'évaluation', type: 'quiz', duration: '2 min' }
      ]
    },
    {
      id: 7,
      title: 'Gestion des Incidents',
      description: 'Documentez et suivez les incidents',
      duration: '35 min',
      level: 'Intermédiaire',
      lessons: 5,
      icon: AlertCircle,
      color: 'bg-yellow-600',
      content: [
        { id: 1, title: 'Création d\'incident', type: 'video', duration: '10 min' },
        { id: 2, title: 'Mises à jour et timeline', type: 'interactive', duration: '10 min' },
        { id: 3, title: 'Clôture et reporting', type: 'text', duration: '8 min' },
        { id: 4, title: 'Cas d\'usage réels', type: 'exercise', duration: '5 min' },
        { id: 5, title: 'Quiz d\'évaluation', type: 'quiz', duration: '2 min' }
      ]
    },
    {
      id: 8,
      title: 'Rapports & Exports',
      description: 'Générez et partagez des rapports',
      duration: '30 min',
      level: 'Débutant',
      lessons: 4,
      icon: FileText,
      color: 'bg-teal-600',
      content: [
        { id: 1, title: 'Types de rapports', type: 'text', duration: '8 min' },
        { id: 2, title: 'Génération automatique', type: 'video', duration: '10 min' },
        { id: 3, title: 'Personnalisation', type: 'interactive', duration: '8 min' },
        { id: 4, title: 'Quiz d\'évaluation', type: 'quiz', duration: '4 min' }
      ]
    }
  ];

  const userProgress = {
    modulesCompleted: 2,
    totalModules: 8,
    hoursSpent: 3.5,
    certificatesEarned: 1,
    lastActivity: '2025-10-16'
  };

  const certificates = [
    { id: 1, name: 'POSÉIDON - Niveau Débutant', earned: true, date: '2025-10-10' },
    { id: 2, name: 'POSÉIDON - Niveau Intermédiaire', earned: false, progress: 60 },
    { id: 3, name: 'POSÉIDON - Niveau Avancé', earned: false, progress: 0 },
    { id: 4, name: 'POSÉIDON - Expert Opérationnel', earned: false, progress: 0 }
  ];

  const getLevelColor = (level) => {
    switch(level) {
      case 'Débutant': return 'bg-green-600';
      case 'Intermédiaire': return 'bg-yellow-600';
      case 'Avancé': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'text': return <FileText className="w-4 h-4" />;
      case 'interactive': return <Target className="w-4 h-4" />;
      case 'exercise': return <Target className="w-4 h-4" />;
      case 'quiz': return <CheckCircle className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const isModuleCompleted = (moduleId) => completedModules.includes(moduleId);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-900 to-purple-900 border-b border-indigo-700 px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Centre de Formation POSÉIDON</h1>
            <p className="text-indigo-200">Développez vos compétences opérationnelles</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-indigo-800 px-6 py-3 rounded-lg">
              <div className="text-sm text-indigo-300 mb-1">Progression globale</div>
              <div className="text-3xl font-bold">{Math.round((userProgress.modulesCompleted / userProgress.totalModules) * 100)}%</div>
            </div>
            <button className="bg-white text-indigo-900 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50">
              Mon profil
            </button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Progression utilisateur */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-slate-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-slate-400">Modules complétés</div>
              <BookOpen className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-4xl font-bold mb-1">{userProgress.modulesCompleted}/{userProgress.totalModules}</div>
            <div className="w-full bg-slate-700 rounded-full h-2 mt-3">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${(userProgress.modulesCompleted / userProgress.totalModules) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-slate-400">Temps de formation</div>
              <Clock className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-4xl font-bold mb-1">{userProgress.hoursSpent}h</div>
            <div className="text-sm text-slate-400">Cette semaine</div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-slate-400">Certifications</div>
              <Award className="w-5 h-5 text-orange-400" />
            </div>
            <div className="text-4xl font-bold mb-1">{userProgress.certificatesEarned}</div>
            <div className="text-sm text-slate-400">Obtenue{userProgress.certificatesEarned > 1 ? 's' : ''}</div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-slate-400">Dernière activité</div>
              <Clock className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-lg font-bold mb-1">{userProgress.lastActivity}</div>
            <div className="text-sm text-slate-400">Il y a 1 jour</div>
          </div>
        </div>

        {/* Parcours de formation */}
        {!activeModule ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Parcours de Formation</h2>
              <div className="grid grid-cols-2 gap-6">
                {trainingModules.map((module) => {
                  const ModuleIcon = module.icon;
                  const completed = isModuleCompleted(module.id);
                  
                  return (
                    <div
                      key={module.id}
                      className={`bg-slate-800 rounded-lg p-6 border-l-4 ${completed ? 'border-green-500' : 'border-slate-600'} hover:bg-slate-750 transition-colors cursor-pointer`}
                      onClick={() => setActiveModule(module)}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`${module.color} p-3 rounded-lg`}>
                          <ModuleIcon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-lg">{module.title}</h3>
                            {completed && <CheckCircle className="w-5 h-5 text-green-400" />}
                          </div>
                          <p className="text-sm text-slate-400 mb-3">{module.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-slate-400" />
                              {module.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4 text-slate-400" />
                              {module.lessons} leçons
                            </span>
                            <span className={`px-2 py-1 ${getLevelColor(module.level)} rounded text-xs font-semibold`}>
                              {module.level}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-6 h-6 text-slate-400" />
                      </div>
                      
                      {!completed && (
                        <div>
                          <div className="flex justify-between text-xs text-slate-400 mb-2">
                            <span>Progression</span>
                            <span>0%</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Certifications Disponibles</h2>
              <div className="grid grid-cols-4 gap-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className={`bg-slate-800 rounded-lg p-6 text-center ${cert.earned ? 'border-2 border-orange-500' : ''}`}>
                    <Award className={`w-12 h-12 mx-auto mb-3 ${cert.earned ? 'text-orange-400' : 'text-slate-600'}`} />
                    <div className="font-bold mb-2">{cert.name}</div>
                    {cert.earned ? (
                      <div>
                        <div className="text-green-400 text-sm mb-1">✓ Obtenue</div>
                        <div className="text-xs text-slate-400">{cert.date}</div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-sm text-slate-400 mb-2">{cert.progress}% complété</div>
                        <div className="w-full bg-slate-700 rounded-full h-1">
                          <div className="bg-blue-500 h-1 rounded-full" style={{ width: `${cert.progress}%` }}></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Ressources supplémentaires */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-lg p-6 border border-blue-700">
              <h3 className="text-xl font-bold mb-4">Ressources Complémentaires</h3>
              <div className="grid grid-cols-3 gap-4">
                <button className="bg-blue-950 hover:bg-blue-900 p-4 rounded-lg text-left transition-colors">
                  <FileText className="w-8 h-8 mb-3 text-blue-400" />
                  <div className="font-bold mb-1">Documentation</div>
                  <div className="text-sm text-blue-200">Guides utilisateur complets</div>
                </button>
                <button className="bg-blue-950 hover:bg-blue-900 p-4 rounded-lg text-left transition-colors">
                  <Video className="w-8 h-8 mb-3 text-purple-400" />
                  <div className="font-bold mb-1">Webinaires</div>
                  <div className="text-sm text-blue-200">Sessions en direct</div>
                </button>
                <button className="bg-blue-950 hover:bg-blue-900 p-4 rounded-lg text-left transition-colors">
                  <Users className="w-8 h-8 mb-3 text-green-400" />
                  <div className="font-bold mb-1">Support</div>
                  <div className="text-sm text-blue-200">Assistance technique</div>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Vue détaillée du module */
          <div>
            <button
              onClick={() => setActiveModule(null)}
              className="mb-6 text-blue-400 hover:text-blue-300 flex items-center gap-2"
            >
              ← Retour aux modules
            </button>

            <div className="grid grid-cols-3 gap-6">
              {/* Contenu principal */}
              <div className="col-span-2 space-y-6">
                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`${activeModule.color} p-4 rounded-lg`}>
                      <activeModule.icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">{activeModule.title}</h2>
                      <p className="text-slate-400 mb-4">{activeModule.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-slate-400" />
                          {activeModule.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4 text-slate-400" />
                          {activeModule.lessons} leçons
                        </span>
                        <span className={`px-3 py-1 ${getLevelColor(activeModule.level)} rounded text-xs font-semibold`}>
                          {activeModule.level}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {activeModule.content.map((lesson, idx) => (
                      <div
                        key={lesson.id}
                        className="bg-slate-700 hover:bg-slate-600 rounded-lg p-4 flex items-center gap-4 cursor-pointer transition-colors"
                        onClick={() => setCurrentLesson(lesson)}
                      >
                        <div className="bg-slate-600 p-2 rounded">
                          {getTypeIcon(lesson.type)}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold mb-1">{idx + 1}. {lesson.title}</div>
                          <div className="text-sm text-slate-400">{lesson.duration}</div>
                        </div>
                        <Play className="w-5 h-5 text-blue-400" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vidéo/Contenu de la leçon */}
                {currentLesson && (
                  <div className="bg-slate-800 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">{currentLesson.title}</h3>
                    
                    {currentLesson.type === 'video' && (
                      <div className="bg-slate-900 rounded-lg aspect-video flex items-center justify-center mb-6">
                        <div className="text-center">
                          <Play className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                          <p className="text-slate-400">Vidéo de formation</p>
                          <p className="text-sm text-slate-500">{currentLesson.duration}</p>
                        </div>
                      </div>
                    )}

                    {currentLesson.type === 'text' && (
                      <div className="prose prose-invert max-w-none mb-6">
                        <p className="text-slate-300 leading-relaxed">
                          Contenu théorique détaillé sur le sujet. Cette section inclut des explications complètes,
                          des schémas illustratifs et des exemples pratiques pour faciliter la compréhension.
                        </p>
                      </div>
                    )}

                    {currentLesson.type === 'interactive' && (
                      <div className="bg-slate-900 rounded-lg p-8 mb-6 text-center">
                        <Target className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                        <p className="text-slate-400">Exercice interactif</p>
                        <p className="text-sm text-slate-500">Manipulation de l'interface en temps réel</p>
                      </div>
                    )}

                    {currentLesson.type === 'quiz' && (
                      <div className="space-y-4 mb-6">
                        <div className="bg-slate-700 rounded-lg p-4">
                          <div className="font-bold mb-3">Question 1/5</div>
                          <p className="mb-4">Quel est le seuil critique de hauteur de vagues pour les départs ?</p>
                          <div className="space-y-2">
                            {['0.5m', '0.8m', '1.0m', '1.5m'].map((option, idx) => (
                              <button key={idx} className="w-full bg-slate-600 hover:bg-slate-500 p-3 rounded text-left transition-colors">
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button className="flex-1 bg-slate-700 hover:bg-slate-600 py-3 rounded-lg font-medium">
                        Leçon précédente
                      </button>
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium">
                        Leçon suivante →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar progression */}
              <div className="space-y-6">
                <div className="bg-slate-800 rounded-lg p-6">
                  <h3 className="font-bold mb-4">Votre Progression</h3>
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold mb-2">0%</div>
                    <div className="text-sm text-slate-400">0 / {activeModule.lessons} leçons</div>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3 mb-4">
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <button className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-medium">
                    Marquer comme terminé
                  </button>
                </div>

                <div className="bg-slate-800 rounded-lg p-6">
                  <h3 className="font-bold mb-4">Objectifs d'Apprentissage</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                      <span>Comprendre les fondamentaux du système</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                      <span>Naviguer efficacement dans l'interface</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-4 h-4 border-2 border-slate-600 rounded-full mt-0.5"></div>
                      <span>Utiliser les fonctionnalités avancées</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-4 h-4 border-2 border-slate-600 rounded-full mt-0.5"></div>
                      <span>Réussir le quiz d'évaluation</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-900 to-red-900 rounded-lg p-6 border border-orange-700">
                  <Award className="w-12 h-12 text-orange-400 mb-3" />
                  <h3 className="font-bold mb-2">Certification</h3>
                  <p className="text-sm text-orange-200 mb-4">
                    Terminez ce module et réussissez le quiz pour obtenir votre certification.
                  </p>
                  <div className="text-xs text-orange-300">Score requis: 80%</div>
                </div>

                <div className="bg-slate-800 rounded-lg p-6">
                  <h3 className="font-bold mb-4">Ressources</h3>
                  <div className="space-y-2">
                    <button className="w-full bg-slate-700 hover:bg-slate-600 p-3 rounded flex items-center gap-3 text-sm transition-colors">
                      <FileText className="w-4 h-4 text-blue-400" />
                      <span>Guide PDF</span>
                      <Download className="w-4 h-4 ml-auto" />
                    </button>
                    <button className="w-full bg-slate-700 hover:bg-slate-600 p-3 rounded flex items-center gap-3 text-sm transition-colors">
                      <FileText className="w-4 h-4 text-green-400" />
                      <span>Support de cours</span>
                      <Download className="w-4 h-4 ml-auto" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PoseidonTraining;