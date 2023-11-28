import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Paper,
  Grid,
  Image,
  Text,
  NumberInput,
  Button,
  Avatar,
  Table,
  Select,
  Divider,
} from "@mantine/core";
import classes from "./CartScreen.module.css";
import { IconTrash } from "@tabler/icons-react";
import { addToCart } from "../../slices/cartSlice";
import { auto } from "@popperjs/core";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, quantity) => {
    dispatch(addToCart({ ...product, quantity }));
  };

  return (
    <div
      className={classes.cartScreen}
      style={{ paddingBottom: 30, paddingRight: 25 }}
    >
      <h1 style={{ marginBottom: "20px" }}>Carrinho</h1>
      {cartItems.length === 0 ? (
        <Alert
          variant="filled"
          color="rgba(22, 113, 158, 1)"
          style={{
            width: "100%",
            maxWidth: 800,
            height: 70,
          }}
        >
          O carrinho está vazio.{" "}
          <Link
            to="/"
            style={{ color: "#1a1b1e", textDecoration: "underline" }}
          >
            Voltar
          </Link>
        </Alert>
      ) : (
        <Grid gutter="xl" grow>
          <Grid.Col span={6} style={{ overflowX: "auto", overflowY: "hidden" }}>
            <Paper p="md" shadow="xs" withBorder className={classes.Paper}>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Imagem</Table.Th>
                    <Table.Th>Produto</Table.Th>
                    <Table.Th>Preço</Table.Th>
                    <Table.Th>Quantidade</Table.Th>
                    <Table.Th>Total</Table.Th>
                    <Table.Th>Ação</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {cartItems.map((item) => (
                    <Table.Tr key={item.name}>
                      <Table.Td>
                        <Image
                          radius="md"
                          src={item.image}
                          alt={item.name}
                          style={{
                            zIndex: 1,
                          }}
                        />
                      </Table.Td>
                      <Table.Td>
                        <Link
                          to={`${item.id}`}
                          style={{ textDecoration: "underline" }}
                        >
                          {item.name}
                        </Link>
                      </Table.Td>
                      <Table.Td>{item.price}</Table.Td>
                      <Table.Td>
                        <Select
                          size="xs"
                          data={[...Array(item.count_in_stock).keys()].map(
                            (value) => value + 1
                          )}
                          value={item.quantity}
                          onChange={(selectedQuantity) =>
                            addToCartHandler(item, Number(selectedQuantity))
                          }
                        />
                      </Table.Td>
                      <Table.Td>
                        {(item.price * item.quantity).toFixed(2)}
                      </Table.Td>
                      <Table.Td>
                        <IconTrash />
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Paper>
          </Grid.Col>
          <Grid.Col span={4}>
            <Paper p="md" shadow="xs" withBorder style={{ marginTop: 40 }}>
              <Text size="xl">Resumo da compra</Text>
              <Divider style={{ marginTop: 15, marginBottom: 15 }} />
              <div style={{ display: "flex", alignItems: "center" }}>
                <div>Total de Itens</div>
                <div style={{ marginLeft: auto }}>
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </div>
              </div>
              <Divider style={{ marginTop: 15, marginBottom: 15 }} />
              <div div style={{ display: "flex", alignItems: "center" }}>
                <div>Valor Total</div>
                <div style={{ marginLeft: auto }}>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.quantity * item.price, 0)
                    .toFixed(2)}
                </div>
              </div>
              <Divider style={{ marginTop: 15, marginBottom: 15 }} />
              <Button variant="filled" color="indigo">
                Fechar Pedido
              </Button>
            </Paper>
          </Grid.Col>
        </Grid>
      )}
    </div>
  );
};

export default CartScreen;
