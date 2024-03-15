"use client";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Header from "../../components/Header";
import { apiContract } from "@/common/apiContract";
import axios from "axios";
import { motion } from "framer-motion";
import TransitionsMenu from "@/components/TransitionMenu";
import FriendsMenu from "@/components/FriendsMenu";
import HomeDefaultMenu from "@/components/HomeDefaultMenu";
import colors from "@/common/colors";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${colors.tuna};
`;
const Tool = styled(motion.div)`
  width: 80vw;
  margin: 0 auto;
  background-color: ${colors.ebonyClay};
  color: white;
  margin-top: 1rem;
  border-radius: 10px;
  padding: 5rem 7rem;
`;

const Dashboard = () => {
  const [user, setUser] = useState();
  const [currentKey, setCurrentKey] = useState<string>("friends");
  useEffect(() => {
    const data = localStorage.getItem("users");
    if (data) {
      const dataObj = JSON.parse(data);
      fetUserDetails(dataObj.creatorId);
    }
  }, []);
  const fetUserDetails = async (id: string) => {
    await axios
      .get(`http://localhost:8080${apiContract.fetUserDetails}/${id}`)
      .then((res) => {
        console.log("shubham", res.data.data);
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleMenuItemChange = (e: any) => {
    setCurrentKey(e.key);
  };
  const handleTransactionClick = (key: string) => {
    setCurrentKey(key);
  };
  const getTool = () => {
    switch (currentKey) {
      case "home":
        return (
          <HomeDefaultMenu handleTransactionClick={handleTransactionClick} />
        );
      case "transaction":
        return <TransitionsMenu />;
      case "friends":
        return <FriendsMenu />;
      default:
        return null;
    }
  };
  return (
    <Container>
      <Header
        currentKey={currentKey}
        handleMenuItemChange={handleMenuItemChange}
      />
      <Tool
        initial={{ opacity: 0, x: -1000 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        {getTool()}
      </Tool>
    </Container>
  );
};

export default Dashboard;
