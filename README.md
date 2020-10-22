
# Full Stack Ecommerce Web App

The backend API built for the Surface Group E-Commerce Website.

![screenshot](https://i.imgur.com/iAizmMc.png)

## Installation
1) clone the repo
2) Install the dependencies using NPM or Yarn

```bash
yarn
```

## Run In Development Mode
```bash
yarn run dev
```


## Technologies Used (not all listed, reference package.json):

	* Node.js + Express (runtime + server)

	* JSON web Token / Express JWT 

	* mongoose / MongoDB Atlas (orm + database)

    * Braintree API (payment processing.. in test mode as of now)

	* express-validator (validation)

	* formidable (sending off form data to serialize image upload to store in db)





## The CRUD operations the API consists of are the following:

### User
	* GET: Fetch (Read) User By ID (Auth only)
	* POST: Signup
	* DELETE: Delete users (Admin only)
	* PUT: Update user info
	* GET: Login
	* GET: Logout

### Product
	* POST: Create Products (Admin only)
	* PUT: Update Products (Admin only)
	* DELETE: Delete Products (Admin only)
	* GET: Fetch (Read) Products
	* GET: Get product by ID

### Category
	* POST: Create Category (Admin only)
	* PUT: Update Category (Admin only)
	* DELETE: Delete Category (Admin only)
	* GET: Fetch (Read) Categories

### Reviews
    * GET: Fetch Reviews
	* POST: Create Review

### Orders
	* GET: Fetch Orders (Admin only)
	* GET: Fetch Order Statuses (Admin only)
	* POST: Create Orders 
	* PUT: Update Order Status (Admin only)

### Braintree
	* GET: Generate Client Token
    * POST: Process Payment