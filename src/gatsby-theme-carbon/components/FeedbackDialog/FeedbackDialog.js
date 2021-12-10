import React from 'react';
import ThemeFeedbackDialog from 'gatsby-theme-carbon/src/components/FeedbackDialog/FeedbackDialog';

// eslint-disable-next-line react/prop-types
const FeedbackDialog = function FeedbackDialog({ props }) {
  const onSubmit = (data) => {
    // TODO: set up actual feedback
    // eslint-disable-next-line no-console
    console.log({ ...data });
  };

  return <ThemeFeedbackDialog {...props} onSubmit={onSubmit} />;
};

export default FeedbackDialog;
