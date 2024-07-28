import { TriviaApiResponse } from "@/types";

// settriviaData
export const setTriviaData = (data: TriviaApiResponse) => {
  localStorage.setItem("triviaData", JSON.stringify(data));
};

// Mengambil data trivia dari localStorage
export const loadTriviaData = (): TriviaApiResponse | null => {
  const storedTriviaData = localStorage.getItem("triviaData");
  // Jika ada data trivia, kembalikan setelah di-parse, jika tidak, kembalikan null
  return storedTriviaData ? JSON.parse(storedTriviaData) : null;
};

// Menyimpan jawaban untuk soal tertentu di localStorage
export const saveAnswer = (questionIndex: number, answer: string) => {
  localStorage.setItem(`answer${questionIndex}`, answer);
};

// Mengambil jawaban yang telah disimpan untuk soal tertentu dari localStorage
export const getSavedAnswer = (questionIndex: number): string | null => {
  return localStorage.getItem(`answer${questionIndex}`);
};

