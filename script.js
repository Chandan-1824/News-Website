const apikey = '95d699331d9844dfa4518eec26874aa8';
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById("search-button");

async function fetchRandomNews() {
    try {
        const apiUrl = `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=16&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}


searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query);
            console.log("Articles fetched for search:", articles);
            displayBlogs(articles);
        } catch (error) {
            console.log("Error fetching news by query", error);
        }
    }
});

async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=16&apikey=${apikey}`;

        const response = await fetch(apiUrl);
        console.log("API response for search query:", response);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Parsed data for search query:", data);

        if (!Array.isArray(data.articles)) {
            console.error("Error: Articles is not an array");
            return [];
        }

        if (!data.articles || data.articles.length === 0) {
            console.log("No articles found for search query");
            return [];
        }

        return data.articles;

    } catch (error) {
        console.error("Error fetching news by query", error);
        return [];
    }
}

function displayBlogs(articles) {
    console.log("Articles passed to displayBlogs:", articles);

    blogContainer.innerHTML = "";

    if (!articles || articles.length === 0) {
        console.log("No articles to display");
        blogContainer.innerHTML = "<p>No news articles found.</p>";
        return;
    }

    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage || 'default-path-of-the-image';
        img.alt = article.title;

        const title = document.createElement("h2");
        const TruncatedTitle = article.title.length > 60 ? article.title.slice(0, 60) + "....." : article.title;
        title.textContent = TruncatedTitle;

        const paragraph = document.createElement("p");
        paragraph.textContent = article.description;

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
    try {
        const articles = await fetchRandomNews();
        console.log("Articles received for display:", articles);
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
})();
