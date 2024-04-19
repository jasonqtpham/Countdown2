import React, {useState, useEffect} from 'react'
import '../styles/TriviaApp.css';
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
          <div key={index} className={choiceClassName}>
              <input
                  type="radio"
                  name={question.question.text}
                  value={choice}
                  onChange={handleChoiceSelection}
                  checked={isSelected}
              />
              <label>{choice}</label>
          </div>
      );
    });

    return (
        <>
        <div>
        <p>Question {index + 1}: {question.question.text}</p>
            {choices} 
        </div>
        </>
    )
}
export default TriviaApp
