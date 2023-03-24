let cart = JSON.parse(localStorage.getItem("cart")) || [];

function showVeggieList(){
    fetch("http://localhost:4000/marsvinsdagboken/products/")
    .then(res=> res.json())
    .then(products => {
        console.log(products)
        let veggieList = document.createElement("ul");
        veggieList.innerHTML="";
    
        products.map(product => {
            let item = document.createElement("li");
            item.id = product._id;
            item.innerText = product.title + ", " + product.price + " kr    ";
            let button = document.createElement("button");
            button.innerText = "Köp!";
            button.id = product._id;
            button.addEventListener("click", (e) => {
                addVeggieToCart(e.target.id)
            })
            item.appendChild(button)
            veggieList.appendChild(item)
        });
        let veggieBox = document.getElementById("veggies")
        veggieBox.appendChild(veggieList);
    });
};

function addVeggieToCart(veggieId) {
    console.log(veggieId)
    fetch("http://localhost:4000/marsvinsdagboken/products/" + veggieId)
    .then(res => res.json())
    .then(product => {
        const itemInCart = cart.find(cartProduct => cartProduct._id === product._id)
        if (itemInCart) {
            itemInCart.quantity ++;
        } else {
            const updatedCart = [...cart, {...product, quantity: 1}]
            cart = updatedCart;    
        }
        localStorage.setItem("cart", JSON.stringify(cart))
    })
}

showVeggieList()