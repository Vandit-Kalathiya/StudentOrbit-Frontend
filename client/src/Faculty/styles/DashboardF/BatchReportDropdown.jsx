import { useState } from "react";
import { Select, Button, Input, Radio } from "antd";

const { Option } = Select;

const BatchReportDropdown = () => {
  const [reportType, setReportType] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [weekType, setWeekType] = useState(null);
  const [weekNumber, setWeekNumber] = useState(null);

  // Sample Data
  const batchData = [
    { name: "Batch A", groups: ["Group 1", "Group 2", "Group 3"] },
    { name: "Batch B", groups: ["Group 1", "Group 2"] },
    { name: "Batch C", groups: ["Group 1", "Group 2", "Group 3", "Group 4"] },
  ];

  const handleReportTypeChange = (value) => {
    setReportType(value);
    setSelectedBatch(null);
    setSelectedGroup(null);
    setStudentId(null);
    setWeekType(null);
    setWeekNumber(null);
  };

  const handleGenerateReport = () => {
    // Logic to generate report based on the selected options
    if (reportType === "Individual Student" && studentId) {
      console.log(
        `Generating report for Student ID: ${studentId}, ${weekType} ${
          weekNumber ? `- Week ${weekNumber}` : ""
        }`
      );
    } else if (
      reportType === "One Group of Any Batch" &&
      selectedBatch &&
      selectedGroup
    ) {
      console.log(
        `Generating report for ${selectedBatch} - ${selectedGroup}, ${weekType} ${
          weekNumber ? `- Week ${weekNumber}` : ""
        }`
      );
    } else {
      console.log("Please complete the selections for report generation.");
    }
  };

  return (
    <div className="p-5 bg-white rounded-lg shadow-lg space-y-4 mb-2 ">
      <h2 className="text-xl font-semibold text-gray-700">Generate Report</h2>

      {/* Report Type Selection */}
      <Select
        style={{ width: "100%" }}
        placeholder="Select Report Type"
        onChange={handleReportTypeChange}
        value={reportType}
        className="text-gray-700"
      >
        <Option value="Individual Student">Individual Student</Option>
        <Option value="One Group of Any Batch">One Group of Any Batch</Option>
      </Select>

      {/* Student ID Input (for Individual Student report) */}
      {reportType === "Individual Student" && (
        <Input
          placeholder="Enter Student ID"
          onChange={(e) => setStudentId(e.target.value)}
          value={studentId}
          className="text-gray-700 w-full"
        />
      )}

      {/* Batch and Group Selection (in one row) */}
      {reportType === "One Group of Any Batch" && (
        <div className="flex gap-4">
          <Select
            placeholder="Select Batch"
            onChange={(value) => setSelectedBatch(value)}
            value={selectedBatch}
            className="text-gray-700 flex-grow"
          >
            {batchData.map((batch) => (
              <Option key={batch.name} value={batch.name}>
                {batch.name}
              </Option>
            ))}
          </Select>

          <Select
            placeholder="Select Group"
            onChange={(value) => setSelectedGroup(value)}
            value={selectedGroup}
            className="text-gray-700 flex-grow"
            disabled={!selectedBatch} // Disable group dropdown until batch is selected
          >
            {selectedBatch &&
              batchData
                .find((batch) => batch.name === selectedBatch)
                .groups.map((group) => (
                  <Option key={group} value={group}>
                    {group}
                  </Option>
                ))}
          </Select>
        </div>
      )}

      {(reportType === "Individual Student" ||
        reportType === "One Group of Any Batch") && (
        <div className="mt-4 flex items-center space-x-4 w-full">
          <Radio.Group
            onChange={(e) => setWeekType(e.target.value)}
            value={weekType}
            className="flex items-center w-1/2"
          >
            <Radio value="Week-wise" className="w-1/2">
              Week-wise
            </Radio>
            <Radio value="All Weeks" className="w-1/2">
              All Weeks
            </Radio>
          </Radio.Group>

          {/* Week Number Input (only for Week-wise selection) */}
          {weekType === "Week-wise" && (
            <Input
              placeholder="Enter Week Number"
              onChange={(e) => setWeekNumber(e.target.value)}
              value={weekNumber}
              type="number"
              className="text-gray-700 ml-2 flex-grow w-1/2"
            />
          )}
        </div>
      )}

      {/* Generate Report Button */}
      <Button
        type="primary"
        onClick={handleGenerateReport}
        disabled={
          (reportType === "Individual Student" && !studentId) ||
          (reportType === "One Group of Any Batch" &&
            (!selectedBatch || !selectedGroup)) ||
          (weekType === "Week-wise" && !weekNumber)
        }
        className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white"
      >
        Generate Report
      </Button>
    </div>
  );
};

export default BatchReportDropdown;
