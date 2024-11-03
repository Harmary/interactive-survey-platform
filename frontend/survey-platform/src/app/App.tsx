import React, { useState } from "react";
import "./App.css";
import { Alert, AlertProps, Container, Stack } from "@mui/material";
import { PollData } from "../widgets/Poll";
import Poll from "../widgets/Poll/ui/Poll";
import Header from "./header/ui/Header";
import CreatePollForm from "../widgets/CreatePollForm/ui/CreatePollForm";
import { Api } from "./api/api";

function App() {
  const [polls, setPolls] = useState<PollData[]>([]);
  const [alert, setAlert] = React.useState<AlertProps>({});
  const [showForm, setShowForm] = useState(false);

  React.useEffect(() => {
    Api.getAllPolls().then((res) => {
      setPolls(res.data);
    });
  }, []);

  const handleCreatePoll = (newPoll: Omit<PollData, "id">) => {
    Api.createPoll(newPoll)
      .then((res) => {
        setPolls((prev) => {
          return [res.data, ...prev];
        });
      })
      .catch(() => {
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
