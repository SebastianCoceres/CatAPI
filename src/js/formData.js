import * as vars from '/src/js/variables.mjs'
const spanError = document.querySelector('#spanError')
const saveBtn = document.querySelector('#saveBtn')

const saveCatInFavourites = async (cat_id) => {
    const res = await fetch(vars.API_FAVOURITES, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'x-api-key': vars.API_KEY
        },
        body: JSON.stringify({
            image_id: `${cat_id}`
        })
    })

}


const uploadNewCatPhoto = async () => {
    const form = document.querySelector('#newCatForm');
    const formData = new FormData(form)
    console.log(formData.get('file'))

    const res = await fetch(vars.API_UPLOAD, {
        method: 'POST',
        headers: {
            'x-api-key': vars.API_KEY
        },
        body: formData
    })

    const data = await res.json();

    if (res.status !== 201) {
        console.error(`Hubo un error: ${res.status} - ${data.message}`)
    } else {
        console.log("Michi cargado correctamente");
        console.log({ data });
        console.log(data.url);
        saveCatInFavourites(data.id)
    }
}

saveBtn.addEventListener('click', uploadNewCatPhoto)