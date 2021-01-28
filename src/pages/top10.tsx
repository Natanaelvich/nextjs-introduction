import SEO from "@/components/Description/SEO";
import { GetStaticProps } from "next";
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

export default function top10({ recommendedProducts }: Homeprops) {
  return (
    <Container>
      <SEO title="Top 10 produtos!" image="embed.jpg" />

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

export const getStaticProps: GetStaticProps<Homeprops> = async () => {
  const recommendedProducts = await (
    await fetch("http://localhost:3333/products")
  ).json();

  return {
    revalidate: 5,
    props: {
      recommendedProducts,
    },
  };
};
