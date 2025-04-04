import { Link, useNavigate } from "react-router-dom";
import AuthImg from "../../Styles/AuthImg";
import loginImg from "../../assets/Fingerprint (1).mp4";
import { Card, Typography, Form, Input } from "antd";
import { useState } from "react";
import axios from "axios";
import SubmitButton from "./SubmitButton";
import ToggleRole from "./ToggleRole";
import EmailInput from "./EmailInput";
import IDInput from "./IDInput";
import PasswordStrength from "./PasswordStrength";
import { openNotification } from "../../Utils/Notification";
import toast from "react-hot-toast";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordStrengthText, setPasswordStrengthText] = useState("");
  const [isStudent, setIsStudent] = useState(true);

  const navigate = useNavigate();

  const studentIdPattern = /^(\d{2})[Cc][Ee](00[1-9]|0[1-9]\d|1\d\d|200)$/;
  const facultyIdPattern = /^[0-9]{3,4}$/;

  const studentEmailPattern =
    /^(\d{2})[Cc][Ee](00[1-9]|0[1-9]\d|1\d\d|200)@charusat\.edu\.in$/;
  const facultyEmailPattern =
    /^(\d{2})[Cc][Ee](00[1-9]|0[1-9]\d|1\d\d|200)@charusat\.edu\.in$/;

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

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

  const handleOtpSend = () => {
    const otpData = { email: formData.email, username: formData.username };

    axios
      .post("http://localhost:1818/otp/send", otpData)
      .then((response) => {
        console.log("OTP sent:", response.data);
        openNotification(
          "success",
          "OTP Sent",
          "An OTP has been sent to your email address."
        );
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          console.log(error);
          navigate("/signup");
          toast.error(error.response.data)
        }
      });
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
                  Sign Up
                </Typography.Title>
                <Typography.Text type="secondary" strong className="slogan text-center mb-4">
                  Start managing your project.
                </Typography.Text>

                <ToggleRole isStudent={isStudent} setIsStudent={setIsStudent} />

                {errorMessage && (
                  <Typography.Text type="danger" className="text-center mb-4">
                    {errorMessage}
                  </Typography.Text>
                )}

                <Form layout="vertical" autoComplete="off">
                  <Form.Item
                    label={isStudent ? "Student Name" : "Faculty Name"}
                    name="name"
                    rules={[{ required: true, message: "Please enter your name" }]}
                    style={{ marginBottom: 8 }} // Reduced margin
                  >
                    <Input
                      size="large"
                      placeholder={`Enter your ${isStudent ? "student" : "faculty"} name`}
                      name="name"
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </Form.Item>
                  <IDInput
                    isStudent={isStudent}
                    handleInputChange={handleInputChange}
                    studentIdPattern={studentIdPattern}
                    facultyIdPattern={facultyIdPattern}
                  />

                  <EmailInput
                    isStudent={isStudent}
                    handleInputChange={handleInputChange}
                    studentEmailPattern={studentEmailPattern}
                    facultyEmailPattern={facultyEmailPattern}
                  />

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
                        message: "Password must have uppercase, lowercase, number, and symbol",
                      },
                    ]}
                    style={{ marginBottom: 8 }}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Enter your password"
                      name="password"
                      onChange={(e) => {
                        evaluatePasswordStrength(e.target.value);
                        handleInputChange("password", e.target.value);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleOtpSend();
                        }
                      }}
                      style={{ marginBottom: 15 }}
                    />
                  </Form.Item>

                  <PasswordStrength passwordStrength={passwordStrength} passwordStrengthText={passwordStrengthText} />

                  <SubmitButton
                    handleOtpSend={handleOtpSend}
                    formData={formData}
                    isStudent={isStudent}
                  />

                  <Form.Item className="text-center" style={{ marginTop: 16 }}>
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
