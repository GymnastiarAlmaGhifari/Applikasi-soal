import { useEffect, useState } from "react";
import { TriviaApiResult } from "@/types";

// Hook kustom untuk menangani hasil trivia
export const useTriviaResults = () => {
  // State untuk menyimpan data trivia, jumlah jawaban benar, dan jumlah jawaban salah
  const [triviaData, setTriviaData] = useState<TriviaApiResult[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  // Mengambil data trivia dan jawaban dari localStorage saat komponen pertama kali dirender
  useEffect(() => {
    const storedTriviaData = localStorage.getItem("triviaData");
    if (storedTriviaData) {
      const parsedTriviaData = JSON.parse(storedTriviaData).results;
      setTriviaData(parsedTriviaData);

      let correct = 0;
      let incorrect = 0;
      let answered = 0;

      // Menghitung jumlah jawaban benar, salah, dan yang dijawab berdasarkan data yang disimpan di localStorage
      parsedTriviaData.forEach((question: TriviaApiResult, index: number) => {
        const selectedAnswer = localStorage.getItem(`answer${index}`);
        if (selectedAnswer) {
          answered++;
          if (selectedAnswer === question.correct_answer) {
            correct++;
          } else {
            incorrect++;
          }
        }
      });

      // Menyimpan jumlah jawaban benar, salah, dan yang dijawab ke dalam state
      setCorrectCount(correct);
      setIncorrectCount(incorrect);
      setAnsweredCount(answered);
    } else {
      console.error("No trivia data found.");
    }
  }, []);

  return { triviaData, correctCount, incorrectCount, answeredCount };
};
