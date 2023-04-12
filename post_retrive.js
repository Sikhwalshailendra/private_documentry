const WPAPI = require('wpapi');
const wp1 = new WPAPI({ endpoint: 'http://localhost/wordpress/wp-json' });

const postSlug = 'adm';
wp1.posts().slug(postSlug)
.then((response)=> {
    console.log(response);
  })
  .catch((error) =>{
    console.log(error);
  });