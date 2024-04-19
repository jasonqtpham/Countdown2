import React, {useState, useEffect} from 'react'
import '../styles/TriviaApp.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const TriviaApp = () => {
  const [questions, setQuestions] = useState([]);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch('https://the-trivia-api.com/v2/questions');
        const json = await response.json();
        setQuestions(json);
    }
    fetchData();
    console.log(refresh)
  }, [refresh]); 

  return (
    <>
    <h1> Trivia Game </h1>
    <button onClick={() => setRefresh(refresh+1)}>Refresh Questions</button>
    <div>
        {questions.map((question, index) => (
        <div key={index}>
          <RenderQuestion question={question} index={index}/>
        </div>
      ))}
    </div>
    </>
  );
}

const RenderQuestion = ({question, index}) => {
    const [shuffledChoices, setShuffledChoices] = useState([]);
   
    useEffect(() => {
        const combinedChoices = [question.correctAnswer, ...question.incorrectAnswers];
        setShuffledChoices(combinedChoices.sort(() => 0.5 - Math.random()));
    }, [question]);

    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const handleChoiceSelection = (event) => {
      setSelectedAnswer(event.target.value);
    };
    
    const choices = shuffledChoices.map((choice, index) => {
        const isCorrect = (choice === question.correctAnswer);
        const isSelected = (choice === selectedAnswer);
        const choiceClassName = isSelected ? (isCorrect ? 'correct' : 'incorrect') : '';
        return (
          <FormControlLabel
          key={index}
          value={choice}
          control={<Radio />}
          label={choice}
          className={choiceClassName}
          />
      );
    });

    return (
      <>
      <div>
          <p>Question {index + 1}: {question.question.text}</p>
          <FormControl component="fieldset">
              <RadioGroup value={selectedAnswer} onChange={handleChoiceSelection}>
                  {choices}
              </RadioGroup>
          </FormControl>
      </div>
  </>
    )
}
export default TriviaApp
