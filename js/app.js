const fetchCategory = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => loadCategory(data.data.news_category));
};
fetchCategory();

const loadCategory = (data) => {
  const category = document.getElementById("category");
  data.forEach((item) => {
    console.log(item);
    const span = document.createElement("span");
    span.classList.add("text-[18px]", "text-[#858585]", "cursor-pointer");
    span.innerHTML = `<span>${item.category_name}
        </span`;
    span.addEventListener("click", () => {
      displayCategoryData(item.category_id);
    });
    category.appendChild(span);
  });
};

// display category data
const displayCategoryData = (id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => console.log(data));

  console.log(id);
};
const itemResult = document.getElementById("items-result");
 