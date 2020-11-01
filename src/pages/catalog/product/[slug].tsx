import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Container, List } from "@/styles/pages/Home";
import Prismic from "prismic-javascript";
import { clientPrismic } from "@/lib/prismic";
import { Document } from "prismic-javascript/types/documents";
import { RichText } from "prismic-dom";

interface IProduct {
  product: Document;
}

const Product: React.FC<IProduct> = ({ product }) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <h1>Carregando...</h1>;
  }
  return (
    <Container>
      <h1>{RichText.asText(product.data.title)}</h1>

      <img src={product.data.thumbnail.url} alt="" />
      <div
        dangerouslySetInnerHTML={{
          __html: RichText.asHtml(product.data.descriptopn),
        }}
      ></div>

      <p>Price : ${product.data.price}</p>
    </Container>
  );
};

export default Product;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<IProduct> = async (context) => {
  const { slug } = context.params;

  const product = await clientPrismic().getByUID("product", String(slug), {});

  return {
    props: {
      product,
    },
    revalidate: 5,
  };
};
