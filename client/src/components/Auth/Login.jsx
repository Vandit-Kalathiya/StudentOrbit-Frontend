import { Link, useNavigate } from "react-router-dom";
import AuthImg from "../../Styles/AuthImg";
import loginImg from "../../assets/Fingerprint.mp4";
import { Card, Typography } from "antd";
import { useState } from "react";
import axios from "axios";
import ToggleRole from "./ToggleRole";
import LoginForm from "./LoginForm";
import { openNotification } from "../../Utils/Notification";
import Cookies from 'js-cookie';  
import toast from "react-hot-toast";

function Login({ setLoginStatus }) {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [isStudent, setIsStudent] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { username, password } = loginData;

    try {
      const response = await axios.post(`http://localhost:1818/auth/login`, { username, password }, {
        withCredentials: true,
      });
      const { jwtToken, role } = response.data;

      // localStorage.setItem(role === "student" ? "s_jwt" : "f_jwt", jwtToken);
      // localStorage.setItem("username", username);
      // localStorage.setItem("role", role);

      setLoginStatus(true);

      openNotification('success', 'Login Successful', 'You have successfully logged in.!');
      const redirectPath = role === "student" ? "/s/dashboard" : "/f/dashboard";
      navigate(redirectPath);
      // toast.success('You have successfully logged in..!')
    } catch (error) {
      console.error('Login error:', error);
      // toast.error(error.response.data)
      openNotification('error', 'Login Failed', error.response.data);
    }
  };

  const handleFieldChange = (field, value) => {
    setLoginData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <section>
      <div className="section-login">
        <div className="w-full min-h-screen container flex flex-col-reverse md:flex-row items-center md:justify-between md:p-24 md:pt-32 md:pb-12 py-20 px-8 pt-32 justify-center">
          <AuthImg img={loginImg} />

          <div className="md:w-2/3 w-full" data-aos="fade-up" data-aos-delay="200">
            <Card className="form-container">
              <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <Typography.Title level={2} strong className="title text-center">
                  Welcome Back!
                </Typography.Title>
                <Typography.Text type="secondary" strong className="slogan text-center mb-4">
                  Start managing your project.
                </Typography.Text>

                <ToggleRole isStudent={isStudent} setIsStudent={setIsStudent} />

                <LoginForm
                  isStudent={isStudent}
                  handleLogin={handleLogin}
                  setUsername={(value) => handleFieldChange("username", value)}
                  setPassword={(value) => handleFieldChange("password", value)}
                />

                <Typography.Text className="text-center">
                  Don't have an account?
                  <Link to="/signUp" className="text-[#5B6DF3]">
                    &nbsp;Signup
                  </Link>
                </Typography.Text>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
