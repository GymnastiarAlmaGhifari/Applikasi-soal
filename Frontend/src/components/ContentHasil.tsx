import React from "react";
import { useTriviaResults } from "@/hooks/useTriviaResults";
import ResultItem from "@/components/common/ResultItem";
import { useNavigate } from "react-router-dom";

const ContentHasil: React.FC = () => {
  // Mengambil data hasil trivia, jumlah jawaban benar, dan jumlah jawaban salah dari custom hook useTriviaResults
  const { triviaData, correctCount, incorrectCount } = useTriviaResults();

  // Hook untuk navigasi menggunakan useNavigate dari react-router-dom
  const navigate = useNavigate();

  return (
    <div>
      <h1>Hasil Kuis</h1>
      <p>Jawaban Benar: {correctCount}</p>
      <p>Jawaban Salah: {incorrectCount}</p>
      <div>
        {/* Memetakan setiap pertanyaan ke komponen ResultItem untuk menampilkan hasilnya */}
        {triviaData.map((question, index) => (
          <ResultItem key={index} index={index} question={question} />
        ))}
      </div>
      <button
        onClick={() => {
          // Menghapus semua item dari localStorage kecuali item dengan kunci "user"
          Object.keys(localStorage).forEach((key) => {
            if (key !== "user") {
              localStorage.removeItem(key);
            }
          });

          // Navigasi ke halaman beranda
          navigate("/home");
        }}
      >
        Beranda
      </button>
    </div>
  );
};

export default ContentHasil;
