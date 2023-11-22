import { HeaderMegaMenu } from "../components/HeaderMegaMenu/HeaderMegaMenu";
import { FooterSocial } from "../components/FooterSocial/FooterSocial";
import { Main } from "../components/Container/Container";

export function HomePage() {
  return (
    <>
      <HeaderMegaMenu />
      <Main />
      <FooterSocial />
    </>
  );
}
