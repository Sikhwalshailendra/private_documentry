const axios = require('axios');
const WPAPI = require('wpapi');

const baseUrl = 'http://localhost/wordpress/wp-json/wp/v2';

// To access the categories
const categorySlugs = ['diabetes'].sort();

async function fetchCategoryIdBySlug(slug) {
  try
  {
    const res = await axios.get(`${baseUrl}/categories?slug=${slug}`);
    const categories = res.data;
    if (categories.length > 0)
    {
      return categories[0].id;
    }
    else
    {
      console.log(`Category not found for slug ${slug}`);
    }
  } 
  catch (error)
  {
    console.error(error);
    console.log(`Error fetching category for slug ${slug}`);
  }
}

// To access the tags
const tagSlugs = ['younger'].sort();
async function fetchTagIdBySlug(slug)
{
  try 
  {
    const res = await axios.get(`${baseUrl}/tags?slug=${slug}`);
    const tags = res.data;
    if (tags.length > 0)
    {
      return tags[0].id;
    } 
    else
    {
      console.log(`Tag not found for slug ${slug}`);
    }
  } 
  catch (error)
  {
    console.error(error);
    console.log(`Error fetching tag for slug ${slug}`);
  }
}

async function filterPosts() 
{
  const categoryIds = await Promise.all(categorySlugs.map(slug => fetchCategoryIdBySlug(slug)));
  const tagIds = await Promise.all(tagSlugs.map(slug => fetchTagIdBySlug(slug)));

  const required_content = "";
  const level_of_question = "";
  // console.log("content_length", required_content.length);
  const wp = new WPAPI({ endpoint: `${baseUrl}/posts?_fields=id,slug,categories,tags,title,author,acf,content` });

  wp.posts().get(async function(err, response) {
    if (err) 
    {
      console.log(err);
    } else
    {
      // For each post we have to check all the meta data
      for (let i = 0; i < response.length; i++)
      {
        // Fetch the particular post
        const post = response[i];

        // Check for required content : post has type of content but it doesn't matched the type given then skip that post.
        if (required_content.length > 0)
        {
            if(!post.acf["Type_of_content"].includes(required_content))
            {
              continue;
            }
          
        } // check for level of question : post has severity but it doesn't match the severity given, then skip the post. 
        else if(level_of_question.length > 0)
        {
          if(!post.acf["severity"].include(level_of_question))
          {
            continue;
          }          
        } 
        else
        {
          // Check for all required categories. If anyone from required is not included in the post, then skip that post.
          let j =0;
          for (j = 0; j < categoryIds.length; j++)
          {
            if (!post.categories.includes(categoryIds[j]))
            {
              break;
            }
          }
          if (j != categoryIds.length)
          {
            continue;
          }
          // Check for all required tags. If anyone from required is not included in the post, then skip that post.
          let k =0;
          for (k = 0; k < tagIds.length; k++)
          {
            if (!post.tags.includes(tagIds[k]))
            {
              break;
            }
          }
          if (k !== tagIds.length)
          {
            continue;
          }
          console.log("Title:", post.title);
        }
      }
    }
  });
}

filterPosts();






