import { clientPrismic } from "@/lib/prismic";
import { Container } from "@/styles/pages/Home";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { RichText } from "prismic-dom";
import Prismic from "prismic-javascript";
import { Document } from "prismic-javascript/types/documents";
import React, { FormEvent, useState } from "react";

interface SearchProps {
  results: Document[];
}

export default function Search({ results }: SearchProps) {
  const router = useRouter();

  const [search, setSearch] = useState("");

  function handleSearch(e: FormEvent) {
    e.preventDefault();

    router.push(`/search?q=${encodeURIComponent(search)}`);

    setSearch("");
  }
  return (
    <Container>
      <form onSubmit={handleSearch}>
        <label>Buscar produto</label>
        <input
          type="text"
          value={search}
          onChange={(text) => setSearch(text.target.value)}
        />

        <button type="submit">Buscar</button>
      </form>

      {results.map((p) => (
        <li key={p.id}>
          <Link href={`catalog/product/${p.uid}`}>
            <a>{RichText.asText(p.data.title)}</a>
          </Link>
        </li>
      ))}

      <Link href="/">
        <a>Voltar para Home</a>
      </Link>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<SearchProps> = async (
  context
) => {
  const { q } = context.query;

  if (!q) {
    return { props: { results: [] } };
  }

  const search = await clientPrismic().query([
    Prismic.Predicates.at("document.type", "product"),
    Prismic.Predicates.fulltext("my.product.title", String(q)),
  ]);

  return {
    props: {
      results: search.results,
    },
  };
};
