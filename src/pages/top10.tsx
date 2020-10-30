import { GetServerSideProps, GetStaticProps } from "next";
import React from "react";
import { Container, List } from "../styles/pages/Home";

interface IProdocut {
  id: string;
  title: string;
}

interface Homeprops {
  products: IProdocut[];
}

export default function Top10({ products }: Homeprops) {
  return (
    <Container>
      <List>
        {products.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </List>
    </Container>
  );
}

export const getStaticProps: GetStaticProps<Homeprops> = async (context) => {
  const response = await fetch("http://localhost:3333/products");

  const products = await response.json();
  console.log(products);
  return {
    props: {
      products,
    },
    revalidate: 10,
  };
};
