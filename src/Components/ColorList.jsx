import SingleColor from "./SingleColor";
import { nanoid } from "nanoid";

const ColorList = ({ colors, setIsError }) => {
  return (
    <section className="colors">
      {colors.map((color, index) => {
        return (
          <SingleColor
            key={nanoid()}
            colors={colors}
            color={color}
            index={index}
            setIsError={setIsError}
          />
        );
      })}
    </section>
  );
};

export default ColorList;
