import React from "react";

import { Alert, AlertProps, Container, Stack } from "@mui/material";

import { Api } from "./api/api";
import socket from "./api/socket";
import Header from "./header/ui/Header";
import { PollData } from "../widgets/Poll";
import Poll from "../widgets/Poll/ui/Poll";
import CreatePollForm from "../widgets/CreatePollForm/ui/CreatePollForm";

function App() {
  const [polls, setPolls] = React.useState<PollData[]>([]);
  const [alert, setAlert] = React.useState<AlertProps>({});
  const [showForm, setShowForm] = React.useState(false);

  React.useEffect(() => {
    Api.getAllPolls().then((res) => {
      setPolls(res.data);
    });
    socket.on("pollCreated", (newPoll: PollData) => {
      setPolls((prev) => [...prev, newPoll]);
    });

    socket.on("pollDeleted", (id: number) => {
      setPolls((prev) => prev.filter((poll) => poll.id !== id));
    });

    socket.on("pollVoted", (updatedPoll: PollData) => {
      setPolls((prev) =>
        prev.map((poll) => (poll.id === updatedPoll.id ? updatedPoll : poll))
      );
    });

    return () => {
      socket.off("pollCreated");
      socket.off("pollDeleted");
      socket.off("pollVoted");
    };
  }, []);

  const handleCreatePoll = (newPoll: Omit<PollData, "id">) => {
    Api.createPoll(newPoll).catch(() => {
      setAlert({
        severity: "error",
        children: "Не удалось добавить опрос",
      });
    });
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
          {alert.severity && <Alert {...alert}></Alert>}
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
