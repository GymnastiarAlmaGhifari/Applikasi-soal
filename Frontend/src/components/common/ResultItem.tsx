import React from "react";
import { TriviaApiResult } from "@/types";

interface ResultItemProps {
  index: number;
  question: TriviaApiResult;
}

const ResultItem: React.FC<ResultItemProps> = ({ index, question }) => {
  // Retrieve the selected answer from localStorage based on the question index
  const selectedAnswer = localStorage.getItem(`answer${index}`);

  // Determine the color for the selected answer: green if correct, red if incorrect
  const answerColor =
    selectedAnswer === question.correct_answer
      ? "text-green-500"
      : "text-red-500";

  return (
    <div className="py-4 border-b border-gray-300">
      <h2 className="mb-2 text-lg font-bold">
        Q{index + 1}:{" "}
        <span dangerouslySetInnerHTML={{ __html: question.question }} />
      </h2>
      <p className={`mb-1 ${answerColor}`}>
        Jawaban Anda: <strong>{selectedAnswer ?? "No Answer"}</strong>
      </p>
      <p className="text-emerald-600">
        Jawaban Benar: <strong>{question.correct_answer}</strong>
      </p>
    </div>
  );
};

export default ResultItem;
