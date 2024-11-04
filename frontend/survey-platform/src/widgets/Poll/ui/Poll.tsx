import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid2,
  LinearProgress,
  Paper,
  Radio,
  Typography,
} from "@mui/material";
import React from "react";
import { Api } from "../../../app/api/api";
import { PollData } from "../model/types";

interface PollProps {
  poll: PollData;
}

const Poll: React.FC<PollProps> = React.memo(({ poll }) => {
  const [selectedAnswers, setSelectedAnswers] = React.useState<number[]>([]);
  const totalVotes = poll.votes.reduce((acc, votes) => acc + votes, 0);
  const [isSubmitted, setIsSubmitted] = React.useState(poll.submitted);

  React.useEffect(() => {
    setIsSubmitted(poll.submitted);
  }, [poll.submitted]);

  const handleChange = (index: number) => {
    if (poll.type === "single") {
      setSelectedAnswers([index]);
    } else {
      setSelectedAnswers((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    }
  };

  const handleSubmit = () => {
    selectedAnswers.forEach((index) => {
      poll.votes[index] += 1;
      Api.voteInPoll(poll.id, index).then((response) => {
        poll.votes = response.data.votes;
        setIsSubmitted(true);
        poll.submitted = true;
      });
    });
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
      <Grid2 container direction='column' spacing={2}>
        <Grid2>
          <Typography variant='h6'>{poll.title}</Typography>
        </Grid2>

        {poll.answers.map((answer, index) => (
          <Grid2 key={index}>
            {!isSubmitted && (
              <FormControlLabel
                control={
                  poll.type === "single" ? (
                    <Radio
                      checked={selectedAnswers.includes(index)}
                      onChange={() => handleChange(index)}
                    />
                  ) : (
                    <Checkbox
                      checked={selectedAnswers.includes(index)}
                      onChange={() => handleChange(index)}
                    />
                  )
                }
                label={answer}
              />
            )}

            {isSubmitted && (
              <>
                <FormLabel>{answer}</FormLabel>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Box sx={{ width: "100%", mr: 1 }}>
                    <LinearProgress
                      variant='determinate'
                      value={(poll.votes[index] / totalVotes) * 100}
                    />
                  </Box>
                  <Box sx={{ minWidth: 35 }}>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                    >{`${Math.round(
                      (poll.votes[index] / totalVotes) * 100
                    )}%`}</Typography>
                  </Box>
                </Box>
              </>
            )}
          </Grid2>
        ))}

        {!isSubmitted && (
          <Grid2>
            <Button variant='contained' onClick={handleSubmit}>
              Проголосовать
            </Button>
          </Grid2>
        )}

        {isSubmitted && (
          <Grid2>
            <Typography variant='body1'>Спасибо за ваш голос!</Typography>
          </Grid2>
        )}
      </Grid2>
    </Paper>
  );
});

export default Poll;
