import { Form, Input } from "antd";

function IDInput({ isStudent, handleInputChange, studentIdPattern, facultyIdPattern }) {
  return (
    <Form.Item
      label={isStudent ? "Student ID" : "Faculty ID"}
      name="username"
      rules={[
        {
          required: true,
          message: `Please enter your ${isStudent ? "student" : "faculty"} ID`,
        },
        {
          pattern: isStudent ? studentIdPattern : facultyIdPattern,
          message: `ID must be in the format ${
            isStudent ? "YYCEXXX" : "3 or 4 digits"
          }`,
        },
      ]}
    >
      <Input
        size="large"
        placeholder={`Enter your ${isStudent ? "student" : "faculty"} ID`}
        onChange={(e) => handleInputChange("username", e.target.value)}
      />
    </Form.Item>
  );
}

export default IDInput;
