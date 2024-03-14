import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { LogoutOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

interface Props {
  user: any;
}
const Container = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #fff !important;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;
const LogoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  font-size: 2rem;
`;
const LogoutLogo = styled(Tooltip)`
  &:hover {
    cursor: pointer;
  }
`;
const UserName = styled.h3`
  color: #000;
`;

const Header = (props: Props) => {
  const { user } = props;
  const getName = (name: string) => {
    if (name) {
      const fLetter = name.slice(0, 1).toUpperCase();
      return fLetter + name.slice(1);
    }
    return;
  };
  const handleLogout = () => {
    localStorage.removeItem("users");
    window.location.href = "/";
  };
  return (
    <Container
      initial={{ opacity: 0, x: -1000 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
    >
      <span></span>
      <motion.h1
        initial={{ opacity: 0, x: -1000 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        Len Den
      </motion.h1>
      <LogoutContainer>
        <UserName>{getName(user?.firstName)}</UserName>
        <LogoutLogo title="Logout" placement="bottom">
          <LogoutOutlined onClick={handleLogout} />
        </LogoutLogo>
      </LogoutContainer>
    </Container>
  );
};

export default Header;
