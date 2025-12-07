const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  loading = false, 
}) => {
  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        relative disabled:opacity-70 disabled:cursor-not-allowed
        rounded-lg transition-all duration-300 ease-in-out
        cursor-pointer w-full flex items-center justify-center gap-3 px-4
        ${
          outline
            ? "bg-white border-2 border-black text-black hover:bg-gray-100"
            : "bg-[#6d4034] text-white border-2 border-[#6d4034] hover:bg-white hover:text-[#6d4034]"
        }
        ${small ? "text-sm py-1 font-light" : "text-md py-3 font-semibold"}
      `}
    >
      {loading ? (
        <span className="loading loading-bars loading-md"></span>
      ) : (
        <>
          {Icon && (
            <Icon
              size={24}
              className="absolute left-4 top-1/2 -translate-y-1/2"
            />
          )}
          {label}
        </>
      )}
    </button>
  );
};

export default Button;
