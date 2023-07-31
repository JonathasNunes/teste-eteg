import React, { useState } from 'react';

function ColorPicker({ initialColor }) {
  const [selectedColor, setSelectedColor] = useState(initialColor);

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  return (
    <>
      <input
        type="color"
        value={selectedColor}
        onChange={handleColorChange}
        name="favorite_color"
      />
      <div style={{ width: '50px', height: '50px', backgroundColor: selectedColor }}></div>
    </>
  );
}

export default ColorPicker;