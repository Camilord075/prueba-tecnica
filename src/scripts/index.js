const $ = el => document.querySelector(el) //Este selector nos servirá para hacer mención a cualquier elemento del DOM marcado con una ID específica
const $muestra = $('#muestra') //Aquí buscamos el elemento 'muestra'

const fetchProducts = async () => { //Función con la cual se hace el fetching de datos de la API
    try {
        const response = await fetch('https://fakestoreapi.com/products')
        const json = await response.json()

        return json?.map(product => ({ //Aquí usamos map para poder sacar la información más importante y crear un contrato personalizado sobre el uso de la API
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

const renderProducts = async () => { //Con esta función hacemos el render de los productos de la API
    const productos = await fetchProducts()

    productos.forEach(element => { //Este es nuestro template
        $muestra.innerHTML += `
            <div class="card p-2 mb-2" style="width: 15rem;">
                <img src="${element.img}" alt="${element.title}" class="img-thumbnail" style="width: 400px; height: 300px;">
                <div class="card-body">
                    <p hidden>${element.id}</p>
                    <h4 class="card-title">${element.title.length > 20 ? element.title.slice(0, 20).concat('...') : element.title}</h4> ${''/* Acá se mira la cantidad de letras de cada titulo y si es mayor a 20, se estiliza de manera que se mantengan las tarjetas del mismo tamaño */}
                    <h5 class="card-text alert alert-success text-center">$ ${element.price}</h5>
                    <p class="card-text">${element.category.replace(element.category.charAt(0), element.category.charAt(0).toUpperCase())}</p> ${''/* En este espacio se reemplaza la primera letra de la categoría por su misma en mayúscula */}
                    <div class="d-flex flex-row flex-wrap justify-content-center">
                        <button type="button" class="btn btn-primary text-center me-3" title="Agregar al carrito"><ion-icon name="bag-add-outline"></ion-icon></button>
                        <button type="button" class="btn btn-light text-center" title="Comprar"><ion-icon name="card-outline"></ion-icon></button>
                    </div>
                </div>
            </div>
        `
    }); //TODO: Hacer que los botones sean funcionales y agreguen los productos a un carrito
}

renderProducts() //Llamada al render de los productos, para que se muestre dentro de la página