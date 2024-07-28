import { useState, useEffect, useRef } from "react";
import { TriviaApiResponse } from "@/types";
import { useNavigate } from "react-router-dom";
import { loadTriviaData } from "@/services/TriviaService";
import {
  loadTimer,
  saveTimer,
  clearTimer,
  calculateElapsedTime,
} from "@/services/TimerService";

export const useTrivia = () => {
  const [triviaData, setTriviaData] = useState<TriviaApiResponse | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const initializeTime = () => {
    const [storedMinutes, storedSeconds] = loadTimer();
    return [storedMinutes || 1, storedSeconds || 0]; // Default to 1 minute if no data is found
  };

  const [[minutes, seconds], setTime] = useState(initializeTime);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    const data = loadTriviaData();
    if (data) {
      setTriviaData(data);
    } else {
      console.error("No trivia data found.");
    }
  }, []);

  useEffect(() => {
    const storedLastIndex = localStorage.getItem("lastQuestionIndex");
    if (storedLastIndex) {
      setCurrentQuestionIndex(Number(storedLastIndex));
    }

    const lastUpdate = localStorage.getItem("lastUpdate");
    if (lastUpdate) {
      const [elapsedMinutes, elapsedSeconds] = calculateElapsedTime(
        lastUpdate,
        minutes,
        seconds
      );
      setTime([elapsedMinutes, elapsedSeconds]);
    }
  }, [minutes, seconds]);

  useEffect(() => {
    if (isTimerActive) {
      timerRef.current = setInterval(() => {
        setTime(([prevMinutes, prevSeconds]) => {
          if (prevSeconds === 0) {
            if (prevMinutes === 0) {
              clearInterval(timerRef.current as NodeJS.Timeout);
              setIsTimerActive(false);
              clearTimer();
              navigate("/hasil");
              return [0, 0];
            }
            return [prevMinutes - 1, 59];
          } else {
            return [prevMinutes, prevSeconds - 1];
          }
        });
      }, 1000);

      return () => clearInterval(timerRef.current as NodeJS.Timeout);
    }
  }, [isTimerActive, minutes, seconds, navigate]);

  useEffect(() => {
    if (isTimerActive) {
      saveTimer(minutes, seconds);
      localStorage.setItem("lastUpdate", Date.now().toString());
    }
  }, [minutes, seconds, isTimerActive]);

  return {
    triviaData,
    currentQuestionIndex,
    minutes,
    seconds,
    isTimerActive,
    setCurrentQuestionIndex,
    navigate,
    timerRef,
  };
};
