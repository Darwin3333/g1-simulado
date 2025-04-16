import { Fragment, useState } from 'react';
import { ArrowCounterClockwise, Trash } from '@phosphor-icons/react';

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
import { current } from 'immer';

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

//////

const carto = [
  {
    id: 1,
    name: 'Café Expresso',
    price: 9.5, // total 72     19
    quantity: 2,
    category: 'bebida',
    paymentMethod: 'cartão',
  },
  {
    id: 2,
    name: 'Pão de Queijo',
    price: 5.0, //
    quantity: 3,
    category: 'lanche',
    paymentMethod: 'dinheiro',
  },
  {
    id: 3,
    name: 'Cappuccino',
    price: 12.0, //12
    quantity: 1,
    category: 'bebida',
    paymentMethod: 'pix',
  },
  {
    id: 4,
    name: 'Croissant',
    price: 8.0, //16 19     35
    quantity: 3,
    category: 'lanche',
    paymentMethod: 'cartão',
  },
  {
    id: 5,
    name: 'Latte',
    price: 10.0, // 10
    quantity: 2,
    category: 'bebida',
    paymentMethod: 'dinheiro',
  },
];

//1 Filtrar todos os itens da categoria bebida

const newList = carto
  .filter((item) => item.category === 'bebida')
  .map((item) => {
    return item.name;
  });

//console.log(newList);

//2 Somar o valor total dos itens do carrinho.

const soma = carto.reduce((acc, item) => acc + item.price * item.quantity, 0); //meu preetier nao reage bem ao formatar

//console.log(soma); //saida : 72

//3 Separar os produto pelo metodo de pagamento e armazenar em 3 arrays : cartao, dinheiro e pix.

const [array1, array2, array3] = [
  carto.filter((item) => item.paymentMethod === 'cartão'),
  carto.filter((item) => item.paymentMethod === 'dinheiro'),
  carto.filter((item) => item.paymentMethod === 'pix'),
];

//console.log(array1);
//console.log(array2);
//console.log(array3);

//4 Criar uma funcao que remova um item do carrinho pelo id.
//number no type eh tipo primitivo Number eh interface, funfa, mas nao use
function removeById(id: number) {
  const newCartList = carto.filter((item) => item.id !== id);
  // console.log(newCartList);
}
removeById(5);
//5 Criar uma funcao que incremente a quantidade de um item pelo id

function incrementById(id: number, many: number) {
  const newList = carto.map((item) =>
    item.id === id ? { ...item, quantity: item.quantity + many } : item
  );

  //console.log(newList); //saida esperada  late : 3
}

incrementById(5, 9); //saida esperada  late : 10

//6 Criar uma função que retorne a soma total dos itens pagos com cartão

function retornaTotal() {
  const nova = carto
    .filter((item) => item.paymentMethod === 'cartão')
    .reduce((acc, item) => acc + item.price * item.quantity, 0);
  //console.log(nova); //esperado 17.5
  return nova;
}
retornaTotal();

//7 Criar uma lista sem repeticao com os nomes das categorias existentes.

const categoriesList: string[] = [];
carto.map((item) => {
  if (!categoriesList.includes(item.category)) {
    categoriesList.push(item.category);
  }
});
//console.log(categoriesList);

//8 Mostrar todos os produtos cujo total(price*quantity) seja maior que 20

console.log(carto.filter((item) => item.price * item.quantity >= 20));

////////

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
    const newListCoffees2 = coffeesInCart.map((coffee) =>
      coffee.id === itemId && coffee.quantity > 1
        ? {
            ...coffee,
            quantity: coffee.quantity - 1,
            subTotal: coffee.price * coffee.quantity,
          }
        : coffee
    );
    setCoffeesInCart(newListCoffees2);
  }

  function handleItemRemove(itemId: string) {
    const newListCoffees3 = coffeesInCart.filter(
      (coffee) => coffee.id !== itemId
    );
    setCoffeesInCart(newListCoffees3);
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
                }).format(DELIVERY_PRICE * amountTags.length)}
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
