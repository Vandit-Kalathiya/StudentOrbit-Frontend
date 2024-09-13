import { json, Link, useNavigate } from "react-router-dom";
import AuthImg from "../Styles/AuthImg";
import loginImg from "../assets/Fingerprint (1).mp4";
import { Card, Typography, Form, Input, Button, Checkbox, Progress } from "antd";
import { useState } from "react";
import axios from "axios";

function Signup() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  let navigate = useNavigate()

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordStrengthText, setPasswordStrengthText] = useState("");


  const handleStudentIdChange = (e) => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  // Handle form submission here
  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(username," ",password, " ", email)

    const signUpData = {
      username: username,
      password: password,
      email: email,
    }
    axios.post('http://localhost:1818/auth/student/register', signUpData)
    .then((response) => {
      console.log('Signned up successfully:', response.data);
      const loginData = {
        username: username,
        password: password
      }
      
      // console.log(username," ",password)
      axios.post('http://localhost:1818/auth/login', loginData)
      .then((response) => {
        // console.log('logged in successfully:', response.data.jwtToken);
        // toast.success("Form submitted successfully...")
        localStorage.setItem(
          'jwt', response.data.jwtToken 
        )
        navigate("/s/dashboard")
      })
      .catch((error) => {
        console.error('There was an error submitting the report:', error);
      });
    })
    .catch((error) => {
      console.error('There was an error submitting the report:', error);
    });


    
  }

  const evaluatePasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 6) strength += 1; // Minimum length
    if (/[a-z]/.test(password)) strength += 1; // Lowercase
    if (/[A-Z]/.test(password)) strength += 1; // Uppercase
    if (/\d/.test(password)) strength += 1; // Number
    if (/[@$!%*?&]/.test(password)) strength += 1; // Special character

    if (strength === 1 || strength === 2) {
      setPasswordStrengthText("Weak");
      setPasswordStrength(20);
    } else if (strength === 3 || strength === 4) {
      setPasswordStrengthText("Medium");
      setPasswordStrength(60);
    } else if (strength === 5) {
      setPasswordStrengthText("Strong");
      setPasswordStrength(100);
    } else {
      setPasswordStrengthText("");
      setPasswordStrength(0);
    }
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
                    <Input size="large" placeholder="Enter your student ID" onChange={(e) => handleStudentIdChange(e)} />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your email",
                      },
                      {
                        pattern:
                          /^(\d{2})[Cc][Ee](00[1-9]|0[1-9]\d|1\d\d|200)@charusat\.edu\.in$/,
                        message:
                          "Email must be in the format YYCEXXX@charusat.edu.in",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter your student email"
                      onChange={(e) => handleEmailChange(e)}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your password",
                      },
                      {
                        pattern:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                        message:
                          "Password must have uppercase, lowercase, number, and symbol",
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Enter your password"
                      onChange={(e) => {
                        evaluatePasswordStrength(e.target.value),
                        handlePasswordChange(e)
                      }}
                    />
                  </Form.Item>
                  {passwordStrength > 0 && (
                    <div style={{ marginBottom: "16px" }}>
                      <Typography.Text strong>{passwordStrengthText}</Typography.Text>
                      <Progress
                        percent={passwordStrength}
                        showInfo={false}
                        status={
                          passwordStrength === 100
                            ? "success"
                            : passwordStrength > 20
                            ? "active"
                            : "exception"
                        }
                      />
                    </div>
                  )}
                  <Form.Item>
                    <Checkbox name="rememberMe">Remember me</Checkbox>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      htmlType="submit"
                      size="large"
                      className="btn w-full bg-[#5B6DF3] text-white"
                      onClick={handleSignup}
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
