const category = document.getElementById('category');
 
const fetchCategory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res=>res.json())
    .then(data=>console.log(data.data.news_category))

}
fetchCategory();

