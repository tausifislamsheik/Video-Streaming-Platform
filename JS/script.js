const loadCategory = async () =>{
     const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
     const data = await res.json();
     showDisplayCategoryButton(data.categories);
}

// Category based video load feature

const displayCategoryVideos = async (id) => {
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
    const data = await res.json();
    const videos = data.category; 

    // Remove 'active' class from all buttons
    document.querySelectorAll('.category-button').forEach(btn => {
      btn.classList.remove('bg-red-500', 'text-white');
    });

    // Add 'active' to the clicked one
    const activeBtn = document.getElementById(`btn-${id}`);
    if (activeBtn) {
      activeBtn.classList.add('bg-red-500', 'text-white');
    }

    showDisplayVideos(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
  }
};



// Category button section

const showDisplayCategoryButton = (category) =>{
    const categoryContainer = document.querySelector('#btn-category');
    category.forEach(item => {
        const buttonContainer = document.createElement('div');
        // buttonContainer.classList = 'btn'
        buttonContainer.innerHTML = `
             <button id="btn-${item.category_id}" class="btn cursor-pointer category-button" onclick="displayCategoryVideos(${item.category_id})">
               ${item.category}
             </button>
        `
        
        categoryContainer.append(buttonContainer);
    });

};

const loadVideos = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
    const data = await res.json();
    showDisplayVideos(data.videos)

};

// Day, Hour, Minute & Second calculation

const getTime = (time) => {
    const day = parseInt(time / 86400); // 86400 seconds in a day
    const remainingHour = parseInt((time % 86400) / 3600); // hours after days
    let remainingSecond = time % 3600;
    const minute = parseInt((remainingSecond % 3600) / 60); // minutes after hours
    remainingSecond = remainingSecond % 60; // remaining seconds after minutes

    return(`${day} day ${remainingHour} hrs ${minute} min ${remainingSecond} sec ago`);
};


// Display video section

const showDisplayVideos = (videos) =>{
    const videosContainer = document.querySelector('#videos-container');
    videosContainer.innerHTML = '';
    
    if(videos.length === 0){
        videosContainer.classList.remove('grid')
         videosContainer.innerHTML = `
           <div class="h-[300px] flex flex-col text-center items-center justify-center gap-8">
             <img class="h-40" src="images/icon.png"/>
             <p class="text-4xl font-extrabold">Oops!Sorry,There is no <br> content here.</p>
           </div>
         `;
    }else{
        videosContainer.classList.add('grid')
    }
        videos.forEach(video =>{
            const div = document.createElement('div');
            div.classList = "card"
            div.innerHTML = `
                 <figure class="h-[200px] relative">
                    <img class="w-full h-full object-cover" src=${video.thumbnail} />
                    ${video.others?.posted_date.length === 0 ? '' : `<span class="absolute text-white text-sm bg-gray-900 p-1 rounded-lg right-2 bottom-2">${getTime(video.others?.posted_date)}</span>` }
                    
                 </figure>
                 <div class="py-5 flex gap-2">
                     
                     <div>
                       <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0]?.profile_picture}/>
                     </div>
                   
                     <div>
                        <p class="text-xl font-bold">${video.title}</p>
                          <div class="flex object-cover gap-2 items-center"> 
                             <p class="text-gray-500 font-semibold">${video.authors[0]?.profile_name}</p>
                             ${video.authors[0]?.verified === true ? '<img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>' : ""}
                          </div>
                        <p class="text-gray-500 font-semibold">${video.others?.views}</p>

                     </div>
                   
                
                 </div>

            `
            videosContainer.append(div)
        })
}

loadCategory();
loadVideos();
