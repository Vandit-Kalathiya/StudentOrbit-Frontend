// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthImg from "../Styles/AuthImg";
import loginImg from "../assets/Fingerprint.mp4";
import { Card, Typography, Form, Input, Button } from "antd";

function Signup() {
  return (
    <section>
      <div className="section-login">
        <div className="w-full min-h-screen container flex flex-col-reverse md:flex-row items-center md:justify-between md:p-24 md:pt-32 md:pb-12 py-20 px-8 pt-32 justify-center">
          <AuthImg img={loginImg} />

          {/* <div className="login-form w-full  ml-[50px]">
          <h1 className="text-4xl font-semibold mb-4">Welcome back!</h1>
          <p className="mb-8">Start your project work here</p>
          <form action="" className="space-y-4 w-3/4">
            <div className="flex flex-col">
              <label
                htmlFor="userId"
                className=" font-medium text-gray-700 mb-3 text-left"
              >
                UserId
              </label>
              <input
                type="text"
                name="userId"
                placeholder="Enter User ID"
                className="h-8 border-gray-300 shadow-md focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2 rounded-sm"
                required
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className=" font-medium text-gray-700 mb-3 text-left"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="h-8 border-gray-300 shadow-md focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2 rounded-sm"
                required
                autoComplete="off"
              />
            </div>
            <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#5B6DF3] hover:bg-[#4859da]">Login</button>
          </form>
        </div> */}

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
                <Form layout="vertical" autoComplete="off">
                  <Form.Item
                    label="Student ID"
                    name="studentid"
                    rules={[
                      {
                        required: true,
                        message: "Please write your student id",
                      },
                      { type: "text", message: "The input is not valid" },
                    ]}
                  >
                    <Input size="large" placeholder="Enter your student id" />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please write your student email",
                      },
                      { type: "text", message: "The input is not valid" },
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
                    rules={[
                      { required: true, message: "Please write your password" },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Enter your password"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      // type={`${loading ? "" : "primary"}`}
                      //   type="primary"
                      htmlType="submit"
                      size="large"
                      className="btn w-full bg-[#5B6DF3] text-white"
                    >
                      {/* {loading ? <Spin /> : "Log In"} */}
                      Create an account
                    </Button>
                  </Form.Item>
                  <Form.Item className="text-center">
                  Already a user?
                    <Link to="/login" className="text-center">
                      {/* <Button size="large" className="btn w-full">
                        Login
                      </Button> */}
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
