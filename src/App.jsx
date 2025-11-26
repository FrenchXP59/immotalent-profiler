import React, { useState, useEffect, useRef } from 'react';
import { 
  Building, 
  Target, 
  Users, 
  ClipboardList, 
  Trophy, 
  ArrowRight, 
  CheckCircle, 
  RefreshCcw,
  Briefcase,
  Home,
  Printer,
  FileText,
  AlertCircle,
  Unlock
} from 'lucide-react';

// --- DONNÉES DU QUIZ (30 QUESTIONS) ---
// ... existing questions data ...
const questions = [
  // --- AXE PROSPECTION & CHASSE ---
  {
    id: 1,
    question: "Vous repérez un panneau 'À Vendre par propriétaire' dans la rue. Que faites-vous ?",
    options: [
      { text: "Je sonne immédiatement à l'interphone pour discuter.", type: "chasseur" },
      { text: "Je note le numéro pour appeler plus tard au calme.", type: "gestionnaire" },
      { text: "Je cherche le bien en ligne pour analyser le prix avant d'agir.", type: "competitor" },
      { text: "Je demande aux voisins s'ils connaissent les propriétaires.", type: "eleveur" }
    ]
  },
  {
    id: 2,
    question: "Comment organisez-vous votre prospection téléphonique (pige) ?",
    options: [
      { text: "Je déteste ça, je préfère le terrain ou le réseau.", type: "eleveur" },
      { text: "Je bloque 2h tous les matins, c'est sacré.", type: "gestionnaire" },
      { text: "J'appelle dès qu'une nouvelle annonce sort, peu importe l'heure.", type: "chasseur" },
      { text: "Je ne fais que les biens à fort potentiel de commission.", type: "competitor" }
    ]
  },
  {
    id: 3,
    question: "Un prospect vous raccroche au nez sèchement. Votre réaction ?",
    options: [
      { text: "Je le rappelle immédiatement : 'Ça a coupé ?'", type: "chasseur" },
      { text: "Je le note en 'Ne pas rappeler' dans le CRM.", type: "gestionnaire" },
      { text: "Je le prends personnellement, ça me coupe l'élan.", type: "eleveur" },
      { text: "Suivant ! Je ne perds pas de temps avec les impolis.", type: "competitor" }
    ]
  },
  {
    id: 4,
    question: "Quelle est votre zone de prospection idéale ?",
    options: [
      { text: "Celle où il y a le plus de transactions, même si c'est la guerre.", type: "competitor" },
      { text: "Mon quartier de résidence, où tout le monde me connaît.", type: "eleveur" },
      { text: "Une zone géographique précise et délimitée rue par rue.", type: "gestionnaire" },
      { text: "Partout ! Je vais là où il y a du business.", type: "chasseur" }
    ]
  },
  {
    id: 5,
    question: "Vous voyez un concurrent poser un panneau 'Vendu' dans votre rue.",
    options: [
      { text: "Je vais voir les vendeurs pour les féliciter et laisser ma carte.", type: "eleveur" },
      { text: "Ça m'énerve, j'aurais dû avoir ce mandat.", type: "competitor" },
      { text: "Je note le prix de vente final pour ma base de données.", type: "gestionnaire" },
      { text: "Je prospecte immédiatement tout l'immeuble pour trouver le suivant.", type: "chasseur" }
    ]
  },

  // --- AXE RELATION CLIENT & EMPATHIE ---
  {
    id: 6,
    question: "Un client trouve la cuisine 'horrible' lors d'une visite. Votre réaction ?",
    options: [
      { text: "Je lui propose un devis travaux immédiatement.", type: "gestionnaire" },
      { text: "Je creuse : 'Qu'est-ce qui vous déplaît exactement ?'", type: "eleveur" },
      { text: "Je minimise : 'C'est juste de la déco, regardez ce salon !'", type: "chasseur" },
      { text: "Je lui montre que le prix tient compte de ce défaut.", type: "competitor" }
    ]
  },
  {
    id: 7,
    question: "Six mois après la vente, que faites-vous avec l'acheteur ?",
    options: [
      { text: "Je l'appelle pour savoir s'il est bien installé.", type: "eleveur" },
      { text: "Rien, sauf s'il me recontacte pour vendre.", type: "chasseur" },
      { text: "J'envoie une newsletter automatisée du marché.", type: "gestionnaire" },
      { text: "Je lui demande s'il connaît quelqu'un qui vend.", type: "competitor" }
    ]
  },
  {
    id: 8,
    question: "Un client vendeur surestime largement sa maison. Que dites-vous ?",
    options: [
      { text: "Je prends le mandat quand même, on baissera le prix plus tard.", type: "chasseur" },
      { text: "Je refuse le mandat, je ne travaille pas sur des prix faux.", type: "gestionnaire" },
      { text: "Je lui montre les chiffres du marché pour le convaincre factuellement.", type: "competitor" },
      { text: "J'essaie de comprendre pourquoi cette maison a tant de valeur pour lui.", type: "eleveur" }
    ]
  },
  {
    id: 9,
    question: "Un couple divorce et la vente est tendue. Votre rôle ?",
    options: [
      { text: "Je reste neutre et factuel pour éviter les problèmes.", type: "gestionnaire" },
      { text: "Je joue les médiateurs pour apaiser les tensions.", type: "eleveur" },
      { text: "Je focus sur la vente rapide pour qu'ils tournent la page.", type: "competitor" },
      { text: "Je communique séparément avec chacun pour avancer.", type: "chasseur" }
    ]
  },
  {
    id: 10,
    question: "Un client vous invite à sa crémaillère après la vente.",
    options: [
      { text: "J'y vais avec plaisir, c'est la meilleure partie du job.", type: "eleveur" },
      { text: "J'y vais pour distribuer des cartes de visite aux invités.", type: "chasseur" },
      { text: "Je décline poliment, je garde une distance professionnelle.", type: "gestionnaire" },
      { text: "J'y vais si je n'ai pas de rendez-vous client ce soir-là.", type: "competitor" }
    ]
  },

  // --- AXE ORGANISATION & RIGUEUR ---
  {
    id: 11,
    question: "Il est 19h00, vous n'avez pas atteint votre objectif d'appels. Que faites-vous ?",
    options: [
      { text: "Je rentre, l'équilibre vie pro est essentiel.", type: "eleveur" },
      { text: "Je reste jusqu'à ce que la liste soit finie.", type: "competitor" },
      { text: "Je planifie une session double pour demain matin.", type: "gestionnaire" },
      { text: "J'appelle mes contacts chauds pour compenser.", type: "chasseur" }
    ]
  },
  {
    id: 12,
    question: "Un dossier notaire est bloqué par un document manquant. Vous faites quoi ?",
    options: [
      { text: "Je vais chercher le document moi-même si besoin.", type: "gestionnaire" },
      { text: "Je mets la pression au notaire pour qu'il avance.", type: "competitor" },
      { text: "Je rassure les clients en attendant que ça se règle.", type: "eleveur" },
      { text: "Je passe au dossier suivant, je ne peux rien y faire.", type: "chasseur" }
    ]
  },
  {
    id: 13,
    question: "Comment gérez-vous votre agenda ?",
    options: [
      { text: "Tout est digitalisé, partagé et millimétré.", type: "gestionnaire" },
      { text: "Je laisse des créneaux vides pour l'imprévu et les opportunités.", type: "chasseur" },
      { text: "Je m'adapte surtout aux disponibilités de mes clients.", type: "eleveur" },
      { text: "Je le remplis au maximum pour optimiser chaque heure.", type: "competitor" }
    ]
  },
  {
    id: 14,
    question: "La rédaction des annonces immobilières, pour vous c'est :",
    options: [
      { text: "Une corvée administrative nécessaire.", type: "chasseur" },
      { text: "L'occasion de raconter une histoire et de faire rêver.", type: "eleveur" },
      { text: "Un exercice de précision : surface, DPE, charges exactes.", type: "gestionnaire" },
      { text: "Un outil marketing pour attirer un maximum de leads.", type: "competitor" }
    ]
  },
  {
    id: 15,
    question: "Vous avez oublié un rendez-vous client (ça arrive).",
    options: [
      { text: "Je m'excuse platement et j'envoie un cadeau pour compenser.", type: "eleveur" },
      { text: "Je trouve une excuse professionnelle crédible.", type: "competitor" },
      { text: "Je mets en place une alerte pour que ça n'arrive plus jamais.", type: "gestionnaire" },
      { text: "Je propose de venir immédiatement, peu importe où je suis.", type: "chasseur" }
    ]
  },

  // --- AXE DRIVE & AMBITION ---
  {
    id: 16,
    question: "Quel est votre moteur principal pour vous lever le matin ?",
    options: [
      { text: "L'adrénaline de signer une nouvelle affaire.", type: "chasseur" },
      { text: "L'envie de battre mes records de commissions.", type: "competitor" },
      { text: "La satisfaction d'accompagner une famille.", type: "eleveur" },
      { text: "L'envie d'avoir des dossiers parfaitement bouclés.", type: "gestionnaire" }
    ]
  },
  {
    id: 17,
    question: "Votre collègue signe le mandat du siècle. Votre pensée ?",
    options: [
      { text: "Bravo à lui, c'est bon pour l'agence.", type: "eleveur" },
      { text: "Le mois prochain, c'est moi qui signe plus gros.", type: "competitor" },
      { text: "Il a eu de la chance, c'est tout.", type: "chasseur" },
      { text: "J'espère que le dossier est juridiquement carré.", type: "gestionnaire" }
    ]
  },
  {
    id: 18,
    question: "Un client veut négocier vos honoraires de 50%.",
    options: [
      { text: "Hors de question, je connais ma valeur.", type: "competitor" },
      { text: "J'accepte si ça permet de rentrer le mandat tout de suite.", type: "chasseur" },
      { text: "Je lui explique en détail tout ce que je fais pour justifier le prix.", type: "gestionnaire" },
      { text: "On coupe la poire en deux pour garder une bonne relation.", type: "eleveur" }
    ]
  },
  {
    id: 19,
    question: "Comment préférez-vous être rémunéré ?",
    options: [
      { text: "100% à la commission, no limit !", type: "competitor" },
      { text: "Un petit fixe pour sécuriser et des primes.", type: "gestionnaire" },
      { text: "Un système progressif qui récompense l'effort.", type: "chasseur" },
      { text: "Une rémunération collective basée sur l'équipe.", type: "eleveur" }
    ]
  },
  {
    id: 20,
    question: "C'est la fin du mois, les objectifs sont atteints. Vous faites quoi ?",
    options: [
      { text: "Je relâche la pression et je profite.", type: "eleveur" },
      { text: "Je continue à fond pour prendre de l'avance sur le mois prochain.", type: "competitor" },
      { text: "Je range mon bureau et je classe mes dossiers.", type: "gestionnaire" },
      { text: "Je cherche un dernier coup à faire pour le bonus.", type: "chasseur" }
    ]
  },

  // --- SITUATIONS MIXTES ---
  {
    id: 21,
    question: "Lors d'une visite, vous ne savez pas répondre à une question technique.",
    options: [
      { text: "J'invente une réponse plausible pour ne pas perdre la face.", type: "chasseur" },
      { text: "Je dis 'Je ne sais pas' et je promets de vérifier ce soir.", type: "gestionnaire" },
      { text: "Je détourne l'attention sur un point fort de la maison.", type: "competitor" },
      { text: "Je demande au client ce qu'il en pense, lui.", type: "eleveur" }
    ]
  },
  {
    id: 22,
    question: "Le marché s'effondre, c'est la crise. Votre état d'esprit ?",
    options: [
      { text: "C'est une opportunité, les faibles vont abandonner.", type: "competitor" },
      { text: "Je redouble d'efforts sur la prospection.", type: "chasseur" },
      { text: "Je me rapproche de mes anciens clients pour les rassurer.", type: "eleveur" },
      { text: "Je réduis mes dépenses et j'analyse les nouvelles tendances.", type: "gestionnaire" }
    ]
  },
  {
    id: 23,
    question: "Vous devez former un nouveau stagiaire.",
    options: [
      { text: "Je l'emmène partout avec moi sur le terrain.", type: "chasseur" },
      { text: "Je lui donne le manuel de procédures à lire d'abord.", type: "gestionnaire" },
      { text: "Je prends le temps de connaître ses objectifs.", type: "eleveur" },
      { text: "Je le mets au défi de prendre un RDV en 1h.", type: "competitor" }
    ]
  },
  {
    id: 24,
    question: "Un propriétaire refuse de vous donner les clés.",
    options: [
      { text: "Pas de problème, je m'organiserai avec lui.", type: "eleveur" },
      { text: "Je ne prends pas le mandat, c'est ingérable.", type: "gestionnaire" },
      { text: "Je le convaincs que c'est dans son intérêt pour vendre vite.", type: "competitor" },
      { text: "J'insiste jusqu'à ce qu'il cède.", type: "chasseur" }
    ]
  },
  {
    id: 25,
    question: "Réseaux sociaux : quelle est votre stratégie ?",
    options: [
      { text: "Je poste mes succès et mes chiffres.", type: "competitor" },
      { text: "Je partage la vie de quartier et des conseils déco.", type: "eleveur" },
      { text: "Je l'utilise pour contacter directement des prospects.", type: "chasseur" },
      { text: "Je programme mes posts 1 mois à l'avance.", type: "gestionnaire" }
    ]
  },
  {
    id: 26,
    question: "Un client annule une offre au dernier moment.",
    options: [
      { text: "Je suis furieux mais je ne le montre pas.", type: "competitor" },
      { text: "J'essaie de comprendre ses peurs pour le récupérer.", type: "eleveur" },
      { text: "Je vérifie si juridiquement il a le droit.", type: "gestionnaire" },
      { text: "Je rappelle les autres visiteurs intéressés dans la minute.", type: "chasseur" }
    ]
  },
  {
    id: 27,
    question: "Samedi matin, beau temps. Vous faites quoi ?",
    options: [
      { text: "Je travaille, c'est là que les clients sont dispos.", type: "competitor" },
      { text: "Je fais mon marché pour croiser des gens du quartier.", type: "eleveur" },
      { text: "Repos, je ne travaille jamais le week-end.", type: "gestionnaire" },
      { text: "Je fais un tour du secteur pour voir les nouveaux panneaux.", type: "chasseur" }
    ]
  },
  {
    id: 28,
    question: "Pour vous, une bonne négociation c'est :",
    options: [
      { text: "Quand j'ai réussi à maintenir ma commission au max.", type: "competitor" },
      { text: "Quand les deux parties sont heureuses.", type: "eleveur" },
      { text: "Quand tout est signé rapidement.", type: "chasseur" },
      { text: "Quand tous les clauses sont respectées.", type: "gestionnaire" }
    ]
  },
  {
    id: 29,
    question: "On vous propose un mandat exclusif mais à un prix trop haut.",
    options: [
      { text: "Je prends l'exclu, je travaillerai le prix après.", type: "competitor" },
      { text: "Je refuse pour ne pas griller le bien.", type: "gestionnaire" },
      { text: "Je prends le risque, j'aime les défis.", type: "chasseur" },
      { text: "J'accepte pour faire plaisir au vendeur que j'aime bien.", type: "eleveur" }
    ]
  },
  {
    id: 30,
    question: "Quel super-pouvoir aimeriez-vous avoir ?",
    options: [
      { text: "Le don d'ubiquité pour faire 10 visites en même temps.", type: "chasseur" },
      { text: "Lire dans les pensées des clients.", type: "eleveur" },
      { text: "Arrêter le temps pour tout finir mes dossiers.", type: "gestionnaire" },
      { text: "La persuasion absolue.", type: "competitor" }
    ]
  }
];

