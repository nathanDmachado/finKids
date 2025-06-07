import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Lock } from 'lucide-react';
import type { Achievement } from '@/App';

interface AchievementsProps {
  achievements: Achievement[];
}

export function Achievements({ achievements }: AchievementsProps) {
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  return (
    <div className="space-y-6">
      {unlockedAchievements.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
            Conquistas Desbloqueadas
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {unlockedAchievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">{achievement.icon}</div>
                    <Trophy className="w-6 h-6 text-yellow-500" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {achievement.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {achievement.description}
                  </p>
                  
                  <div className="bg-yellow-100 rounded-lg p-3">
                    <div className="text-yellow-800 font-semibold text-center">
                      ✨ Conquista Desbloqueada!
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {lockedAchievements.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Lock className="w-6 h-6 mr-2 text-gray-400" />
            Próximas Conquistas
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {lockedAchievements.map((achievement) => (
              <Card key={achievement.id} className="border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl grayscale opacity-50">{achievement.icon}</div>
                    <Lock className="w-6 h-6 text-gray-400" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-600 mb-2">
                    {achievement.title}
                  </h3>
                  
                  <p className="text-gray-500 mb-4">
                    {achievement.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Progresso</span>
                      <span>{Math.min(achievement.progress, achievement.requirement)}/{achievement.requirement}</span>
                    </div>
                    <Progress 
                      value={(achievement.progress / achievement.requirement) * 100} 
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {achievements.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Nenhuma conquista disponível
          </h3>
          <p className="text-gray-500">
            Complete missões para desbloquear conquistas!
          </p>
        </div>
      )}
    </div>
  );
}