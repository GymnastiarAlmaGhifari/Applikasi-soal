import React from "react";
import { TriviaApiResult } from "@/types";

interface ResultItemProps {
  index: number;
  question: TriviaApiResult;
}

const ResultItem: React.FC<ResultItemProps> = ({ index, question }) => {
  // Mengambil jawaban yang dipilih dari localStorage berdasarkan indeks soal
  const selectedAnswer = localStorage.getItem(`answer${index}`);

  return (
    <div>
      <h2>
        Q{index + 1}: {question.question}
      </h2>
      <p>
        Jawaban Anda:{" "}
        <strong
          style={{
            color: selectedAnswer === question.correct_answer ? "green" : "red",
          }}
        >
          {selectedAnswer ?? "Tidak ada jawaban"}
        </strong>
      </p>
      <p>Jawaban Benar: {question.correct_answer}</p>
    </div>
  );
};

export default ResultItem;
