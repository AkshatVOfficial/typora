import "./Button.css";
// Varient: primary, secondary, tertiary, danger, success, warning, info, light, dark
function Button({
  children = "Button",
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
