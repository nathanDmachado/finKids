import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Wallet } from '@/components/Wallet';
import { MissionList } from '@/components/MissionList';
import { Achievements } from '@/components/Achievements';
import { Shop } from '@/components/Shop';
import { MiniGames } from '@/components/MiniGames';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import './App.css';

export interface Mission {
  id: number;
  title: string;
  description: string;
  reward: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'saving' | 'earning' | 'spending' | 'sharing';
  completed: boolean;
  icon: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  requirement: number;
  progress: number;
}

export interface ShopItem {
  id: number;
  name: string;
  price: number;
  emoji: string;
  category: string;
  purchased: boolean;
}

export interface MiniGame {
  id: number;
  title: string;
  description: string;
  reward: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'math' | 'memory' | 'strategy' | 'quiz';
  icon: string;
  completed: boolean;
  bestScore?: number;
}

const initialMissions: Mission[] = [
  {
    id: 1,
    title: "Missão da Mesada",
    description: "Guarde 50% da sua mesada para economizar para algo especial!",
    reward: 25,
    difficulty: 'easy',
    category: 'saving',
    completed: false,
    icon: "💰"
  },
  {
    id: 2,
    title: "Caça ao Tesouro",
    description: "Encontre 5 moedas escondidas pela casa e coloque no cofrinho.",
    reward: 15,
    difficulty: 'medium',
    category: 'earning',
    completed: false,
    icon: "🔍"
  },
  {
    id: 3,
    title: "Ajudante do Dia",
    description: "Ajude em 3 tarefas domésticas para ganhar uma recompensa!",
    reward: 20,
    difficulty: 'medium',
    category: 'earning',
    completed: false,
    icon: "🏠"
  },
  {
    id: 4,
    title: "Compra Inteligente",
    description: "Compare preços de 3 itens antes de fazer uma compra.",
    reward: 30,
    difficulty: 'hard',
    category: 'spending',
    completed: false,
    icon: "🛒"
  },
  {
    id: 5,
    title: "Dividir é Cuidar",
    description: "Doe 5 moedas para uma boa causa ou ajude um amigo.",
    reward: 35,
    difficulty: 'medium',
    category: 'sharing',
    completed: false,
    icon: "❤️"
  },
  {
    id: 6,
    title: "Meta de Poupança",
    description: "Economize 100 moedas sem gastar nada por uma semana!",
    reward: 50,
    difficulty: 'hard',
    category: 'saving',
    completed: false,
    icon: "🎯"
  }
];

const initialAchievements: Achievement[] = [
  {
    id: 1,
    title: "Primeiro Passo",
    description: "Complete sua primeira missão",
    icon: "🌟",
    unlocked: false,
    requirement: 1,
    progress: 0
  },
  {
    id: 2,
    title: "Economista Jr.",
    description: "Accumule 100 moedas",
    icon: "💎",
    unlocked: false,
    requirement: 100,
    progress: 0
  },
  {
    id: 3,
    title: "Missão Cumprida",
    description: "Complete 5 missões",
    icon: "🏆",
    unlocked: false,
    requirement: 5,
    progress: 0
  },
  {
    id: 4,
    title: "Comprador Sábio",
    description: "Faça 3 compras na loja",
    icon: "🧠",
    unlocked: false,
    requirement: 3,
    progress: 0
  },
  {
    id: 5,
    title: "Gamer Financeiro",
    description: "Complete 3 mini jogos",
    icon: "🎮",
    unlocked: false,
    requirement: 3,
    progress: 0
  }
];

const shopItems: ShopItem[] = [
  { id: 1, name: "Adesivo Especial", price: 10, emoji: "⭐", category: "Coleção", purchased: false },
  { id: 2, name: "Brinquedo Pequeno", price: 25, emoji: "🎲", category: "Brinquedos", purchased: false },
  { id: 3, name: "Livro de História", price: 40, emoji: "📚", category: "Educativo", purchased: false },
  { id: 4, name: "Jogo Digital", price: 60, emoji: "🎮", category: "Digital", purchased: false },
  { id: 5, name: "Kit de Arte", price: 80, emoji: "🎨", category: "Criativo", purchased: false },
  { id: 6, name: "Bicicleta Nova", price: 200, emoji: "🚲", category: "Esportes", purchased: false },
];

const initialMiniGames: MiniGame[] = [
  {
    id: 1,
    title: "Contador de Moedas",
    description: "Conte as moedas rapidamente e ganhe pontos!",
    reward: 15,
    difficulty: 'easy',
    category: 'math',
    icon: "🔢",
    completed: false
  },
  {
    id: 2,
    title: "Memória do Dinheiro",
    description: "Memorize onde estão as moedas escondidas!",
    reward: 20,
    difficulty: 'medium',
    category: 'memory',
    icon: "🧠",
    completed: false
  },
  {
    id: 3,
    title: "Quiz Financeiro",
    description: "Responda perguntas sobre dinheiro e economia!",
    reward: 25,
    difficulty: 'medium',
    category: 'quiz',
    icon: "❓",
    completed: false
  },
  {
    id: 4,
    title: "Troco Certeiro",
    description: "Calcule o troco correto nas compras!",
    reward: 30,
    difficulty: 'hard',
    category: 'math',
    icon: "💱",
    completed: false
  },
  {
    id: 5,
    title: "Planejador de Gastos",
    description: "Organize um orçamento para a semana!",
    reward: 35,
    difficulty: 'hard',
    category: 'strategy',
    icon: "📊",
    completed: false
  }
];