const profiles = {
  chasseur: {
    id: 'chasseur',
    title: "Le Chasseur",
    icon: <Target className="w-8 h-8 text-red-500" />,
    color: "bg-red-500",
    textColor: "text-red-600",
    desc: "Vous êtes un développeur né. Le 'non' ne vous fait pas peur, il vous motive. Vous excellez dans la prospection froide et la prise de mandat.",
    weakness: "Le suivi et l'administratif",
    interviewQ: "Ce candidat risque de délaisser les tâches de fond. Demandez-lui : 'Comment faites-vous pour ne pas oublier de relancer un prospect froid après 3 semaines ?'"
  },
  eleveur: {
    id: 'eleveur',
    title: "L'Éleveur",
    icon: <Users className="w-8 h-8 text-green-500" />,
    color: "bg-green-500",
    textColor: "text-green-600",
    desc: "L'humain est au cœur de votre démarche. Vous fidélisez comme personne et vos clients sont vos meilleurs ambassadeurs.",
    weakness: "Le closing et la prospection dure",
    interviewQ: "Ce candidat peut avoir du mal à 'fermer' la vente ou à dire non. Demandez-lui : 'Si un client refuse de signer au prix malgré une offre parfaite, jusqu'où allez-vous dans l'empathie avant de trancher ?'"
  },
  gestionnaire: {
    id: 'gestionnaire',
    title: "Le Gestionnaire",
    icon: <ClipboardList className="w-8 h-8 text-blue-500" />,
    color: "bg-blue-500",
    textColor: "text-blue-600",
    desc: "Rigueur et organisation sont vos maîtres mots. Avec vous, aucun dossier ne traîne, tout est carré juridiquement.",
    weakness: "L'audace commerciale et l'improvisation",
    interviewQ: "Ce candidat peut manquer de flexibilité. Demandez-lui : 'Un client veut visiter maintenant, mais votre agenda est plein de tâches administratives. Que faites-vous ?'"
  },
  competitor: {
    id: 'competitor',
    title: "Le Competitor",
    icon: <Trophy className="w-8 h-8 text-yellow-500" />,
    color: "bg-yellow-500",
    textColor: "text-yellow-600",
    desc: "Vous êtes guidé par la performance pure et le dépassement de soi. Vous visez l'excellence et les objectifs élevés.",
    weakness: "L'esprit d'équipe et la patience",
    interviewQ: "Ce candidat peut être individualiste. Demandez-lui : 'Préférez-vous être le meilleur vendeur d'une agence moyenne, ou un vendeur moyen dans la meilleure agence ?'"
  }
};

