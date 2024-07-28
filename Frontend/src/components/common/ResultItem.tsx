import React from "react";
import { TriviaApiResult } from "@/types";

interface ResultItemProps {
  index: number;
  question: TriviaApiResult;
}

const ResultItem: React.FC<ResultItemProps> = ({ index, question }) => {
  const selectedAnswer = localStorage.getItem(`answer${index}`);

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
      <div className={`mb-1 ${answerColor}`}>
        Jawaban Anda: <strong>{selectedAnswer ?? "No Answer"}</strong>
      </div>
      <div className="text-emerald-600">
        Jawaban Benar: <strong>{question.correct_answer}</strong>
      </div>
    </div>
  );
};

export default ResultItem;
