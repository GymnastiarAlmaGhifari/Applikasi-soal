import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SchemaContentSoal } from "@/lib/zodSchema";
import { useTrivia } from "@/hooks/useTrivia";
import { saveAnswer } from "@/services/TriviaService";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Soalitem from "@/components/common/Soalitem";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";

const ContentSoal: React.FC = () => {
  const form = useForm<z.infer<typeof SchemaContentSoal>>({
    resolver: zodResolver(SchemaContentSoal),
  });

  const {
    triviaData,
    currentQuestionIndex,
    minutes,
    seconds,
    setCurrentQuestionIndex,
    navigate,
  } = useTrivia();

  const onSubmit = () => {
    triviaData &&
      (currentQuestionIndex < triviaData.results.length - 1
        ? setCurrentQuestionIndex(currentQuestionIndex + 1)
        : navigate("/hasil"));
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      localStorage.setItem(
        "lastQuestionIndex",
        (currentQuestionIndex - 1).toString()
      );
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  if (!triviaData) {
    return <div>Loading...</div>;
  }

  const currentQuestion = triviaData.results[currentQuestionIndex];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-2xl mx-2">
        <CardHeader>
          <CardTitle className="mx-auto">Pertanyaan Trivia</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="mb-4 text-center">
                <p className="font-semibold">
                  Waktu tersisa:{" "}
                  {`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}
                </p>
              </div>
              <div className="mb-6">
                <Soalitem
                  questionIndex={currentQuestionIndex}
                  question={currentQuestion.question}
                  answers={[
                    ...currentQuestion.incorrect_answers,
                    currentQuestion.correct_answer,
                  ]}
                  onAnswerChange={(value) => {
                    saveAnswer(currentQuestionIndex, value);
                  }}
                  formControl={form.control}
                />
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={handleBack}
                  disabled={currentQuestionIndex === 0}
                >
                  Kembali
                </Button>
                <Button type="submit">
                  {currentQuestionIndex === triviaData.results.length - 1
                    ? "Selesai"
                    : "Lanjut"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <span className="mx-auto text-sm text-gray-500">
            Pertanyaan {currentQuestionIndex + 1} dari{" "}
            {triviaData.results.length}
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ContentSoal;
