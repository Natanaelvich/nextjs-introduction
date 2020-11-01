import { GetServerSideProps, GetStaticProps } from "next";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Container, List } from "../styles/pages/Home";

interface IProdocut {
  id: string;
  title: string;
}

interface Homeprops {
  products: IProdocut[];
}

const Description = dynamic(() => import("../components/Description"), {
  loading: () => <h1>Carregando</h1>,
  ssr: false,
});

export default function Top10({ products }: Homeprops) {
  const [desciptionVisible, setDesciptionVisible] = useState(false);
  return (
    <Container>
      <List>
        {products.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </List>

      <button onClick={() => setDesciptionVisible(true)}>
        View Description
      </button>

      {desciptionVisible && <Description />}
    </Container>
  );
}

export const getStaticProps: GetStaticProps<Homeprops> = async (context) => {
  const response = await fetch("http://localhost:3333/products");

  const products = await response.json();
  return {
    props: {
      products,
    },
    revalidate: 60,
  };
};
