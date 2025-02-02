import { Table, Radio, Typography, Button, Input } from "antd";
import { useEffect, useState } from "react";

const { Text } = Typography;

const RubricGradingModal = ({ isModalVisible, handleOk, handleGeneralCommentChange, generalComment }) => {
  const [grades, setGrades] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const criteria = [
    { key: "codeQuality", label: "Code Quality" },
    { key: "teamwork", label: "Teamwork & Collaboration" },
    { key: "timeliness", label: "Task Completion on Time" },
    { key: "innovation", label: "Creativity & Innovation" },
    { key: "problemSolving", label: "Problem-Solving Ability" },
    { key: "research", label: "Research & Understanding" },
    { key: "effort", label: "Effort & Engagement" },
  ];

  const levels = [
    { label: "Poor (1)", value: 1 },
    { label: "Average (2)", value: 2 },
    { label: "Good (3)", value: 3 },
    { label: "Excellent (4)", value: 4 },
  ];

  // Handle grade change
  const handleGradeChange = (criterion, value) => {
    setGrades({ ...grades, [criterion]: value });
  };

  // Calculate total score
  const calculateTotalScore = () => {
    return Object.values(grades).reduce((acc, score) => acc + (score || 0), 0);
  };

  // Validate if all criteria are graded
  const isAllCriteriaGraded = () => {
    return criteria.every((criterion) => grades[criterion.key] !== undefined);
  };

  // Handle modal submission
  const handleSubmit = () => {
    if (!isAllCriteriaGraded()) {
      setIsSubmitted(true);
      return;
    }
    handleOk(grades);
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalVisible) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isModalVisible]);

  return (
    <div className="font-poppins">
      <Table
        dataSource={criteria}
        pagination={false}
        rowKey="key"
        bordered
        scroll={{ x: true }}
        className="font-poppins"
      >
        <Table.Column
          title="Criteria"
          dataIndex="label"
          key="label"
          width="25%"
          render={(text) => <Text strong className="font-poppins">{text}</Text>}
        />
        <Table.Column
          title="Grade"
          key="grade"
          width="50%"
          render={(text, record) => (
            <Radio.Group
              onChange={(e) => handleGradeChange(record.key, e.target.value)}
              value={grades[record.key]}
              buttonStyle="solid"
              className="font-poppins"
            >
              {levels.map((level) => (
                <Radio.Button key={level.value} value={level.value} className="font-poppins">
                  {level.label}
                </Radio.Button>
              ))}
            </Radio.Group>
          )}
        />
      </Table>

      {/* Validation message */}
      {isSubmitted && !isAllCriteriaGraded() && (
        <Text type="danger" className="block mt-4 font-poppins">
          Please grade all criteria before submitting.
        </Text>
      )}

      <div className="mt-2 font-poppins">
        <Text strong>Remark:</Text>
        <Input.TextArea
          value={generalComment}
          onChange={handleGeneralCommentChange}
          placeholder="Add your remark here..."
          rows={2}
          className="font-poppins"
        />
      </div>

      {/* Total score */}
      <div className="text-right mt-2 font-poppins">
        <Text strong className="text-lg">
          Total Score: {calculateTotalScore()} / {criteria.length * 4}
        </Text>
      </div>

      {/* Submit button */}
      <div className="flex justify-end mt-2 font-poppins">
        <Button
          className="bg-green-500 text-white font-poppins"
          onClick={handleSubmit}
          disabled={!isAllCriteriaGraded()}
        >
          Complete
        </Button>
      </div>
    </div>
  );
};

export default RubricGradingModal;