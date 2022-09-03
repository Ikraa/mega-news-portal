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
      document.getElementById("card-container").innerHTML=""
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
 
  console.log(items.data.length,name) 
  itemResult.innerHTML=`${items?.data?.length} items found for category ${name}`
  displayCategoryCard(items.data)
}



//
const displayCategoryCard=(data)=>{
 const cardContainer=document.getElementById("card-container")
 

 
 data.map(card=>{
  
         const div=document.createElement('div')
        
         div.innerHTML=`
                  <div class="card mb-[25px] lg:card-side p-5 bg-[#FFFFFF]  shadow-xl">
              <img class="h-[300px] w-[244px] object-cover mr-[40px]" src=${card.image_url} alt="Album">
            <div class="card-body">
              <h2 class="card-title text-[#121221] font-bold text-[24px]">${card.title}</h2>
              <p class="text-[16px] text-ellipsis  my-4 text-[#949494] whitespace-pre-line">${card.details.slice(0,500)}${card.details.length>500?"...":""}</p>
              
            <div class="footerWraper flex items-center justify-between">
                <div class="flex items-center">
                <img class="h-[40px] w-[40px] rounded-full mr-[10px]" src=${card?.author?.img} /> 
                <div> 
                      <h1 class="text-[#2B2C34] text-[16px]">${card?.author?.name}</h1>
                      <h1 class="text-[14px] text-[#718797]">${new Date(card?.author?.published_date).toDateString()}</h1>
                </div>
                </div>

                 <div class="text-[#515151] text-[18px] font-bold flex items-center"> <span><img class="h-[24px] mr-[12px] w-[24px]" src="./img/eye-icon.png" /></span><span class="text-[#515151] text-[18px] font-bold">${card.total_view}</span> </div>
                 <div >
                 <label onClick="openModal('${card?._id}')" for="my-modal-6" class="btn modal-button">
                 <img  class="mr-[14px]" src="./img/right-arrow.png" />
                 </label>
                 
                 </div>
            </div>
            
            </div> 
          </div>
         
         `
         
         
         cardContainer.appendChild(div)

 })
}

const openModal=(news_id)=>{
const url=`https://openapi.programming-hero.com/api/news/${news_id}`
fetch(url)
.then(res=>res.json())
.then(data=>loadModalData(data?.data[0]))

}


const loadModalData=(news)=>{
  const {category_id,details,image_url,thumbnail_url,title,total_view}=news
  const {name,published_date,img}=news.author
  const {is_trending}=news.others_info
  if(!name){
    console.log("something")
    const newsContainer=document.getElementById("modal-container").innerHTML=`
    <h1 class="text-red-600 text-xl font-bold"> No Data Available</h1>
    `
    return;
  }
  const newsContainer=document.getElementById("modal-container").innerHTML=`
  <div class="flex items-center justify-between">

  <div> 
  <h1 class="text-xs font-bold text-black">Category Id:${category_id} </h1>
  <h1 class="text-xs text-gray-600 ">Trending:${is_trending?"yes":"no"} </h1>
  </div>
  
  <div>
  <h1 class="text-xs font-bold text-black">Author:${name} </h1>
  <h1 class="text-xs text-gray-600">Published Date:${new Date(published_date).toDateString()} </h1>
  </div>
  <img class="h-[24px] w-[24px] rounded-full" src="${img}" />
  
  </div>
  <img class="h-[35vh] my-3 w-[100%] object-cover mx-auto" src="${thumbnail_url}" />
  <h1 class="text-gray-500"> ${details}</h1>


  <div class="modal-action">
  <label for="my-modal-6" class="btn">Close!</label>
</div>
  
  
  `
}



