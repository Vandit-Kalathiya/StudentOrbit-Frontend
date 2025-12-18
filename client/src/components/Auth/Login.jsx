import { Link, useNavigate } from "react-router-dom";
import AuthImg from "../../Styles/AuthImg";
import loginImg from "../../assets/Fingerprint.mp4";
import { Card, Typography } from "antd";
import { useState } from "react";
import ToggleRole from "./ToggleRole";
import LoginForm from "./LoginForm";
import { openNotification } from "../../Utils/Notification";
import { API_ENDPOINTS } from "../../config/api.config";
import { USER_ROLES, ROUTES } from "../../config/app.config";
import apiService from "../../services/api.service";

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
      const response = await apiService.post(API_ENDPOINTS.AUTH.LOGIN, { username, password });
      const { role } = response.data;

      setLoginStatus(true);

      openNotification('success', 'Login Successful', 'You have successfully logged in!');
      const redirectPath = role === USER_ROLES.STUDENT ? ROUTES.STUDENT_DASHBOARD : ROUTES.FACULTY_DASHBOARD;
      navigate(redirectPath);
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data || 'An error occurred during login';
      openNotification('error', 'Login Failed', errorMessage);
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
