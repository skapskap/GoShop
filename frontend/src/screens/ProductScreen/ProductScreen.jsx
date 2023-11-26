import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Container,
  Grid,
  SimpleGrid,
  Flex,
  rem,
  Button,
  Rating,
  Divider,
  Paper,
} from "@mantine/core";
import classes from "./ProductScreen.module.css";
import axios from "axios";

const PRIMARY_COL_HEIGHT = rem(300);

const ProductScreen = () => {
  const [product, setProduct] = useState({});

  const { id: productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/v1/products/${productId}`
      );
      setProduct(data);
    };

    fetchProduct();
  }, [productId]);

  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <Container my="md" style={{ paddingBottom: 195 }}>
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: PRIMARY_COL_HEIGHT,
            borderRadius: rem(8),
          }}
        />
        <Grid gutter="md">
          <Grid.Col>
            <h2 className={classes.productName}>{product.name}</h2>
            <Divider my="sm" />
            <Flex
              mih={50}
              gap="xs"
              justify="flex-start"
              align="center"
              direction="row"
              wrap="wrap"
            >
              <Rating
                defaultValue={product.rating}
                fractions={2}
                style={{ marginBottom: 4 }}
              />
              <p style={{ margin: 0, marginLeft: "0.3rem" }}>
                {product.numReviews} reviews
              </p>
            </Flex>
            <Divider my="sm" />
            <p className={classes.productName}>{`Price: $${product.price}`}</p>
            <Divider my="sm" />
            <p className={classes.productName}>{product.description}</p>
          </Grid.Col>
        </Grid>
        <Paper shadow="lg" withBorder p="xl" style={{ maxHeight: 250 }}>
          <Grid gutter="md">
            <Grid.Col>
              <p>{`Price: $${product.price}`}</p>
              <Divider my="sm" />
              <p>
                Status:{" "}
                <strong>
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </strong>
              </p>
              <Divider my="sm" />
              <Button type="button" disabled={product.countInStock === 0}>
                Add to Cart
              </Button>
            </Grid.Col>
          </Grid>
        </Paper>
      </SimpleGrid>
    </Container>
  );
};

export default ProductScreen;
