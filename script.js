// Select Elements
const addCartButtons = document.querySelectorAll(".add-cart");
const cartItems = document.getElementById("cart-items");
const total = document.getElementById("total");
const cartCount = document.getElementById("cart-count");
const search = document.getElementById("search");

let cart = [];
let totalPrice = 0;

// Add To Cart
addCartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        cart.push({
            name,
            price
        });

        totalPrice += price;

        updateCart();
    });

});

// Update Cart
function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

    } else {

        cart.forEach((item, index) => {

            const div = document.createElement("div");

            div.classList.add("cart-item");

            div.innerHTML = `
                <p>${item.name} - ₹${item.price}</p>

                <button class="remove-btn" onclick="removeItem(${index})">
                    Remove
                </button>
            `;

            cartItems.appendChild(div);

        });

    }

    total.innerText = totalPrice;
    cartCount.innerText = cart.length;

}

// Remove Item
function removeItem(index){

    totalPrice -= cart[index].price;

    cart.splice(index,1);

    updateCart();

}

// Search Products
search.addEventListener("keyup", () => {

    const value = search.value.toLowerCase();

    const cards = document.querySelectorAll(".product-card");

    cards.forEach(card => {

        const productName = card.querySelector("h3").innerText.toLowerCase();

        if(productName.includes(value)){

            card.style.display = "block";

        }else{

            card.style.display = "none";

        }

    });

});
const checkoutBtn = document.getElementById("checkout-btn");
const paymentBox = document.getElementById("payment-box");
const placeOrder = document.getElementById("place-order");

checkoutBtn.addEventListener("click",()=>{

    if(cart.length===0){

        alert("Your cart is empty!");

        return;

    }

    paymentBox.style.display="block";

});

placeOrder.addEventListener("click",()=>{

    const payment=document.querySelector('input[name="payment"]:checked');

    if(!payment){

        alert("Please select a payment method.");

        return;

    }

    alert("🎉 Order Placed Successfully!\n\nPayment Method : "+payment.value+"\n\nThank You For Shopping With Us ❤️");

    cart=[];

    totalPrice=0;

    paymentBox.style.display="none";

    updateCart();

});