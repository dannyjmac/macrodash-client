import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  font-weight: bold;
  font-size: 30px;
  color: black;
`;

export const Logo = () => <Container>MacroDash</Container>;
