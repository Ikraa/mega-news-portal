const fetchCategory = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => loadCategory(data.data.news_category));
};
fetchCategory();

const loadCategory = (data) => {
  const category = document.getElementById("category");
  data.forEach((item) => {
    // console.log(item);
    const span = document.createElement("span");
    span.classList.add("text-[18px]", "text-[#858585]", "cursor-pointer");
    span.innerHTML = `<span>${item.category_name}
        </span`;
    span.addEventListener("click", () => {
      displayCategoryData(item.category_id,item.category_name);
    });
    category.appendChild(span);
  });
};

// display category data
const displayCategoryData = (id,name) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => itemsResult(data,name));

  
};

const itemsResult =(items,name)=>{
  const itemResult = document.getElementById("items-result");
  console.log(itemResult,"ikra") 
  console.log(items.data.length,name) 
  itemResult.innerHTML=`${items?.data?.length} items found for category ${name}`
  displayCategoryCard(items.data)
}



//
const displayCategoryCard=(data)=>{
 const cardContainer=document.getElementById("card-container")
 data.map(card=>{
  console.log(card)
         const div=document.createElement('div')
         div.innerHTML=`
                  <div class="card mb-[25px] lg:card-side p-5 bg-[#FFFFFF]  shadow-xl">
              <img class="h-[300px] w-[244px] object-cover mr-[40px]" src=${card.image_url} alt="Album">
            <div class="card-body">
              <h2 class="card-title text-[#121221] font-bold text-[24px]">${card.title}</h2>
              <p class="text-[16px] my-4 text-[#949494] whitespace-pre-line">${card.details}</p>
              
            <div class="footerWraper flex items-center justify-between">
                <div class="flex items-center">
                <img class="h-[40px] w-[40px] rounded-full mr-[10px]" src=${card?.author?.img} /> 
                <div> 
                      <h1 class="text-[#2B2C34] text-[16px]">Name</h1>
                      <h1 class="text-[14px] text-[#718797]">jan 10 ,2020</h1>
                </div>
                </div>

                 <div class="text-[#515151] text-[18px] font-bold flex items-center"> <span><img class="h-[24px] mr-[12px] w-[24px]" src="./img/eye-icon.png" /></span><span class="text-[#515151] text-[18px] font-bold">1.5m</span> </div>
                 <div>
                 <img src="./img/right-arrow.png" />
                 </div>
            </div>
            </div>
          </div>
         
         `
         
         
         cardContainer.appendChild(div)

 })
}