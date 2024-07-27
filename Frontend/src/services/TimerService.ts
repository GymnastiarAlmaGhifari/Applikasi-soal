// Mengambil nilai timer (menit dan detik) dari localStorage
export const loadTimer = (): [number, number] => {
  const storedTimer = localStorage.getItem("quizTimer");
  if (storedTimer) {
    // Jika ada data timer, pisahkan menit dan detik
    const [storedMinutes, storedSeconds] = storedTimer.split(":").map(Number);
    return [storedMinutes, storedSeconds];
  }
  // Jika tidak ada data timer, kembalikan nilai default
  return [1, 0]; // Nilai default timer
};

// Menyimpan nilai timer (menit dan detik) ke localStorage
export const saveTimer = (minutes: number, seconds: number) => {
  localStorage.setItem(
    "quizTimer",
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  );
};

// Menghapus data timer dari localStorage
export const clearTimer = () => {
  localStorage.removeItem("quizTimer");
  localStorage.removeItem("lastUpdate");
};

// Menghitung waktu yang telah berlalu sejak update terakhir
export const calculateElapsedTime = (
  lastUpdate: string,
  minutes: number,
  seconds: number
): [number, number] => {
  // Hitung selisih waktu dalam detik
  const elapsed = Math.floor((Date.now() - Number(lastUpdate)) / 1000);
  const totalSeconds = minutes * 60 + seconds - elapsed;
  return totalSeconds > 0
    ? [Math.floor(totalSeconds / 60), totalSeconds % 60]
    : [0, 0]; // Jika waktu telah habis, kembalikan [0, 0]
};
