const products = [
    {
        _id: '1',
        handle: 'dry-powder-6kg',
        title: '6kg ABC Dry Powder Fire Extinguisher',
        description: 'Certified ABC extinguisher for offices, shops, and homes. Includes wall mount and inspection tag.',
        category: 'Dry Chemical',
        type: 'Dry Powder',
        brand: 'Fire.Stop!',
        capacity_kg: 6,
        class_rating: 'ABC',
        soncap_number: 'SONCAP-001',
        warranty_months: 24,
        price: 65000,
        compare_at_price: 75000,
        sku: 'DP6KG-ABC',
        barcode: '1234567890123',
        weight_kg: 9,
        inventory_qty: 100,
        image1_url: 'images/dry-powder-6kg.webp' // Updated path
    },
    {
        _id: '2',
        handle: 'co2-5kg',
        title: '5kg CO₂ Fire Extinguisher',
        description: 'Ideal for electrical rooms and IT offices. CO₂ cylinder with discharge horn.',
        category: 'CO2',
        type: 'CO₂',
        brand: 'Fire.Stop!',
        capacity_kg: 5,
        class_rating: 'BC',
        soncap_number: 'SONCAP-002',
        warranty_months: 24,
        price: 78000,
        compare_at_price: 85000,
        sku: 'CO2-5KG',
        barcode: '1234567890124',
        weight_kg: 14,
        inventory_qty: 75,
        image1_url: 'images/co2-5kg.webp' // Updated path
    },
    {
        _id: '3',
        handle: 'foam-9l',
        title: '9L Foam Fire Extinguisher',
        description: 'For flammable solids and liquids. Ideal for warehouses.',
        category: 'Foam',
        type: 'Foam',
        brand: 'Fire.Stop!',
        capacity_kg: 9,
        class_rating: 'AB',
        soncap_number: 'SONCAP-003',
        warranty_months: 24,
        price: 72000,
        compare_at_price: 80000,
        sku: 'FOAM-9L',
        barcode: '1234567890125',
        weight_kg: 12,
        inventory_qty: 50,
        image1_url: 'images/foam-9l.webp' // Updated path
    }
];


let cart = [];

function renderProducts(filter = 'all') {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    let filteredProducts = products;
    if (filter !== 'all' && filter !== 'size' && filter !== 'type' && filter !== 'capacity') {
        filteredProducts = products.filter(p => p.category === filter);
    }
    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image1_url}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>₦${product.price.toLocaleString()}</p>
            <p>Stock: ${product.inventory_qty > 0 ? 'Available' : 'Out of Stock'}</p>
            <button ${product.inventory_qty > 0 ? '' : 'disabled'} onclick="addToCart('${product._id}')">Add to Cart</button>
        `;
        grid.appendChild(card);
    });
}

function addToCart(id) {
    const product = products.find(p => p._id === id);
    if (product && product.inventory_qty > 0) {
        const cartItem = cart.find(item => item.id === id);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, id: product._id, quantity: 1 });
        }
        updateCart();
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span>${item.title} x ${item.quantity}</span>
            <span>₦${(item.price * item.quantity).toLocaleString()}</span>
            <button onclick="removeFromCart('${item.id}')">Remove</button>
        `;
        cartItems.appendChild(div);
        total += item.price * item.quantity;
    });
    document.getElementById('cart-total').textContent = total.toLocaleString();
    document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function filterProducts(value) {
    renderProducts(value);
}

// Mock checkout
document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }
    const form = e.target;
    const order = {
        customer: {
            name: form[0].value,
            email: form[1].value,
            phone: form[2].value,
            address: form[3].value,
        },
        items: cart.map(item => ({ productId: item.id, quantity: item.quantity, price: item.price })),
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        delivery: form[4].value,
        paymentMethod: form[5].value,
    };
    alert(`Order placed! (Mock) Total: ₦${order.total.toLocaleString()}, Delivery: ${order.delivery}, Payment: ${order.paymentMethod}`);
    console.log('Order:', order); // Simulate saving to database
    cart = [];
    updateCart();
});

// Initial render
renderProducts();
