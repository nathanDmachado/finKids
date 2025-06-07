import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';

interface BudgetPlannerGameProps {
  onComplete: (score: number) => void;
}

interface BudgetItem {
  id: number;
  name: string;
  icon: string;
  category: 'necessidade' | 'desejo';
  suggestedAmount: number;
  userAmount: number;
}

export function BudgetPlannerGame({ onComplete }: BudgetPlannerGameProps) {
  const [totalMoney] = useState(100);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    { id: 1, name: 'Lanche Escolar', icon: '🥪', category: 'necessidade', suggestedAmount: 25, userAmount: 0 },
    { id: 2, name: 'Material Escolar', icon: '📚', category: 'necessidade', suggestedAmount: 20, userAmount: 0 },
    { id: 3, name: 'Poupança', icon: '🏦', category: 'necessidade', suggestedAmount: 30, userAmount: 0 },
    { id: 4, name: 'Brinquedos', icon: '🎲', category: 'desejo', suggestedAmount: 15, userAmount: 0 },
    { id: 5, name: 'Doces', icon: '🍭', category: 'desejo', suggestedAmount: 10, userAmount: 0 },
  ]);
  const [gameState, setGameState] = useState<'planning' | 'finished'>('planning');
  const [score, setScore] = useState(0);

  const totalAllocated = budgetItems.reduce((sum, item) => sum + item.userAmount, 0);
  const remainingMoney = totalMoney - totalAllocated;

  const updateBudgetItem = (id: number, amount: number) => {
    setBudgetItems(prev => prev.map(item => 
      item.id === id ? { ...item, userAmount: amount } : item
    ));
  };

  const calculateScore = () => {
    let totalScore = 0;
    
    // Check if budget is balanced (within 5 of total)
    if (Math.abs(remainingMoney) <= 5) {
      totalScore += 30;
    }
    
    // Check allocation accuracy for each item
    budgetItems.forEach(item => {
      const difference = Math.abs(item.userAmount - item.suggestedAmount);
      const accuracy = Math.max(0, 1 - (difference / item.suggestedAmount));
      totalScore += accuracy * 15;
    });
    
    // Bonus for prioritizing necessities
    const necessityTotal = budgetItems
      .filter(item => item.category === 'necessidade')
      .reduce((sum, item) => sum + item.userAmount, 0);
    
    const desireTotal = budgetItems
      .filter(item => item.category === 'desejo')
      .reduce((sum, item) => sum + item.userAmount, 0);
    
    if (necessityTotal >= desireTotal) {
      totalScore += 20;
    }
    
    return Math.round(totalScore);
  };

  const finishPlanning = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setGameState('finished');
  };

  useEffect(() => {
    if (gameState === 'finished') {
      onComplete(score);
    }
  }, [gameState, score, onComplete]);

  if (gameState === 'finished') {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Orçamento Concluído!</h3>
        <p className="text-xl text-gray-600 mb-4">Sua pontuação: {score} pontos</p>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <h4 className="font-semibold mb-2">Seu Orçamento:</h4>
          {budgetItems.map(item => (
            <div key={item.id} className="flex justify-between items-center py-1">
              <span>{item.icon} {item.name}</span>
              <span className="font-semibold">R$ {item.userAmount}</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-2 font-bold">
            <div className="flex justify-between">
              <span>Total Gasto:</span>
              <span>R$ {totalAllocated}</span>
            </div>
            <div className="flex justify-between">
              <span>Sobrou:</span>
              <span className={remainingMoney >= 0 ? 'text-green-600' : 'text-red-600'}>
                R$ {remainingMoney}
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-lg text-gray-500">
          {score >= 80 ? '🌟 Planejador expert!' : 
           score >= 60 ? '👍 Bom planejamento!' : 
           '💪 Continue aprendendo sobre orçamento!'}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">Planeje seu Orçamento Semanal</h3>
        <p className="text-gray-600 mb-4">Você tem R$ {totalMoney} para gastar esta semana</p>
        
        <div className="bg-yellow-100 rounded-lg p-4 mb-6">
          <div className="text-lg font-semibold">
            Dinheiro restante: 
            <span className={`ml-2 ${remainingMoney >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              R$ {remainingMoney}
            </span>
          </div>
          <Progress 
            value={Math.max(0, (totalAllocated / totalMoney) * 100)} 
            className="h-3 mt-2" 
          />
        </div>
      </div>

      <div className="space-y-4">
        {budgetItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg p-4 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className={`text-sm ${
                    item.category === 'necessidade' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {item.category === 'necessidade' ? '✅ Necessidade' : '🎯 Desejo'}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">R$ {item.userAmount}</div>
                <div className="text-sm text-gray-500">
                  Sugerido: R$ {item.suggestedAmount}
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Slider
                value={[item.userAmount]}
                onValueChange={(value) => updateBudgetItem(item.id, value[0])}
                max={Math.min(50, totalMoney)}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>R$ 0</span>
                <span>R$ {Math.min(50, totalMoney)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={finishPlanning}
        disabled={remainingMoney < -5}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600"
      >
        {remainingMoney < -5 
          ? `Você gastou R$ ${Math.abs(remainingMoney)} a mais!` 
          : 'Finalizar Orçamento'
        }
      </Button>

      <div className="text-center text-sm text-gray-600">
        💡 Dica: Priorize necessidades antes dos desejos!
      </div>
    </div>
  );
}