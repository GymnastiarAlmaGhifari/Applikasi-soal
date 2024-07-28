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
  FormLabel,
  FormItem,
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
import { SchemaCreateSoal } from "@/lib/zodSchema";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { saveTimer } from "@/services/TimerService";
import { setTriviaData } from "@/services/TriviaService";

const CreateSoal: React.FC = () => {
  const form = useForm<CreateQuizFormValues>({
    resolver: zodResolver(SchemaCreateSoal),
    defaultValues: {
      category: "",
      amount: 5,
      difficulty: "",
      type: "",
      timer: 5, // Default timer value as a number
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data: z.infer<typeof SchemaCreateSoal>) => {
    const url = buildTriviaApiUrl(data);

    try {
      const response = await fetch(url);
      const triviaData: TriviaApiResponse = await response.json();

      setTriviaData(triviaData);
      saveTimer(data.timer, 0); // Save timer value to localStorage

      navigate("/soal");
    } catch (error) {
      console.error("Error fetching trivia questions:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md mx-2">
        <CardHeader>
          <CardTitle className="mx-auto">Create Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="multiple">
                          Multiple Choice
                        </SelectItem>
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
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter />
      </Card>
    </div>
  );
};

export default CreateSoal;
