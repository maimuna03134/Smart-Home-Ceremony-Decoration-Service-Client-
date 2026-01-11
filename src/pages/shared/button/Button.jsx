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
        group relative overflow-hidden
        font-bold transition-all duration-300 ease-in-out
        active:scale-95
        disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100
        w-full flex items-center justify-center gap-3
        rounded-full
        ${outline
          ? "bg-white border-2 border-[#af5f44] text-[#af5f44] hover:text-white hover:shadow-lg hover:shadow-[#af5f44]/40"
          : "bg-[#af5f44] text-white border-2 border-[#af5f44] hover:shadow-lg hover:shadow-[#af5f44]/40"
        }
        ${small ? "text-sm py-2 px-6" : "text-sm md:text-base py-3 px-8"}
      `}
    >
      {/* Animated Background */}
      <span
        className={`
          absolute inset-0 w-full h-full 
          scale-x-0 group-hover:scale-x-100
          transition-transform duration-500 
          ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]
          origin-left
          ${outline ? "bg-[#af5f44]" : "bg-white"}
        `}
      ></span>

      {/* Content */}
      <span
        className={`
          relative z-10 flex items-center gap-3 
          tracking-widest uppercase
          ${outline ? "" : "group-hover:text-[#af5f44]"}
          transition-colors duration-300
        `}
      >
        {loading ? (
          <span className="loading loading-bars loading-md"></span>
        ) : (
          <>
            {Icon && (
              <Icon
                size={small ? 18 : 20}
                className="transition-transform duration-300 ease-in-out group-hover:rotate-20 group-hover:scale-110"
              />
            )}
            {label}
          </>
        )}
      </span>
    </button>
  );
};

export default Button;