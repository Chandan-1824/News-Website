const apikey ='919505e2e6356fb27f8bc50df02173b0';
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById("search-button");



async function fetchRandomNews (){
    try{
        // const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=16&apikey=${apikey}`;
        const apiUrl = `https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=${apikey}`;


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
        // const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=16&apikey=${apikey}`;
        const apiUrl =  `https://gnews.io/api/v4/search?q=${query}&lang=en&country=us&max=10&apikey=${apikey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
      
    }catch(error){
      console.error("Error fetching random news", error);
      return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        // Update image source based on the actual response property
        const img = document.createElement("img");
        img.src = article.image || 'images/default-image.jpg'; // Ensure this property matches the API response
        img.alt = article.title || "News Image";

        const title = document.createElement("h2");
        const TruncatedTitle = article.title.length > 60 ? article.title.slice(0, 60) + "....." : article.title;
        title.textContent = TruncatedTitle;

        const paragraph = document.createElement("p");
        paragraph.textContent = article.description || "No description available."; // Fallback for missing descriptions

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(paragraph);

        blogCard.addEventListener('click', () => {
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

