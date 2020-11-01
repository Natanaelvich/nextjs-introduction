import SEO from "@/components/Description/SEO";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Container, List, Title } from "../styles/pages/Home";

interface IProdocut {
  id: string;
  title: string;
}

interface Homeprops {
  recommendedProducts: IProdocut[];
}

export default function Home({ recommendedProducts }: Homeprops) {
  return (
    <Container>
      <SEO title="DevCommerce, your best e-commerce!" image="embed.jpg" />

      <Title>NEXT JS⚡⚡</Title>

      <List>
        {recommendedProducts.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </List>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<Homeprops> = async () => {
  const response = await fetch(`${process.env.API_URL}/recommended`);

  const recommendedProducts = await response.json();
  return {
    props: {
      recommendedProducts,
    },
  };
};
