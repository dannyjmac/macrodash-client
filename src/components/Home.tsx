import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { SimpleChart } from "./SimpleChart";
import NewChart from "./NewChart";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const Home = observer(({ user }: any) => {
  return (
    <Container>
      <NewChart />
    </Container>
  );
});
