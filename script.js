const apikey ='95d699331d9844dfa4518eec26874aa8';
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById("search-button");



async function fetchRandomNews (){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=16&apikey=${apikey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
      
    }catch(error){
      console.error("Error fetching random news", error);
      return [];
    }
}

searchButton.addEventListener("click", async ()=>{
    const query = searchField.value.trim();
    if(query !== ""){
       try{
          const articles = await fetchNewsQuery(query);

          displayBlogs(articles);

       }catch(error){
        console.log("Error Fetching News By query", error);
       }
    }
});

async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=16&apikey=${apikey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
      
    }catch(error){
      console.error("Error fetching random news", error);
      return [];
    }
}

function displayBlogs(articles){
    blogContainer.innerHTML = "";
    articles.forEach( (article) => {
      
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage || 'default-path-of-the-image';
        img.alt = article.title;

        const title = document.createElement("h2");
        // title.textContent = article.title;
        const TruncatedTitle = article.title.length>60? article.title.slice(0, 60) + "....." : article.title;
        title.textContent = TruncatedTitle;

        const paragraph = document.createElement("p");
        paragraph.textContent = article.description;
        // const shortPara = article.paragraph.length>100? article.paragraph.slice(0, 100) + ".....Click to See more" : article.paragraph;
        // paragraph.textContent = shortPara;
        

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(paragraph);

        blogCard.addEventListener('click', ()=>{
            window.open(article.url, "_blank");
        });

        blogContainer.appendChild(blogCard);
    });
    }


(async () => {
    try{
     const articles =  await fetchRandomNews();
     displayBlogs(articles);

    }catch(error){
       console.error("Error fetching random news",error);
    }
})();
// (); This symbol is used to call this async function.

