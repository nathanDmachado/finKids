import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

interface CoinCounterGameProps {
  onComplete: (score: number) => void;
}

export function CoinCounterGame({ onComplete }: CoinCounterGameProps) {
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState<'playing' | 'finished'>('playing');
  const [feedback, setFeedback] = useState<string>('');

  const totalRounds = 5;

  const generateCoins = () => {
    const min = currentRound * 2;
    const max = currentRound * 5 + 10;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const startNewRound = () => {
    setCoins(generateCoins());
    setUserAnswer('');
    setFeedback('');
  };

  const checkAnswer = () => {
    const answer = parseInt(userAnswer);
    if (answer === coins) {
      setScore(prev => prev + 10);
      setFeedback('🎉 Correto! +10 pontos');
      
      setTimeout(() => {
        if (currentRound < totalRounds) {
          setCurrentRound(prev => prev + 1);
          startNewRound();
        } else {
          setGameState('finished');
        }
      }, 1500);
    } else {
      setFeedback(`❌ Incorreto! A resposta era ${coins}`);
      setTimeout(() => {
        if (currentRound < totalRounds) {
          setCurrentRound(prev => prev + 1);
          startNewRound();
        } else {
          setGameState('finished');
        }
      }, 2000);
    }
  };

  useEffect(() => {
    startNewRound();
  }, []);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameState('finished');
    }
  }, [timeLeft, gameState]);

  useEffect(() => {
    if (gameState === 'finished') {
      onComplete(score);
    }
  }, [gameState, score, onComplete]);

  if (gameState === 'finished') {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">🏆</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Jogo Concluído!</h3>
        <p className="text-xl text-gray-600 mb-4">Sua pontuação: {score} pontos</p>
        <div className="text-lg text-gray-500">
          {score >= 40 ? '🌟 Excelente!' : 
           score >= 25 ? '👍 Muito bom!' : 
           '💪 Continue praticando!'}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">
          Rodada {currentRound}/{totalRounds}
        </div>
        <div className="text-lg font-semibold text-red-600">
          ⏰ {timeLeft}s
        </div>
      </div>

      <Progress value={(currentRound / totalRounds) * 100} className="h-3" />

      <div className="text-center">
        <h3 className="text-xl font-bold mb-4">Conte as moedas:</h3>
        
        <div className="bg-yellow-50 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-8 gap-2 max-w-md mx-auto">
            {Array.from({ length: coins }, (_, i) => (
              <div key={i} className="text-2xl">🪙</div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Input
            type="number"
            placeholder="Quantas moedas você vê?"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="text-center text-lg"
            onKeyPress={(e) => e.key === 'Enter' && userAnswer && checkAnswer()}
          />
          
          <Button
            onClick={checkAnswer}
            disabled={!userAnswer}
            className="w-full bg-gradient-to-r from-green-500 to-green-600"
          >
            Confirmar Resposta
          </Button>
        </div>

        {feedback && (
          <div className="mt-4 p-3 rounded-lg bg-blue-50 text-blue-800 font-semibold">
            {feedback}
          </div>
        )}

        <div className="mt-6 text-lg font-semibold text-blue-600">
          Pontuação: {score}
        </div>
      </div>
    </div>
  );
}