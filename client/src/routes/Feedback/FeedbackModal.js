import React from "react";
import "./Feedback.css";

const FeedbackComponent = ({ isOpen, onClose, feedbackList }) => {
  // Check if there are feedbacks to display
  const shouldDisplayFeedbacks = feedbackList.length > 0;

  return (
    <div className={`feedbackModal ${shouldDisplayFeedbacks && isOpen ? "open" : "closed"}`}>
      {shouldDisplayFeedbacks && (
        <div className="modalContent">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h2>Feedbacks</h2>
          <div className="feedbackDisplayContainer">
            {feedbackList.map((feedback, index) => (
              <div className="feedbackItem" key={index}>
                <div className="feedbackHeader">
                  <div className="username">{feedback.username}</div>
                </div>
                <div className="feedbackText">{feedback.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackComponent;
