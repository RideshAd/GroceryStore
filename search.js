// Example product database
const products = [
    {
        name: "Garam Masala 500g",
        price: 450,
        sold: 120,
        rating: 4,
        reviews: 45,
        tag: "BEST PRICE",
        tagClass: "best-price",
        image: "garam-masala.jpg"
    },
    {
        name: "Turmeric Powder 1kg",
        price: 350,
        sold: 98,
        rating: 5,
        reviews: 65,
        tag: "FREE GIFT",
        tagClass: "free-gift",
        image: "turmeric.jpg"
    },
    {
        name: "Basmati Rice 5kg",
        price: 1200,
        sold: 75,
        rating: 4,
        reviews: 32,
        tag: "",
        tagClass: "",
        image: "rice.jpg"
    }
];

// Get query from URL
const params = new URLSearchParams(window.location.search);
const searchQuery = params.get("query")?.toLowerCase() || "";

// Filter products
const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery)
);

// Update title and count
document.getElementById("search-title").textContent = searchQuery ? searchQuery : "All Products";
document.getElementById("result-count").textContent = `${filteredProducts.length} items found for "${searchQuery}"`;

// Render products
const productGrid = document.getElementById("product-grid");

if (filteredProducts.length > 0) {
    filteredProducts.forEach(p => {
        const productEl = document.createElement("div");
        productEl.classList.add("product-item");

        productEl.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <div class="product-info">
                <h3>${p.name}</h3>
                <p class="price">Rs. ${p.price}</p>
                <p class="sold">${p.sold} sold</p>
                <div class="rating">${"⭐".repeat(p.rating)}${"☆".repeat(5 - p.rating)} (${p.reviews})</div>
                ${p.tag ? `<span class="tag ${p.tagClass}">${p.tag}</span>` : ""}
            </div>
        `;
        productGrid.appendChild(productEl);
    });
} else {
    productGrid.innerHTML = "<p>No products found.</p>";
}
