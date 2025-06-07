import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

interface ChangeCalculatorGameProps {
  onComplete: (score: number) => void;
}

interface Purchase {
  item: string;
  price: number;
  payment: number;
  correctChange: number;
}

export function ChangeCalculatorGame({ onComplete }: ChangeCalculatorGameProps) {
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [purchase, setPurchase] = useState<Purchase | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(45);
  const [gameState, setGameState] = useState<'playing' | 'finished'>('playing');
  const [feedback, setFeedback] = useState<string>('');

  const totalRounds = 5;

  const items = [
    { name: '🍎 Maçã', minPrice: 2, maxPrice: 5 },
    { name: '📚 Livro', minPrice: 15, maxPrice: 25 },
    { name: '🎲 Brinquedo', minPrice: 10, maxPrice: 20 },
    { name: '🍫 Chocolate', minPrice: 3, maxPrice: 8 },
    { name: '✏️ Lápis', minPrice: 1, maxPrice: 4 },
    { name: '🎈 Balão', minPrice: 2, maxPrice: 6 },
  ];

  const generatePurchase = (): Purchase => {
    const item = items[Math.floor(Math.random() * items.length)];
    const price = Math.floor(Math.random() * (item.maxPrice - item.minPrice + 1)) + item.minPrice;
    const payment = price + Math.floor(Math.random() * 20) + 1; // Always overpay
    
    return {
      item: item.name,
      price,
      payment,
      correctChange: payment - price
    };
  };

  const startNewRound = () => {
    setPurchase(generatePurchase());
    setUserAnswer('');
    setFeedback('');
  };

  const checkAnswer = () => {
    if (!purchase) return;
    
    const answer = parseFloat(userAnswer);
    if (Math.abs(answer - purchase.correctChange) < 0.01) {
      setScore(prev => prev + 15);
      setFeedback('🎉 Correto! +15 pontos');
      
      setTimeout(() => {
        if (currentRound < totalRounds) {
          setCurrentRound(prev => prev + 1);
          startNewRound();
        } else {
          setGameState('finished');
        }
      }, 1500);
    } else {
      setFeedback(`❌ Incorreto! O troco correto era R$ ${purchase.correctChange.toFixed(2)}`);
      setTimeout(() => {
        if (currentRound < totalRounds) {
          setCurrentRound(prev => prev + 1);
          startNewRound();
        } else {
          setGameState('finished');
        }
      }, 2500);
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
        <div className="text-6xl mb-4">💱</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Jogo Concluído!</h3>
        <p className="text-xl text-gray-600 mb-4">Sua pontuação: {score} pontos</p>
        <div className="text-lg text-gray-500">
          {score >= 60 ? '🌟 Calculadora humana!' : 
           score >= 35 ? '👍 Bom com números!' : 
           '💪 Continue praticando matemática!'}
        </div>
      </div>
    );
  }

  if (!purchase) return null;

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
        <h3 className="text-xl font-bold mb-6">Calcule o troco:</h3>
        
        <div className="bg-green-50 rounded-lg p-6 mb-6 space-y-4">
          <div className="text-4xl mb-2">{purchase.item}</div>
          <div className="text-lg">
            <div className="font-semibold">Preço: R$ {purchase.price.toFixed(2)}</div>
            <div className="font-semibold">Cliente pagou: R$ {purchase.payment.toFixed(2)}</div>
          </div>
          <div className="text-xl font-bold text-green-700">
            Quanto de troco você deve dar?
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-lg font-semibold">R$</span>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="text-center text-lg w-32"
              onKeyPress={(e) => e.key === 'Enter' && userAnswer && checkAnswer()}
            />
          </div>
          
          <Button
            onClick={checkAnswer}
            disabled={!userAnswer}
            className="w-full bg-gradient-to-r from-green-500 to-green-600"
          >
            Confirmar Troco
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