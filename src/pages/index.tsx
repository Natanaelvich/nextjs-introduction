import SEO from "@/components/Description/SEO";
import { GetServerSideProps } from "next";
import { Container, List, Title } from "../styles/pages/Home";
import Prismic from "prismic-javascript";
import { clientPrismic } from "@/lib/prismic";
import { Document } from "prismic-javascript/types/documents";
import Link from "next/link";
import { RichText } from "prismic-dom";

interface Homeprops {
  recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }: Homeprops) {
  return (
    <Container>
      <SEO title="DevCommerce, your best e-commerce!" image="embed.jpg" />

      <Title>NEXT JS⚡⚡</Title>

      <List>
        {recommendedProducts.map((p) => (
          <li key={p.id}>
            <Link href={`catalog/product/${p.uid}`}>
              <a>{RichText.asText(p.data.title)}</a>
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<Homeprops> = async () => {
  const recommendedProducts = await clientPrismic().query([
    Prismic.Predicates.at("document.type", "product"),
  ]);

  return {
    props: {
      recommendedProducts: recommendedProducts.results,
    },
  };
};
