import React from "react";
import { Link } from "react-router-dom";
import AuthImg from "../Styles/AuthImg";
import loginImg from "../assets/Fingerprint (1).mp4";
import { Card, Typography, Form, Input, Button, Checkbox } from "antd";

function Signup() {
  // Handle form submission here
  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  return (
    <section>
      <div className="section-login">
        <div className="w-full min-h-screen container flex flex-col-reverse md:flex-row items-center md:justify-between md:p-24 md:pt-32 md:pb-12 py-20 px-8 pt-32 justify-center">
          <AuthImg img={loginImg} />

          <div
            className="md:w-2/3 w-full"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <Card className="form-container">
              <div
                style={{ display: "flex", flexDirection: "column", flex: 1 }}
              >
                <Typography.Title
                  level={2}
                  strong
                  className="title text-center"
                >
                  Sign Up
                </Typography.Title>
                <Typography.Text
                  type="secondary"
                  strong
                  className="slogan text-center mb-4"
                >
                  Start managing your project.
                </Typography.Text>
                <Form layout="vertical" autoComplete="off" onFinish={onFinish}>
                  <Form.Item
                    label="Student ID"
                    name="studentid"
                    rules={[
                      { type: "text", message: "The input is not valid" },
                    ]}
                  >
                    <Input size="large" placeholder="Enter your student id" />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { type: "email", message: "The input is not valid" },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter your student email"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                  >
                    <Input.Password
                      size="large"
                      placeholder="Enter your password"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Checkbox name="rememberMe">Remember me</Checkbox>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      htmlType="submit"
                      size="large"
                      className="btn w-full bg-[#5B6DF3] text-white"
                    >
                      Create an account
                    </Button>
                  </Form.Item>
                  <Form.Item className="text-center">
                    Already a user?
                    <Link to="/login" className="text-center text-[#5B6DF2]">
                       &nbsp;Login
                    </Link>
                  </Form.Item>
                </Form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
