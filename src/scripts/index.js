const $ = el => document.querySelector(el)
const $muestra = $('#muestra')

const fetchProducts = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products')
        const json = await response.json()

        return json?.map(product => ({
            id: product.id,
            title: product.title,
            price: product.price,
            category: product.category,
            img: product.image
        }))
    } catch (e) {
        throw new Error('Error al buscar los productos')
    }
}

const renderProducts = async () => {
    const productos = await fetchProducts()

    productos.forEach(element => {
        $muestra.innerHTML += `
            <div class="card p-2 mb-2" style="width: 15rem;">
                <img src="${element.img}" alt="${element.title}" class="img-thumbnail" style="width: 400px; height: 300px;">
                <div class="card-body">
                    <p hidden>${element.id}</p>
                    <h4 class="card-title">${element.title.length > 20 ? element.title.slice(0, 20).concat('...') : element.title}</h4>
                    <h5 class="card-text alert alert-success text-center">$ ${element.price}</h5>
                    <p class="card-text">${element.category.replace(element.category.charAt(0), element.category.charAt(0).toUpperCase())}</p>
                    <div class="d-flex flex-row flex-wrap justify-content-center">
                        <button type="button" class="btn btn-primary text-center me-3" title="Agregar al carrito"><ion-icon name="bag-add-outline"></ion-icon></button>
                        <button type="button" class="btn btn-light text-center" title="Comprar"><ion-icon name="card-outline"></ion-icon></button>
                    </div>
                </div>
            </div>
        `
    });
}

renderProducts()