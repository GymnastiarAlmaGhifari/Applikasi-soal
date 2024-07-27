// Mengimpor hook dan tipe data yang diperlukan
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

// Hook kustom untuk menangani logika trivia
export const useTrivia = () => {
  // State untuk menyimpan data trivia, indeks soal saat ini, waktu yang tersisa, dan status timer
  const [triviaData, setTriviaData] = useState<TriviaApiResponse | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [minutes, setMinutes] = useState<number>(1);
  const [seconds, setSeconds] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  // Memuat data trivia saat komponen pertama kali dirender
  useEffect(() => {
    const data = loadTriviaData();
    if (data) {
      setTriviaData(data);
    } else {
      console.error("No trivia data found.");
    }
  }, []);

  // Memuat timer dari localStorage dan menghitung waktu yang telah berlalu
  useEffect(() => {
    const [storedMinutes, storedSeconds] = loadTimer();
    setMinutes(storedMinutes);
    setSeconds(storedSeconds);

    const storedLastIndex = localStorage.getItem("lastQuestionIndex");
    if (storedLastIndex) {
      setCurrentQuestionIndex(Number(storedLastIndex));
    }

    const lastUpdate = localStorage.getItem("lastUpdate");
    if (lastUpdate) {
      const [elapsedMinutes, elapsedSeconds] = calculateElapsedTime(
        lastUpdate,
        storedMinutes,
        storedSeconds
      );
      setMinutes(elapsedMinutes);
      setSeconds(elapsedSeconds);
    }
  }, []);

  // Menjalankan timer jika aktif dan mengupdate state menit dan detik
  useEffect(() => {
    if (isTimerActive) {
      timerRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            if (minutes === 0) {
              clearInterval(timerRef.current as NodeJS.Timeout);
              setIsTimerActive(false);
              clearTimer();
              navigate("/hasil");
              return 0;
            }
            setMinutes((prevMinutes) => prevMinutes - 1);
            return 59;
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000);

      return () => clearInterval(timerRef.current as NodeJS.Timeout);
    }
  }, [isTimerActive, minutes, seconds, navigate]);

  // Menyimpan timer saat menit atau detik berubah
  useEffect(() => {
    if (isTimerActive) {
      saveTimer(minutes, seconds);
      localStorage.setItem("lastUpdate", Date.now().toString());
    }
  }, [minutes, seconds]);

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
