import { useCallback, useEffect, useState } from "react";

function App() {
  let [length, setLength] = useState(0);
  let [styleslider, setStyleSlider] = useState(
    "linear-gradient(to right, #4ad85a 0%, #252429 0%)"
  );
  let [includeUpperCase, setIncludeUpperCase] = useState(false);
  let [includeLowerCase, setIncludeLowerCase] = useState(false);
  let [includeNumbers, setIncludeNumbers] = useState(false);
  let [includeSymbols, setIncludeSymbols] = useState(false);
  let [password, setPassword] = useState("");
  let [errMessage, setErrMessage] = useState("");
  let [copyDiv, setCopyDiv] = useState(true);
  let [strengthScore, setStrengthScore] = useState(0);
  const [strengthText, setStrengthText] = useState("");
  const [barStyles, setBarStyles] = useState([
    "border-stone-200 bg-transparent",
    "border-stone-200 bg-transparent",
    "border-stone-200 bg-transparent",
    "border-stone-200 bg-transparent",
  ]);

  const generatePassword = useCallback(() => {
    let charSet = "";
    password = "";

    if (includeUpperCase) charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowerCase) charSet += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charSet += "0123456789";
    if (includeSymbols) charSet += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (!charSet) {
      setErrMessage("Please select at least one character type");
      return;
    }

    if (!length) {
      setErrMessage("Please select a character length using slider");
      return;
    }

    const requiredChars = [];
    if (includeUpperCase)
      requiredChars.push(
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)]
      );
    if (includeLowerCase)
      requiredChars.push(
        "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)]
      );
    if (includeNumbers)
      requiredChars.push("0123456789"[Math.floor(Math.random() * 10)]);
    if (includeSymbols)
      requiredChars.push(
        "!@#$%^&*()_+~`|}{[]:;?><,./-="[Math.floor(Math.random() * 32)]
      );

    for (let i = 0; i < length; i++) {
      password += charSet[Math.floor(Math.random() * charSet.length)];
    }

    password += requiredChars.join("");

    password = password
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");

    setPassword(password);
    setErrMessage("");

    return password;
  }, [
    length,
    includeUpperCase,
    includeLowerCase,
    includeNumbers,
    includeSymbols,
    setPassword,
    setErrMessage,
  ]);

  const [isEvaluated, setIsEvaluated] = useState(false);

  useEffect(() => {
    if (!isEvaluated) {
      setIsEvaluated(true);
      return;
    }

    strengthScore =
      (includeUpperCase ? 1 : 0) +
      (includeLowerCase ? 1 : 0) +
      (includeNumbers ? 1 : 0) +
      (includeSymbols ? 2 : 0) +
      Math.floor(length / 8);
    setStrengthScore(strengthScore);

    setBarStyles([
      "border-stone-200 bg-transparent",
      "border-stone-200 bg-transparent",
      "border-stone-200 bg-transparent",
      "border-stone-200 bg-transparent",
    ]);

    if (strengthScore <= 2) {
      setStrengthText("TOO WEAK");
      setBarStyles([
        "border-red-500 bg-red-500",
        "border-stone-200 bg-transparent",
        "border-stone-200 bg-transparent",
        "border-stone-200 bg-transparent",
      ]);
    } else if (strengthScore <= 3) {
      setStrengthText("WEAK");
      setBarStyles([
        "border-orange-500 bg-orange-500",
        "border-orange-500 bg-orange-500",
        "border-stone-200 bg-transparent",
        "border-stone-200 bg-transparent",
      ]);
    } else if (strengthScore <= 4) {
      setStrengthText("MEDIUM");
      setBarStyles([
        "border-yellow-500 bg-yellow-500",
        "border-yellow-500 bg-yellow-500",
        "border-yellow-500 bg-yellow-500",
        "border-stone-200 bg-transparent",
      ]);
    } else {
      setStrengthText("STRONG");
      setBarStyles([
        "border-green-500 bg-green-500",
        "border-green-500 bg-green-500",
        "border-green-500 bg-green-500",
        "border-green-500 bg-green-500",
      ]);
    }
  }, [
    length,
    includeUpperCase,
    includeLowerCase,
    includeNumbers,
    includeSymbols,
  ]);

  const copyPassword = () => {
    const copiedPassword = password || "P4$5W0rD!";
    navigator.clipboard
      .writeText(copiedPassword)
      .then(() => {
        setCopyDiv(false);
        setTimeout(() => {
          setCopyDiv(true);
        }, 700);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <main className="w-md mx-auto my-0">
        <h1 className="text-lg mb-5 text-center font-family text-stone-100 opacity-60 font-light">
          Password Generator
        </h1>
        <section className="flex items-center justify-between h-14 py-0 px-4 mb-4 bg-stone-950 border-2 rounded-xs">
          <div>
            {password ? (
              <span className="text-stone-300 font-medium font-family text-lg">
                {password}
              </span>
            ) : (
              <span className="text-stone-500 font-medium font-family opacity-40 text-lg">
                P4$5W0rD!
              </span>
            )}
          </div>

          <button onClick={copyPassword}>
            {copyDiv ? (
              <div className="flex items-center gap-1 text-green-500 cursor-pointer font-normal opacity-80 text-xs hover:text-green-900">
                <span>COPY</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 42 24"
                  fill="currentColor"
                  className="size-6 stroke-green-500 stroke-1"
                >
                  <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
                  <path
                    className="fill-transparent"
                    d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z"
                  />
                </svg>
              </div>
            ) : (
              <span className="text-green-400 font-normal text-sm font-family">
                Copied!
              </span>
            )}
          </button>
        </section>

        <form className="bg-stone-950 border-2 rounded-xs py-6 px-5">
          <section className="flex items-center justify-between mb-2 px-2.5">
            <p className="text-stone-300 opacity-75 text-sm font-family font-normal">
              Character Length
            </p>
            <span className="text-2xl text-green-500 font-family">
              {length}
            </span>
          </section>

          <input
            type="range"
            className="w-full h-1.5 rounded-xs appearance-none cursor-pointer peer mb-7"
            style={{
              background: styleslider,
            }}
            min="1"
            max="25"
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
              setStyleSlider(
                `linear-gradient(to right, #4ad85a ${
                  ((e.target.value - e.target.min) /
                    (e.target.max - e.target.min)) *
                  100
                }%, #252429 ${
                  ((e.target.value - e.target.min) /
                    (e.target.max - e.target.min)) *
                  100
                }%)`
              );
              setErrMessage("");
            }}
          />

          <section className="mb-7">
            <div className="flex items-center mb-3 gap-4">
              <input
                type="checkbox"
                name="password-includes"
                className="relative peer appearance-none w-4 h-4 bg-transparent border-2 border-green-100 mt-1 checked:bg-green-500 checked:border-0 cursor-pointer hover:border-green-500"
                defaultChecked={includeUpperCase}
                onChange={(e) => {
                  setIncludeUpperCase(e.target.checked);
                  setErrMessage("");
                }}
              />
              <label
                htmlFor="uppercase-letters"
                className="text-stone-300 font-medium font-family text-sm mt-1"
              >
                Include Uppercase Letters
              </label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                className="size-6 absolute w-4 h-4 mt-1 text-black hidden peer-checked:block pointer-events-none"
              >
                <path
                  fillRule="evenodd"
                  d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="flex items-center mb-3 gap-4">
              <input
                type="checkbox"
                name="password-includes"
                className="relative peer appearance-none w-4 h-4 bg-transparent border-2 border-green-100 mt-1 checked:bg-green-400 checked:border-0 cursor-pointer hover:border-green-500"
                defaultChecked={includeLowerCase}
                onChange={(e) => {
                  setIncludeLowerCase(e.target.checked);
                  setErrMessage("");
                }}
              />
              <label
                htmlFor="lowercase-letters"
                className="text-stone-300 font-medium font-family text-sm mt-1"
              >
                Include Lowercase Letters
              </label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                className="size-6 absolute w-4 h-4 mt-1 text-black hidden peer-checked:block pointer-events-none"
              >
                <path
                  fillRule="evenodd"
                  d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="flex items-center mb-3 gap-4">
              <input
                type="checkbox"
                name="password-includes"
                className="relative peer appearance-none w-4 h-4 bg-transparent border-2 border-green-100 mt-1 checked:bg-green-400 checked:border-0 cursor-pointer hover:border-green-500"
                defaultChecked={includeNumbers}
                onChange={(e) => {
                  setIncludeNumbers(e.target.checked);
                  setErrMessage("");
                }}
              />
              <label
                htmlFor="numbers"
                className="text-stone-300 font-medium font-family text-sm mt-1"
              >
                Include Numbers
              </label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                className="size-6 absolute w-4 h-4 mt-1 text-black hidden peer-checked:block pointer-events-none"
              >
                <path
                  fillRule="evenodd"
                  d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="flex items-center mb-3 gap-4">
              <input
                type="checkbox"
                name="password-includes"
                className="relative peer appearance-none w-4 h-4 bg-transparent border-2 border-green-100 mt-1 checked:bg-green-400 checked:border-0 cursor-pointer hover:border-green-500"
                defaultChecked={includeSymbols}
                onChange={(e) => {
                  setIncludeSymbols(e.target.checked);
                  setErrMessage("");
                }}
              />
              <label
                htmlFor="symbols"
                className="text-stone-300 font-medium font-family text-sm mt-1"
              >
                Include Symbols
              </label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                className="size-6 absolute w-4 h-4 mt-1 text-black hidden peer-checked:block pointer-events-none"
              >
                <path
                  fillRule="evenodd"
                  d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </section>

          <div className="flex items-center justify-between h-12 bg-black py-0 px-4 mb-4">
            <span className="text-stone-300 opacity-50 text-sm font-family">
              STRENGTH
            </span>
            <div className="flex gap-2">
              <span className="font-family text-stone-300 font-medium">
                {strengthText}
              </span>
              <div className="flex gap-1">
                {barStyles.map((style, index) => (
                  <div
                    key={index}
                    className={`w-2 h-6 border-2 ${style}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2.5 w-full border-2 bg-green-500 cursor-pointer h-14 font-family font-medium text-md text-black hover:bg-transparent hover:border-green-500 hover:text-green-500"
            onClick={(e) => {
              e.preventDefault();
              generatePassword();
            }}
          >
            <span>GENERATE</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 35 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
          <div className="text-red-500 font-medium font-family text-sm text-center mt-2.5">
            {errMessage}
          </div>
        </form>
      </main>
    </div>
  );
}

export default App;
