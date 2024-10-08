"use client";
import clsx from "clsx";
import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

type AuthFormProps = {
  label: string;
  labelColor: string;
  placeholder?: string;
  isPassword?: boolean;
  isInputValid: boolean;
  value?: string;
  onSubmit: (value: string) => void;
  onChange: (value: string) => void;
};

function AuthForm({
  label,
  placeholder = "",
  labelColor,
  isPassword = false,
  isInputValid = true,
  value = "",
  onSubmit,
  onChange,
}: AuthFormProps) {
  const [isInputPassword, setIsPassword] = useState<boolean>(isPassword);
  const inputRef = useRef<HTMLInputElement>(null);

  const textColor = clsx({
    "text-primary": labelColor === "black",
    "text-danger-500": labelColor === "red",
    "text-info-600": labelColor === "green",
  });

  const borderColor = clsx({
    "focus:border-danger-500": labelColor === "red",
    "focus:border-info-600": labelColor === "green",
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // input change마다 상태가 바뀌게하는 함수
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const input = e.currentTarget.value;
    onChange(input);
  };

  // submit 될때 supabase 로직 넣는 함수
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = inputRef.current?.value as string;
    onSubmit(value);
  };

  // 비밀번호 눈 아이콘 클릭 시
  const handleEyeClick = () => {
    setIsPassword(!isInputPassword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className={clsx("text-[14px]", textColor)}>
        {label}
        <div className="relative">
          <input
            onChange={handleChange}
            ref={inputRef}
            placeholder={placeholder}
            type={isInputPassword ? "password" : "text"}
            autoComplete="new-password"
            defaultValue={value}
            readOnly={value ? true : false}
            className={`w-full h-[48px] text-[20px] text-black border-b border-black bg-transparent focus:outline-none focus:border-[#D5EF2D] placeholder:text-gray-300 md:border md:rounded-lg md:px-4 md:border-neutral-200 ${labelColor !== "black" ? borderColor : ""}`}
          />
          {isPassword && (
            <Image
              src={`/icon/login/${
                isInputPassword ? "password-eye-crossed" : "password-eye"
              }.svg`}
              width={18}
              height={18}
              alt="password icon"
              onClick={handleEyeClick}
              className="absolute top-[15px] right-[15px] cursor-pointer"
            />
          )}
        </div>
      </label>
      <button
        disabled={isInputValid}
        className="w-full h-[48px] bg-neutral-750 text-white text-center text-[18px] rounded-md mt-[96px] disabled:bg-[#CECECE]"
      >
        계속하기
      </button>
    </form>
  );
}

export default AuthForm;
