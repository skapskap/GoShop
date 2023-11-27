import { useNavigate, useParams } from "react-router";
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
  Loader,
  NumberInput,
  Select,
} from "@mantine/core";
import classes from "./ProductScreen.module.css";
import { useGetProductDetailsQuery } from "../../slices/productsApiSlice";
import { useState } from "react";
import { addToCart } from "../../slices/cartSlice";
import { useDispatch } from "react-redux";

const PRIMARY_COL_HEIGHT = rem(300);

const ProductScreen = () => {
  const { id: productId } = useParams(); // Assuming you're using the useParams hook to get the product ID

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  const { data, isLoading, error } = useGetProductDetailsQuery(productId); // Pass the product ID to the query

  const product = data?.product;

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity }));
    navigate("/cart");
  };

  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

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
        <div>{error?.data?.message || error.error}</div>
      ) : (
        <Container my="md">
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
                    {product.num_reviews} reviews
                  </p>
                </Flex>
                <Divider my="sm" />
                <p
                  className={classes.productName}
                >{`Price: $${product.price}`}</p>
                <Divider my="sm" />
                <p className={classes.productName}>{product.description}</p>
              </Grid.Col>
            </Grid>
            <Paper shadow="lg" withBorder p="xl" style={{ maxHeight: 330 }}>
              <Grid gutter="md">
                <Grid.Col>
                  <p>{`Price: $${product.price}`}</p>
                  <Divider my="sm" />
                  <p>
                    Status:{" "}
                    <strong>
                      {product.count_in_stock > 0 ? "In Stock" : "Out of Stock"}
                    </strong>
                  </p>

                  {product.count_in_stock > 0 && (
                    <>
                      <Divider my="sm" />

                      <p>Quantity:</p>
                      <Select
                        size="xs"
                        data={[...Array(product.count_in_stock).keys()].map(
                          (value) => value + 1
                        )}
                        value={quantity}
                        onChange={setQuantity}
                      />
                      {/* {[...Array(product.count_in_stock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))} */}
                    </>
                  )}

                  <Divider my="sm" />
                  <Button
                    type="button"
                    disabled={product.count_in_stock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </Grid.Col>
              </Grid>
            </Paper>
          </SimpleGrid>
        </Container>
      )}
    </>
  );
};

export default ProductScreen;
