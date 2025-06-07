import { Sparkles } from 'lucide-react';

export function Header() {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-gradient-to-r from-green-500 to-yellow-500 p-3 rounded-full shadow-lg">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">
        FinKids
      </h1>
      <p className="text-gray-600 text-lg">
        Aprenda sobre dinheiro de forma divertida!
      </p>
    </div>
  );
}