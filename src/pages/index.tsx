import SEO from "@/components/SEO";
import { GetServerSideProps } from "next";
import { Container, List, Title } from "../styles/pages/Home";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";

const ModalAddToCart = dynamic(() => import("@/components/ModalAddToCart"), {
  loading: () => <p>Carregando...</p>,
  ssr: false,
});

interface Product {
  id: number;
  title: String;
  price: number;
}

interface Homeprops {
  recommendedProducts: Product[];
}

export default function Home({ recommendedProducts }: Homeprops) {
  const [modalVisible, setModalVisible] = useState(false);

  async function handleSum() {
    const { sum } = await import("../lib/math");

    const result = sum(2, 2);

    console.log(result);

    return result;
  }

  async function addToCart() {
    setModalVisible(!modalVisible);
  }

  return (
    <Container>
      <SEO title="DevCommerce, your best e-commerce!" image="embed.jpg" />

      <Title>NEXT JS⚡⚡</Title>

      <h1>Produtos recomendados</h1>

      <List>
        {recommendedProducts.map((p) => (
          <li key={p.id}>
            <Link href={`catalog/product/${p.id}`}>
              <a>{p.title}</a>
            </Link>
          </li>
        ))}
      </List>

      <div>
        <Link href="/search">
          <a>Buscar produtos</a>
        </Link>
        <Link href="/categories">
          <a>categorias</a>
        </Link>
      </div>
      <button onClick={handleSum}>Somar (import dynaminc)</button>
      <button onClick={addToCart}>
        Mostrar Modal (import dynaminc components)
      </button>

      {modalVisible && <ModalAddToCart />}
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<Homeprops> = async () => {
  const recommendedProducts = await (
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`)
  ).json();

  return {
    props: {
      recommendedProducts,
    },
  };
};
