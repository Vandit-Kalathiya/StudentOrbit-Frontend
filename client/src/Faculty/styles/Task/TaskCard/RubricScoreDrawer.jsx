import { Drawer, Table, Typography } from "antd";

const { Text } = Typography;

const RubricScoreDrawer = ({ isRubricsVisible, setIsRubricsVisible, task }) => {
  // Calculate total score dynamically
  const totalScore = task.rubrics 
    ? task.rubrics.reduce((sum, rubric) => sum + rubric.rubricScore, 0)
    : 0;
  
  // Maximum possible score (assuming each rubric is out of 4)
  const maxScore = task.rubrics 
    ? task.rubrics.length * 4 
    : 0;

  return (
    <Drawer
      title="Rubric Breakdown"
      placement="right"
      closable={true}
      onClose={() => setIsRubricsVisible(false)}
      open={isRubricsVisible}
      width={400}
      className="font-poppins"
    >
      {task.rubrics && task.rubrics.length > 0 ? (
        <>
          <Table
            dataSource={task.rubrics}
            pagination={false}
            rowKey="id"  // Use the actual id from the rubric
            bordered
          >
            <Table.Column
              title="Criteria"
              dataIndex="rubricName"
              key="rubricName"
              render={(text) => <Text strong className="font-poppins">{text}</Text>}
            />
            <Table.Column
              title="Score"
              dataIndex="rubricScore"
              key="rubricScore"
              align="center"
              render={(score) => (
                <span className="text-green-600 font-semibold font-poppins">
                  {score} / 4
                </span>
              )}
            />
          </Table>

          {/* Total Score at Bottom */}
          <div className="text-right mt-4 font-poppins">
            <Text strong className="text-lg text-green-700 font-poppins">
              Total Score: {totalScore} / {maxScore}
            </Text>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 font-poppins">
          No rubrics available for this task.
        </div>
      )}
    </Drawer>
  );
};

export default RubricScoreDrawer;