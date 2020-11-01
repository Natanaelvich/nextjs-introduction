import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Container, List } from "@/styles/pages/Home";

interface ICateogory {
  id: string;
  title: string;
}

interface Homeprops {
  products: ICateogory[];
}

const Category: React.FC<Homeprops> = ({ products }) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <h1>Carregando...</h1>;
  }
  return (
    <Container>
      <List>
        {products.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </List>
    </Container>
  );
};

export default Category;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch("http://localhost:3333/categories");

  const categories = await response.json();
  const paths = categories.map((category: ICateogory) => {
    return {
      params: {
        slug: category.id,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Homeprops> = async (context) => {
  const { slug } = context.params;

  const response = await fetch(
    `http://localhost:3333/products?category_id=${slug}`
  );

  const products = await response.json();
  return {
    props: {
      products,
    },
    revalidate: 60,
  };
};
