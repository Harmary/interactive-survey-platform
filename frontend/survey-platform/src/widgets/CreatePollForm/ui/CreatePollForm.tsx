import React, { useState } from "react";
import {
  Box,
  Button,
  Grid2,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { PollData } from "../../Poll";

interface CreatePollFormProps {
  onCreate: (poll: Omit<PollData, "id">) => void;
}

const CreatePollForm: React.FC<CreatePollFormProps> = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [answers, setAnswers] = useState<string[]>([""]);
  const [type, setType] = useState<"multiple" | "single">("single");

  const handleAddAnswer = () => {
    setAnswers([...answers, ""]);
  };

  const handleRemoveAnswer = (index: number) => {
    setAnswers(answers.filter((_, i) => i !== index));
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const isFormValid =
    title.trim() !== "" && answers.every((answer) => answer.trim() !== "");

  const handleSubmit = () => {
    const newPoll = {
      title,
      answers,
      votes: new Array(answers.length).fill(0),
      type,
      submitted: false,
    };
    onCreate(newPoll);
    setTitle("");
    setAnswers([""]);
    setType("single");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        height: "fit-content",
        padding: 2,
      }}
    >
      <Typography variant='h6' gutterBottom>
        Создать новый опрос
      </Typography>
      <Stack spacing={2}>
        <TextField
          fullWidth
          label='Заголовок опроса'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Тип опроса</FormLabel>
          <RadioGroup
            row
            value={type}
            onChange={(e) => setType(e.target.value as "multiple" | "single")}
          >
            <FormControlLabel
              value='single'
              control={<Radio />}
              label='Одиночный выбор'
            />
            <FormControlLabel
              value='multiple'
              control={<Radio />}
              label='Множественный выбор'
            />
          </RadioGroup>
        </FormControl>

        {answers.map((answer, index) => (
          <Box key={index}>
            <TextField
              fullWidth
              label={`Ответ ${index + 1}`}
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
            <IconButton
              onClick={() => handleRemoveAnswer(index)}
              disabled={answers.length === 1}
            >
              <RemoveIcon />
            </IconButton>
            {index === answers.length - 1 && (
              <IconButton onClick={handleAddAnswer}>
                <AddIcon />
              </IconButton>
            )}
          </Box>
        ))}
        <Grid2>
          <Button
            variant='contained'
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Создать опрос
          </Button>
        </Grid2>
      </Stack>
    </Paper>
  );
};

export default CreatePollForm;
