export async function onRequestPost({ request }) {
  try {
    const feedbackData = await request.json();

    // Log the feedback for manual review (visible in Cloudflare dashboard logs)
    console.log('New feedback submission:', {
      timestamp: new Date().toISOString(),
      data: feedbackData,
      userAgent: request.headers.get('user-agent'),
      ip:
        request.headers.get('cf-connecting-ip') ||
        request.headers.get('x-real-ip') ||
        request.headers.get('x-forwarded-for'),
    });

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Thank you for your feedback! We've received it and will review it shortly.",
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
        },
      },
    );
  } catch (error) {
    console.error('Error processing feedback:', error);

    return new Response(
      JSON.stringify({
        success: false,
        message: 'Sorry, there was an error submitting your feedback. Please try again later.',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
        },
      },
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Max-Age': '86400',
    },
  });
}
