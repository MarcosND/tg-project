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
  setOpen: (open: boolean) => void;
  handleChange: (question: string, value: string) => void;
  handleSubmit: () => void;
}

const questions = [
  'Quem assassinou Fabrício Lehmann?',
  'Qual foi a arma utilizada e onde foi encontrada?',
  'Qual foi a motivação para o crime?',
  'Qual o horário aproximado do assassinato?',
  'Onde o assassinato aconteceu?',
  'Quem mais esteve diretamente envolvido no assassinato?',
  'Quem foi incriminado?',
  'Tente sua melhor teoria sobre qual foi o plano para realizar o crime',
];

const QuizDialog: React.FC<QuizDialogProps> = ({
  open,
  setOpen,
  handleChange,
  handleSubmit,
}) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle
        style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}
      >
        Questionário de Investigação
      </DialogTitle>
      <DialogContent>
        {questions.map((question, index) => (
          <TextField
            key={index}
            label={question}
            variant="outlined"
            fullWidth
            margin="dense"
            onChange={(e) => handleChange(question, e.target.value)}
            style={{ marginBottom: '10px' }}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Enviar Respostas
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuizDialog;
