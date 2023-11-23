import React from "react";
import { HeaderMegaMenu } from "../components/HeaderMegaMenu/HeaderMegaMenu";
import { FooterSocial } from "../components/FooterSocial/FooterSocial";

const Layout = ({ children }) => {
  return (
    <>
      <HeaderMegaMenu />
      {children}
      <FooterSocial />
    </>
  );
};

export default Layout;
