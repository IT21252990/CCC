// Create a new component Feedback.js
import React, { useState } from "react";

export default function Feedback({ onSubmit }) {
  const [feedbackText, setFeedbackText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedbackText.trim() !== "") {
      onSubmit(feedbackText);
      setFeedbackText("");
    }
  };

  return (
    <div className="feedbackContainer">
      <h2>Feedback</h2>
      <textarea
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
        placeholder="Enter your feedback here"
      />
      <button onClick={handleSubmit}>Send Feedback</button>
    </div>
  );
}