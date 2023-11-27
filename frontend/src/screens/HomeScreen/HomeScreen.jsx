import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Center,
  Button,
  Rating,
  Loader,
} from "@mantine/core";
import classes from "./HomeScreen.module.css";
import { Link } from "react-router-dom/dist";
import { useGetProductsQuery } from "../../slices/productsApiSlice";

const ProductCard = ({ product }) => {
  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image src={product.image} alt={product.name} />
      </Card.Section>

      <Group justify="space-between" mt="md">
        <div>
          <p className={classes.textContainer}>
            <Link to={`/product/${product.id}`}>{product.name}</Link>
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
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          color="blue"
          size="lg"
          type="bars"
        />
      ) : error ? (
        <div>{error?.data?.message || error.error} </div>
      ) : (
        <>
          <h1>Últimos Produtos</h1>
          <Group style={{ paddingBottom: 30 }}>
            {products.product.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Group>
        </>
      )}
    </>
  );
}
