async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=16&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        
        console.log("Full API response:", response);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Parsed data:", data);

        // Check if articles exist
        if (!data.articles) {
            console.error("No articles found in the response");
            return [];
        }

        return data.articles;
      
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}
