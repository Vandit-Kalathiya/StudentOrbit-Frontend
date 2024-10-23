import { Progress, Typography } from "antd";

function PasswordStrength({ passwordStrength, passwordStrengthText }) {
  return (
    passwordStrength > 0 && (
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
    )
  );
}

export default PasswordStrength;
