import { Container } from "@mantine/core";

export function Main() {
  const demoProps = {
    bg: "var(--mantine-color-blue-light)",
    h: 100,
    mt: "md",
  };

  return (
    <>
      <Container {...demoProps}>
        <h1>Welcome to GoShop</h1>
      </Container>
    </>
  );
}
