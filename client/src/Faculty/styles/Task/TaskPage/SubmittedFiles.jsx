import { CalendarOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, List, Typography, Card } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaFilePdf, FaFileWord, FaFileImage } from "react-icons/fa";
import { FILE_URL } from "../../../../../authToken";

function SubmittedFiles({ taskId }) {
  const [submittedFiles, setSubmittedFiles] = useState([]);
  const [groupFiles, setGroupFiles] = useState({});

  const { Text } = Typography;

  // Group files by date
  const groupFilesByDate = (files) => {
    const grouped = files.reduce((groups, file) => {
      const date = file.createDate;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(file);
      return groups;
    }, {});
    setGroupFiles(grouped);
  };

  // Get file icon based on file type
  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "pdf":
        return <FaFilePdf className="text-red-500 text-xl" />;
      case "doc":
      case "docx":
        return <FaFileWord className="text-blue-500 text-xl" />;
      case "jpg":
      case "png":
        return <FaFileImage className="text-green-500 text-xl" />;
      default:
        return <FaFilePdf className="text-gray-500 text-xl" />;
    }
  };

  // Fetch all submissions
  const fetchAllSubmissions = async () => {
    try {
      const res = await axios.get(`${FILE_URL}/${taskId}`);
      setSubmittedFiles(res.data);
      groupFilesByDate(res.data);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  useEffect(() => {
    fetchAllSubmissions();
  }, [taskId]);

  return (
    <div className="submitted-files">
      {Object.keys(groupFiles).length === 0 ? (
        <p className="text-base text-gray-500 font-poppins">No files submitted yet.</p>
      ) : (
        Object.keys(groupFiles).map((date) => (
          <Card
            key={date}
            className="mb-4 shadow-sm hover:shadow-md transition-shadow"
            title={
              <div className="flex items-center space-x-2">
                <CalendarOutlined className="text-gray-600" />
                <Text className="text-lg font-semibold text-gray-700 font-poppins">{date}</Text>
              </div>
            }
          >
            <List
              dataSource={groupFiles[date]}
              renderItem={(file) => (
                <List.Item key={file.fileName} className="!p-0 !mb-4 font-poppins">
                  <div className="w-full space-y-1">
                    {/* File Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getFileIcon(file.fileType.slice(12))}
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#5B6DF2] font-medium text-base font-poppins"
                        >
                          {file.fileName}
                        </a>
                      </div>
                      <Button
                        type="link"
                        icon={<DownloadOutlined />}
                        href={file.downloadUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="hover:text-[#5B6DF2] font-medium font-poppins"
                      >
                        {window.innerWidth >= 768 && 'Download'}
                      </Button>
                    </div>

                    {/* Task Description */}
                    <div className="flex items-start space-x-2 font-poppins">
                      <Text strong className="whitespace-nowrap">
                        Task Description:
                      </Text>
                      <Text className="text-gray-700">{file.taskDescription}</Text>
                    </div>

                    {/* Review Link */}
                    <div className="flex items-center space-x-2 font-poppins">
                      <Text strong>Review Link:</Text>
                      <Button
                        type="link"
                        href={file.taskReviewLink}
                        target="_blank"
                        className="p-0"
                      >
                        View Review
                      </Button>
                    </div>

                    {/* Upload Time */}
                    <Text type="secondary" className="block font-poppins">
                      Uploaded at: {file.createTime.slice(0, 5)}
                    </Text>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        ))
      )}
    </div>
  );
}

export default SubmittedFiles;