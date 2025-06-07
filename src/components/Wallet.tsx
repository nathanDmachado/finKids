import { Coins } from 'lucide-react';

interface WalletProps {
  coins: number;
}

export function Wallet({ coins }: WalletProps) {
  return (
    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-6 shadow-xl text-center transform transition-transform hover:scale-105">
      <div className="flex items-center justify-center mb-3">
        <Coins className="w-8 h-8 text-white mr-2" />
        <span className="text-white text-lg font-semibold">Minha Carteira</span>
      </div>
      
      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
        <div className="text-4xl font-bold text-white mb-2">
          {coins}
        </div>
        <div className="text-white/90 text-lg">
          🪙 moedas
        </div>
      </div>
      
      <div className="mt-4 flex justify-center space-x-4">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
          <span className="text-white text-sm">Total Ganho: {coins + 50}</span>
        </div>
      </div>
    </div>
  );
}