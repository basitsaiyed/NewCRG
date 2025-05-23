const { createClient } = require('@supabase/supabase-js');
const sharp = require('sharp');
const heic2any = require('heic-convert');

exports.handler = async (event) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );
  console.log('Supabase Config:', {
    Name: process.env.SUPABASE_URL,
    upload: process.env.SUPABASE_KEY
  });

  try {
    const data = JSON.parse(event.body);
    console.log('Incoming data:', JSON.stringify(data, null, 2));

    // Transform data to match database schema
    const insertData = {
      title: data.title,
      date: new Date(data.date).toISOString(), // Convert to ISO timestamp
      "meetingType": data.meetingType, // Match quoted column name
      description: data.description,
      tags: data.tags || [],
      photos: data.photos,
      thumbnail: data.thumbnail
    };

    console.log('Transformed data:', JSON.stringify(insertData, null, 2));

    // Convert HEIC images to JPEG
    async function convertHeicToJpeg(buffer, file) {
      if (file.type === 'image/heic' || file.type === 'image/HEIC') {
        const jpegBuffer = await heic2any({
          buffer: buffer,
          format: 'JPEG',
          quality: 0.9
        });
        return jpegBuffer;
      }
      return buffer;
    }

    // Example: Convert a specific file in the photos array
    if (insertData.photos && insertData.photos.length > 0) {
      const convertedPhotos = await Promise.all(
        insertData.photos.map(async (photo) => {
          const buffer = Buffer.from(photo, 'base64'); // Assuming photos are base64-encoded
          return await convertHeicToJpeg(buffer, { type: 'image/heic' });
        })
      );
      insertData.photos = convertedPhotos;
    }

    const { data: result, error } = await supabase
      .from('gallery')
      .insert([insertData])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    console.log('Insert result:', result);
    return {
      statusCode: 200,
      body: JSON.stringify(result[0]),
    };
  } catch (error) {
    console.error('Global error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
        details: error.details || null,
      }),
    };
  }
};
