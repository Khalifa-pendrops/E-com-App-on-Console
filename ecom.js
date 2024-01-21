const khalifa = require("readline");
const rl = khalifa.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const prompt =
  "Hello! Welcome to Khalifa E-com website. Please enter 'OK' to get started.\n";
const products = [
  { item: "Phantom X", price: 350, id: 1 },
  { item: "Spark", price: 255, id: 2 },
  { item: "Camon18", price: 150, id: 3 },
  { item: "Camon19", price: 200, id: 4 },
  { item: "Camon20", price: 300, id: 5 },
];

const cart = [];

//prints a welcome to the user.
rl.question(prompt, (answer) => {
  if (answer !== "") {
    listProducts();
  } else {
    console.log("Please enter 'OK' to continue.");
  }
});

//listen for user input from the terminal.
rl.on("line", (line) => {
  evaluateUserInput(line);
});

function listProducts() {
  let n = products.length;
  console.log(
    "\nAVAILABLE PRODUCTS: (Add items to cart based on the list number.)"
  );
  for (let i = 0; i < n; i++) {
    let product = products[i];
    console.log(`${i + 1}. ${product.item.toLowerCase()} - #${product.price}`);
  }
}

function addToCart(index) {
  let product = products[index - 1];
  cart.push(product);
  console.log("YOUR SHOPPING CART:\n", cart, "(Enter # to checkout)");
}

function evaluateUserInput(userInput) {
  switch (userInput) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5": {
      addToCart(Number(userInput));
      break;
    }
    case "#": {
      if (cart.length > 0) {
        checkout();
      }
      break;
    }
    default: {
      console.log("Please enter a valid option.");
    }
  }
}

function checkout() {
  let total = 0;
  const order = {
    "item selected": [],
  };

  if (cart.length > 0) {
    for (let i = 0; i < cart.length; i++) {
      let cartItem = cart[i];
      order["item selected"].push(cartItem.item);
      total += cartItem.price;
    }
    order["orderTotal"] = `#${total}`;
  }

  console.log(`ORDER DETAILS:\n `, JSON.stringify(order, null, 2) + "\n");

  console.log("THANKS FOR SHOPPING WITH US :)");
  rl.close();
}
