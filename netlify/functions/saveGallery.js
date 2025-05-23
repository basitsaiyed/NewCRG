const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  try {
    const data = JSON.parse(event.body);
    const insertData = {
      title: data.title,
      date: new Date(data.date).toISOString(),
      meetingType: data.meetingType,
      description: data.description,
      tags: data.tags || [],
      photos: data.photos,
      thumbnail: data.thumbnail
    };

    const { data: result, error } = await supabase
      .from('gallery')
      .insert([insertData])
      .select();

    if (error) throw error;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(result[0])
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: error.message,
        details: error.details || null
      })
    };
  }
};
