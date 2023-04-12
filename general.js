const postId = 79;
const postTitle = 'Updated Post Title'; // New title for the post

// Set up the data to send in the request body
const postData = {
  title: postTitle
};

// Send a PUT request to update the post
fetch(`http://localhost/wordpress/wp-json/wp/v2/posts/${postId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    // Add any additional headers or authentication as needed
  },
  body: JSON.stringify(postData)
})
.then(response => response.json())
.then(updatedPost => {
  console.log('Post updated:', updatedPost);
})
.catch(error => {
  console.error('Error updating post:', error);
});



































































































// const axios = require('axios');

// axios.get('http://localhost/wordpress/wp-json/wp/v2/posts?_fields=id,categories,tags,author,acf,slug')
// .then(response => {
      
//     for(let i = 0; i < response.data.length; i++)
//     { 

//         if(response.data[i].id)
//         {
//             console.log("Post_Id", response.data[i].acf['release_date'])
//         }
//     }
//     })
//     .catch(error => {
//       console.error(error);
//     });


// const WPAPI = require('wpapi');
// const wp = new WPAPI({ endpoint: 'http://localhost/wordpress/wp-json/wp/v2/posts?_fields=id,slug,categories,tags,author,acf,content' });


// wp.posts().get(function( err, response ) {
//   if( err ) 
//   {
//     console.log( err );
//   } 
//   else 
//     {
//         for(let i = 0; i < response.length; i++)
//         { 
//             if(response[i].acf)
//             {
//                 console.log(response[i].tags);
//                 if(response[i].categories[0]==2 && response[i].categories[1]==11 && response[i].categories[2]==10
//                     && response[i].tags[0]==15 && response[i].tags[1]==12  && response[i].tags[2]==13 && response[i].tags[3]==20 
//                     && response[i].author==2 && response[i].acf["Type_of_content"]=="article")
//                 {
//                     console.log("Post_slug", response[i].slug)
//                 }
//             }
//         }
        
//     }
// });