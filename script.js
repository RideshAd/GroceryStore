// =======================
// Product list
// =======================
const products = [
    {
        name: "Garam Masala",
        category: "masala",
        image: "img/garam-masala.jpg",
        price: 250,
        rating: 4.5,
        description: "Premium quality masala powder made from a blend of aromatic spices.",
    },
    {
        name: "Tea Masala",
        category: "masala",
        image: "img/tea.jpeg",
        price: 300,
        rating: 4.7,
        description: "Blend of cardamom and cinnamon spices, perfect for milk or black tea.",
    },
    {
        name: "Pooja Thali",
        image: "img/pooja-thali.jpg",
        price: 500,
        rating: 4.8,
        description: "Brass pooja thali set with diya, incense holder, and kumkum box.",
    },
    {
        name: "Turmeric",
        image: "img/turmeric.jpg",
        price: 150,
        rating: 4.6,
        description: "Pure organic turmeric powder, rich in curcumin.",
    },
    {
        name: "Jeeramashino Rice",
        category: "rice",
        image: "img/jeeramashino.jpg",
        price: 2500,
        rating: 4.7,
        description: "High-quality basmati rice with long grains and aroma.",
    },

    {
        name: "arju Rice",
        category: "rice",
        image: "img/arju.png",
        price: 2250,
        rating: 4.5,
        description: "Most demanding and organic rice.",
    },

    {
        name: "aarati Rice",
        category: "rice",
        image: "img/aarati.jpg",
        price: 2300,
        rating: 4.6,
        description: "Fresh and best quality rice.",
    },

     {
        name: "ashiyana Rice",
        category: "rice",
        image: "img/ashu.png",
        price: 2000,
        rating: 4.9,
        description: "Cheap and Good quality rice.",
    }
];

// =======================
// Cart (load from storage)
// =======================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// =======================
// Search
// =======================
function performSearch() {
    let query = document.getElementById('searchInput')?.value.trim().toLowerCase();
    if (!query) return;
    window.location.href = `search.html?query=${encodeURIComponent(query)}`;
}

// =======================
// Checkout
// =======================
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty! 🛒");
        return;
    }
    alert("Thank you for your purchase! 🎉");
    localStorage.removeItem("cart");
    cart = [];
    window.location.href = "shop.html"; // after buying, go back to shop
}

// =======================
// Success Popup (toast)
// =======================
function showSuccessMessage(message) {
    let popup = document.createElement("div");
    popup.textContent = message;
    popup.className = "success-popup";
    document.body.appendChild(popup);

    // trigger fade-in
    setTimeout(() => popup.classList.add("show"), 50);

    // remove after fade-out
    setTimeout(() => {
        popup.classList.remove("show");
        setTimeout(() => popup.remove(), 400);
    }, 1500);
}

// =======================
// Add to Cart
// =======================
function handleAddToCart(p, cartBtn) {
    let existing = cart.find(item => item.name === p.name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...p, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    // Animate button
    if (cartBtn) {
        cartBtn.classList.add("clicked");
        cartBtn.textContent = "✓ Added!";
        cartBtn.style.backgroundColor = "#4CAF50";
    }

    // Show success popup
    showSuccessMessage(`${p.name} added to cart ✅`);

    // Redirect after short delay
    setTimeout(() => {
        window.location.href = "cart.html";
    }, 1000);
}

// =======================
// DOM Ready
// =======================
document.addEventListener('DOMContentLoaded', () => {
    // Search handlers
    document.getElementById('searchBtn')?.addEventListener('click', performSearch);
    document.getElementById('searchInput')?.addEventListener('keypress', e => {
        if (e.key === 'Enter') performSearch();
    });

    // SHOP page
    if (window.location.pathname.includes("shop.html")) {
        const shopContainer = document.getElementById("shop-products");

        products.forEach(p => {
            let div = document.createElement('div');
            div.classList.add('product-row');
            div.innerHTML = `
                <img src="${p.image}" alt="${p.name}">
                <div class="product-details">
                    <h2>${p.name}</h2>
                    <p class="price">Rs. ${p.price}</p>
                    <p class="rating">⭐ ${p.rating}</p>
                    <p class="description">${p.description}</p>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            `;
            shopContainer.appendChild(div);

            div.querySelector(".add-to-cart")
                .addEventListener("click", (e) => handleAddToCart(p, e.target));
        });
    }

    // SEARCH page
    if (window.location.pathname.includes("search.html")) {
        const params = new URLSearchParams(window.location.search);
        const query = params.get("query")?.toLowerCase();
        const resultsContainer = document.getElementById("results");

        if (query) {
            const matches = products.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );

            if (matches.length > 0) {
                matches.forEach(p => {
                    let div = document.createElement('div');
                    div.classList.add('product-row');
                    div.innerHTML = `
                        <img src="${p.image}" alt="${p.name}">
                        <div class="product-details">
                            <h2>${p.name}</h2>
                            <p class="price">Rs. ${p.price}</p>
                            <p class="rating">⭐ ${p.rating}</p>
                            <p class="description">${p.description}</p>
                            <button class="add-to-cart">Add to Cart</button>
                        </div>
                    `;
                    resultsContainer.appendChild(div);

                    div.querySelector(".add-to-cart")
                        .addEventListener("click", (e) => handleAddToCart(p, e.target));
                });
            } else {
                resultsContainer.textContent = `No products found for "${query}"`;
            }
        }
    }

    // CART page
    if (window.location.pathname.includes("cart.html")) {
        const cartContainer = document.getElementById("cart-items");
        const totalDisplay = document.getElementById("cart-total");
        const checkoutBtn = document.getElementById("checkout-btn");

        function renderCart() {
            cartContainer.innerHTML = "";
            let total = 0;

            cart.forEach((item, index) => {
                const subtotal = item.price * item.quantity;
                total += subtotal;

                const row = document.createElement("tr");
                row.innerHTML = `
                    <td><img src="${item.image}" alt="${item.name}" style="width:60px; border-radius:8px;"></td>
                    <td>${item.name}</td>
                    <td>Rs. ${item.price}</td>
                    <td>
                        <input type="number" min="1" value="${item.quantity}" class="qty-input" data-index="${index}">
                    </td>
                    <td>Rs. ${subtotal}</td>
                    <td><button class="remove-btn" data-index="${index}">❌</button></td>
                `;
                cartContainer.appendChild(row);
            });

            totalDisplay.textContent = `Total: Rs. ${total}`;
            localStorage.setItem("cart", JSON.stringify(cart));
        }

        // Qty change
        cartContainer.addEventListener("input", e => {
            if (e.target.classList.contains("qty-input")) {
                let index = e.target.dataset.index;
                let qty = parseInt(e.target.value);
                if (qty > 0) {
                    cart[index].quantity = qty;
                    renderCart();
                }
            }
        });

        // Remove item
        cartContainer.addEventListener("click", e => {
            if (e.target.classList.contains("remove-btn")) {
                let index = e.target.dataset.index;
                cart.splice(index, 1);
                renderCart();
            }
        });

        checkoutBtn?.addEventListener("click", checkout);

        renderCart();
    }
});
