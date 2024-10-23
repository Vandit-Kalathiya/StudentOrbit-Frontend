import { Form, Input, Button, Checkbox } from "antd";

function LoginForm({
  isStudent,
  handleLogin,
  setUsername,
  setPassword,
}) {
  const studentIdPattern = /^(\d{2})[Cc][Ee](00[1-9]|0[1-9]\d|1\d\d|200)$/;
  const facultyIdPattern = /^[0-9]{3,4}$/;

  return (
    <Form layout="vertical" autoComplete="off" onFinish={handleLogin}>
      <Form.Item
        label={isStudent ? "Student ID" : "Faculty ID"}
        name="username"
        rules={[
          {
            required: true,
            message: isStudent
              ? "Please enter your student ID"
              : "Please enter your faculty ID",
          },
          {
            pattern: isStudent ? studentIdPattern : facultyIdPattern,
            message: isStudent
              ? "Student ID must be in the format YYCEXXX"
              : "Faculty ID must be 3 or 4 digits",
          },
        ]}
      >
        <Input
          size="large"
          placeholder={isStudent ? "Enter your student ID" : "Enter your faculty ID"}
          onChange={(e) => setUsername(e.target.value)}
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
        ]}
      >
        <Input.Password
          size="large"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
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
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
