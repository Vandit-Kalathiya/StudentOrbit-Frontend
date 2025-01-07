import React, { useState, useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { IoLocationOutline, IoCallOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { LuClock4 } from "react-icons/lu";
import Footer from "./Footer";

const infoItems = [
  {
    id: 1,
    icon: <IoLocationOutline size={45} />,
    title: "Address",
    details: ["Charusat University", "Changa, Gujarat"],
    delay: 200,
  },
  {
    id: 2,
    icon: <IoCallOutline size={45} />,
    title: "Call Us",
    details: ["+1 5589 55488 55", "+1 6678 254445 41"],
    delay: 300,
  },
  {
    id: 3,
    icon: <TfiEmail size={45} />,
    title: "Email Us",
    details: ["info@studentorbit.com", "contact@example.com"],
    delay: 400,
  },
  {
    id: 4,
    icon: <LuClock4 size={45} />,
    title: "Open Hours",
    details: ["Monday - Friday", "9:00AM - 05:00PM"],
    delay: 500,
  },
];

function FormInput({ type, name, placeholder, required }) {
  return (
    <div className="w-full md:w-1/2 px-4 mb-4">
      <input
        type={type}
        name={name}
        className="form-control block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

function FormTextarea({ name, rows, placeholder, required }) {
  return (
    <div className="w-full px-4 mb-4">
      <textarea
        className="form-control block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        name={name}
        rows={rows}
        placeholder={placeholder}
        required={required}
      ></textarea>
    </div>
  );
}

function Contact() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "04d0da77-8858-4b04-9138-eb6d83bb291a");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      }).then((res) => res.json());

      if (res.success) {
        setShowPopup(true); // Show the popup
        event.target.reset(); // Clear the form fields
      } else {
        alert("Failed to send the message. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="min-h-screen items-center justify-center flex flex-col py-20 font-poppins">
        <div className="mt-10">
          <h1 className="text-4xl text-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-600">
            Contact
          </h1>
        </div>

        <div
          className="container mx-auto mt-10 md:px-24 md:pr-32 flex flex-wrap"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="flex flex-wrap ">
            <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0 flex-grow">
              <div className="flex flex-wrap">
                {infoItems.map((item) => (
                  <div key={item.id} className="w-full md:w-1/2 px-4 mb-8">
                    <div
                      className="info-item p-8 bg-[#fafafa]"
                      data-aos="fade"
                      data-aos-delay={item.delay}
                    >
                      {item.icon}
                      <h3 className="text-xl font-semibold my-3">
                        {item.title}
                      </h3>
                      {item.details.map((detail, index) => (
                        <p key={index} className="mb-1">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-1/2 px-4 lg:mb-0 flex-grow">
              <form
                action=""
                method="post"
                className="email-form h-full flex flex-col justify-between"
                data-aos="fade-up"
                data-aos-delay="200"
                onSubmit={onSubmit}
              >
                <div className="flex flex-wrap -mx-4 mb-8 p-8 bg-[#fafafa] flex-grow">
                  <FormInput
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                  />
                  <FormInput
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                  />
                  <FormInput
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    required={true}
                  />
                  <FormTextarea
                    name="message"
                    rows="6"
                    placeholder="Message"
                    required={true}
                  />
                  <div className="w-full px-4 text-center">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-500 to-purple-700 hover:from-blue-400 hover:to-purple-600"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-green-600">
              Message Sent Successfully!
            </h2>
            <p className="mt-4 text-gray-700">
              Thank you for reaching out. We'll get back to you soon!
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Contact;
