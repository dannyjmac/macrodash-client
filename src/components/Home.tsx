import styled from "styled-components";
import { Logo } from "./Logo";
import { YieldCurve } from "./YieldCurve";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const Home = () => {
  return (
    <Container>
      <Logo />
      <YieldCurve />
    </Container>
  );
};
