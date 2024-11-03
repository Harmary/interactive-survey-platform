export interface PollData {
  id: number;
  title: string;
  answers: string[];
  votes: number[];
  type: "multiple" | "single";
  submitted: boolean;
}
