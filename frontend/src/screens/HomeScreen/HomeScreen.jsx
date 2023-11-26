import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Center,
  Button,
  Rating,
} from "@mantine/core";
import classes from "./HomeScreen.module.css";
import { Link } from "react-router-dom/dist";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductCard = ({ product }) => {
  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image src={product.image} alt={product.name} />
      </Card.Section>

      <Group justify="space-between" mt="md">
        <div>
          <p className={classes.textContainer}>
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </p>
        </div>
      </Group>

      <Card.Section className={classes.section}>
        <Group gap={30}>
          <div>
            <Rating
              defaultValue={product.rating}
              fractions={2}
              style={{ marginBottom: 4 }}
            />
            <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
              {`$${product.price}`}
            </Text>
          </div>

          <Button radius="xl" style={{ flex: 1 }}>
            Buy now
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
};

export function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/v1/products`
      );
      setProducts(data.product);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Últimos Produtos</h1>
      <Group>
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Group>
    </>
  );
}
