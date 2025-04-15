import { Fragment, useState } from 'react';
import { Trash } from '@phosphor-icons/react';

import { QuantityInput } from '../../components/Form/QuantityInput';
import {
  CartTotal,
  CartTotalInfo,
  CheckoutButton,
  Coffee,
  CoffeeInfo,
  Container,
  InfoContainer,
} from './styles';
import { Tags } from '../../components/CoffeeCard/styles';

export interface Item {
  id: string;
  quantity: number;
}
export interface Order {
  id: number;
  items: CoffeeInCart[];
}

interface CoffeeInCart {
  id: string;
  title: string;
  description: string;
  tags: string[];
  price: number;
  image: string;
  quantity: number;
  subTotal: number;
}

const DELIVERY_PRICE = 3.75;

export function Cart() {
  const [coffeesInCart, setCoffeesInCart] = useState<CoffeeInCart[]>([
    {
      id: '0',
      title: 'Expresso Tradicional',
      description: 'O tradicional café feito com água quente e grãos moídos',
      tags: ['tradicional', 'gelado'],
      price: 10,
      image: '/images/coffees/expresso.png',
      quantity: 1,
      subTotal: 6.9,
    },
    {
      id: '1',
      title: 'Expresso Americano',
      description: 'Expresso diluído, menos intenso que o tradicional',
      tags: ['tradicional', 'com leite'],
      price: 10,
      image: '/images/coffees/americano.png',
      quantity: 10,
      subTotal: 19.9,
    },
    {
      id: '2',
      title: 'Expresso Cremoso',
      description: 'Café expresso tradicional com espuma cremosa',
      tags: ['especial'],
      price: 10,
      image: '/images/coffees/expresso-cremoso.png',
      quantity: 3,
      subTotal: 49.5,
    },
  ]);

  const amountTags: string[] = [];

  /** Adicionando os tags dos cafés no array amountTags
   * Se o tag já existir, não adiciona*/
  coffeesInCart.map((coffee) =>
    coffee.tags.map((tag) => {
      if (!amountTags.includes(tag)) {
        amountTags.push(tag);
      }
    })
  );

  // valor total dos cafés no carrinho
  const totalItemsPrice = coffeesInCart.reduce((currencyValue, coffee) => {
    return currencyValue + coffee.price * coffee.quantity;
  }, 0);

  function handleItemIncrement(itemId: string) {
    const newListCoffees = coffeesInCart.map((coffee) =>
      coffee.id === itemId
        ? { ...coffee, quantity: coffee.quantity + 1 }
        : coffee
    );
    setCoffeesInCart(newListCoffees);
  }

  function handleItemDecrement(itemId: string) {
    // coloque seu código aqui
  }

  function handleItemRemove(itemId: string) {
    // coloque seu código aqui
  }

  return (
    <Container>
      <InfoContainer>
        <h2>Cafés selecionados</h2>

        <CartTotal>
          {coffeesInCart.map((coffee) => (
            <Fragment key={coffee.id}>
              <Coffee>
                <div>
                  <img src={coffee.image} alt={coffee.title} />

                  <div>
                    <span>{coffee.title}</span>
                    <Tags>
                      {coffee.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </Tags>

                    <CoffeeInfo>
                      <QuantityInput
                        quantity={coffee.quantity}
                        incrementQuantity={() => handleItemIncrement(coffee.id)}
                        decrementQuantity={() => handleItemDecrement(coffee.id)}
                      />

                      <button onClick={() => handleItemRemove(coffee.id)}>
                        <Trash />
                        <span>Remover</span>
                      </button>
                    </CoffeeInfo>
                  </div>
                </div>

                <aside>R$ {(coffee.price * coffee.quantity).toFixed(2)}</aside>
              </Coffee>

              <span />
            </Fragment>
          ))}

          <CartTotalInfo>
            <div>
              <span>Total de itens</span>
              <span>
                {new Intl.NumberFormat('pt-br', {
                  currency: 'BRL',
                  style: 'currency',
                }).format(totalItemsPrice)}
              </span>
            </div>

            <div>
              <span>Entrega</span>
              <span>
                {new Intl.NumberFormat('pt-br', {
                  currency: 'BRL',
                  style: 'currency',
                }).format(DELIVERY_PRICE)}
              </span>
            </div>

            <div>
              <span>Total</span>
              <span>
                {new Intl.NumberFormat('pt-br', {
                  currency: 'BRL',
                  style: 'currency',
                }).format(totalItemsPrice + DELIVERY_PRICE * amountTags.length)}
              </span>
            </div>
          </CartTotalInfo>

          <CheckoutButton type="submit" form="order">
            Confirmar pedido
          </CheckoutButton>
        </CartTotal>
      </InfoContainer>
    </Container>
  );
}
