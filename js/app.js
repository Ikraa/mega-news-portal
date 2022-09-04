// fetch data load for category news

const fetchCategory = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => loadCategory(data.data.news_category));
};
fetchCategory();
//  function of load category for category news
const loadCategory = (data) => {
  const category = document.getElementById("category");
  data.forEach((item) => {
    // console.log(item);
    const span = document.createElement("span");
    span.classList.add("text-[18px]", "text-[#858585]", "cursor-pointer");
    span.innerHTML = `<span class="mr-3 mb-5 lg:mb-0 lg:mr-0 inline-block">${item.category_name}
        </span`;
    span.addEventListener("click", () => {
      document.getElementById("card-container").innerHTML = "";
      document.getElementById(
        "card-container"
      ).innerHTML = `<div class="flex justify-center items-center min-h-[30vh]"> 
      
      
      <div role="status">
    <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
      </div>`;

      displayCategoryData(item.category_id, item.category_name);
    });
    category.appendChild(span);
  });
};

// fetch and function of display category data
const displayCategoryData = (id, name) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => itemsResult(data, name));
};

// function of itemResult
const itemsResult = (items, name) => {
  document.getElementById("items-result").innerHTML = "";
  const itemResult = document.getElementById("items-result");

  itemResult.innerHTML = `${items?.data?.length} items found for category ${name}`;
  displayCategoryCard(items.data);
};

// function of displayCategoryCard
const displayCategoryCard = (data) => {
  document.getElementById("card-container").innerHTML = "";
  const cardContainer = document.getElementById("card-container");
  if (data.length == 0) {
    cardContainer.innerHTML = `<h1 class="text-red-500 font-bold text-xl text-center my-10">No news found </h1>`;
    return;
  }
  // map of data
  data.map((card) => {
    const div = document.createElement("div");

    div.innerHTML = `
                  <div class="card mb-[25px] lg:card-side p-5 bg-[#FFFFFF]  shadow-xl">
              <img class="h-[300px] mx-auto lg:mx-0 w-[244px] object-cover mr-[40px]" src=${
                card.image_url
              } alt="Album">
            <div class="card-body">
              <h2 class="card-title text-[#121221] font-bold text-[24px]">${
                card.title
              }</h2>
              <p class="text-[16px] text-ellipsis  my-4 text-[#949494] whitespace-pre-line">${card.details.slice(
                0,
                500
              )}${card.details.length > 500 ? "..." : ""}</p>
              
            <div class="footerWraper flex flex-wrap items-center justify-between">
                <div class="flex items-center">
                <img class="h-[40px] w-[40px] rounded-full mr-[10px]" src=${
                  card?.author?.img
                } /> 
                <div> 
                      <h1 class="text-[#2B2C34] text-[16px]">${
                        card?.author?.name
                      }</h1>
                      <h1 class="text-[14px] text-[#718797]">${new Date(
                        card?.author?.published_date
                      ).toDateString()}</h1>
                </div>
                </div>

                 <div class="text-[#515151] text-[18px] font-bold flex items-center"> <span><img class="h-[24px] mr-[12px] w-[24px]" src="./img/eye-icon.png" /></span><span class="text-[#515151] text-[18px] font-bold">${
                   card.total_view
                 }</span> </div>
                 <div >
                 <label onClick="openModal('${
                   card?._id
                 }')" for="my-modal-6" class="mt-3 lg:mt-0 btn   px-5">
                 <img  class="mr-[14px]" src="./img/right-arrow.png" />
                 </label>
                 
                 </div>
            </div>
            
            </div> 
          </div>
         
         `;
    cardContainer.appendChild(div);
  });
};
//  function of data fetch for modal
const openModal = (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => loadModalData(data?.data[0]));
};
//  function of loadModalData
const loadModalData = (news) => {
  const { category_id, details, image_url, thumbnail_url, title, total_view } =
    news;
  const { name, published_date, img } = news.author;
  const { is_trending } = news.others_info;
  if (!name) {
    console.log("something");
    const newsContainer = (document.getElementById(
      "modal-container"
    ).innerHTML = `
    <h1 class="text-red-600 text-xl font-bold text-center py-3"> No Data Available</h1>
      <div class="text-center">
      <a
      class="text-[#5D5FEF] rounded-[4px] lg:p-[8px] lg:px-6 font-bold text-xl hover:text-[green]"
      href="/index.html"
      ><i class="fa-solid fa-arrow-left"></i> Back</a
    ></div>
    `
    );
    return;
  }
  const newsContainer = (document.getElementById(
    "modal-container"
  ).innerHTML = `
  <div class="flex items-center justify-between">

  <div> 
  <h1 class="text-xs font-bold text-black">Category Id:${category_id} </h1>
  <h1 class="text-xs text-gray-600 ">Trending:${
    is_trending ? "yes" : "no"
  } </h1>
  </div>
  
  <div>
  <h1 class="text-xs font-bold text-black">Author:${name} </h1>
  <h1 class="text-xs text-gray-600">Published Date:${new Date(
    published_date
  ).toDateString()} </h1>
  </div>
  <img class="h-[24px] w-[24px] rounded-full" src="${img}" />
  
  </div>
  <img class="h-[35vh] my-3 w-[100%] object-cover mx-auto" src="${thumbnail_url}" />
  <h1 class="text-gray-500"> ${details}</h1>

  <div class="modal-action">
  <label for="my-modal-6" class="btn">Close!</label>
</div>
  
  
  `);
};

//  END Section
