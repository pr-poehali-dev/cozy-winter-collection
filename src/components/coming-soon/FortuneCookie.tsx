interface FortuneCookieProps {
  isShaking: boolean;
  onClick: () => void;
}

export default function FortuneCookie({
  isShaking,
  onClick,
}: FortuneCookieProps) {
  return (
    <>
      <div className="space-y-4 text-center">
        <p className="text-lg md:text-xl text-primary">добро пожаловать! 🔮</p>
        <p className="text-sm md:text-base text-muted-foreground">
          прежде чем узнать о магазинчике,
          <br />
          вытяни своё зимнее предсказание:
        </p>
      </div>
      <button
        onClick={onClick}
        className="group relative cursor-pointer focus:outline-none"
        disabled={isShaking}
      >
        <div
          className={`text-8xl md:text-9xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${isShaking ? "cookie-shake" : ""}`}
        >
          🥠
        </div>
        <p className="mt-4 text-sm md:text-base text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
          {isShaking ? "печенье раскрывается..." : "нажми на печенье"}
        </p>
      </button>
    </>
  );
}
