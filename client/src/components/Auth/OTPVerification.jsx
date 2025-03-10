import { useState, useEffect, useRef } from "react";
import { Input, Button } from "antd";
import { GiAlarmClock } from "react-icons/gi";
import verification from "../../assets/verification.jpg";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const OTPVerification = ({ setLoginStatus }) => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [timer, setTimer] = useState(300);
  const [resendVisible, setResendVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, otp.length);
  }, [otp.length]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setResendVisible(true);
    }
  }, [timer]);

  const resendOtp = () => {
    setOtp(["", "", "", "", ""]);
    setTimer(300);
    setResendVisible(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const { username, email, password, isStudent, name } = location.state || {};
  const isOtpComplete = otp.every((digit) => digit !== "");

  const handleSignup = async (e) => {
    console.log(username, " ", password, " ", email, " ", otp.join(""), " ", name);
    const signUpData = {
      username,
      password,
      email,
      ...(isStudent ? { studentName: name } : { facultyName: name })
    };


    try {
      // Verify OTP
      const otpVerifyResponse = await axios.post("http://localhost:1818/otp/verify", {
        otp: otp.join(""),
        email,
      });
      console.log(otpVerifyResponse.data);

      // Register user
      const registerEndpoint = `http://localhost:1818/auth/${isStudent ? "student/register" : "faculty/register"}`;
      const registerResponse = await axios.post(registerEndpoint, signUpData);
      console.log("Signed up successfully:", registerResponse.data);

      // Login user
      const loginResponse = await axios.post("http://localhost:1818/auth/login", {
        username,
        password,
      }, { withCredentials: true });
      console.log("Login response:", loginResponse.data);

      // Update login status and navigate
      setLoginStatus(true);
      toast.success("Signed up successfully...");
      navigate(isStudent ? "/s/dashboard" : "/f/dashboard");
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 500 || status === 400) {
          toast.error(data);
        } else {
          console.error("Unexpected response error:", data);
          setErrorMessage("An error occurred during signup. Please try again.");
        }
      } else {
        console.error("Error signing up:", error);
        setErrorMessage("A network or unexpected error occurred. Please try again.");
      }
    }

  };

  return (
    <div className="w-full flex md:flex-row flex-col h-screen">
      <div className="left w-full md:w-[70%] bg-[#FCFCFC] flex items-center justify-center pt-6 mt-12 md:pt-0">
        <img
          src={verification}
          alt="OTP Verification"
          className="w-[65.8%] h-auto md:w-[50%] md:h-[50%] object-cover"
        />
      </div>
      <div className="right w-full md:w-[30%] bg-[#4457e9] pt-10 mt-10 flex items-center pb-9">
        <div className="bg-white p-6 rounded-2xl border-[1px] border-black text-center w-full max-w-md mx-auto md:p-8 md:w-auto md:max-w-none md:absolute md:top-1/2 md:left-1/2 md:transform md:translate-x-1/3 md:-translate-y-1/2">
          <h2 className="text-3xl mb-4">Email Verification</h2>
          <p className="mb-4">OTP sent to your registered email ID</p>
          <div className="flex justify-center mb-6">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                className="mx-2 text-center otp-input w-[2.5rem] h-[2.5rem] text-lg md:w-[3rem] md:h-[3rem] md:text-xl"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength={1}
                required
              />
            ))}
          </div>
          {timer > 0 ? (
            <div className="flex items-center justify-center">
              <GiAlarmClock style={{ fontSize: "1.2rem", marginRight: "0.5rem" }} />
              <p>{formatTime(timer)}</p>
            </div>
          ) : (
            <p className="text-red-600">OTP expired, please resend.</p>
          )}
          <Button
            className="w-full bg-[#4457e9] hover:bg-[#4457e9] text-white text-center py-4 my-3 flex justify-center"
            onClick={handleSignup}
            disabled={!isOtpComplete || timer === 0}
          >
            Verify OTP
          </Button>
          <p>Don't receive the code?</p>
          <Button onClick={resendOtp} type="link" className="underline">
            Resend OTP
          </Button>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;