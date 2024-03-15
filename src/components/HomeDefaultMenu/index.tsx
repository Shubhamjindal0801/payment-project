import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { RWebShare } from "react-web-share";
import { Button } from "antd";

interface Props {
  handleTransactionClick: (key: string) => void;
}

const Container = styled(motion.div)`
  height: 70vh;
`;
const GreetMsg = styled.h1``;
const WelcomeMsg = styled.div`
  margin-top: 7rem;
  max-width: 73%;
  line-height: 3rem;
  font-size: 1.7rem;
  span {
    font-size: 6.5rem;
    -webkit-text-stroke-width: 4px;
    -webkit-text-stroke-color: white;
    span {
    }
  }
  span:hover {
    color: black;
    -webkit-text-stroke-color: white;
    transition: all 1s;
  }
`;
const ButtomContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;
const ShareButton = styled.button`
  padding: 0.7rem 3rem;
  border-radius: 20px;
  border: none;
  font-size: 1.3rem;
  color: white;
  background-color: transparent;
  border: 3px solid #387adf;
  cursor: pointer;
`;
const TransitionsButton = styled.button`
  padding: 0.7rem 3rem;
  border-radius: 20px;
  border: none;
  font-size: 1.3rem;
  color: white;
  background-color: #387adf;
  cursor: pointer;
`;

const HomeDefaultMenu = (props: Props) => {
  const { handleTransactionClick } = props;
  const [greetMsg, setGreetMsg] = useState<string>();
  useEffect(() => {
    getGreetMsg();
  }, []);

  const getGreetMsg = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreetMsg("Good Morning");
    } else if (currentHour < 16) {
      setGreetMsg("Good Afternoon");
    } else {
      setGreetMsg("Good Evening");
    }
  };

  return (
    <Container
      initial={{ opacity: 0, x: -1000 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.5 }}
    >
      <GreetMsg>{greetMsg && `${greetMsg} Shubham`}</GreetMsg>
      <WelcomeMsg>
        <span>
          Welcome to <span>Len Den, </span>
        </span>
        where friendship meets finances. Easily split bills, expenses, and more
        with your friends. Let's make managing money with your mates a breeze!
      </WelcomeMsg>
      <ButtomContainer>
        <TransitionsButton
          onClick={() => handleTransactionClick("transaction")}
        >
          Transaction
        </TransitionsButton>
        <RWebShare
          data={{
            text: "Len Den App made using Next JS.",
            url: "http://localhost:3000",
            title: "Len Den App",
          }}
        >
          <ShareButton>Share</ShareButton>
        </RWebShare>
      </ButtomContainer>
    </Container>
  );
};

export default HomeDefaultMenu;
