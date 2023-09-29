import React from "react";

const FeedbackDisplay = ({ feedbackList }) => {
  return (
    <div className="feedbackDisplayContainer">
      <h2>Feedback Display</h2>
      <ul>
        {feedbackList.map((feedback, index) => (
          <li key={index}>{feedback}</li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackDisplay;
