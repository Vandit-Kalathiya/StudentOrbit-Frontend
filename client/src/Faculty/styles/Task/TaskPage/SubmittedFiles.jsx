// import { FaFilePdf, FaFileWord, FaFileImage, FaDownload } from "react-icons/fa";

// function SubmittedFiles({ files }) {
//   const getFileIcon = (fileType) => {
//     switch (fileType) {
//       case "pdf":
//         return <FaFilePdf className="text-red-500" />;
//       case "doc":
//       case "docx":
//         return <FaFileWord className="text-blue-500" />;
//       case "jpg":
//       case "png":
//         return <FaFileImage className="text-green-500" />;
//       default:
//         return <FaFilePdf className="text-gray-500" />;
//     }
//   };

//   return (
//     <div className="submitted-files">
//       {files.length === 0 ? (
//         <p className="text-gray-400">No files submitted yet.</p>
//       ) : (
//         <ul className="space-y-2 mb-6">
//           {files.map((file, index) => (
//             <li
//               key={index}
//               className="inline-flex items-center justify-between p-3 bg-gray-100 border border-[#5B6DF2] rounded-lg gap-16"
//             >
//               <div className="flex items-center space-x-3">
//                 {getFileIcon(file.type)}
//                 <a
//                   href={file.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="hover:text-[#5B6DF2] font-medium"
//                 >
//                   {file.name}
//                 </a>
//               </div>

//               <div className="flex flex-col items-center">
//                 <a
//                   href={file.url}
//                   download={file.name}
//                   className="text-gray-700 hover:text-[#5B6DF2]"
//                 >
//                   <FaDownload />
//                 </a>
//                 {/* <p className="text-xs text-gray-500">{file.uploadedAt}</p> */}
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default SubmittedFiles;



import axios from "axios";
import { useEffect, useState } from "react";
import { FaFilePdf, FaFileWord, FaFileImage, FaDownload } from "react-icons/fa";

function SubmittedFiles({ files, taskId}) {

  const [submittedFiles, setSubmittedFiles] = useState([]);
  const [groupFiles, setGroupFiles] = useState([]);

  const groupFilesByDate = (files) => {
    return files.reduce((groups, file) => {
      const date = file.createDate; 
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(file);
      setGroupFiles(groups)
      return groups;
    }, {});
  };

  const getFileIcon = (fileType) => {
    console.log(fileType);
    
    switch (fileType) {
      case "pdf":
        return <FaFilePdf className="text-red-500" />;
      case "doc":
      case "docx":
        return <FaFileWord className="text-blue-500" />;
      case "jpg":
      case "png":
        return <FaFileImage className="text-green-500" />;
      default:
        return <FaFilePdf className="text-gray-500" />;
    }
  };

  // Group the files by date

  const fetchAllSubmissions = async () => {
    axios.get(`http://localhost:1820/${taskId}`)
    .then((res) => {
      setSubmittedFiles(res.data);
      groupFilesByDate(res.data)
    })
  }

  useEffect(() => {
    fetchAllSubmissions();
  }, []);

  console.log(groupFiles);
  
  

  return (
    <div className="submitted-files">
        <h1 className="text-lg md:text-xl mb-4 font-semibold">
          Submitted Work
        </h1>
      {Object.keys(groupFiles).length === 0 ? (
        <p className="text-base text-gray-500">No files submitted yet.</p>
      ) : (
        Object.keys(groupFiles).map((date) => (
          <div key={date} className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{date}</h3> 
            <ul className="space-y-2">
              {groupFiles[date].map((file, index) => (
                <li
                  key={index}
                  className="inline-flex items-center justify-between p-3 bg-gray-100 border border-[#5B6DF2] rounded-lg gap-16 mr-4"
                >
                  <div className="flex items-center space-x-3">
                    {getFileIcon(file.fileType.slice(12))}
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#5B6DF2] font-medium"
                    >
                      {file.fileName}
                    </a>
                  </div>

                  <div className="flex flex-col items-center">
                    <a
                      href={file.downloadUrl}
                      download={file.fileName}
                      className="text-gray-700 hover:text-[#5B6DF2]"
                    >
                      <FaDownload />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default SubmittedFiles;