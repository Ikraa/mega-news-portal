
 
const fetchCategory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res=>res.json())
    .then(data=>loadCategory(data.data.news_category))

}
fetchCategory();

const loadCategory = (data) => {
    const category = document.getElementById('category');
    data.forEach(item => {
        const span = document.createElement('span');
        span.classList.add("text-[18px]","text-[#858585]","cursor-pointer")
        span.innerText = item.category_name;
console.log(item);
        category.appendChild(span);
         
    })
}