import SEO from "@/components/SEO";
import { GetStaticPaths, GetStaticProps } from "next";
import { Container, List, Title } from "../../styles/pages/Home";
import Link from "next/link";
import { useRouter } from "next/router";

interface Product {
  id: number;
  title: String;
  price: number;
}

interface Category {
  id: Number;
  title: String;
}
interface Homeprops {
  products: Product[];
}

export default function categories({ products }: Homeprops) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Gerando pagina estática...</p>;
  }

  return (
    <Container>
      <SEO title="Top 10 produtos!" image="embed.jpg" />

      <Title>NEXT JS⚡⚡</Title>

      <h1>Produtos</h1>

      <List>
        {products.length > 0 ? (
          products.map((p) => (
            <li key={p.id}>
              <Link href={`catalog/product/${p.id}`}>
                <a>{p.title}</a>
              </Link>
            </li>
          ))
        ) : (
          <p>Nenhum produto para essa categoria {`:(`} </p>
        )}
      </List>
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await (
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
  ).json();

  const paths = categories.map((c: Category) => ({
    params: { slug: c.id },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Homeprops> = async ({ params }) => {
  const { slug } = params;

  const products = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?category_id=${slug}`
    )
  ).json();

  return {
    revalidate: 5,
    props: {
      products,
    },
  };
};
