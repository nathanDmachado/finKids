import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Gamepad2, Trophy, Clock, Star } from 'lucide-react';
import { CoinCounterGame } from '@/components/games/CoinCounterGame';
import { MemoryGame } from '@/components/games/MemoryGame';
import { QuizGame } from '@/components/games/QuizGame';
import { ChangeCalculatorGame } from '@/components/games/ChangeCalculatorGame';
import { BudgetPlannerGame } from '@/components/games/BudgetPlannerGame';
import type { MiniGame } from '@/App';

interface MiniGamesProps {
  games: MiniGame[];
  onComplete: (gameId: number, score?: number) => void;
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  hard: 'bg-red-100 text-red-800 border-red-200'
};

const categoryColors = {
  math: 'bg-blue-100 text-blue-800',
  memory: 'bg-purple-100 text-purple-800',
  strategy: 'bg-indigo-100 text-indigo-800',
  quiz: 'bg-pink-100 text-pink-800'
};

export function MiniGames({ games, onComplete }: MiniGamesProps) {
  const [selectedGame, setSelectedGame] = useState<MiniGame | null>(null);
  const [isGameOpen, setIsGameOpen] = useState(false);

  const handleGameSelect = (game: MiniGame) => {
    setSelectedGame(game);
    setIsGameOpen(true);
  };

  const handleGameComplete = (score?: number) => {
    if (selectedGame) {
      onComplete(selectedGame.id, score);
      setIsGameOpen(false);
      setSelectedGame(null);
    }
  };

  const renderGame = () => {
    if (!selectedGame) return null;

    switch (selectedGame.id) {
      case 1:
        return <CoinCounterGame onComplete={handleGameComplete} />;
      case 2:
        return <MemoryGame onComplete={handleGameComplete} />;
      case 3:
        return <QuizGame onComplete={handleGameComplete} />;
      case 4:
        return <ChangeCalculatorGame onComplete={handleGameComplete} />;
      case 5:
        return <BudgetPlannerGame onComplete={handleGameComplete} />;
      default:
        return null;
    }
  };

  const availableGames = games.filter(g => !g.completed);
  const completedGames = games.filter(g => g.completed);

  return (
    <div className="space-y-6">
      {availableGames.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Gamepad2 className="w-6 h-6 mr-2 text-blue-500" />
            Mini Jogos Disponíveis
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {availableGames.map((game) => (
              <Card 
                key={game.id} 
                className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-2 border-transparent hover:border-blue-200"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">{game.icon}</div>
                    <div className="flex flex-col gap-1">
                      <Badge className={difficultyColors[game.difficulty]}>
                        {game.difficulty === 'easy' ? 'Fácil' : 
                         game.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                      </Badge>
                      <Badge className={categoryColors[game.category]}>
                        {game.category === 'math' ? 'Matemática' :
                         game.category === 'memory' ? 'Memória' :
                         game.category === 'strategy' ? 'Estratégia' : 'Quiz'}
                      </Badge>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {game.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {game.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl mr-1">🪙</span>
                      <span className="text-xl font-bold text-blue-600">
                        +{game.reward}
                      </span>
                    </div>
                    
                    <Button
                      onClick={() => handleGameSelect(game)}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
                    >
                      <Gamepad2 className="w-4 h-4 mr-2" />
                      Jogar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {completedGames.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
            Jogos Concluídos
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {completedGames.map((game) => (
              <Card key={game.id} className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">{game.icon}</div>
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      {game.bestScore && (
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-semibold text-yellow-700">
                            {game.bestScore}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-700 mb-2">
                    {game.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {game.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-semibold">
                      ✅ Concluído! +{game.reward} moedas
                    </span>
                    
                    <Button
                      onClick={() => handleGameSelect(game)}
                      variant="outline"
                      className="border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Jogar Novamente
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Dialog open={isGameOpen} onOpenChange={setIsGameOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              {selectedGame?.icon} {selectedGame?.title}
            </DialogTitle>
          </DialogHeader>
          {renderGame()}
        </DialogContent>
      </Dialog>

      {games.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎮</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Nenhum jogo disponível
          </h3>
          <p className="text-gray-500">
            Novos jogos serão adicionados em breve!
          </p>
        </div>
      )}
    </div>
  );
}