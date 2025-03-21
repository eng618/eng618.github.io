import React from 'react';
import ThemeFeedbackDialog from 'gatsby-theme-carbon/src/components/FeedbackDialog/FeedbackDialog';

const FeedbackDialog = function FeedbackDialog({ props }) {
  const onSubmit = (data) => {
    // TODO: set up actual feedback
    console.log({ ...data });
  };

  return <ThemeFeedbackDialog {...props} onSubmit={onSubmit} />;
};

export default FeedbackDialog;
