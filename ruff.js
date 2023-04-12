const axios = require('axios');
const config = {
  headers: {
    'Authorization': 'Basic ' + Buffer.from('wordpress:1234').toString('base64'),
    'Content-Type': 'application/json'
  }
};

axios.get('https://684d-2401-4900-16ed-f21f-e867-6d05-db83-d613.ngrok-free.app/wordpress/wp-json/wp/v2/posts', config)
.then(response => {
  const posts = response.data;
  // Create meta tags for each post and set accessed flag for already accessed posts
  posts.forEach(post => {
    const { id} = post;
    if ( post.acf['flag'] && post.acf['flag'] === 'True') {
      return; // Skip posts that have already been accessed
    } else {
      // Post has not been accessed yet, unset flag
      const url = `https://684d-2401-4900-16ed-f21f-e867-6d05-db83-d613.ngrok-free.app/wordpress/wp-json/wp/v2/posts/${id}`;
      const data = {
        fields: {
          flag: 'True'
        }
      };

      axios.post(url, data, config)
      .then(response => {
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  });
})
.catch(error => {
  console.error('Error:', error);
});















// axios.get('https://6905-2401-4900-16ed-f21f-e867-6d05-db83-d613.ngrok-free.app/wordpress/wp-json/wp/v2/posts', config)
// .then(response => {
//     console.log('Response:', response.data);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });























// const axios = require('axios');

// const url = 'http://localhost/wordpress/wp-json/wp/v2/posts/'; 
// const data = {
//     title: 'Example Title', // replace with your desired title
//     content: 'Example Content', // replace with your desired content
//     status: 'publish', // replace with your desired status
//   };
// const config = {
//   headers: {
//     'Authorization': 'Basic ' + Buffer.from('wordpress:1234').toString('base64'), // replace with your base64 encoded username and password
//     'Content-Type': 'application/json'
//   }
// };

// axios.post(url, data,config)
//   .then(response => {
//     console.log('Response:', response.data);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
























// const axios = require('axios');
// username: 
// password: 

// axios.post('',
//   { 
//     "Content-Type": "application/json",
//     "Authorization": "Basic " + Buffer.from(username:password).toString("base64")
  
//     })
// .then(function (response) {
// 	console.log(response);
// })
// .catch(function (error) {
// 	console.log(error);
// });