"use client";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Header from "../../components/Header";
import { apiContract } from "@/common/apiContract";
import axios from "axios";
import { Menu, MenuProps } from "antd";
import { HomeOutlined } from "@ant-design/icons";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(
      135deg,
      rgba(107, 107, 107, 0.06) 0%,
      rgba(107, 107, 107, 0.06) 50%,
      rgba(202, 202, 202, 0.06) 50%,
      rgba(202, 202, 202, 0.06) 100%
    ),
    linear-gradient(90deg, rgb(20, 20, 20), rgb(20, 20, 20));
  background-size: 30px 30px;
`;

const Dashboard = () => {
  const [creatorId, setCreatorId] = useState<string>("");
  const [user, setUser] = useState();
  useEffect(() => {
    const data = localStorage.getItem("users");
    if (data) {
      const dataObj = JSON.parse(data);
      setCreatorId(dataObj.creatorId);
      fetUserDetails(dataObj.creatorId);
    }
  }, []);
  const fetUserDetails = async (id: string) => {
    axios
      .get(`http://localhost:8080${apiContract.fetUserDetails}/${id}`)
      .then((res) => {
        console.log("shubham", res.data.data);
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const items: MenuProps["items"] = [
    {
      label: "Home",
      key: "mail",
      icon: <HomeOutlined />,
    },
  ];
  return (
    <Container>
      <Header user={user} />
      <Menu style={{width:'300px'}} mode="horizontal" items={items} />
    </Container>
  );
};

export default Dashboard;
