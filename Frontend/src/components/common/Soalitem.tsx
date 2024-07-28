import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Control } from "react-hook-form";
import { z } from "zod";
import { SchemaContentSoal } from "@/lib/zodSchema";

interface SoalitemProps {
  questionIndex: number;
  question: string;
  answers: string[];
  onAnswerChange: (value: string) => void;
  formControl: Control<z.infer<typeof SchemaContentSoal>>;
}

const Soalitem: React.FC<SoalitemProps> = ({
  questionIndex,
  question,
  answers,
  onAnswerChange,
  formControl,
}) => {
  return (
    <div className="question">
      <h2>
        Q{questionIndex + 1}: {question}
      </h2>
      <fieldset>
        {/* Gunakan RadioGroup untuk mengelompokkan pilihan jawaban */}
        <FormField
          control={formControl}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                {/* RadioGroup mengelola nilai yang dipilih */}
                <RadioGroup
                  value={field.value} // Mengatur nilai yang dipilih dari kontrol form
                  onValueChange={(value) => {
                    field.onChange(value); // Update nilai kontrol form
                    onAnswerChange(value); // Callback untuk perubahan jawaban
                  }}
                  className="flex flex-col mt-2"
                >
                  {answers.sort().map((answer, index) => (
                    <FormItem key={index} className="flex items-center gap-3">
                      <FormControl>
                        {/* RadioGroupItem untuk setiap jawaban */}
                        <RadioGroupItem value={answer} />
                      </FormControl>
                      <FormLabel className="font-normal">{answer}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </fieldset>
    </div>
  );
};

export default Soalitem;
