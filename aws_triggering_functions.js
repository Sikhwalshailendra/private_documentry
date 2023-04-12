const axios = require('axios');

exports.handler = async (event, context, callback) => {
  try {
    const config = {
      headers: {
        'Authorization': 'Basic ' + Buffer.from('wordpress:1234').toString('base64'),
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.get('https://684d-2401-4900-16ed-f21f-e867-6d05-db83-d613.ngrok-free.app/wordpress/wp-json/wp/v2/posts', config);
    const posts = response.data;

    // Check if there are no posts
    if (posts.length === 0) {
      const message = 'No posts found.';
      console.log(message);
      return callback(null, message);
    }

    const updatedPosts = [];

    // Create meta tags for each post and set accessed flag for already accessed posts
    let allPostsFlagged = true; // Flag to keep track if all posts have flag set to true
    for (const post of posts) {
      const { id } = post;
      if (post.acf['flag'] && post.acf['flag'] === 'True') {
        continue; // Skip posts that have already been accessed
      } else {
        // Post has not been accessed yet, unset flag
        const url = `https://684d-2401-4900-16ed-f21f-e867-6d05-db83-d613.ngrok-free.app/wordpress/wp-json/wp/v2/posts/${id}`;
        const data = {
          fields: {
            flag: 'True'
          }
        };

        await axios.post(url, data, config);
        console.log(`Flag set to 'True' for post with ID ${id}`);
        updatedPosts.push(post); // Add the updated post to the array of updated posts
        allPostsFlagged = false; // Set the flag to false as at least one post is updated
      }
    }

    if (allPostsFlagged) {
      // If all posts have flag set to true
      const message = 'No posts available.';
      console.log(message);
      return callback(null, message);
    }

    // Return the updated posts array
    return callback(null, { message: 'Flag set to "True" for all posts successfully.', updatedPosts });
  } catch (error) {
    console.error('Error:', error);
    callback(error);
  }
};
