import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Swiss Chronograph Heritage',
    price: 245000,
    category: 'Часы',
    image: 'https://cdn.poehali.dev/projects/b93555c2-dec8-4b50-93e7-32972c496a33/files/ad5a224a-8360-488d-8bc2-d191d14b73b5.jpg',
    description: 'Эксклюзивные швейцарские часы с золотым корпусом'
  },
  {
    id: 2,
    name: 'Designer Elegance Collection',
    price: 385000,
    category: 'Аксессуары',
    image: 'https://cdn.poehali.dev/projects/b93555c2-dec8-4b50-93e7-32972c496a33/files/ac6a7e3c-1339-4249-b952-3fbd09113427.jpg',
    description: 'Дизайнерская сумка из лимитированной коллекции'
  },
  {
    id: 3,
    name: 'Château Premier Cru 1982',
    price: 520000,
    category: 'Вино',
    image: 'https://cdn.poehali.dev/projects/b93555c2-dec8-4b50-93e7-32972c496a33/files/dcdce74c-b4f7-4fbe-a90b-69fcb323f441.jpg',
    description: 'Редкое коллекционное вино урожая 1982 года'
  },
  {
    id: 4,
    name: 'Platinum Diamond Edition',
    price: 890000,
    category: 'Часы',
    image: 'https://cdn.poehali.dev/projects/b93555c2-dec8-4b50-93e7-32972c496a33/files/ad5a224a-8360-488d-8bc2-d191d14b73b5.jpg',
    description: 'Платиновые часы с бриллиантовым безелем'
  },
  {
    id: 5,
    name: 'Royal Leather Masterpiece',
    price: 425000,
    category: 'Аксессуары',
    image: 'https://cdn.poehali.dev/projects/b93555c2-dec8-4b50-93e7-32972c496a33/files/ac6a7e3c-1339-4249-b952-3fbd09113427.jpg',
    description: 'Сумка ручной работы из эксклюзивной кожи'
  },
  {
    id: 6,
    name: 'Grand Reserve 1975',
    price: 1200000,
    category: 'Вино',
    image: 'https://cdn.poehali.dev/projects/b93555c2-dec8-4b50-93e7-32972c496a33/files/dcdce74c-b4f7-4fbe-a90b-69fcb323f441.jpg',
    description: 'Легендарное вино из частной коллекции'
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');

  const categories = ['Все', 'Часы', 'Аксессуары', 'Вино'];

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === id ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const filteredProducts =
    selectedCategory === 'Все'
      ? products
      : products.filter(p => p.category === selectedCategory);

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary tracking-wider">ÉLITE</h1>
            
            <nav className="hidden md:flex gap-8">
              <button
                onClick={() => setActiveTab('home')}
                className={`text-sm uppercase tracking-wider transition-colors ${
                  activeTab === 'home' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Главная
              </button>
              <button
                onClick={() => setActiveTab('catalog')}
                className={`text-sm uppercase tracking-wider transition-colors ${
                  activeTab === 'catalog' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Каталог
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`text-sm uppercase tracking-wider transition-colors relative ${
                  activeTab === 'favorites' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Избранное
                {favorites.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>
            </nav>

            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Icon name="ShoppingCart" size={20} />
                    {cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {cart.length}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle className="text-2xl">Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 space-y-4">
                    {cart.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                    ) : (
                      <>
                        {cart.map(({ product, quantity }) => (
                          <div key={product.id} className="flex gap-4 border-b border-border pb-4">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-20 h-20 object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium">{product.name}</h4>
                              <p className="text-primary text-sm">{product.price.toLocaleString('ru-RU')} ₽</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-6 w-6"
                                  onClick={() => updateQuantity(product.id, quantity - 1)}
                                >
                                  <Icon name="Minus" size={12} />
                                </Button>
                                <span className="text-sm w-8 text-center">{quantity}</span>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-6 w-6"
                                  onClick={() => updateQuantity(product.id, quantity + 1)}
                                >
                                  <Icon name="Plus" size={12} />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-6 w-6 ml-auto"
                                  onClick={() => removeFromCart(product.id)}
                                >
                                  <Icon name="X" size={12} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="pt-4 space-y-4">
                          <div className="flex justify-between text-lg font-semibold">
                            <span>Итого:</span>
                            <span className="text-primary">{cartTotal.toLocaleString('ru-RU')} ₽</span>
                          </div>
                          <Button className="w-full" size="lg">
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Icon name="Headphones" size={16} />
                    <span className="hidden sm:inline">Консьерж</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle className="text-2xl">Личный консьерж</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 space-y-6">
                    <p className="text-muted-foreground">
                      Наш персональный диспетчер доступен 24/7 для консультации и оформления индивидуальных заказов
                    </p>
                    <div className="space-y-4">
                      <Button className="w-full gap-2" size="lg">
                        <Icon name="Phone" size={18} />
                        +7 (495) 123-45-67
                      </Button>
                      <Button className="w-full gap-2" size="lg" variant="outline">
                        <Icon name="Mail" size={18} />
                        elite@luxury.ru
                      </Button>
                      <Button className="w-full gap-2" size="lg" variant="outline">
                        <Icon name="MessageCircle" size={18} />
                        WhatsApp
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {activeTab === 'home' && (
        <main>
          <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
            </div>
            <div className="container mx-auto px-4 text-center relative z-10">
              <h2 className="text-6xl md:text-8xl font-bold mb-6 text-primary animate-fade-in">
                ÉLITE COLLECTION
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Эксклюзивные предметы роскоши для избранных
              </p>
              <Button
                size="lg"
                className="animate-fade-in gap-2 text-base px-8 py-6"
                style={{ animationDelay: '0.4s' }}
                onClick={() => setActiveTab('catalog')}
              >
                Смотреть коллекцию
                <Icon name="ArrowRight" size={18} />
              </Button>
            </div>
          </section>

          <section className="py-20 bg-secondary/30">
            <div className="container mx-auto px-4">
              <h3 className="text-4xl font-bold text-center mb-12 text-primary">Избранные предложения</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {products.slice(0, 3).map((product) => (
                  <Card key={product.id} className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden aspect-square">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <button
                          onClick={() => toggleFavorite(product.id)}
                          className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
                        >
                          <Icon
                            name="Heart"
                            size={20}
                            className={favorites.includes(product.id) ? 'fill-primary text-primary' : ''}
                          />
                        </button>
                      </div>
                      <div className="p-6">
                        <Badge variant="outline" className="mb-3">{product.category}</Badge>
                        <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
                        <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-primary">{product.price.toLocaleString('ru-RU')} ₽</span>
                          <Button onClick={() => addToCart(product)} size="sm" className="gap-2">
                            <Icon name="ShoppingCart" size={16} />
                            В корзину
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Shield" size={32} className="text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold">Гарантия подлинности</h4>
                  <p className="text-muted-foreground">Каждый товар сертифицирован и проверен экспертами</p>
                </div>
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Truck" size={32} className="text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold">VIP доставка</h4>
                  <p className="text-muted-foreground">Конфиденциальная доставка в любую точку мира</p>
                </div>
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Headphones" size={32} className="text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold">Персональный сервис</h4>
                  <p className="text-muted-foreground">Личный консультант доступен 24/7</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {activeTab === 'catalog' && (
        <main className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl font-bold mb-8 text-primary">Каталог</h2>
            
            <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(cat)}
                  className="whitespace-nowrap"
                >
                  {cat}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden aspect-square">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
                      >
                        <Icon
                          name="Heart"
                          size={20}
                          className={favorites.includes(product.id) ? 'fill-primary text-primary' : ''}
                        />
                      </button>
                    </div>
                    <div className="p-6">
                      <Badge variant="outline" className="mb-3">{product.category}</Badge>
                      <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
                      <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">{product.price.toLocaleString('ru-RU')} ₽</span>
                        <Button onClick={() => addToCart(product)} size="sm" className="gap-2">
                          <Icon name="ShoppingCart" size={16} />
                          В корзину
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      )}

      {activeTab === 'favorites' && (
        <main className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl font-bold mb-8 text-primary">Избранное</h2>
            
            {favoriteProducts.length === 0 ? (
              <div className="text-center py-20">
                <Icon name="Heart" size={64} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-xl text-muted-foreground mb-6">Вы пока ничего не добавили в избранное</p>
                <Button onClick={() => setActiveTab('catalog')}>
                  Перейти в каталог
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {favoriteProducts.map((product) => (
                  <Card key={product.id} className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden aspect-square">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <button
                          onClick={() => toggleFavorite(product.id)}
                          className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
                        >
                          <Icon
                            name="Heart"
                            size={20}
                            className="fill-primary text-primary"
                          />
                        </button>
                      </div>
                      <div className="p-6">
                        <Badge variant="outline" className="mb-3">{product.category}</Badge>
                        <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
                        <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-primary">{product.price.toLocaleString('ru-RU')} ₽</span>
                          <Button onClick={() => addToCart(product)} size="sm" className="gap-2">
                            <Icon name="ShoppingCart" size={16} />
                            В корзину
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      )}

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-4">ÉLITE</h3>
              <p className="text-muted-foreground">Эксклюзивный маркетплейс предметов роскоши для избранных</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>+7 (495) 123-45-67</p>
                <p>elite@luxury.ru</p>
                <p>Москва, Красная площадь, 1</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Мы в соцсетях</h4>
              <div className="flex gap-4">
                <Button size="icon" variant="outline">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button size="icon" variant="outline">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button size="icon" variant="outline">
                  <Icon name="Twitter" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground text-sm">
            <p>© 2024 ÉLITE. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