// --- COMPOSANT RADAR CHART (Custom SVG) ---
const RadarChart = ({ scores }) => {
  const size = 300;
  const center = size / 2;
  const radius = 100;
  const maxScore = Math.max(...Object.values(scores), 10); // Scale dynamic

  // Order: Chasseur (Top), Competitor (Right), Gestionnaire (Bottom), Eleveur (Left)
  const axes = [
    { key: 'chasseur', label: 'Chasseur', angle: -90, color: '#ef4444' },
    { key: 'competitor', label: 'Competitor', angle: 0, color: '#eab308' },
    { key: 'gestionnaire', label: 'Gestionnaire', angle: 90, color: '#3b82f6' },
    { key: 'eleveur', label: 'Éleveur', angle: 180, color: '#22c55e' }
  ];

  const getCoordinates = (value, angle) => {
    const angleRad = (Math.PI / 180) * angle;
    const distance = (value / maxScore) * radius;
    return {
      x: center + distance * Math.cos(angleRad),
      y: center + distance * Math.sin(angleRad)
    };
  };

  const points = axes.map(axis => {
    const coords = getCoordinates(scores[axis.key], axis.angle);
    return `${coords.x},${coords.y}`;
  }).join(' ');

  // Background Webs
  const webs = [0.25, 0.5, 0.75, 1].map((scale, i) => (
    <polygon
      key={i}
      points={axes.map(axis => {
        const coords = getCoordinates(maxScore * scale, axis.angle);
        return `${coords.x},${coords.y}`;
      }).join(' ')}
      fill="none"
      stroke="#e5e7eb"
      strokeWidth="1"
    />
  ));

  return (
    <div className="flex justify-center items-center py-6">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Axes Lines */}
        {axes.map((axis, i) => {
          const end = getCoordinates(maxScore, axis.angle);
          return (
            <g key={i}>
              <line x1={center} y1={center} x2={end.x} y2={end.y} stroke="#e5e7eb" strokeWidth="1" />
              <text 
                x={end.x + (axis.angle === 0 ? 10 : axis.angle === 180 ? -10 : 0)} 
                y={end.y + (axis.angle === -90 ? -10 : axis.angle === 90 ? 20 : 5)} 
                textAnchor={axis.angle === 0 ? "start" : axis.angle === 180 ? "end" : "middle"}
                className="text-xs font-bold fill-gray-500 uppercase tracking-wider"
                style={{ fontSize: '11px', fontWeight: 'bold' }}
              >
                {axis.label}
              </text>
            </g>
          );
        })}
        
        {/* Web Grid */}
        {webs}

        {/* The Data Polygon */}
        <polygon points={points} fill="rgba(79, 70, 229, 0.3)" stroke="#4f46e5" strokeWidth="3" />

        {/* Data Points */}
        {axes.map((axis, i) => {
          const coords = getCoordinates(scores[axis.key], axis.angle);
          return (
            <circle key={i} cx={coords.x} cy={coords.y} r="4" fill={axis.color} stroke="white" strokeWidth="2" />
          );
        })}
      </svg>
    </div>
  );
};

