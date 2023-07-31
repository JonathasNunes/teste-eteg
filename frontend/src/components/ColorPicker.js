import React, { useState, useEffect } from "react";

const ColorPicker = ({ initialColor }) => {
  const [color, setColor] = useState(initialColor);

  useEffect(() => {
    setColor(initialColor);
  }, [initialColor]);

  const handleChangeColor = (event) => {
    setColor(event.target.value);
  };

  return (
    <>
      <input
        type="color"
        value={color}
        onChange={handleChangeColor}
        name="favorite_color"
      />
      <div style={{ width: '50px', height: '50px', backgroundColor: color }}></div>
    </>
  );
};

export default ColorPicker;