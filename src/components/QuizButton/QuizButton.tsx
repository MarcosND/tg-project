import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { evaluateAnswers } from '../../utils/openai';

interface QuizDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleChange: (question: string, value: string) => void;
  handleSubmit: () => void;
}

export interface Answers {
  [key: string]: string;
}

const questions = [
  'Quem foi o assassino?',
  'Qual foi a arma utilizada e onde foi encontrada?',
  'Qual foi a motivação para o crime?',
  'Qual o horário aproximado do assassinato?',
  'Onde o assassinato aconteceu?',
  'Quem mais esteve diretamente envolvido no assassinato?',
  'Quem foi incriminado?',
  'Como a arma do crime chegou nas mãos do assassino?',
];

const correctAnswers: Answers = {
  'Quem foi o assassino?': 'Laura Hermann',
  'Qual foi a arma utilizada e onde foi encontrada?':
    'Revólver calibre .38, encontrada no carro de Paulo Yohen',
  'Qual foi a motivação para o crime?':
    'Laura desejava obter o controle da empresa e era contra a sua venda, ela também queria incriminar Paulo Yohen para que ele não conseguisse comprar a empresa e tivesse que se livrar das suas ações',
  'Qual o horário aproximado do assassinato?': 'Entre 22h e 23h',
  'Onde o assassinato aconteceu?':
    'Na área externa da piscina da mansão de Fabrício Lehmann',
  'Quem mais esteve diretamente envolvido no assassinato?':
    'Alfredo, o mordomo',
  'Quem foi incriminado?': 'Paulo Yohen, o sócio',
  'Como a arma do crime chegou nas mãos do assassino?':
    'Laura combinou com Alfredo para que ele colocasse um sonífero em seu suco, enquanto ele dormia ele pegou a chave do seu carro e pegou a arma no porta-luvas, então ele colocou a arma no bolso de um casaco de Laura e o entregou para ela durante a conversa deles na área externa',
};

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
        <Button
          onClick={() => setOpen(false)}
          color="primary"
          style={{ fontWeight: 'bold' }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          style={{ fontWeight: 'bold' }}
        >
          Enviar Respostas
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const QuizButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<Answers>({});

  const handleChange = (question: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  };

  const handleSubmit = async () => {
    console.log('Respostas enviadas: ', answers);
    const result = await evaluateAnswers(answers, correctAnswers);
    console.log('Seu score foi: ', result);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        style={{ padding: '10px 20px', fontSize: '16px', fontWeight: 'bold' }}
      >
        Resolver Mistério
      </Button>
      <QuizDialog
        open={open}
        setOpen={setOpen}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default QuizButton;
