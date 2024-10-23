import { Link } from "react-router-dom";
import { Button, Form } from "antd";

function SubmitButton({ handleOtpSend, formData, isStudent }) {
  return (
    <Form.Item>
      <Link
        to="/otp/verify"
        onClick={handleOtpSend}
        state={{
          username: formData.username,
          password: formData.password,
          email: formData.email,
          isStudent: isStudent,
        }}
      >
        <Button size="large" className="btn w-full bg-[#5B6DF3] text-white">
          Create an account
        </Button>
      </Link>
    </Form.Item>
  );
}

export default SubmitButton;
