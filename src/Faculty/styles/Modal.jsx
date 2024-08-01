// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from "react";
import { X } from "lucide-react";

// eslint-disable-next-line react/prop-types
function Modal({ onClose }) {
  const modalRef = useRef();
  const [inputFields, setInputFields] = useState([{ id: "", value: "" }]);
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false);

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  const addInputField = () => {
    setInputFields([...inputFields, { id: "", value: "" }]);

    if (inputFields.length + 1 >= 4) {
      setIsAddButtonDisabled(true);
    }
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index].value = event.target.value;
    setInputFields(values);
  };

  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="mt-10 flex flex-col gap-5">
        <button onClick={onClose} className="flex justify-end mr-4">
          <X />
        </button>
        <div className="bg-white border-2 rounded-xl px-10 md:px-20 py-10 flex flex-col gap-5 items-center w-[92vw] md:w-[500px] mx-4">
          <h1 className="md:text-3xl text-2xl font-bold">Add New Group</h1>
          <form action="#">
            {inputFields.map((inputField, index) => (
              <input
                key={index}
                type="text"
                placeholder="Enter Student Id"
                value={inputField.value}
                required
                onChange={(event) => handleInputChange(index, event)}
                className="border-2 w-full max-w-md px-4 py-2 text-black border-gray-300 rounded-md mb-2"
              />
            ))}
            <button
              type="button"
              onClick={addInputField}
              className="mt-2 w-full flex items-center justify-center border-2 border-[#5B6DF3] text-[#5B6DF3] p-2 rounded-md"
              disabled={isAddButtonDisabled}
            >
              Add Student Id
            </button>
            <button
              type="submit"
              className="mt-4 w-full flex items-center justify-center bg-[#5B6DF3] text-white p-2 rounded-md"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;
