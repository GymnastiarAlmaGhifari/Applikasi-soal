import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { buildTriviaApiUrl } from "@/api/api";
import { TriviaApiResponse, CreateQuizFormValues } from "@/types";
import { useNavigate } from "react-router-dom";

// Schema validasi form menggunakan Zod
const FormSchema = z.object({
  category: z.string().nonempty("Category is required"), // Kategori harus diisi
  amount: z
    .number()
    .min(5, "Minimum number of questions is 5") // Jumlah pertanyaan minimal 5
    .nonnegative("Amount is required"),
  difficulty: z.string().optional().default(""), // Tingkat kesulitan opsional
  type: z.string().optional().default(""), // Tipe pertanyaan opsional
  timer: z.number().optional().default(5), // Waktu default 5 menit
});

const CreateSoal: React.FC = () => {
  // Mengatur form dengan useForm dan resolver Zod
  const form = useForm<CreateQuizFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: "",
      amount: 5,
      difficulty: "",
      type: "",
      timer: 5 as number, // Nilai default timer dalam bentuk number
    },
  });

  // Hook untuk navigasi
  const navigate = useNavigate();

  // Fungsi untuk menangani submit form
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const url = buildTriviaApiUrl(data); // Membangun URL berdasarkan data form

    try {
      const response = await fetch(url); // Mengambil data dari API
      const triviaData: TriviaApiResponse = await response.json();

      // Menyimpan data trivia dan timer ke localStorage
      localStorage.setItem("triviaData", JSON.stringify(triviaData));
      localStorage.setItem("quizTimer", data.timer.toString());

      // Mengarahkan ke halaman soal
      navigate("/soal");
    } catch (error) {
      console.error("Error fetching trivia questions:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 text-red-600"
      >
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="21">Sports</SelectItem>
                  <SelectItem value="22">Geography</SelectItem>
                  <SelectItem value="27">Animals</SelectItem>
                  <SelectItem value="28">Vehicles</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Amount"
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Difficulty</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="multiple">Multiple Choice</SelectItem>
                  <SelectItem value="boolean">True/False</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timer (Minutes)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Timer"
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CreateSoal;
