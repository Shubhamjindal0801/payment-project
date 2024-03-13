import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "@emotion/styled";
import axios from "axios";
import { Button, Form, Input, message } from "antd";
import { AssetUrls } from "../../common/AssetUrls";
import { SignupProps } from "../../common/Interface/Signup";
import { apiContract } from "../../common/apiContract";
import env from "react-dotenv";
import { loginProps } from "../../common/Interface/login";

interface HelperProps {
  isCursor?: boolean;
}
const Con = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${AssetUrls.CONTAINER_BACKGROUND_IMAGE});
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: -1;
`;
const Container = styled.div`
  position: absolute;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 0 0 20px 0 #000;
  z-index: 1;
`;
const SignUpBox = styled.div`
  width: 100%;
  width: 450px;
  height: auto;
  box-shadow: var(--shadow);
  border-radius: 1rem;
  padding: 1rem 2rem;
`;
const Heading = styled.h2`
  font-weight: 500;
  font-size: 1.2rem;
  text-align: center;
`;
const OrStatement = styled.p<HelperProps>`
  text-align: center;
  font-size: 0.8rem;
  margin: 10px 0;
  cursor: ${(props) => (props.isCursor ? "pointer" : "default")};
`;
const HitButton = styled(Button)`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;
const Signup = () => {
  const [formRef] = Form.useForm();
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleUserSignUp = async (values: SignupProps) => {
    console.log("values", values);
    if (values.password !== values.conPass) {
      message.error("Password doesn't match");
      return;
    }
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    };
    axios
      .post(`http://localhost:8080${apiContract.signup}`, payload)
      .then((res) => {
        setEmail(values.email);
        formRef.resetFields();
        setLogin(true);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUserlogin = (values: loginProps) => {
    console.log("values", values);
    axios
      .post(`http://localhost:8080${apiContract.login}`, {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        console.log(res);
        // navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Con>
      <Container>
        {login ? (
          <>
            <SignUpBox>
              <Heading>Login</Heading>
              <Form
                style={{
                  position: "relative",
                }}
                layout="vertical"
                onFinish={handleUserlogin}
                form={formRef}
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input
                    defaultValue={email}
                    type="email"
                    placeholder="johndoe@gmail.com"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input type="password" placeholder="Example123" />
                </Form.Item>
                <HitButton htmlType="submit" type="primary">
                  Log in With Email and Password
                </HitButton>
                <OrStatement isCursor={true} onClick={() => setLogin(!login)}>
                  Or Don't Have An Account? Click Here
                </OrStatement>
              </Form>
            </SignUpBox>
          </>
        ) : (
          <SignUpBox>
            <Heading>Sign Up</Heading>
            <Form layout="vertical" form={formRef} onFinish={handleUserSignUp}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your first name!",
                  },
                ]}
              >
                <Input placeholder="John" />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your last name!",
                  },
                ]}
              >
                <Input placeholder="Doe" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input type="email" placeholder="johndoe@gmail.com" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input type="password" placeholder="Example123" />
              </Form.Item>
              <Form.Item
                name="conPass"
                label="Confirm Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password again!",
                  },
                ]}
              >
                <Input type="password" placeholder="Example123" />
              </Form.Item>
              <HitButton htmlType="submit" type="primary">
                Sign Up With Email and Password
              </HitButton>
              <OrStatement isCursor={true} onClick={() => setLogin(!login)}>
                Or Have An Account Already? Click Here
              </OrStatement>
            </Form>
          </SignUpBox>
        )}
      </Container>
    </Con>
  );
};

export default Signup;