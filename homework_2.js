/* DONT CHANGE THIS CODE - START */
function wait(ms = 1000) { return new Promise(resolve => setTimeout(resolve, ms)) }

class Dish {
    constructor(cookingTime) {
        this.cookingTime = cookingTime;
    }

    async cook() {
        const actualCookingTime = this.cookingTime * (1 + Math.random()) * 100;
        await wait(actualCookingTime);
        return this;
    }
}
/* DONT CHANGE THIS CODE - END */

class Kitchen {
    constructor() {
        this.orders = [];
        this.items = {};
    }

    addToFridge(ingredients) {
        for (let i=0; i<ingredients.length; i++) {
            if (this.items[ingredients[i].item] === undefined) {
                this.items[ingredients[i].item] = ingredients[i].amount;
            }
            else {
                this.items[ingredients[i].item] += ingredients[i].amount;
            } 
        }
    }

    order(dish) {
        for (let key in dish.ingredients) {
            if ((this.items[key] === undefined) || (this.items[key] < dish.ingredients[key])) {
                throw new Error('Not enough ingridients in fridge');
            }
            else {
                this.items[key] -= dish.ingredients[key];
            }
        }
        this.orders.push(dish);
    }

    cookFastestOrder() {
        let fastestTime = Infinity;
        let fastest = '';
        let indexOf = 0;
        for (let i=0; i<this.orders.length; i++) {
            if (this.orders[i].cookingTime < fastestTime) {
                fastestTime = this.orders[i].cookingTime;
                fastest = this.orders[i];
                indexOf = i;
            }
        }
        if (fastest === '') {
            throw new Error('Order list is empty!');
        }
        this.orders.splice(indexOf, 1);
        return fastest.cook();
    }

    cookAllOrders() {
        let cooked = []
        for (let i=0; i<this.orders.length; i++) {
            cooked.push(this.orders[i].cook());
        }
        this.orders = [];
        return cooked;
    }
}

class Ingridient {
    constructor(item, amount) {
        this.item = item;
        this.amount = amount;
    }
}

class Bolognese extends Dish {
    constructor() {
        super(10);
        this.name = 'bolognese';
        this.ingredients = {'spaghetti': 1,
                            'meat': 1,
                            'tomato': 1};
    }
}

class MashedPotatoes extends Dish {
    constructor() {
        super(8);
        this.name = 'MashedPotatoes';
        this.ingredients = {'potato': 1};
    }
}

class Steak extends Dish {
    constructor() {
        super(7);
        this.name = 'Steak';
        this.ingredients = {'meat': 2};
    }
}

class SteakAndFries extends Dish {
    constructor() {
        super(9);
        this.name = 'SteakAndFries';
        this.ingredients = {'potato': 1,
                            'meat': 2};
    }
}

// tests
async function test() {
    const kitchen = new Kitchen();
    kitchen.addToFridge([
        new Ingridient('potato', 1),
        new Ingridient('spaghetti', 1),
        new Ingridient('meat', 3),
        new Ingridient('tomato', 2)
    ])

    kitchen.order(new Bolognese()); // Bolognese extends Dish (cookingTime = 10)
    kitchen.order(new MashedPotatoes()); // MashedPotatoes extends Dish (cookingTime = 8)
    kitchen.order(new Steak()); // Steak extends Dish (cookingTime = 7)

    // Feel free to experiment with various dishes and ingridients

    await kitchen.cookFastestOrder(); // Returns fastest dish to make
    await kitchen.cookAllOrders(); // Returns two dishes in array

    kitchen.order(new SteakAndFries()); // Throws Error: Not enough ingridients in fridge
}

test();
