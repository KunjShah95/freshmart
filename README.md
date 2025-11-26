# FreshMart - Organic Grocery Store Website

FreshMart is a fully responsive e-commerce website template designed for an organic grocery store. It provides a seamless user experience for browsing products, managing a shopping cart, and proceeding to checkout. The project is built using pure HTML, CSS, and JavaScript, ensuring a lightweight and fast-loading interface without external framework dependencies.

## Features

* **Responsive Design**: The layout is fully optimized for desktop, tablet, and mobile devices, ensuring a consistent experience across all screen sizes.
* **Product Catalog**: Users can browse a variety of organic products. The shop page includes functionality to filter products by category (e.g., Fruits, Vegetables) and a search bar to find specific items.
* **Dynamic Product Details**: Clicking on a product navigates to a dedicated details page that dynamically loads product information using URL parameters.
* **Shopping Cart System**: A fully functional shopping cart that uses the browser's LocalStorage to persist selected items even after the page is refreshed. Users can add items, update quantities, and remove items.
* **Checkout Process**: A structured checkout page that displays an order summary and collects billing information.
* **Contact Form**: A contact page with a validated form for user inquiries.
* **Toast Notifications**: A custom-built notification system that provides visual feedback for user actions, such as adding an item to the cart.

## Technologies Used

* **HTML5**: For the structural foundation of the web pages.
* **CSS3**: For styling, utilizing modern layout techniques like Flexbox and CSS Grid, as well as CSS Variables for consistent theming.
* **JavaScript (Vanilla)**: For all interactive functionality, including the cart logic, search filtering, and dynamic DOM manipulation. No external JavaScript frameworks (like React or Vue) were used.
* **Font Awesome**: For the iconography used throughout the site.
* **LocalStorage API**: For client-side state management of the shopping cart.

## Project Structure

* `index.html`: The main landing page of the website.
* `shop.html`: The product listing page with search and filter capabilities.
* `product-details.html`: A template page for displaying individual product details.
* `cart.html`: The shopping cart page where users can review their selected items.
* `checkout.html`: The final step for users to enter shipping details and place an order.
* `contact.html`: A page containing contact information and a message form.
* `blog.html`: A section for news and articles related to organic living.
* `style.css`: The main stylesheet containing all visual styles and responsive media queries.
* `script.js`: The core JavaScript file handling all application logic.
* `img/`: Directory containing all image assets for products, banners, and UI elements.

## Setup and Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory.
3. Open the `index.html` file in any modern web browser (Chrome, Firefox, Edge, Safari).

No backend server or build process is required to run the frontend interface.

## Usage

1. **Browsing Products**: Navigate to the "Shop" page to view available items. Use the category buttons to filter between fruits and vegetables, or use the search bar to find specific products.
2. **Managing Cart**: Click the "shopping cart" icon on any product to add it to your cart. You will see a notification confirming the action. Click the cart icon in the header to view your selected items.
3. **Checkout**: From the cart page, proceed to checkout. Fill in the required billing details. Note that this is a frontend template, so the "Place Order" button simulates a transaction without processing actual payments.

## Future Improvements

* Integration with a backend API for real-time product inventory and user authentication.
* Implementation of a real payment gateway (e.g., Stripe or PayPal).
* User account dashboard for order history and profile management.

## License

This project is open source and available for educational and personal use.
