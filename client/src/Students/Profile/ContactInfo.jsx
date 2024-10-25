import { MailOutlined, PhoneOutlined } from "@ant-design/icons";

const ContactInfo = ({student}) => {
  return (
    <div className="md:text-xl text-lg mt-5 md:mt-0 font-semibold gap-4 flex flex-col">
      <div className="flex items-center space-x-2">
        <MailOutlined />
        <p>{student.email}</p>
      </div>
      <div className="flex items-center space-x-2">
        <PhoneOutlined />
        <p>1234567890</p>
      </div>
    </div>
  );
};

export default ContactInfo;
