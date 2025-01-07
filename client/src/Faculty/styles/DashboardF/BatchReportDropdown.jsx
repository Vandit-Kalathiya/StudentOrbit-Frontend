import { useEffect, useState } from "react";
import { Select, Button, Input, Checkbox, Form } from "antd";
import axios from "axios";
import { getUsernameFromToken } from "../../../../authToken";
import { ThreeDots } from "react-loader-spinner";

const { Option } = Select;

const BatchReportDropdown = () => {
  const [reportType, setReportType] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedWeeks, setSelectedWeeks] = useState([]);
  const [batch, setBatch] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fetching, setFetching] = useState("");
  const [weekFetching, setWeekFetching] = useState("");

  const fetchedUsername = getUsernameFromToken();

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1818/faculty/batches/b/${fetchedUsername}`,
          { withCredentials: true }
        );
        setBatch(response.data);
      } catch (err) {
        console.error("Error fetching batches:", err);
        setError("Unable to fetch batches.");
      }
    };

    fetchBatches();
  }, [fetchedUsername]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (reportType === "Individual Student" && studentId?.length === 7) {
        try {
          setFetching("Fetching the Projects...");
          const response = await axios.get(
            `http://localhost:1818/students/g/${studentId.toUpperCase()}`,
            { withCredentials: true }
          );
          if (response.data?.length === 0) {
            setProjects([]);
            setError("Student doesn't exist.");
          } else {
            setProjects(response.data);
            setError("");
          }
        } catch (error) {
          console.error("Error fetching student projects:", error);
          setError("An error occurred while fetching the projects.");
          setProjects([]);
        } finally {
          setFetching("");
        }
      }

      if (reportType === "One Group of Any Batch" && selectedBatch) {
        try {
          setFetching("Fetching the Projects...");
          const response = await axios.get(
            `http://localhost:1818/faculty/batches/allGroups/${selectedBatch[0]}/${selectedBatch.slice(1, 3)}`,
            { withCredentials: true }
          );
          setProjects(response.data);
        } catch (error) {
          console.error("Error fetching batch projects:", error);
          setProjects([]);
        } finally {
          setFetching("");
        }
      }
    };

    fetchProjects();
  }, [studentId, selectedBatch, reportType]);

  useEffect(() => {
    const fetchWeeks = async () => {
      if (selectedProject) {
        try {
          setWeekFetching("Fetching Weeks...");
          const response = await axios.get(
            `http://localhost:1818/faculty/groups/week/${selectedProject}`,
            { withCredentials: true }
          );
          setCurrentWeek(response.data);
        } catch (error) {
          console.error("Error fetching weeks:", error);
        } finally {
          setWeekFetching("");
        }
      }
    };

    fetchWeeks();
  }, [selectedProject]);

  const resetSelections = () => {
    setSelectedBatch(null);
    setStudentId(null);
    setProjects([]);
    setSelectedProject(null);
    setSelectedWeeks([]);
    setError("");
  };

  const handleReportTypeChange = (value) => {
    setReportType(value);
    resetSelections();
  };

  const handleInputChange = (value, type) => {
    resetSelections();
    if (type === "student") setStudentId(value);
    if (type === "batch") setSelectedBatch(value);
  };

  const handleGenerateReport = async () => {
    setLoading(true);

    const reportTypeValue = reportType === "Individual Student" ? "student" : "group";
    const pdfGenerateRequest = {
      reportType: reportTypeValue,
      identifier: selectedBatch || studentId?.toUpperCase(),
      projectName: projects.find((project) => project.groupName === selectedProject)?.uniqueGroupId,
      weeks: selectedWeeks,
    };

    try {
      const response = await axios.post(
        `http://localhost:1819/pdf/create`,
        pdfGenerateRequest,
        { responseType: "blob", withCredentials: true }
      );

      const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      if (reportTypeValue === "student") {
        link.setAttribute("download", `${studentId.toUpperCase()}_${selectedProject}.pdf`)
      } else link.setAttribute("download", `${selectedBatch }_${selectedProject}.pdf`)
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderWeekSelection = () => {
    if (weekFetching) return <p className="text-gray-500 ml-1">{weekFetching}</p>;
    if (currentWeek === 0) return <p className="text-gray-500">No week started</p>;

    return (
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
  };

  return (
    <div className="p-5 bg-gradient-to-br from-blue-50 via-white to-purple-50 w-full rounded-lg shadow-lg space-y-4 mb-2">
      <h2 className="text-2xl font-semibold text-gray-700">Generate Report</h2>
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
          {error && <p className="text-red-500 ml-1">{error}</p>}
          {fetching && <p className="text-gray-500 ml-1">{fetching}</p>}
          {projects.length > 0 && (
            <Select
              style={{ width: "100%" }}
              placeholder="Select Project"
              onChange={setSelectedProject}
              value={selectedProject}
              className="text-gray-700"
            >
              {projects.map((project) => (
                <Option key={project.id} value={project.groupName}>
                  {project.groupName}
                </Option>
              ))}
            </Select>
          )}
          {selectedProject && renderWeekSelection()}
        </>
      )}
      {reportType === "One Group of Any Batch" && (
        <>
          <Select
            placeholder="Select Batch"
            onChange={(value) => handleInputChange(value, "batch")}
            value={selectedBatch}
            className="text-gray-700 w-full"
          >
            {batch.map((batch) => (
              <Option key={batch.id} value={batch.semester + batch.batchName}>
                {batch.semester + batch.batchName}
              </Option>
            ))}
          </Select>
          {fetching && <p className="text-gray-500 ml-1">{fetching}</p>}
          {projects.length > 0 && (
            <Select
              style={{ width: "100%" }}
              placeholder="Select Project"
              onChange={setSelectedProject}
              value={selectedProject}
              className="text-gray-700"
            >
              {projects.map((project) => (
                <Option key={project.id} value={project.groupName}>
                  {project.groupName}
                </Option>
              ))}
            </Select>
          )}
          {selectedProject && renderWeekSelection()}
        </>
      )}
      <div className="relative">
        <Button
          type="primary"
          onClick={handleGenerateReport}
          disabled={!selectedProject || selectedWeeks.length === 0 || loading}
          className={`w-full mt-4  h-10 flex items-center justify-center ${loading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2 text-blue-500">
              <span className="text-lg font-medium mb-[0.2rem]">
                Generating
              </span>
              <ThreeDots
                visible={true}
                height="30"
                width="30"
                color="#2563EB"
                radius="9"
                ariaLabel="loading"
                wrapperClass=""
              />
            </div>
          ) : (
            <div className="text-sm">Generate Report</div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default BatchReportDropdown;
