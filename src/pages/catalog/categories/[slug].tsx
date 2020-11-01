import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Prismic from "prismic-javascript";
import { Container, List } from "@/styles/pages/Home";
import { clientPrismic } from "@/lib/prismic";
import { Document } from "prismic-javascript/types/documents";
import Link from "next/link";
import { RichText } from "prismic-dom";

interface Homeprops {
  products: Document[];
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
          <li key={p.id}>
            <Link href={`catalog/product/${p.uid}`}>
              <a>{RichText.asText(p.data.title)}</a>
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
};

export default Category;

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await clientPrismic().query([
    Prismic.Predicates.at("document.type", "category"),
  ]);

  const paths = categories.results.map((category) => {
    return {
      params: {
        slug: category.uid,
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

  const category = await clientPrismic().getByUID("category", String(slug), {});

  const products = await clientPrismic().query([
    Prismic.Predicates.at("document.type", "product"),
    Prismic.Predicates.at("my.product.category", category.id),
  ]);

  return {
    props: {
      products: products.results,
    },
    revalidate: 60,
  };
};
