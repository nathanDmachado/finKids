import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, CheckCircle2 } from 'lucide-react';
import type { ShopItem } from '@/App';

interface ShopProps {
  items: ShopItem[];
  coins: number;
  onPurchase: (itemId: number) => void;
}

export function Shop({ items, coins, onPurchase }: ShopProps) {
  const availableItems = items.filter(i => !i.purchased);
  const purchasedItems = items.filter(i => i.purchased);

  return (
    <div className="space-y-6">
      {availableItems.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <ShoppingBag className="w-6 h-6 mr-2 text-purple-500" />
            Loja de Recompensas
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableItems.map((item) => {
              const canAfford = coins >= item.price;
              
              return (
                <Card 
                  key={item.id} 
                  className={`transition-all duration-200 hover:shadow-lg ${
                    canAfford 
                      ? 'hover:-translate-y-1 border-2 border-transparent hover:border-purple-200' 
                      : 'opacity-75'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{item.emoji}</div>
                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">
                      {item.name}
                    </h3>
                    
                    <div className="flex items-center justify-center mb-4">
                      <span className="text-2xl mr-1">🪙</span>
                      <span className="text-xl font-bold text-purple-600">
                        {item.price}
                      </span>
                    </div>
                    
                    <Button
                      onClick={() => onPurchase(item.id)}
                      disabled={!canAfford}
                      className={`w-full transition-all duration-200 ${
                        canAfford
                          ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
                          : 'bg-gray-300 cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? 'Comprar' : 'Moedas Insuficientes'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {purchasedItems.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <CheckCircle2 className="w-6 h-6 mr-2 text-green-500" />
            Itens Comprados
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {purchasedItems.map((item) => (
              <Card key={item.id} className="bg-green-50 border-green-200 opacity-90">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{item.emoji}</div>
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-600 mb-2 text-center">
                    {item.name}
                  </h3>
                  
                  <div className="text-center">
                    <span className="text-green-600 font-semibold">
                      ✅ Comprado!
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {items.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛍️</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Loja em breve!
          </h3>
          <p className="text-gray-500">
            Novos itens serão adicionados em breve!
          </p>
        </div>
      )}
    </div>
  );
}