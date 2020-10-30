import React from "react";
import { useRouter } from "next/router";

const Product: React.FC = () => {
  const router = useRouter();
  return <div>{router.query.slug}</div>;
};

export default Product;
