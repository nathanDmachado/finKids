import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock } from 'lucide-react';
import type { Mission } from '@/App';

interface MissionListProps {
  missions: Mission[];
  onComplete: (missionId: number) => void;
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  hard: 'bg-red-100 text-red-800 border-red-200'
};

const categoryColors = {
  saving: 'bg-blue-100 text-blue-800',
  earning: 'bg-green-100 text-green-800',
  spending: 'bg-purple-100 text-purple-800',
  sharing: 'bg-pink-100 text-pink-800'
};

export function MissionList({ missions, onComplete }: MissionListProps) {
  const incompleteMissions = missions.filter(m => !m.completed);
  const completedMissions = missions.filter(m => m.completed);

  return (
    <div className="space-y-6">
      {incompleteMissions.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Clock className="w-6 h-6 mr-2 text-blue-500" />
            Missões Disponíveis
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {incompleteMissions.map((mission) => (
              <Card 
                key={mission.id} 
                className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-2 border-transparent hover:border-green-200"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">{mission.icon}</div>
                    <div className="flex flex-col gap-1">
                      <Badge className={difficultyColors[mission.difficulty]}>
                        {mission.difficulty === 'easy' ? 'Fácil' : 
                         mission.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                      </Badge>
                      <Badge className={categoryColors[mission.category]}>
                        {mission.category === 'saving' ? 'Poupar' :
                         mission.category === 'earning' ? 'Ganhar' :
                         mission.category === 'spending' ? 'Gastar' : 'Compartilhar'}
                      </Badge>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {mission.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {mission.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl mr-1">🪙</span>
                      <span className="text-xl font-bold text-green-600">
                        +{mission.reward}
                      </span>
                    </div>
                    
                    <Button
                      onClick={() => onComplete(mission.id)}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-200"
                    >
                      Concluir Missão
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {completedMissions.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <CheckCircle2 className="w-6 h-6 mr-2 text-green-500" />
            Missões Concluídas
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {completedMissions.map((mission) => (
              <Card key={mission.id} className="opacity-75 bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl grayscale">{mission.icon}</div>
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-600 mb-2">
                    {mission.title}
                  </h3>
                  
                  <p className="text-gray-500 mb-4">
                    {mission.description}
                  </p>
                  
                  <div className="flex items-center">
                    <span className="text-green-600 font-semibold">
                      ✅ Concluída! +{mission.reward} moedas
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {missions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Nenhuma missão disponível
          </h3>
          <p className="text-gray-500">
            Novas missões serão adicionadas em breve!
          </p>
        </div>
      )}
    </div>
  );
}