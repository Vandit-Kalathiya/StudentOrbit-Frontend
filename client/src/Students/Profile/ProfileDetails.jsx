const ProfileDetails = ({student}) => {
    return (
      <div className="md:text-xl text-xl mt-5 md:mt-0 font-semibold flex flex-col gap-3">
        <p>Name : Alice Parker</p>
        <p>Class : {student.username < '22CE091'? 'CE - 1' : 'CE - 2'}</p>
        <p>ID : {student.username}</p>
      </div>
    );
  };
  
  export default ProfileDetails;
  