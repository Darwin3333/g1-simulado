import { Coffee, Package, ShoppingCart, Timer } from '@phosphor-icons/react';
import { useTheme } from 'styled-components';

import { CoffeeCard } from '../../components/CoffeeCard';

import { CoffeeList, Heading, Hero, HeroContent, Info } from './styles';
import { useEffect, useState } from 'react';
import { api } from '../../serves/api';
import { Loading } from '../../components/Loading';
interface Coffee {
  id: string;
  title: string;
  description: string;
  tags: string[];
  price: number;
  image: string;
  quantity: number;
}

export function Home() {
  const theme = useTheme();
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    const response = await api.get('/coffees');
    //console.log(response.data);

    setCoffees(response.data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  function incrementQuantity(id: string) {
    //preciso primeiro criar uma nova lista  e passar o map
    const newCoffeess = coffees.map(
      (
        coffee //e depois lembrar do ...coffee, quantity : coffee.quantity + 1
      ) =>
        coffee.id === id ? { ...coffee, quantity: coffee.quantity + 1 } : coffee //o rest copia tudo, e altera o novo valor de quantity :
    );

    setCoffees(newCoffeess);
  }

  function decrementQuantity(id: string) {
    const newCoffees1 = coffees.map(
      (coffee) =>
        coffee.id === id && coffee.quantity >= 1
          ? { ...coffee, quantity: coffee.quantity - 1 }
          : coffee //preciso ver se tem quantidade, senao fica negativo nee
    );
    setCoffees(newCoffees1);
  }

  return (
    <div>
      <Hero>
        <HeroContent>
          <div>
            <Heading>
              <h1>Encontre o café perfeito para qualquer hora do dia</h1>

              <span>
                Com o Coffee Delivery você recebe seu café onde estiver, a
                qualquer hora
              </span>
            </Heading>

            <Info>
              <div>
                <ShoppingCart
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors['yellow-dark'] }}
                />
                <span>Compra simples e segura</span>
              </div>

              <div>
                <Package
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors['base-text'] }}
                />
                <span>Embalagem mantém o café intacto</span>
              </div>

              <div>
                <Timer
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors.yellow }}
                />
                <span>Entrega rápida e rastreada</span>
              </div>

              <div>
                <Coffee
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors.purple }}
                />
                <span>O café chega fresquinho até você</span>
              </div>
            </Info>
          </div>

          <img src="/images/hero.svg" alt="Café do Coffee Delivery" />
        </HeroContent>

        <img src="/images/hero-bg.svg" id="hero-bg" alt="" />
      </Hero>

      <CoffeeList>
        <h2>Nossos cafés</h2>
        {loading ? (
          <Loading />
        ) : (
          <div>
            {coffees.map((coffee) => (
              <CoffeeCard
                key={coffee.id}
                coffee={{
                  description: coffee.description, //sao atributos da propriedade Coffee.
                  id: coffee.description,
                  image: coffee.image,
                  price: 9.9,
                  tags: coffee.tags,
                  title: coffee.title,
                  quantity: coffee.quantity,
                }}
                incrementQuantity={() => incrementQuantity(coffee.id)}
                decrementQuantity={() => decrementQuantity(coffee.id)}
              />
            ))}
          </div>
        )}
      </CoffeeList>
    </div>
  );
}
