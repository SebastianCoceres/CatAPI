export const callRandomCat = async () => {
    let data = await (await fetch(_.API_RANDOM)).json();
    // console.log("%crandoms", "color:yellow", data)
    let temp = document.createElement('div');
    temp.setAttribute('class', "flex flex-wrap simpleLightBox1")
    data.forEach(el => {
        let tag = `
                <article class="simpleLightbox relative w-[33%] px-2 mb-4">
                     
                    <img id="${el.id}" class="bg-white border-slate-100 w-full aspect-square object-cover mb-4 rounded" src="${el.url}" alt=""/>
                    <button data-id="${el.id}" class="save_fav_this  bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-full absolute top-2 right-2 w-8 h-8 grid place-items-center active:text-yellow-700"><i class="fa-solid fa-star"></i></button>
                    <a href="${el.url}" class="absolute bottom-0 left-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text.sm">See Photo</a> 
                </article>
                `;
        temp.innerHTML += tag
    });

    random_gallery.innerHTML = "";
    random_gallery.append(temp);

    addSaveListeners();
    var lightbox1 = new SimpleLightbox('.simpleLightBox1 a');
}

export const callFavCats = async () => {

    let data = await (await fetch(_.API_FAVOURITES, {
        method: 'GET',
        headers: {
            'x-api-key': _.API_KEY
        }
    })).json();
    // console.log("%cFavoritos", "color:green", data)
    let temp = document.createElement('div');
    temp.setAttribute('class', "flex flex-wrap simpleLightBox2")

    data.forEach(el => {
        let tag = `
                <article class="relative w-[33%] px-2 mb-4">
                  
                    <img id="${el.image.id}" class="bg-white border-slate-100 w-full aspect-square object-cover mb-4 rounded" src="${el.image.url}" alt=""/>
                    <button data-id="${el.id}" class="remove_fav_this bg-red-500 hover:bg-red-700 text-yellow-200 p-2 rounded-full absolute top-2 right-2 w-8 h-8 grid place-items-center text-center active:text-white"><i class="fa-solid fa-xmark"></i></button>
                    <a href="${el.image.url}" class="absolute bottom-0 left-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text.sm">See Photo</a>
                
                </article>
                `;
        temp.innerHTML += tag
    });

    favourites_gallery.innerHTML = "";
    favourites_gallery.append(temp);

    addDeleteListeners();
    var lightbox2 = new SimpleLightbox('.simpleLightBox2 a');
}

export const saveCatInFavourites = async (cat_id) => {
    const res = await fetch(_.API_FAVOURITES, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'x-api-key': _.API_KEY
        },
        body: JSON.stringify({
            image_id: `${cat_id}`
        })
    })
    callFavCats();
}

export const deleteCatInFavourites = async (cat_id) => {
    const res = await fetch(`${_.API_FAVOURITES_DELETE(cat_id)}`, {
        method: 'DELETE',
        headers: {
            'x-api-key': _.API_KEY
        }
    })

    console.log(res)
    callFavCats();
}

export function addSaveListeners() {
    let saveInFavourites = document.querySelectorAll('.save_fav_this');
    saveInFavourites.forEach(el => {
        el.addEventListener('click', () => saveCatInFavourites(el.dataset.id))
    })
}

export function addDeleteListeners() {
    let deleteFromFavourites = document.querySelectorAll('.remove_fav_this');
    deleteFromFavourites.forEach(el => {
        el.addEventListener('click', () => deleteCatInFavourites(el.dataset.id))
    })
}