// --- COMPOSANTS PRINCIPAUX ---

const ProgressBar = ({ current, total }) => {
  const progress = ((current + 1) / total) * 100;
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
      <div 
        className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default function ImmoTalentApp() {
  const [step, setStep] = useState('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ chasseur: 0, eleveur: 0, gestionnaire: 0, competitor: 0 });
  const [showRecruiter, setShowRecruiter] = useState(false);
  
  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleAnswer = (type) => {
    setScores(prev => ({ ...prev, [type]: prev[type] + 1 }));
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep('processing');
      setTimeout(() => setStep('result'), 2000); 
    }
  };

  const resetQuiz = () => {
    setStep('welcome');
    setCurrentQuestion(0);
    setScores({ chasseur: 0, eleveur: 0, gestionnaire: 0, competitor: 0 });
    setShowRecruiter(false);
  };

  const getDominantProfile = () => {
    const maxScore = Math.max(...Object.values(scores));
    const dominantKey = Object.keys(scores).find(key => scores[key] === maxScore);
    return profiles[dominantKey];
  };

  const dominantProfile = step === 'result' ? getDominantProfile() : null;

  // Find lowest score for recruiter tip
  const getLowestProfile = () => {
    const minScore = Math.min(...Object.values(scores));
    const lowestKey = Object.keys(scores).find(key => scores[key] === minScore);
    return profiles[lowestKey];
  };

  const handlePrint = () => {
    window.print();
  };

  // --- RENDU DES ÉCRANS ---

  if (step === 'welcome') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="bg-white max-w-2xl w-full rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-indigo-900 p-8 text-white text-center relative">
            <Building className="w-16 h-16 mx-auto mb-4 opacity-80" />
            <h1 className="text-3xl font-bold mb-2">ImmoTalent Profiler</h1>
            <p className="text-indigo-200">Découvrez votre ADN d'agent immobilier.</p>
          </div>
          <div className="p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">30 Questions pour révéler votre potentiel</h2>
            <p className="text-gray-600 mb-8 text-center leading-relaxed">
              Ce test professionnel analyse vos réflexes commerciaux, votre empathie, votre rigueur et votre ambition. Idéal pour préparer un entretien ou faire un bilan de compétences.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                <Target size={20} className="text-red-500"/> <span className="text-sm font-medium text-gray-700">Chasseur</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <Users size={20} className="text-green-500"/> <span className="text-sm font-medium text-gray-700">Éleveur</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <ClipboardList size={20} className="text-blue-500"/> <span className="text-sm font-medium text-gray-700">Gestionnaire</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
                <Trophy size={20} className="text-yellow-600"/> <span className="text-sm font-medium text-gray-700">Competitor</span>
              </div>
            </div>

            <button 
              onClick={() => setStep('quiz')}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg transform hover:-translate-y-1"
            >
              Démarrer le test complet <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'quiz') {
    const q = questions[currentQuestion];
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="bg-white max-w-2xl w-full rounded-2xl shadow-xl overflow-hidden flex flex-col min-h-[500px]">
          {/* Header */}
          <div className="px-8 pt-8 pb-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold text-indigo-600 tracking-wider">QUESTION {currentQuestion + 1}/{questions.length}</span>
              <span className="text-xs text-gray-400">ImmoTalent</span>
            </div>
            <ProgressBar current={currentQuestion} total={questions.length} />
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-tight">{q.question}</h2>
          </div>

          {/* Options */}
          <div className="flex-1 px-8 pb-8 flex flex-col gap-3 justify-center">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt.type)}
                className="text-left p-4 border-2 border-gray-100 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-indigo-500 flex items-center justify-center flex-shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <span className="text-gray-700 group-hover:text-indigo-900 font-medium">{opt.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-gray-700">Génération du rapport...</h2>
          <p className="text-gray-500 mt-2">Calcul des axes de personnalité</p>
        </div>
      </div>
    );
  }

  if (step === 'result' && dominantProfile) {
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    const lowestProfile = getLowestProfile();
    
    return (
      <div className="min-h-screen bg-slate-100 py-8 px-4 font-sans overflow-y-auto print:bg-white print:p-0">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden print:shadow-none">
          
          {/* Header Resultat */}
          <div className={`p-8 text-center text-white ${dominantProfile.color} print:text-black print:bg-white print:border-b-2`}>
            <div className="flex justify-end print:hidden">
              <button onClick={handlePrint} className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors" title="Imprimer le rapport">
                <Printer size={20} className="text-white" />
              </button>
            </div>
            
            <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4 print:border-2">
              {dominantProfile.icon}
            </div>
            <h2 className="text-lg font-medium opacity-90 uppercase tracking-widest mb-1 print:text-gray-600">Profil Dominant</h2>
            <h1 className="text-4xl font-bold mb-4 print:text-gray-900">{dominantProfile.title}</h1>
            <p className="max-w-xl mx-auto text-white text-opacity-90 leading-relaxed text-lg print:text-gray-700">
              "{dominantProfile.desc}"
            </p>
          </div>

          {/* Radar Chart Section */}
          <div className="bg-slate-50 border-b border-gray-100 p-6 print:bg-white">
            <h3 className="text-center text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Visualisation Radar</h3>
            <RadarChart scores={scores} />
          </div>

          {/* Détail des Scores */}
          <div className="p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Briefcase className="text-indigo-600" /> Bilan de compétences
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {Object.entries(profiles).map(([key, profile]) => {
                const score = scores[key];
                const percentage = totalScore > 0 ? (score / totalScore) * 100 : 0;
                const isDominant = dominantProfile.title === profile.title;

                return (
            <div key={key} className={`profile-card ${key} p-4 rounded-xl border ${isDominant ? 'border-indigo-200 bg-indigo-50' : 'border-gray-100'}`}>                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg ${profile.textColor} bg-opacity-10`}>
                          {profile.icon}
                        </div>
                        <span className={`font-bold ${isDominant ? 'text-indigo-900' : 'text-gray-700'}`}>
                          {profile.title}
                        </span>
                      </div>
                      <span className="font-bold text-gray-800">{score} pts</span>
                    </div>
                    {/* Gauge */}
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${profile.color.replace('bg-', 'bg-')} opacity-90`} 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* ESPACE RECRUTEUR (INTERVIEW GUIDE) */}
            <div className="mt-8 border-t-2 border-dashed border-gray-200 pt-8 print:break-inside-avoid">
              {!showRecruiter ? (
                <button 
                  onClick={() => setShowRecruiter(true)}
                  className="w-full py-4 border-2 border-gray-200 border-dashed rounded-xl text-gray-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 font-medium print:hidden"
                >
                  <Unlock size={20} /> Déverrouiller l'Espace Recruteur
                </button>
              ) : (
                <div className="bg-slate-800 rounded-xl p-6 text-slate-100 shadow-inner">
                  <div className="flex items-center gap-3 mb-6 border-b border-slate-700 pb-4">
                    <FileText className="text-indigo-400" />
                    <div>
                      <h3 className="text-lg font-bold text-white">Guide d'Entretien Personnalisé</h3>
                      <p className="text-slate-400 text-sm">Généré par l'IA ImmoTalent</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-slate-700/50 p-4 rounded-lg border-l-4 border-yellow-500">
                      <h4 className="font-bold text-yellow-400 mb-1 flex items-center gap-2">
                        <AlertCircle size={16} /> Point de vigilance identifié
                      </h4>
                      <p className="text-sm text-slate-300">
                        Score faible en <span className="font-bold text-white uppercase">{lowestProfile.title}</span>. 
                        Risque potentiel : {lowestProfile.weakness}.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <p className="font-medium text-indigo-300 uppercase text-xs tracking-wider">Questions suggérées au candidat :</p>
                      
                      <div className="bg-white text-slate-800 p-4 rounded-lg shadow-sm">
                        <p className="font-medium italic">"1. {lowestProfile.interviewQ}"</p>
                      </div>

                      <div className="bg-white text-slate-800 p-4 rounded-lg shadow-sm">
                        <p className="font-medium italic">"2. Si je vous recrute demain, qu'est-ce qui sera le plus difficile pour vous dans les 3 premiers mois ?"</p>
                      </div>

                       <div className="bg-white text-slate-800 p-4 rounded-lg shadow-sm">
                        <p className="font-medium italic">"3. Sur une échelle de 1 à 10, à quel point êtes-vous à l'aise avec {lowestProfile.title === "Le Gestionnaire" ? "l'administratif pur" : lowestProfile.title === "Le Chasseur" ? "le rejet téléphonique" : "la négociation dure"} ?"</p>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setShowRecruiter(false)}
                    className="mt-6 text-sm text-slate-500 hover:text-white underline print:hidden"
                  >
                    Masquer l'espace recruteur
                  </button>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center print:hidden">
              <button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2"
                onClick={() => alert("Candidature enregistrée (Simulation)")}
              >
                <Home size={20} /> Enregistrer ce profil
              </button>
              <button 
                onClick={resetQuiz}
                className="bg-white border-2 border-gray-200 hover:border-gray-400 text-gray-600 font-bold py-3 px-8 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCcw size={20} /> Nouveau Candidat
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return null;
}
