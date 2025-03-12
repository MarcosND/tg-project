import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';

interface QuizDialogProps {
  open: boolean;
  questions: string[];
  setOpen: (open: boolean) => void;
  handleChange: (question: string, value: string) => void;
  handleSubmit: () => void;
}

const QuizDialog: React.FC<QuizDialogProps> = ({
  open,
  questions,
  setOpen,
  handleChange,
  handleSubmit,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      slotProps={{
        paper: {
          sx: {
            backgroundImage: `linear-gradient(rgba(245, 222, 179, 0.61), rgba(245, 222, 179, 0.575)), url(/assets/paper-texture.jpg)`,
            backgroundSize: 'cover',
            backgroundColor: '#f5f5dc',
            padding: '20px',
            boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.2)',
            border: '2px solid #3a3a3a',
            fontFamily: "'Special Elite', 'Courier New', monospace",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: '28px',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#3a3a3a',
        }}
      >
        Questionário de Investigação
      </DialogTitle>
      <DialogContent>
        {questions.map((question, index) => (
          <TextField
            key={index}
            label={question}
            variant="filled"
            fullWidth
            margin="dense"
            onChange={(e) => handleChange(question, e.target.value)}
            color="secondary"
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fdf7e3',
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: '#3a3a3a',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#000000',
              },
            }}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="secondary">
          Enviar Respostas
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuizDialog;
