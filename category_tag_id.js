// axios.get('http://localhost/wordpress/wp-json/wp/v2/categories?id=2')
// .then(response => {
//       // const categoryId = response.data[0].id;
//       console.log(response.data[0]);
//       console.log('Category ID:', categoryId);
//     })
//     .catch(error => {
//       console.error(error);
//     });


const axios = require('axios');
const baseUrl = 'http://localhost/wordpress/wp-json/wp/v2';

// To access the categories
const categorySlugs = ['padetrician'].sort(); 
let categoryIds = [];

function fetchCategoryIdBySlug(slug) {
  return axios.get(`${baseUrl}/categories?slug=${slug}`)
    .then(res => {
      const categories = res.data;
      if (categories.length > 0) {
        return categories[0].id;
      } else {
        throw new Error(`Category not found for slug ${slug}`);
      }
    })
    .catch(error => {
      console.error(error);
      throw new Error(`Error fetching category for slug ${slug}`);
    });
}

const categoryPromises = [];

for (let i = 0; i < categorySlugs.length; i++) {
  const slug = categorySlugs[i];
  categoryPromises.push(fetchCategoryIdBySlug(slug));
  }
  
  Promise.all(categoryPromises)
  .then(ids => {
    categoryIds =ids;
  console.log(ids); // Array of category ids
  })
  .catch(error => {
  console.error(error);
  });


let postslug;
const WPAPI = require('wpapi');
const wp = new WPAPI({ endpoint: 'http://localhost/wordpress/wp-json/wp/v2/posts?_fields=id,slug,categories,tags,author,acf,title,content' });
wp.posts().get(function( err, response ) {
  if( err ) 
  {
    console.log( err );
  } 
  else 
    {
      //Check categories for each post
      for(let i=0; i<response.length;i++)
      {
        //It check for categories that all categories matched with post categories
        let j;
        // console.log("categories_Ids_length",categoryIds.length);
        for(j=0;j<categoryIds.length; j++)
        {
            // console.log("J_value", j);
            if(!response[i].categories.includes(categoryIds[j]))
            {
                break;
            }
        }
        if(j==categoryIds.length)
        {
          console.log("Title",response[i].title);
        }        
      }       
    }
});












































































































































































// function fetchCategoryIdBySlug(slug) {
//     return axios.get(`${baseUrl}/categories?slug=${slug}`)
//       .then(res => {
//         const categories = res.data;
//         if (categories.length > 0) {
//           return categories[0].id;
//         } else {
//           throw new Error(`Category not found for slug ${slug}`);
//         }
//       })
//       .catch(error => {
//         console.error(error);
//         throw new Error(`Error fetching category for slug ${slug}`);
//       });
// }
// const categoryRequests = Promise.all(categorySlugs.map(fetchCategoryIdBySlug));
// categoryRequests.then(ids => {
// categoryIds = ids.filter(id => id !== undefined);
// console.log("caegories", categoryIds);
// }).catch(error => {
// console.error(error);
// });