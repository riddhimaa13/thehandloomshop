document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            const isActive = nav.classList.contains('active');
            mobileMenuToggle.textContent = isActive ? '\u2715' : '\u2630';
        });
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileMenuToggle.textContent = '\u2630';
            });
        });
    }

    // Product Data (dynamic)
    const products = [
        {
            id: 1,
            name: 'Elegant Red Saree',
            image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
            desc: 'A stunning red saree perfect for festive occasions.',
            price: 2999
        },
        {
            id: 2,
            name: 'Classic Blue Kurta',
            image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80',
            desc: 'Traditional blue kurta with modern design.',
            price: 1599
        },
        {
            id: 3,
            name: 'Handcrafted Dupatta',
            image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
            desc: 'Beautifully handcrafted dupatta with floral patterns.',
            price: 899
        },
        {
            id: 4,
            name: 'Designer Lehenga',
            image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
            desc: 'Designer lehenga for weddings and special events.',
            price: 4999
        },
        {
            id: 5,
            name: 'Cotton Palazzo Pants',
            image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
            desc: 'Comfortable and stylish cotton palazzo pants.',
            price: 799
        },
        {
            id: 6,
            name: 'Embroidered Shawl',
            image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
            desc: 'Warm shawl with intricate embroidery.',
            price: 1299
        },
        {
            id: 7,
            name: 'Pastel Green Saree',
            image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
            desc: 'Pastel green saree for a subtle, elegant look.',
            price: 2499
        },
        {
            id: 8,
            name: 'Printed Cotton Kurti',
            image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
            desc: 'Lightweight printed cotton kurti for daily wear.',
            price: 699
        },
        {
            id: 9,
            name: 'Traditional Silk Dupatta',
            image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=400&q=80',
            desc: 'Luxurious silk dupatta with golden border.',
            price: 1599
        }
    ];

    // Render products dynamically
    const productGallery = document.getElementById('product-gallery');
    if (productGallery) {
        productGallery.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.desc}</p>
                <div class="product-price">₹${product.price}</div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `).join('');
    }

    // Shopping Cart Functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Update cart badge
    function updateCartDisplay() {
        const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        let cartBadge = document.querySelector('.cart-badge');
        if (cartBadge) {
            cartBadge.textContent = cartCount > 0 ? cartCount : '';
        }
    }

    // Add to cart
    productGallery.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const id = parseInt(e.target.dataset.id);
            const product = products.find(p => p.id === id);
            if (!product) return;
            const existing = cart.find(item => item.id === id);
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
            showNotification(`${product.name} added to cart!`, 'success');
            e.target.style.transform = 'scale(0.95)';
            setTimeout(() => { e.target.style.transform = 'scale(1)'; }, 150);
        }
    });

    // Cart Modal Logic
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.querySelector('.close-cart');
    const cartItemsDiv = document.querySelector('.cart-items');
    const cartTotalDiv = document.querySelector('.cart-total');
    const checkoutBtn = document.querySelector('.checkout-btn');

    function renderCart() {
        if (!cartItemsDiv) return;
        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
            cartTotalDiv.textContent = '';
            checkoutBtn.style.display = 'none';
            return;
        }
        cartItemsDiv.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <span>${item.name}</span>
                    <span>₹${item.price} × ${item.quantity}</span>
                </div>
                <button class="cart-item-remove" data-id="${item.id}">Remove</button>
            </div>
        `).join('');
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        cartTotalDiv.textContent = `Total: ₹${total}`;
        checkoutBtn.style.display = 'block';
    }

    // Open cart modal
    if (cartIcon && cartModal) {
        cartIcon.addEventListener('click', () => {
            cartModal.classList.add('active');
            renderCart();
        });
    }
    // Close cart modal
    if (closeCart && cartModal) {
        closeCart.addEventListener('click', () => {
            cartModal.classList.remove('active');
        });
    }
    // Remove item from cart
    if (cartItemsDiv) {
        cartItemsDiv.addEventListener('click', (e) => {
            if (e.target.classList.contains('cart-item-remove')) {
                const id = parseInt(e.target.dataset.id);
                cart = cart.filter(item => item.id !== id);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
                updateCartDisplay();
            }
        });
    }
    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            showNotification('Checkout is not implemented in this demo.', 'info');
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#28a745' : '#007bff',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '5px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Initialize cart display
    updateCartDisplay();

    // Form handling
    const contactForm = document.querySelector('.contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }

    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });
});