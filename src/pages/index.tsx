import Head from "next/head";
import Globalstyles from "../styles/Globalstyles";
import { Container, Title } from "../styles/pages/Home";

export default function Home() {
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
    </Container>
  );
}
