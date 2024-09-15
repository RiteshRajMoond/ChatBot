import { TypeAnimation } from "react-type-animation";

const TypeAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        "Chat with you own AI🤖",
        1000,
        "Built with HuggingFace Models🤗🤗",
        2000,
        "Customised specially for You!👉🏼👉🏼",
        1500,
      ]}
      speed={50}
      style={{
        fontSize: "60px",
        color: "white",
        display: "inline-block",
        textShadow: "1px 1px 20px #000",
      }}
      repeat={Infinity}
    />
  );
};

export default TypeAnim;
