import { Card, Image, Text, Group, Badge, Center, Button } from "@mantine/core";
import classes from "./HomeScreen.module.css";
import products from "../../products";

const ProductCard = ({ product }) => {
  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image src={product.image} alt={product.name} />
      </Card.Section>

      <Group justify="space-between" mt="md">
        <div>
          <p className={classes.textContainer}>{product.name}</p>
        </div>
      </Group>

      <Card.Section className={classes.section}>
        <Group gap={30}>
          <div>
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
  return (
    <>
      <h1>Últimos Produtos</h1>
      <Group>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Group>
    </>
  );
}
