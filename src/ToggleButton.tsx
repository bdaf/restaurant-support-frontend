import { useEffect, useState } from "react";

type ToggleButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  toggleValue: boolean;
  onToggle?: (value: boolean) => void;
};

export function ToggleButton({
  toggleValue,
  onToggle,
  children,
  ...props
}: ToggleButtonProps) {
  const [toggle, setToggle] = useState(toggleValue);
  useEffect(() => {
    if (onToggle) onToggle(toggle);
  }, [toggle, onToggle]);

  return (
    <button
      {...props}
      style={{
        backgroundColor: `${toggle ? "darkgreen" : "dimgray"}`,
        padding: "2rem 1rem",
      }}
      onClick={() => setToggle(!toggle)}
    >
      {children}
    </button>
  );
}
