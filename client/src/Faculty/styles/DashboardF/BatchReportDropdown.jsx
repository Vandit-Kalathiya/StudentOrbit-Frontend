import { useState } from "react";
import { Select, Button, Input, Checkbox, Form } from "antd";
import axios from "axios";
import { getUsernameFromToken } from "../../../../authToken";

const { Option } = Select;

const BatchReportDropdown = () => {
  const [reportType, setReportType] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedWeeks, setSelectedWeeks] = useState([]);
  const currentWeek = 7; // Example current week

  const fetchedUsername = getUsernameFromToken();

  const resetSelections = () => {
    setSelectedBatch(null);
    setStudentId(null);
    setProjects([]);
    setSelectedProject(null);
    setSelectedWeeks([]);
  };

  const fetchProjects = (type) => {
    // Simulate API call to fetch projects
    const mockProjects = [
      { id: 1, name: `${type} Project Alpha` },
      { id: 2, name: `${type} Project Beta` },
    ];
    setProjects(mockProjects);
  };

  const handleReportTypeChange = (value) => {
    setReportType(value);
    resetSelections();
  };

  const handleInputChange = (value, type) => {
    resetSelections();
    if (type === "student") {
      setStudentId(value);
      if (value) fetchProjects("Student", value);
    } else if (type === "batch") {
      setSelectedBatch(value);
      if (value) fetchProjects("Batch", value);
    }
  };

  const handleGenerateReport = () => {
    const reportTypeValue = reportType === "Individual Student" ? "student" : "group";
    const requestData = {
      reportType: reportTypeValue,
      identifier: studentId || selectedBatch,
      projectName: projects.find((project) => project.id === selectedProject)
        ?.name,
      weeks: selectedWeeks,
    };

    console.log(requestData)

    axios
      .get(`http://localhost:1819/pdf/create/${studentId}/${studentId}`, {
        responseType: "blob", withCredentials: true
      })
      .then((response) => {
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "StudentOrbitReport.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  const renderWeekSelection = () => (
    <div className="mt-4">
      <p className="mb-2 text-gray-700">Select Weeks:</p>
      <Checkbox
        onChange={(e) => {
          const allWeeks = Array.from({ length: currentWeek }, (_, i) => i + 1);
          setSelectedWeeks(e.target.checked ? allWeeks : []);
        }}
        checked={selectedWeeks.length === currentWeek}
      >
        Select All Weeks
      </Checkbox>
      <Checkbox.Group
        options={Array.from({ length: currentWeek }, (_, i) => ({
          label: `Week ${i + 1}`,
          value: i + 1,
        }))}
        value={selectedWeeks}
        onChange={setSelectedWeeks}
        className="flex flex-wrap gap-4 mt-2"
      />
    </div>
  );

  return (
    <div className="p-5 bg-white rounded-lg shadow-lg space-y-4 mb-2">
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

      {/* Student ID Input */}
      {reportType === "Individual Student" && (
        <>
          <Form.Item
            validateStatus={
              studentId &&
                !/^(\d{2})[Cc][Ee](00[1-9]|0[1-9]\d|1\d\d|200)$/.test(studentId)
                ? "error"
                : ""
            }
            help={
              studentId &&
                !/^(\d{2})[Cc][Ee](00[1-9]|0[1-9]\d|1\d\d|200)$/.test(studentId)
                ? "Invalid Student ID. Format should be YYCEXXX."
                : ""
            }
          >
            <Input
              placeholder="Enter Student ID (e.g., 22CE001)"
              onChange={(e) => handleInputChange(e.target.value, "student")}
              value={studentId}
              className="text-gray-700 w-full"
            />
          </Form.Item>
          {projects.length > 0 && (
            <Select
              style={{ width: "100%" }}
              placeholder="Select Project"
              onChange={setSelectedProject}
              value={selectedProject}
              className="text-gray-700"
            >
              {projects.map((project) => (
                <Option key={project.id} value={project.id}>
                  {project.name}
                </Option>
              ))}
            </Select>
          )}
          {selectedProject && renderWeekSelection()}
        </>
      )}

      {/* Batch and Project Selection */}
      {reportType === "One Group of Any Batch" && (
        <>
          <Select
            placeholder="Select Batch"
            onChange={(value) => handleInputChange(value, "batch")}
            value={selectedBatch}
            className="text-gray-700 w-full"
          >
            {["Batch A", "Batch B", "Batch C"].map((batch) => (
              <Option key={batch} value={batch}>
                {batch}
              </Option>
            ))}
          </Select>
          {projects.length > 0 && (
            <Select
              style={{ width: "100%" }}
              placeholder="Select Project"
              onChange={setSelectedProject}
              value={selectedProject}
              className="text-gray-700"
            >
              {projects.map((project) => (
                <Option key={project.id} value={project.id}>
                  {project.name}
                </Option>
              ))}
            </Select>
          )}
          {selectedProject && renderWeekSelection()}
        </>
      )}

      {/* Generate Report Button */}
      <Button
        type="primary"
        onClick={handleGenerateReport}
        disabled={!selectedProject || selectedWeeks.length === 0}
        className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white"
      >
        Generate Report
      </Button>
    </div>
  );
};

export default BatchReportDropdown;
