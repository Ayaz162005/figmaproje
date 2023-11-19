import { Link } from "react-router-dom";

export default function Button({
  icon,
  text,
  size,
  type,
  disabled,
  onClick,
  to,
}: {
  icon?: string;
  text: string;
  size: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  to?: string;
}) {
  return (
    <>
      {!to ? (
        <button
          type={type}
          className={`flex items-center gap-2  rounded-2xl justify-center  ${size} cursor-pointer hover:scale-95 transition-all duration-300 `}
          disabled={disabled}
          onClick={onClick}
        >
          {icon ? (
            <img
              src={icon}
              alt="button image"
              className={` filter-purple text-purple-500`}
            />
          ) : (
            ""
          )}
          {text}
        </button>
      ) : (
        <Link
          to={to}
          type={type}
          className={`flex items-center gap-2  rounded-2xl justify-center  ${size} cursor-pointer hover:scale-95 transition-all duration-300 `}
          // disabled={disabled}
          onClick={onClick}
        >
          {icon ? (
            <img
              src={icon}
              alt="button image"
              className={` filter-purple text-purple-500`}
            />
          ) : (
            ""
          )}
          {text}
        </Link>
      )}
    </>
  );
}
