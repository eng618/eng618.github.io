exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse the feedback data
    const feedbackData = JSON.parse(event.body);

    // Log the feedback for manual review
    console.log('New feedback submission:', {
      timestamp: new Date().toISOString(),
      data: feedbackData,
      userAgent: event.headers['user-agent'],
      ip: event.headers['x-forwarded-for'] || event.headers['x-real-ip'],
    });

    // Return success response
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({
        success: true,
        message: "Thank you for your feedback! We've received it and will review it shortly.",
      }),
    };
  } catch (error) {
    console.error('Error processing feedback:', error);

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({
        success: false,
        message: 'Sorry, there was an error submitting your feedback. Please try again later.',
      }),
    };
  }
};
