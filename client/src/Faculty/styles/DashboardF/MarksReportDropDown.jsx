import { useState } from "react";
import { Select, Button, Input } from "antd";

const { Option } = Select;

const MarksReportDropdown = () => {
  const [reportType, setReportType] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [studentId, setStudentId] = useState(null);

  // Sample Data for batches and groups
  const batchData = [
    { name: "Batch A", groups: ["Group 1", "Group 2", "Group 3"] },
    { name: "Batch B", groups: ["Group 1", "Group 2"] },
    { name: "Batch C", groups: ["Group 1", "Group 2", "Group 3", "Group 4"] },
  ];

  // Handle report type selection (Individual Student or Entire Group)
  const handleReportTypeChange = (value) => {
    setReportType(value);
    setSelectedBatch(null);
    setSelectedGroup(null);
    setStudentId(null);
  };

  // Generate Marks Report based on selection
  const handleGenerateReport = () => {
    if (reportType === "Individual Student" && studentId) {
      console.log(`Generating marks report for Student ID: ${studentId}`);
    } else if (reportType === "Entire Group" && selectedBatch && selectedGroup) {
      console.log(`Generating marks report for ${selectedBatch} - ${selectedGroup}`);
    } else {
      console.log("Please complete the selections for report generation.");
    }
  };

  return (
    <div className="p-5 bg-white rounded-lg shadow-lg space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">Generate Marks Report</h2>

      {/* Report Type Selection */}
      <Select
        style={{ width: "100%" }}
        placeholder="Select Report Type"
        onChange={handleReportTypeChange}
        value={reportType}
        className="text-gray-700"
      >
        <Option value="Individual Student">Individual Student</Option>
        <Option value="Entire Group">Entire Group</Option>
      </Select>

      {/* Student ID Input (for Individual Student report) */}
      {reportType === "Individual Student" && (
        <Input
          placeholder="Enter Student ID"
          onChange={(e) => setStudentId(e.target.value)}
          value={studentId}
          className="text-gray-700 w-full mt-4"
        />
      )}

      {/* Batch and Group Selection (for Entire Group report only) */}
      {reportType === "Entire Group" && (
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

      {/* Generate Marks Report Button */}
      <Button
        type="primary"
        onClick={handleGenerateReport}
        disabled={
          (reportType === "Individual Student" && !studentId) ||
          (reportType === "Entire Group" && (!selectedBatch || !selectedGroup))
        }
        className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white"
      >
        Generate Marks Report
      </Button>
    </div>
  );
};

export default MarksReportDropdown;
