import React, {useState, useEffect} from 'react'
import '../styles/TriviaApp.css';
const TriviaApp = () => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch('https://the-trivia-api.com/v2/questions');
        const json = await response.json();
        setQuestions(json);
    }
    fetchData();
  }, []); 

  return (
    <>
    <div>
        {questions.map((question, index) => (
        <div key={index}>
          <RenderQuestion questionInput={question} index={index}/>
        </div>
      ))}
    </div>
    </>
  );
}

const RenderQuestion = ({questionInput, index}) => {
    const [question,setQuest] = useState(questionInput);
    const [shuffledChoices, setShuffledChoices] = useState(() => {
      const combinedChoices = [question.correctAnswer, ...question.incorrectAnswers]
      return combinedChoices.sort(() => 0.5 - Math.random());
    });

    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const handleChoiceSelection = (choice) => {
      setSelectedAnswer(choice.target.value);
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
