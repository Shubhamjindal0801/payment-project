import { AssetUrls } from "@/common/AssetUrls";
import colors from "@/common/colors";
import styled from "@emotion/styled";

const NoTransImg = styled.img``;
const Container = styled.div`
  width: 80vw;
  margin: 0 auto;
  background-color: ${colors.ebonyClay};
`;

const TransitionsMenu = () => {
  return (
    <Container>
      <NoTransImg src={AssetUrls.NO_TRANSITIONS_IMAGE} />
    </Container>
  );
};
export default TransitionsMenu;
