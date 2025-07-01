const loadCategory = async () =>{
     const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
     const data = await res.json();
     showDisplayCategory(data.categories);
}

const showDisplayCategory = (category) =>{
    const categoryContainer = document.querySelector('#btn-category');
    category.forEach(item => {
        const button = document.createElement('btn');
        button.classList = 'btn bg-slate-100'
        button.innerText = item.category;
        categoryContainer.append(button)
    });

};

const loadVideos = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
    const data = await res.json();
    showDisplayVideos(data.videos)

};

const showDisplayVideos = (videos) =>{
    const videosContainer = document.querySelector('#videos-container')
        videos.forEach(video =>{
            const div = document.createElement('div');
            div.classList = "card"
            div.innerHTML = `
                 <figure class="h-[200px]">
                    <img class="w-full h-full object-cover" src=${video.thumbnail} />
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