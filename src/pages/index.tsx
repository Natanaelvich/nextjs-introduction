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
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

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
  const response = await fetch("http://localhost:3333/recommended");

  const recommendedProducts = await response.json();
  console.log(recommendedProducts);
  return {
    props: {
      recommendedProducts,
    },
  };
};
