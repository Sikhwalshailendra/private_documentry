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
        console.log(`Category not found for slug ${slug}`);
      }
    })
    .catch(error => {
      console.error(error);
      console.log(`Error fetching category for slug ${slug}`);
    });
}

const categoryPromises = [];  
for (let i = 0; i < categorySlugs.length; i++) 
{
  const slug = categorySlugs[i];
  categoryPromises.push(fetchCategoryIdBySlug(slug));
  }
  
  Promise.all(categoryPromises)
  .then(ids => {
    categoryIds =ids;
  // console.log(ids); 
  })
  .catch(error => {
  console.error(error);
  });


// To access the tags
let tagIds = []
const tagSlugs = ['3_to_14','Female',].sort();
const tagRequests = Promise.all(tagSlugs.map(slug =>
    axios.get(`${baseUrl}/tags?slug=${slug}`)
    .then(res => {
        const tags = res.data;
        // console.log("tags", tags);
        if (tags.length > 0) {
        return tags[0].id;
        }
    })
));
tagRequests.then(ids => {
    const tIds = ids.filter(id => id !== undefined);
    tagIds = tIds;
});

//To access Doctor Ids
let doctor_id;
doctor_name = "shailendra"
axios.get('http://localhost/wordpress/wp-json/wp/v2/users?username=doctor_name')
  .then(response => {
    const userId = response.data[0].id;
    // console.log(userId);
    doctor_id = userId;
  })
  .catch(error => {
    console.error(error);
  });



// Post Slug Fetching
required_content = "article";
level_of_question = "simple";


let postslug;
const WPAPI = require('wpapi');
const wp = new WPAPI({ endpoint: 'http://localhost/wordpress/wp-json/wp/v2/posts?_fields=id,slug,categories,tags,title,author,acf,content' });
wp.posts().get(function( err, response )
{
  if( err ) 
  {
    console.log( err );
  } 
  else 
  {
    //Check for categories
    for(let i=0; i<response.length;i++)
    {
      if(response[i].author!=doctor_id)
      {
          continue;
      }else if(response[i].acf["Type_of_content"]!=required_content)
      {
          continue;
      }else if(response[i].acf["severity"]!=level_of_question)
      {
          continue;
      }else
      {

        //It check for categories that all categories matched with post categories
        let j;
        for(j=0;j<categoryIds.length; j++)
        {
            if(!response[i].categories.includes(categoryIds[j]))
            {
                break;
            }
        }       
        //It checks for tags that required tag is matched with particular post or not
        for(let k=0;k<tagIds.length; k++)
        {
            if(!(response[i].tags).includes(tagIds[k]))
            {
                continue;
            }
        }
        if(j==categoryIds.length)
        {
          console.log("Title",response[i].title);
        } 

      }
    }  
  }
});

































































































































































































































































































// console.log("tagIds", tagIds);
