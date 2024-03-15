import { apiContract } from "@/common/apiContract";
import colors from "@/common/colors";
import { SearchOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Input, message } from "antd";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
interface HelperProps {
  isInputVisible: boolean;
}
const Container = styled(motion.div)``;
const InputBox = styled.div<HelperProps>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ isInputVisible }) =>
    isInputVisible ? "space-between" : "flex-start"};
  align-items: center;
  flex-wrap: wrap;
`;
const AddFriendButton = styled.button`
  transition: all 5s;
  padding: 12px 18px;
  background-color: ${colors.orangePeel};
  color: white;
  border: none;
  border-radius: 2rem;
  font-size: 1.2rem;
  cursor: pointer;
`;
const InputBar = styled(Input)`
  transition: all 5s;
  border-radius: 18px !important;
  padding: 10px 12px !important;
  max-width: 500px;
`;
const UserDetail = styled.div``;

const FriendsMenu = () => {
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [searchedResponse, setSearchedResponse] = useState(null);
  const handelAddFriendClick = () => {
    setIsInputVisible(!isInputVisible);
  };
  const handleInputChange = async (e: any) => {
    setSearchedResponse(null);
    const q = e.target.value;
    setQuery(q);
    if (q.includes("@")) {
      await axios
        .get(`http://localhost:8080${apiContract.fetUserDetails}/${q}`)
        .then((res) => {
          message.success("User found based on email");
          setSearchedResponse(res.data);
        })
        .catch((err) => {
          console.log("jindal", err);
        });
    }
  };
  return (
    <Container
      initial={{ opacity: 0, x: -1000 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.5 }}
    >
      <InputBox isInputVisible={isInputVisible}>
        {isInputVisible && (
          <InputBar
            placeholder="Search user by mail"
            onChange={(e) => handleInputChange(e)}
          />
        )}
        <AddFriendButton onClick={handelAddFriendClick}>
          Add a new Friend
        </AddFriendButton>
      </InputBox>
      {searchedResponse && (
        <UserDetail>
        </UserDetail>
      )}
    </Container>
  );
};
export default FriendsMenu;
