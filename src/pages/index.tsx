import SEO from "@/components/Description/SEO";
import { GetServerSideProps } from "next";
import { Container, List, Title } from "../styles/pages/Home";
import Link from "next/link";

interface Product {
  id: number;
  title: String;
  price: number;
}

interface Homeprops {
  recommendedProducts: Product[];
}

export default function Home({ recommendedProducts }: Homeprops) {
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
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<Homeprops> = async () => {
  const recommendedProducts = await (
    await fetch("http://localhost:3333/recommended")
  ).json();

  console.log(recommendedProducts);
  return {
    props: {
      recommendedProducts,
    },
  };
};
