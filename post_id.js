const axios = require('axios');

axios.get(`http://localhost/wordpress/wp-json/wp/v2/posts?categories=8&categories=6&tags=5&author=2&type=article`)
  .then(response => {
    const postIds = response.data.map(post => post.slug);
    console.log(postIds);
  })
  .catch(error => {
    console.log(error);
  });
