import React from "react";

const RatingsSelect = ({ group, rating = -1, onChange }) => {
  const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <select defaultValue={rating} onChange={onChange}>
      <option>Select Rating</option>
      {values.map((value, index) => (
        <option key={group + index}>{value}</option>
      ))}
    </select>
  );
};

export default RatingsSelect;
