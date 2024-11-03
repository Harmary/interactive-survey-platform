export interface PollData {
  title: string;
  answers: string[];
  votes: number[];
  type: "multiple" | "single";
  submitted: boolean;
}
