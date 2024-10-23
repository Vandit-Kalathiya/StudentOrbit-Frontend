import { Radio } from "antd";

function ToggleRole({ isStudent, setIsStudent }) {

  const ChangeIsStudentVal = (role) => {
    if(role === "student"){
      isStudent = true;
    }else if(role === "faculty"){
      isStudent = false;
    }
    // console.log(isStudent)
  }

  return (
    <div className="text-center mb-4">
      <Radio.Group
        value={isStudent ? "student" : "faculty"}
        onChange={(e) => setIsStudent(e.target.value === "student")}
      >
        <Radio.Button value="student" onClick={ChangeIsStudentVal("student")}>Student</Radio.Button>
        <Radio.Button value="faculty" onClick={ChangeIsStudentVal("faculty")}>Faculty</Radio.Button>
      </Radio.Group>
    </div>
  );
}

export default ToggleRole;



