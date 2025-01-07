const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="loader relative w-16 aspect-square rounded-full border-2 border-[#012970] box-border transform-origin-left animate-[l2_1s_infinite_linear]">
        <style>
          {`
          .loader::before,
          .loader::after {
            content: "";
            position: absolute;
            inset: 0 0 auto;
            margin: auto;
            width: 50%;
            aspect-ratio: 1;
            border-radius: 50%;
            border: 3px solid #012970; /* Update border thickness if needed */
            box-sizing: content-box;
            transform-origin: 50% calc(100% - 4px);
            animation: inherit;
          }
          .loader::after {
            inset: auto 0 calc(100% + 2px);
            animation-duration: 0.5s;
            animation-direction: reverse;
            transform-origin: 50% calc(200% - 2px);
          }
          @keyframes l2 {
            100% {
              transform: rotate(1turn);
            }
          }
          `}
        </style>
      </div>
    </div>
  );
};

export default Loader;
