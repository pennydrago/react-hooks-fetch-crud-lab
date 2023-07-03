import React, {useEffect, useState} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questionItems, setQuestionItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((questionItems) => setQuestionItems(questionItems));
  }, []);

  function handleUpdateAnswer(updatedQuestionItem) {
    const updatedQuestionItems = questionItems.map((questionItem) => {
      if (questionItem.id === updatedQuestionItem.id) {
        return updatedQuestionItem;
      } else {
        return questionItem;
      }
    });
    setQuestionItems(updatedQuestionItems);
  }

  function handleDeleteQuestion(deletedQuestion) {
    const updatedQuestionItems = questionItems.filter((questionItem) => questionItem.id !== deletedQuestion.id);
    setQuestionItems(updatedQuestionItems);
  }
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
      {questionItems.map((questionItem) => {
      return <QuestionItem key={questionItem.id} question={questionItem} onUpdateAnswer={handleUpdateAnswer} onDeleteQuestion={handleDeleteQuestion} />})}
      </ul>
    </section>
  );
}

export default QuestionList;
