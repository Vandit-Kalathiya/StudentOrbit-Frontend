import { Link, useNavigate } from "react-router-dom";
import AuthImg from "../Styles/AuthImg";
import loginImg from "../assets/Fingerprint.mp4";
import { Card, Typography, Form, Input, Button, Checkbox } from "antd";
import { useState } from "react";
import axios from "axios";

function Login() {
  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate()
  

  const handleStudentIdChange = (e) => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(username," ",password)
    const loginData = {
      username: username,
      password: password
    }
    

    axios.post('http://localhost:1818/auth/login', loginData)
    .then((response) => {
      // console.log('Report submitted successfully:', response.data.jwtToken);
      // toast.success("Form submitted successfully...")
      localStorage.setItem(
        'jwt', response.data.jwtToken 
      )
      navigate("/s/dashboard")
    })
    .catch((error) => {
      console.error('There was an error submitting the report:', error);
    });
  }

  return (
    <section>
      <div className="section-login">
        <div className="w-full min-h-screen container flex flex-col-reverse md:flex-row items-center md:justify-between md:p-24 md:pt-32 md:pb-12 py-20 px-8 pt-32 justify-center ">
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
                  Welcome Back!
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
                      {
                        required: true,
                        message: "Please enter your student ID",
                      },
                      {
                        pattern:
                          /^(\d{2})[Cc][Ee](00[1-9]|0[1-9]\d|1\d\d|200)$/,
                        message: "Student ID must be in the format YYCEXXX",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Enter your student id" onChange={(e) => handleStudentIdChange(e)} />
                  </Form.Item>
                  <Form.Item label="Password" name="password" rules={[
                      {
                        required: true,  
                        message: "Please enter your password",                
                      },
                    ]}>
                    <Input.Password
                      size="large"
                      placeholder="Enter your password"
                      onChange={(e) => handlePasswordChange(e)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Checkbox name="rememberMe">Remember me</Checkbox>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      htmlType="submit"
                      onClick={handleLogin}
                      size="large"
                      className="btn w-full bg-[#5B6DF3] text-white"
                    >
                      Login
                    </Button>
                  </Form.Item>
                  <Form.Item className="text-center">
                    Don't have an account?
                    <Link to="/signUp" className="text-[#5B6DF3]">
                      &nbsp;Signup
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

export default Login;
