import SEO from "@/components/SEO";
import { GetServerSideProps } from "next";
import { Container, List, Title } from "../styles/pages/Home";
import Prismic from "prismic-javascript";
import { clientPrismic } from "@/lib/prismic";
import { Document } from "prismic-javascript/types/documents";
import Link from "next/link";
import { RichText } from "prismic-dom";

interface Categoryprops {
  categories: Document[];
}

export default function Category({ categories }: Categoryprops) {
  return (
    <Container>
      <SEO title="DevCommerce, your best e-commerce!" image="embed.jpg" />

      <h1>Categorias</h1>

      <List>
        {categories.map((p) => (
          <li key={p.id}>
            <Link href={`catalog/categories/${p.slugs}`}>
              <a>{RichText.asText(p.data.title)}</a>
            </Link>
          </li>
        ))}
      </List>

      <Link href="/">
        <a>Voltar para Home</a>
      </Link>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<Categoryprops> = async () => {
  const categories = await clientPrismic().query([
    Prismic.Predicates.at("document.type", "category"),
  ]);

  return {
    props: {
      categories: categories.results,
    },
  };
};
