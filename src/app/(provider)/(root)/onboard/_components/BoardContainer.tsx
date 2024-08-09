import { useOnboardStore } from "@/stores/onboard.store";
import { PropsWithChildren } from "react";

type BoardType = {
  title: string;
};

function BoardContainer({ title, children }: PropsWithChildren<BoardType>) {
  const { isInputValid, progress, setProgress, setIsInputValid } =
    useOnboardStore();
  const handleNextClick = () => {
    setProgress(true);
    setIsInputValid(true);
  };

  return (
    <main
      className="relative flex flex-col items-center w-full px-4 pt-14"
      style={{ minHeight: "calc(100vh - 52px)" }}
    >
      <h1 className="w-full mb-16 text-[28px] font-semibold leading-9 whitespace-pre-wrap">
        {title}
      </h1>
      {children}
      <button
        className={`absolute w-full bottom-5 h-11 rounded-lg  mx-4 ${isInputValid ? "bg-neutral-200 text-neutral-450" : "bg-neutral-750 text-white"}`}
        disabled={isInputValid}
        onClick={handleNextClick}
      >
        {progress === 3 ? "시작하기" : "다음으로"}
      </button>
    </main>
  );
}

export default BoardContainer;