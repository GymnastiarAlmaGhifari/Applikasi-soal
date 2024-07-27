export interface TriviaApiResult {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface TriviaApiResponse {
  response_code: number;
  results: TriviaApiResult[];
}

export interface CreateQuizFormValues {
  category: string;
  amount: number;
  difficulty: string;
  type: string;
  timer: number;
}
