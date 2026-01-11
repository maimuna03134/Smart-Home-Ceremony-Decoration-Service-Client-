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
        button-animated group relative overflow-hidden
        font-bold transition-all duration-400 cubic-bezier(0.4, 0, 0.2, 1)
        active:scale-96 active:-translate-y-px
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
          animated-bg absolute inset-0 w-full h-full 
          scale-x-0 group-hover:scale-x-100
          transition-transform duration-600 
          cubic-bezier(0.25, 0.46, 0.45, 0.94)
          origin-left
          ${outline ? "bg-[#af5f44]" : "bg-white"}
        `}
      ></span>

      {/* Content */}
      <span
        className={`
          button-text relative z-10 flex items-center gap-3 
          tracking-widest uppercase
          ${outline ? "" : "group-hover:text-[#af5f44]"}
          transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
        `}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
          </div>
        ) : (
          <>
            {Icon && (
              <Icon
                size={small ? 18 : 20}
                className="icon-rotate transition-transform duration-400 cubic-bezier(0.34, 1.56, 0.64, 1)"
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