# Car Management System

Welcome to the Car Management System repository!
This project is a full-stack application that allows users to manage cart,
view product details, add products to a cart, manage the cart, and apply coupons. Currently, all operations are performed locally without any API integration.

## Table of Contents

- [Features](#features)
- [Roadmap](#roadmap)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Product Listing**: Displays a list of predefined products.
- **Product Details**: View detailed information about each  product.
- **Add to Cart**: Add products to the shopping cart from both the product list and product details pages.
- **Cart Management**: Manage the cart by adding or removing products, adjusting quantities, and applying coupons.
- **Frontend Only**: All operations are currently performed on the frontend without any API integration.

## Roadmap

### Current Stage

1. **Product Listing and Details**:
    - Page containing predefined products.
    - Display each product in a separate card.
    - View product details and add products to the cart.

2. **Cart Management**:
    - Add products to the cart.
    - Remove products or reduce quantities in the cart.
    - Apply discount coupons.

3. **Unit Testing**:
    - Comprehensive unit tests covering all existing features.

### Upcoming Features

1. **Add Product Form**:
    - Create a local form to add new products.
    - This feature will not be connected to any API.
    - Add unit tests for this feature.

2. **API Integration**:
    - Integrate with a real REST API to fetch product data.
    - Transition from local data to dynamic data fetching.

3. **Checkout Page**:
    - Implement a checkout page for processing orders.

## Installation

To get started with the Car Management System, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/rayanazzam1991/cartManagementSystem.git
    cd cartManagementSystem
    ```
2. **Install PNPM**:
    ```bash
    npm install -g pnpm
    ```
   
3. **Install dependencies**:
    ```bash
    pnpm install
    ```

4. **Run the development server**:
    ```bash
    pnpm dev
    ```

## Usage

- **Viewing Products**: Navigate to the main page to see a list of predefined  products.
- **Product Details**: Click on a product card to view its details.
- **Add to Cart**: Add products to the cart either from the product list or the product details page.
- **Manage Cart**: View your cart, adjust quantities, remove products, and apply coupons.

## Contributing

We welcome contributions to enhance the Car Management System. If you have suggestions or improvements, please submit a pull request or open an issue.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License.