import React, { useState } from "react";
import "./App.css";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { PollData } from "../widgets/Poll";
import Poll from "../widgets/Poll/ui/Poll";
import Header from "./header/ui/Header";
import CreatePollForm from "../widgets/CreatePollForm/ui/CreatePollForm";

function App() {
  const [polls, setPolls] = useState<PollData[]>([
    {
      title: "Ваш любимый цвет?",
      answers: ["Красный", "Синий", "Зеленый", "Желтый"],
      votes: [10, 20, 15, 5],
      type: "single",
      submitted: false,
    },
    {
      title: "Какие виды спорта вам нравятся?",
      answers: ["Футбол", "Баскетбол", "Теннис", "Хоккей"],
      votes: [25, 30, 10, 8],
      type: "multiple",
      submitted: false,
    },
    {
      title: "Какой ваш любимый сезон?",
      answers: ["Зима", "Весна", "Лето", "Осень"],
      votes: [12, 18, 22, 14],
      type: "single",
      submitted: false,
    },
    {
      title: "Какие жанры фильмов вы предпочитаете?",
      answers: ["Комедия", "Драма", "Ужасы", "Фантастика"],
      votes: [20, 15, 5, 10],
      type: "multiple",
      submitted: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const handleCreatePoll = (newPoll: PollData) => {
    setPolls([newPoll, ...polls]);
    setShowForm(false);
  };

  const handleAddPoll = () => {
    setShowForm(true);
  };

  return (
    <div className='App'>
      <Header onAddPoll={handleAddPoll} />
      <Container>
        <Stack
          spacing={4}
          sx={{
            mt: 2,
            mb: 2,
          }}
        >
          {showForm && <CreatePollForm onCreate={handleCreatePoll} />}
          {polls.map((poll, index) => (
            <Poll key={index} poll={poll} />
          ))}
        </Stack>
      </Container>
    </div>
  );
}

export default App;
