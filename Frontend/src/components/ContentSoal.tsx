import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SchemaContentSoal } from "@/lib/zodSchema";
import { useTrivia } from "@/hooks/useTrivia";
import { saveAnswer } from "@/services/TriviaService";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Soalitem from "@/components/common/Soalitem";
import { z } from "zod";

const ContentSoal: React.FC = () => {
  // Inisialisasi form dengan useForm dan Zod untuk validasi schema
  const form = useForm<z.infer<typeof SchemaContentSoal>>({
    resolver: zodResolver(SchemaContentSoal),
  });

  // Mengambil data dan state dari custom hook useTrivia
  const {
    triviaData,
    currentQuestionIndex,
    minutes,
    seconds,
    setCurrentQuestionIndex,
    navigate,
  } = useTrivia();

  // Fungsi untuk menangani submit jawaban
  const onSubmit = () => {
    triviaData &&
      (currentQuestionIndex < triviaData.results.length - 1
        ? setCurrentQuestionIndex(currentQuestionIndex + 1)
        : navigate("/hasil")); // Navigasi ke halaman hasil jika pertanyaan terakhir sudah terjawab
  };

  // Fungsi untuk kembali ke pertanyaan sebelumnya
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
    return <div>Loading...</div>; // Menampilkan pesan loading jika data belum tersedia
  }

  // Mendapatkan pertanyaan saat ini dari data trivia
  const currentQuestion = triviaData.results[currentQuestionIndex];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <div>
          <h1>Pertanyaan Trivia</h1>
          <p>
            Waktu tersisa: {`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}
          </p>
          <Soalitem
            questionIndex={currentQuestionIndex}
            question={currentQuestion.question}
            answers={[
              ...currentQuestion.incorrect_answers,
              currentQuestion.correct_answer,
            ]}
            onAnswerChange={(value) => {
              saveAnswer(currentQuestionIndex, value); // Menyimpan jawaban yang dipilih
            }}
            formControl={form.control}
          />
        </div>
        <div className="flex space-x-4">
          <Button
            type="button"
            onClick={handleBack}
            disabled={currentQuestionIndex === 0} // Disable tombol jika di pertanyaan pertama
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
  );
};

export default ContentSoal;
