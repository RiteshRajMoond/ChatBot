import { TypeAnimation } from "react-type-animation";

const TypeAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        "Welcome to your personal AI assistant! 🤖",
        1000,
        "Powered by advanced HuggingFace models! 🤗",
        2000,
        "Tailored to meet your unique needs! 🌟",
        1500,
        "Let's start an amazing conversation! 💬",
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
