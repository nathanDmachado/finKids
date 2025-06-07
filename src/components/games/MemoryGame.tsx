import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface MemoryGameProps {
  onComplete: (score: number) => void;
}

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function MemoryGame({ onComplete }: MemoryGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameState, setGameState] = useState<'playing' | 'finished'>('playing');

  const cardValues = ['💰', '🪙', '💎', '💵', '🏦', '💳', '🎯', '📊'];
  const totalPairs = 8;

  const initializeGame = () => {
    const gameCards = [...cardValues, ...cardValues]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false
      }));
    setCards(gameCards);
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    if (cards[cardId].isFlipped || cards[cardId].isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, isFlipped: true } : card
    ));

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      setTimeout(() => {
        const [first, second] = newFlippedCards;
        if (cards[first].value === cards[second].value) {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, isMatched: true }
              : card
          ));
          setMatches(prev => prev + 1);
        } else {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, isFlipped: false }
              : card
          ));
        }
        setFlippedCards([]);
      }, 1000);
    }
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 || matches === totalPairs) {
      setGameState('finished');
    }
  }, [timeLeft, gameState, matches]);

  useEffect(() => {
    if (gameState === 'finished') {
      const score = Math.max(0, (matches * 10) - moves + Math.floor(timeLeft / 2));
      onComplete(score);
    }
  }, [gameState, matches, moves, timeLeft, onComplete]);

  if (gameState === 'finished') {
    const score = Math.max(0, (matches * 10) - moves + Math.floor(timeLeft / 2));
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">
          {matches === totalPairs ? '🏆' : '⏰'}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          {matches === totalPairs ? 'Parabéns!' : 'Tempo Esgotado!'}
        </h3>
        <p className="text-xl text-gray-600 mb-2">Pares encontrados: {matches}/{totalPairs}</p>
        <p className="text-xl text-gray-600 mb-4">Sua pontuação: {score} pontos</p>
        <div className="text-lg text-gray-500">
          {score >= 60 ? '🌟 Memória incrível!' : 
           score >= 30 ? '👍 Boa memória!' : 
           '💪 Continue praticando!'}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">
          Pares: {matches}/{totalPairs}
        </div>
        <div className="text-lg font-semibold">
          Movimentos: {moves}
        </div>
        <div className="text-lg font-semibold text-red-600">
          ⏰ {timeLeft}s
        </div>
      </div>

      <Progress value={(matches / totalPairs) * 100} className="h-3" />

      <div className="text-center mb-4">
        <h3 className="text-xl font-bold">Encontre os pares de símbolos financeiros!</h3>
      </div>

      <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
        {cards.map((card) => (
          <Button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`h-16 text-2xl transition-all duration-300 ${
              card.isFlipped || card.isMatched
                ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } ${card.isMatched ? 'opacity-75' : ''}`}
            disabled={card.isMatched}
          >
            {card.isFlipped || card.isMatched ? card.value : '?'}
          </Button>
        ))}
      </div>
    </div>
  );
}