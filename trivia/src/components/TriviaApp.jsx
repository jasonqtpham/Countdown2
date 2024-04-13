import React, {useState, useEffect} from 'react'

const TriviaApp = () => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch('https://opentdb.com/api.php?amount=10');
        const json = await response.json();
        // debugging
        console.log(JSON.stringify(json));

        setQuestions(json.results);
    }

    fetchData();
  }, []); 

  return (
    <>
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
    const combinedChoices = [question.correct_answer, ...question.incorrect_answers];
    const shuffledChoices = combinedChoices.sort((a,b) => 0.5 - Math.random());
    // console.log(shuffledAnswers)
    const choices = shuffledChoices.map((choice, index) => (
        <div key={index}>
            <input type="radio" name="choice" value={choice}/>
            <label>{choice}</label>
        </div>
    ));
    return (
        <>
        <div>
            <p>Question {index + 1}: {question.question}</p>
            {choices}
            
        </div>
        </>
    )
}
export default TriviaApp