function App() {
  const [coins, setCoins] = useState(50);
  const [missions, setMissions] = useState<Mission[]>(initialMissions);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [items, setItems] = useState<ShopItem[]>(shopItems);
  const [miniGames, setMiniGames] = useState<MiniGame[]>(initialMiniGames);
  const [activeTab, setActiveTab] = useState<'missions' | 'achievements' | 'shop' | 'games'>('missions');
  const [completedMissions, setCompletedMissions] = useState(0);
  const [purchaseCount, setPurchaseCount] = useState(0);
  const [completedGames, setCompletedGames] = useState(0);

  const completeMission = (missionId: number) => {
    const mission = missions.find(m => m.id === missionId);
    if (!mission || mission.completed) return;

    setMissions(prev => 
      prev.map(m => 
        m.id === missionId ? { ...m, completed: true } : m
      )
    );
    
    setCoins(prev => prev + mission.reward);
    setCompletedMissions(prev => prev + 1);
    
    toast.success(`🎉 Missão concluída! +${mission.reward} moedas`, {
      description: mission.title,
      duration: 3000,
    });
  };

  const purchaseItem = (itemId: number) => {
    const item = items.find(i => i.id === itemId);
    if (!item || item.purchased || coins < item.price) return;

    setItems(prev => 
      prev.map(i => 
        i.id === itemId ? { ...i, purchased: true } : i
      )
    );
    
    setCoins(prev => prev - item.price);
    setPurchaseCount(prev => prev + 1);
    
    toast.success(`🛍️ Compra realizada! ${item.emoji} ${item.name}`, {
      description: `-${item.price} moedas`,
      duration: 3000,
    });
  };

  const completeGame = (gameId: number, score?: number) => {
    const game = miniGames.find(g => g.id === gameId);
    if (!game) return;

    const wasCompleted = game.completed;
    
    setMiniGames(prev => 
      prev.map(g => 
        g.id === gameId ? { 
          ...g, 
          completed: true,
          bestScore: score !== undefined ? Math.max(g.bestScore || 0, score) : g.bestScore
        } : g
      )
    );
    
    if (!wasCompleted) {
      setCoins(prev => prev + game.reward);
      setCompletedGames(prev => prev + 1);
      
      toast.success(`🎮 Jogo concluído! +${game.reward} moedas`, {
        description: game.title,
        duration: 3000,
      });
    } else if (score !== undefined && score > (game.bestScore || 0)) {
      const bonusCoins = Math.floor(game.reward * 0.2);
      setCoins(prev => prev + bonusCoins);
      
      toast.success(`🏆 Novo recorde! +${bonusCoins} moedas bônus`, {
        description: `Pontuação: ${score}`,
        duration: 3000,
      });
    }
  };

  // Update achievements based on progress
  useEffect(() => {
    setAchievements(prev => prev.map(achievement => {
      let newProgress = achievement.progress;
      let unlocked = achievement.unlocked;

      switch (achievement.id) {
        case 1: // First mission
          newProgress = completedMissions;
          break;
        case 2: // 100 coins
          newProgress = coins;
          break;
        case 3: // 5 missions
          newProgress = completedMissions;
          break;
        case 4: // 3 purchases
          newProgress = purchaseCount;
          break;
        case 5: // 3 games
          newProgress = completedGames;
          break;
      }

      if (!unlocked && newProgress >= achievement.requirement) {
        unlocked = true;
        toast.success(`🏆 Conquista desbloqueada: ${achievement.title}!`, {
          description: achievement.description,
          duration: 4000,
        });
      }

      return { ...achievement, progress: newProgress, unlocked };
    }));
  }, [coins, completedMissions, purchaseCount, completedGames]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Header />
        
        <Wallet coins={coins} />
        
        <div className="mt-8">
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-full p-1 shadow-lg">
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab('missions')}
                  className={`px-4 py-3 rounded-full font-semibold transition-all duration-200 text-sm ${
                    activeTab === 'missions'
                      ? 'bg-green-500 text-white shadow-md'
                      : 'text-green-600 hover:bg-green-50'
                  }`}
                >
                  Missões
                </button>
                <button
                  onClick={() => setActiveTab('games')}
                  className={`px-4 py-3 rounded-full font-semibold transition-all duration-200 text-sm ${
                    activeTab === 'games'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  Jogos
                </button>
                <button
                  onClick={() => setActiveTab('achievements')}
                  className={`px-4 py-3 rounded-full font-semibold transition-all duration-200 text-sm ${
                    activeTab === 'achievements'
                      ? 'bg-yellow-500 text-white shadow-md'
                      : 'text-yellow-600 hover:bg-yellow-50'
                  }`}
                >
                  Conquistas
                </button>
                <button
                  onClick={() => setActiveTab('shop')}
                  className={`px-4 py-3 rounded-full font-semibold transition-all duration-200 text-sm ${
                    activeTab === 'shop'
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  Loja
                </button>
              </div>
            </div>
          </div>

          {activeTab === 'missions' && (
            <MissionList missions={missions} onComplete={completeMission} />
          )}
          
          {activeTab === 'games' && (
            <MiniGames games={miniGames} onComplete={completeGame} />
          )}
          
          {activeTab === 'achievements' && (
            <Achievements achievements={achievements} />
          )}
          
          {activeTab === 'shop' && (
            <Shop items={items} coins={coins} onPurchase={purchaseItem} />
          )}
        </div>
      </div>
      
      <Toaster />
    </div>
  );
}

export default App;