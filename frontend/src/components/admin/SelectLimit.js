import React from "react";

const SelectLimit = ({ limit, handleLimit }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    handleLimit(value);
  };
  return (
    <>
      <div className="d-flex align-items-center">
        <span className="me-2">Show</span>
        <select
          className="form-select form-select-sm"
          defaultValue={limit}
          onChange={handleChange}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
        <span className="ms-2">entries</span>
      </div>
    </>
  );
};

export default SelectLimit;
