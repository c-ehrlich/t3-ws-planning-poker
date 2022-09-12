import cn from "classnames";

interface PPButtonProps {
  size?: "sm" | "md" | "lg";
  color?: "light" | "dark";
  children: string | React.ReactNode;
  onClick?: () => void;
}

function PPButton(props: PPButtonProps) {
  return (
    <button
      className={cn(
        "rounded-lg font-medium shadow-md",
        getColorProps(props.color),
        getSizeProps(props.size)
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default PPButton;

function getSizeProps(size: PPButtonProps["size"]) {
  switch (size) {
    case "lg":
      return "px-4 py-2 text-lg";
    case "sm":
      return "px-2 py-1 text-sm";
    case "md":
    default:
      return "px-4 py-2 text-md";
  }
}

function getColorProps(color: PPButtonProps["color"]) {
  if (!color || color === "light") {
    return "text-stone-700 bg-stone-100";
  }
  if (color === "dark") {
    return "text-stone-100 bg-stone-700";
  }
}
