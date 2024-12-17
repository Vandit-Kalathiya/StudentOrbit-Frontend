const ProfileDetails = ({ student }) => {
  return (
    <div className="md:text-xl text-xl mt-5 md:mt-0 flex flex-col gap-3">
      <p><span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">Name :</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700">{student.studentName}</span></p>
      <p><span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">Class :</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700">{student.username < '22CE091' ? 'CE - 1' : 'CE - 2'}</span></p>
      <p><span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">ID :</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700">{student.username}</span></p>
    </div>
  );
};

export default ProfileDetails;
