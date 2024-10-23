import { Form, Input } from "antd";

function EmailInput({ isStudent, handleInputChange, studentEmailPattern, facultyEmailPattern }) {
  return (
    <Form.Item
      label="Email"
      name="email"
      rules={[
        { required: true, message: "Please enter your email" },
        {
          pattern: isStudent ? studentEmailPattern : facultyEmailPattern,
          message: `Email must be in the format ${
            isStudent ? "YYCEXXX@charusat.edu.in" : "email.ce@charusat.ac.in"
          }`,
        },
      ]}
    >
      <Input
        size="large"
        placeholder={`Enter your ${isStudent ? "student" : "faculty"} email`}
        onChange={(e) => handleInputChange("email", e.target.value)}
      />
    </Form.Item>
  );
}

export default EmailInput;
