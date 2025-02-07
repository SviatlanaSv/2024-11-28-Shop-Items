# 🛍️ Shop Items Express API

Welcome to the **Shop Items API**! This is a simple Node.js API built with Express, which doesn't come with a traditional user interface. Instead, it's meant to be interacted with via **Postman**. 🖥️✨

I’ve worked on this project through Postman, creating **unique variables** in the tests and storing them in the collection's variable store. This way, you can run tests again and again without worrying about hardcoded values! 🙌

## 🛠️ How to Get Started

1. **Clone this repo**:
   ```bash
   git clone https://github.com/SviatlanaSv/2024-11-28-Shop-Items.git
   cd 2024-11-28-Shop-Items
   ```
2. Run `npm install` to install all the dependencies.

## 🚀 Scripts

- `npm run dev`: Spins up a local development server using `nodemon` that auto-restarts on code changes.
- `npm run test`: Runs **Postman tests** using `Newman` on the `shop_items.postman_collection.json` file.

## 📝 About the Tests

The tests use **randomized data** to make sure everything runs smoothly and is flexible for different scenarios! Here's how it works:

- I created arrays with possible **names**, **descriptions**, and **prices** for products. When running the tests, random values are picked from these arrays to make each test run unique.
  
Example:
```javascript
const names = ["Soap", "Shampoo", "Toothpaste", "Conditioner", "Lotion", "Gel", "Cream", "Deodorant", "Perfume", "Body Wash"];

const descriptions = ["White", "Blue", "Green", "Red", "Yellow", "Pink", "Purple", "Black", "Orange", "Brown"];

const prices = ["1.99", "2.49", "3.00", "3.50", "4.00", "4.99", "5.50", "6.00", "7.25", "8.99"];

const randomName = names[Math.floor(Math.random() * names.length)];
const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
const randomPrice = prices[Math.floor(Math.random() * prices.length)];

pm.collectionVariables.set('nameForGetItem', randomName);
pm.collectionVariables.set('descriptionForGetItem', randomDescription);
pm.collectionVariables.set('priceForGetItem', randomPrice);
```

- In addition to item details, I also store **unique IDs** for items, which are used to **update** and **delete** items in later tests. This ensures that tests can be re-run without conflict and updates are properly handled. 🔄

> **Note**: These test scripts are just for **example purposes** and can be modified to suit your needs. The idea is to keep everything flexible and reusable! 

## 🏗️ Dependencies

- `express`: The backend framework that makes everything tick.
- `body-parser`: Middleware to help parse incoming request bodies.

## 📝 License

This project is licensed under the **ISC License**. ✨

---

Feel free to run the tests, experiment, and explore the API! If you need to make any modifications or enhancements, you're welcome to fork the repo and get creative! 🚀
```
