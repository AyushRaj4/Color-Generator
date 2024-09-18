import { useState } from "react";

const Form = ({ addColors, hexToRGB, luminance }) => {
  const [color, setColor] = useState("");
  const [shadeDifference, setShadeDifference] = useState(10);

  const rgbValue = hexToRGB(color);
  const lum = luminance(rgbValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    addColors(color, parseInt(shadeDifference));
    // setColor("");
  };

  return (
    <section className="container">
      <h4>color generator</h4>
      <form className="color-form" onSubmit={handleSubmit}>
        <input
          type="color"
          name="color-picker"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <input
          type="text"
          name="color"
          placeholder="#30bb91"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <input
          type="number"
          name="shade-difference"
          placeholder="10"
          value={shadeDifference}
          onChange={(e) => setShadeDifference(e.target.value)}
        />
        <button
          className="btn"
          type="submit"
          style={{
            backgroundColor: color,
            color: lum >= 128 ? "black" : "white",
          }}
        >
          submit
        </button>
      </form>
    </section>
  );
};

export default Form;
