export type ButtonProps = {
  children: string;
  variant?: "primary" | "secondary" | "teritory" | undefined;
  className?: string;
  onClick?: () => void;
  rightIcon?: JSX.Element;
  leftIcon?: JSX.Element;
};

const Button = ({
  children,
  className,
  variant,
  onClick,
  leftIcon,
  rightIcon,
}: ButtonProps) => {
  const color = (variant: any) => {
    switch (variant) {
      case "primary":
        return "bg-[#7700C7] border-solid border-[#7700C7] text-white rounded-lg cursor-pointer ";
      case "secondary":
        return "text-[#7700C7] cursor-pointer  border-solid border-2 border-[#7700C7] bg-transparent rounded-lg";
      case "teritory":
        return "bg-transparent cursor-pointer text-[#7700C7]"
      default:
        return "text-black";
    }
  };
  return (
    <div>
      <button
        className={`${color(variant)} ${className} flex items-center gap-2`}
        onClick={onClick}
      >
        {leftIcon && <span className="h-[14px] w-[14px]">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="h-[14px] w-[14px]">{rightIcon}</span>}
      </button>
    </div>
  );
};

export default Button;
