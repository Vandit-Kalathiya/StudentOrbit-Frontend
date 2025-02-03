import { Drawer, Table, Typography } from "antd";

const { Text } = Typography;

const RubricScoreDrawer = ({ isRubricsVisible, setIsRubricsVisible }) => {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Example rubric criteria with acquired scores (This should come from task data)
  const rubricData = [
    { key: "codeQuality", label: "Code Quality", score: 4 },
    { key: "teamwork", label: "Teamwork & Collaboration", score: 3 },
    { key: "timeliness", label: "Task Completion on Time", score: 4 },
    { key: "innovation", label: "Creativity & Innovation", score: 2 },
    { key: "problemSolving", label: "Problem-Solving Ability", score: 3 },
    { key: "research", label: "Research & Understanding", score: 3 },
    { key: "effort", label: "Effort & Engagement", score: 2 },
  ];

  return (
    <>
      {/* Drawer for Detailed Rubric Marks */}
      <Drawer
        title="Rubric Breakdown"
        placement="right"
        closable={true}
        onClose={() => setIsRubricsVisible(false)}
        open={isRubricsVisible}
        width={400}
        className="font-poppins"
      >
        <Table
          dataSource={rubricData}
          pagination={false}
          rowKey="key"
          bordered
        >
          <Table.Column
            title="Criteria"
            dataIndex="label"
            key="label"
            render={(text) => <Text strong className="font-poppins">{text}</Text>}
          />
          <Table.Column
            title="Score"
            dataIndex="score"
            key="score"
            align="center"
            render={(score) => (
              <span className="text-green-600 font-semibold font-poppins">{score} / 4</span>
            )}
          />
        </Table>

        {/* Total Score at Bottom */}
        <div className="text-right mt-4 font-poppins">
          <Text strong className="text-lg text-green-700 font-poppins">
            {/* Total Score: {task.totalScore} / {task.maxScore} */}
            Total Score: 21/28
          </Text>
        </div>
      </Drawer>
    </>
  );
};

export default RubricScoreDrawer;
