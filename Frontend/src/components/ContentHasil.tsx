import React from "react";
import { useTriviaResults } from "@/hooks/useTriviaResults";
import ResultItem from "@/components/common/ResultItem";
import { useNavigate } from "react-router-dom";
import {
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ContentHasil: React.FC = () => {
  const { triviaData, correctCount, incorrectCount, answeredCount } =
    useTriviaResults();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-lg mx-2">
        <CardHeader>
          <CardTitle className="mx-auto">Result Quiz</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-between px-4 sm:flex-row">
          <div>Correct Answer: {correctCount}</div>
          <div>Incorrect Answer: {incorrectCount}</div>
          <div>Answered Question: {answeredCount}</div>
        </CardContent>
        <CardContent className="max-h-[800px] overflow-y-auto mt-4">
          <div className="space-y-4">
            {triviaData.map((question, index) => (
              <ResultItem key={index} index={index} question={question} />
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end mt-4">
          <Button
            onClick={() => {
              Object.keys(localStorage).forEach((key) => {
                if (key !== "user") {
                  localStorage.removeItem(key);
                }
              });
              navigate("/home");
            }}
          >
            Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ContentHasil;
