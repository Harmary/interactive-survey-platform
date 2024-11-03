import React from "react";
import { Box, Container, Typography, Button, Grid2 } from "@mui/material";
import { grey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";

interface HeaderProps {
  onAddPoll: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddPoll }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100px",
        backgroundColor: grey[100],
      }}
    >
      <Container
        sx={{
          height: "inherit",
        }}
      >
        <Grid2
          container
          justifyContent='space-between'
          alignItems='center'
          sx={{
            height: "inherit",
          }}
        >
          <Typography variant='h4'>Опросы</Typography>
          <Button
            variant='contained'
            endIcon={<AddIcon />}
            onClick={() => onAddPoll()}
          >
            Добавить опрос
          </Button>
        </Grid2>
      </Container>
    </Box>
  );
};

export default Header;
