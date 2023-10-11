// Create a new component Feedback.js
import React, { useState } from "react";
import "./Feedback.css";

export default function Feedback({ isOpen, onClose, onSubmit }) {
  const [feedbackText, setFeedbackText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedbackText.trim() !== "") {
      onSubmit(feedbackText);
      setFeedbackText("");
    }
  };

  return (
    <div className = {`feedbackContainer ${isOpen ? "open" : "closed"}`}>
      <textarea
      className="txtareafeedback"
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
        placeholder="Provide Your Feedback Here..."
      />
      <button onClick={handleSubmit} className="sendfeedbackbtn">Send</button>
    </div>
  );
}