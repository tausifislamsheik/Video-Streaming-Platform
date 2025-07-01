const showCategory = async () =>{
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

}

showCategory();