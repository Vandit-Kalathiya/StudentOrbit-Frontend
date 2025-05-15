import { useEffect, useState } from "react";
import { Select, Button, Input, Form, Checkbox } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { BiSolidReport } from "react-icons/bi";
import { BASE_URL, getUsernameFromToken } from "../../../../authToken";
import { RiAiGenerate } from "react-icons/ri";

const { Option } = Select;

const MarksReportDropdown = () => {
  const [reportType, setReportType] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedWeeks, setSelectedWeeks] = useState([]);
  const [batch, setBatch] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [error, setError] = useState("");
  const [fetching, setFetching] = useState("");
  const [weekFetching, setWeekFetching] = useState("");

  // const batchData = [
  //   { name: "Batch A", groups: ["Group 1", "Group 2"] },
  //   { name: "Batch B", groups: ["Group 1", "Group 2", "Group 3"] },
  // ];

  const fetchedUsername = getUsernameFromToken();

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/faculty/batches/b/${fetchedUsername}`,
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
            `${BASE_URL}/students/g/${studentId.toUpperCase()}`,
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
            `${BASE_URL}/faculty/batches/allGroups/${
              selectedBatch[0]
            }/${selectedBatch.slice(1, 3)}`,
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
            `${BASE_URL}/faculty/groups/week/${selectedProject}`,
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

  const API_BASE_URL = "http://localhost:1819/pdf";

  const renderWeekSelection = () => {
    if (weekFetching)
      return <p className="text-gray-500 ml-1 font-poppins">{weekFetching}</p>;
    if (currentWeek === 0)
      return <p className="text-gray-500 font-poppins">No week started</p>;

    return (
      <div className="mt-4 font-poppins">
        <p className="mb-2 text-gray-700">Select Weeks:</p>
        <Checkbox
          onChange={(e) => {
            const allWeeks = Array.from(
              { length: currentWeek },
              (_, i) => i + 1
            );
            setSelectedWeeks(e.target.checked ? allWeeks : []);
          }}
          checked={selectedWeeks.length === currentWeek}
          className="font-poppins"
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
          className="flex flex-wrap gap-4 mt-2 font-poppins"
        />
      </div>
    );
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      let marksRepostGenerateRequest;
      if (reportType === "Individual Student") {
        marksRepostGenerateRequest = {
          name: studentId.toUpperCase(),
          reportType: "student",
          projectId: projects.find(
            (project) => project.groupName === selectedProject
          )?.uniqueGroupId,
        };
      } else {
        marksRepostGenerateRequest = {
          batch: selectedBatch,
          group: selectedProject,
        };
      }

      const response = await axios.post(
        `${API_BASE_URL}/marks`,
        marksRepostGenerateRequest,
        {
          responseType: "blob",
          withCredentials: true,
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        reportType === "Individual Student"
          ? `Marks_Report_${studentId.toUpperCase()}.pdf`
          : `Marks_Report_${selectedBatch}_${selectedGroup}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Marks report generated successfully!");
    } catch (err) {
      toast.error("Error generating marks report!");
    } finally {
      setLoading(false);
    }
  };

  // return (
  //   <div className="p-5 bg-gradient-to-br from-blue-50 via-white to-purple-50 w-full rounded-lg shadow-lg space-y-4 font-poppins">
  //     <h2 className="text-2xl font-semibold text-gray-700 flex items-center gap-2">
  //       <BiSolidReport /> Generate Marks Report
  //     </h2>

  //     <Select
  //       placeholder="Select Report Type"
  //       onChange={handleReportTypeChange}
  //       value={reportType}
  //       className="w-full font-poppins"
  //     >
  //       <Option value="Individual Student">Individual Student</Option>
  //       <Option value="Entire Group">Entire Group</Option>
  //     </Select>

  //     {reportType === "Individual Student" && (
  //       <Form.Item
  //         validateStatus={
  //           studentId &&
  //           !/^(\d{2})[Cc][Ee](00[1-9]|0[1-9]\d|1\d\d|200)$/.test(studentId)
  //             ? "error"
  //             : ""
  //         }
  //         help={
  //           studentId &&
  //           !/^(\d{2})[Cc][Ee](00[1-9]|0[1-9]\d|1\d\d|200)$/.test(studentId)
  //             ? "Invalid Student ID. Format: YYCEXXX."
  //             : ""
  //         }
  //       >
  //         <Input
  //           placeholder="Enter Student ID (e.g., 22CE001)"
  //           value={studentId}
  //           onChange={(e) => setStudentId(e.target.value)}
  //           className="font-poppins"
  //         />
  //       </Form.Item>
  //     )}

  //     {reportType === "Entire Group" && (
  //       <>
  //         <Select
  //           placeholder="Select Batch"
  //           value={selectedBatch}
  //           onChange={(value) => {
  //             setSelectedBatch(value);
  //             setSelectedGroup(null);
  //           }}
  //           className="w-full font-poppins"
  //         >
  //           {batchData.map((batch) => (
  //             <Option key={batch.name} value={batch.name}>
  //               {batch.name}
  //             </Option>
  //           ))}
  //         </Select>

  //         {selectedBatch && (
  //           <Select
  //             placeholder="Select Group"
  //             value={selectedGroup}
  //             onChange={setSelectedGroup}
  //             className="w-full font-poppins"
  //           >
  //             {batchData
  //               .find((b) => b.name === selectedBatch)
  //               ?.groups.map((group) => (
  //                 <Option key={group} value={group}>
  //                   {group}
  //                 </Option>
  //               ))}
  //           </Select>
  //         )}
  //       </>
  //     )}

  //     <Button
  //       type="primary"
  //       onClick={handleGenerate}
  //       disabled={
  //         loading ||
  //         (reportType === "Individual Student" && !studentId) ||
  //         (reportType === "Entire Group" && (!selectedBatch || !selectedGroup))
  //       }
  //       className="w-full flex items-center justify-center gap-2 font-poppins"
  //     >
  //       {loading ? (
  //         <ThreeDots height="20" width="40" color="#fff" />
  //       ) : (
  //         <>Generate Marks Report</>
  //       )}
  //     </Button>
  //   </div>
  // );

  return (
    <div className="p-5 bg-gradient-to-br from-blue-50 via-white to-purple-50 w-full rounded-lg shadow-lg space-y-4 mb-2 font-poppins">
      <h2 className="text-2xl font-semibold text-gray-700">
        Generate Marks Report
      </h2>
      <Select
        style={{ width: "100%", fontFamily: "Poppins" }}
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
              className="w-full font-poppins"
            />
          </Form.Item>
          {error && <p className="text-red-500 ml-1">{error}</p>}
          {fetching && <p className="text-gray-500 ml-1">{fetching}</p>}
          {projects.length > 0 && (
            <Select
              style={{ width: "100%", fontFamily: "Poppins" }}
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
            className="text-gray-700 w-full font-poppins"
          >
            {batch.map((batch) => (
              <Option key={batch.id} value={batch.semester + batch.batchName}>
                {batch.semester + batch.batchName}
              </Option>
            ))}
          </Select>
          {fetching && (
            <p className="text-gray-500 ml-1 font-poppins">{fetching}</p>
          )}
          {projects.length > 0 && (
            <Select
              style={{ width: "100%", fontFamily: "Poppins" }}
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
          onClick={handleGenerate}
          disabled={!selectedProject || selectedWeeks.length === 0 || loading}
          className={`mt-6 font-poppins p-5 flex items-center justify-center m-auto w-auto ${
            loading
              ? "bg-blue-400"
              : "bg-blue-500 hover:bg-blue-600 hover:text-white"
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
            <div className="flex items-center justify-center gap-2 text-[1rem]">
              <div>Generate Report</div>
              <div>
                <RiAiGenerate className="h-5 w-5" />
              </div>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default MarksReportDropdown;
