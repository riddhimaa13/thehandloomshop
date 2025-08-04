document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productName = event.target.dataset.product;
            alert(`"${productName}" has been added to your cart! (This is a demo alert)`);
        });
    });
});