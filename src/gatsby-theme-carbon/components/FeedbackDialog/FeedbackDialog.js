import React from 'react';
import ThemeFeedbackDialog from 'gatsby-theme-carbon/src/components/FeedbackDialog/FeedbackDialog';

const FeedbackDialog = function FeedbackDialog({ props }) {
  const onSubmit = async (data) => {
    try {
      const response = await fetch('/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        console.log('Feedback submitted successfully:', result.message);
        // You could show a success message to the user here
      } else {
        console.error('Feedback submission failed:', result.message);
        // You could show an error message to the user here
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      // You could show an error message to the user here
    }
  };

  return <ThemeFeedbackDialog {...props} onSubmit={onSubmit} />;
};

export default FeedbackDialog;
