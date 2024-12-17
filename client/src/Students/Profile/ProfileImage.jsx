import axios from "axios";
import { useEffect, useState } from "react";
import { getUsernameFromToken } from "../../../authToken";

const ProfileImage = ({image}) => {

  // const [image, setImage] = useState(null);

  // useEffect(() => {
  //   axios.get(`http://localhost:1818/students/${getUsernameFromToken()}/image`, { withCredentials: true,responseType: "blob" })
  //     .then((res) => {
  //       // console.log(URL.createObjectURL(res.data));
  //       setImage(URL.createObjectURL(res.data))
  //     })
  // }, [])

  return (
    <div className="rounded-full md:h-48 md:w-48 h-28 w-28 flex justify-start overflow-hidden">
      <img
        src={image}
        alt="Profile Image"
        className="object-cover w-full h-full"
      />
    </div>
  );
};

export default ProfileImage;
