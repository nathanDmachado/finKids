import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface QuizGameProps {
  onComplete: (score: number) => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "O que significa 'poupar dinheiro'?",
    options: [
      "Gastar todo o dinheiro rapidamente",
      "Guardar dinheiro para usar no futuro",
      "Dar dinheiro para outras pessoas",
      "Perder dinheiro"
    ],
    correctAnswer: 1,
    explanation: "Poupar significa guardar dinheiro para usar quando precisarmos no futuro!"
  },
  {
    id: 2,
    question: "Qual é a melhor forma de guardar dinheiro?",
    options: [
      "Embaixo do colchão",
      "No bolso da calça",
      "Em um cofrinho ou conta poupança",
      "Dar para os amigos guardarem"
    ],
    correctAnswer: 2,
    explanation: "Cofrinhos e contas poupança são lugares seguros para guardar dinheiro!"
  },
  {
    id: 3,
    question: "Antes de comprar algo, é importante:",
    options: [
      "Comprar imediatamente",
      "Pensar se realmente precisamos",
      "Pedir emprestado para alguém",
      "Comprar o mais caro"
    ],
    correctAnswer: 1,
    explanation: "Sempre devemos pensar se realmente precisamos de algo antes de comprar!"
  },
  {
    id: 4,
    question: "O que é um orçamento?",
    options: [
      "Uma lista de desejos",
      "Um plano de como gastar o dinheiro",
      "Um tipo de moeda",
      "Um jogo de cartas"
    ],
    correctAnswer: 1,
    explanation: "Um orçamento é um plano que nos ajuda a organizar como vamos gastar nosso dinheiro!"
  },
  {
    id: 5,
    question: "Qual é uma boa forma de ganhar dinheiro para crianças?",
    options: [
      "Pedir para estranhos",
      "Ajudar com tarefas domésticas",
      "Pegar sem permissão",
      "Não fazer nada"
    ],
    correctAnswer: 1,
    explanation: "Ajudar com tarefas domésticas é uma ótima forma de ganhar mesada!"
  }
];

export function QuizGame({ onComplete }: QuizGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameState, setGameState] = useState<'playing' | 'finished'>('playing');
  const [timeLeft, setTimeLeft] = useState(15);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 20);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setTimeLeft(15);
      } else {
        setGameState('finished');
      }
    }, 3000);
  };

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0 && selectedAnswer === null) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && selectedAnswer === null) {
      handleAnswerSelect(-1); // Auto-select wrong answer when time runs out
    }
  }, [timeLeft, gameState, selectedAnswer]);

  useEffect(() => {
    if (gameState === 'finished') {
      onComplete(score);
    }
  }, [gameState, score, onComplete]);

  if (gameState === 'finished') {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">🧠</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Quiz Concluído!</h3>
        <p className="text-xl text-gray-600 mb-4">Sua pontuação: {score}/{questions.length * 20} pontos</p>
        <div className="text-lg text-gray-500">
          {score >= 80 ? '🌟 Expert em finanças!' : 
           score >= 60 ? '👍 Muito bem!' : 
           '💪 Continue aprendendo!'}
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">
          Pergunta {currentQuestion + 1}/{questions.length}
        </div>
        <div className="text-lg font-semibold text-red-600">
          ⏰ {timeLeft}s
        </div>
      </div>

      <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-3" />

      <div className="text-center">
        <h3 className="text-xl font-bold mb-6">{question.question}</h3>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
              className={`w-full p-4 text-left transition-all duration-200 ${
                selectedAnswer === null
                  ? 'bg-white border-2 border-gray-200 text-gray-800 hover:border-blue-300 hover:bg-blue-50'
                  : selectedAnswer === index
                    ? index === question.correctAnswer
                      ? 'bg-green-100 border-green-300 text-green-800'
                      : 'bg-red-100 border-red-300 text-red-800'
                    : index === question.correctAnswer
                      ? 'bg-green-100 border-green-300 text-green-800'
                      : 'bg-gray-100 border-gray-200 text-gray-500'
              }`}
            >
              {option}
            </Button>
          ))}
        </div>

        {showExplanation && (
          <div className="mt-6 p-4 rounded-lg bg-blue-50 text-blue-800">
            <div className="font-semibold mb-2">
              {selectedAnswer === question.correctAnswer ? '✅ Correto!' : '❌ Incorreto!'}
            </div>
            <div>{question.explanation}</div>
          </div>
        )}

        <div className="mt-6 text-lg font-semibold text-blue-600">
          Pontuação: {score}
        </div>
      </div>
    </div>
  );
}