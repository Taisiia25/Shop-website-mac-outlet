
// Swiper
new Swiper('.swiper', {
	autoplay: {
	  delay: 3000,
	  stopOnLastSlide: false,
	  disableOnIteraction: false,
	},
	speed: 800,
  });


// Modal close
document.querySelector('.modal').addEventListener("click", (event) => {
	const isClickInsideModal = document.querySelector(".modal_active .innerModal").contains(event.target)
	if (!isClickInsideModal) {
		document.querySelector(".modal_active").classList.remove('modal_active')
	}
});


const createModal = (item) => {
	// Modal
	const modalElem = document.querySelector(".modal");
	console.log(item);

	modalElem.classList.add('modal_active');

	//name
	const modalName = document.querySelector('.name-modal');
	modalName.textContent = item.name;

	//likes
	const likeModal =  document.querySelector('.number-rewiews-modal');
	const likes = Math.floor(Math.random() * 101)
	likeModal.textContent = `${likes}%`;
	//orders
	const orderModel = document.querySelector('.number-of-orders-modal');
	const ordered = Math.floor(Math.random() * 1001)
	orderModel.textContent = `${ordered}`;
	

	//full information about item
	const imgModal = document.querySelector('.img-modal');
	imgModal.src = `./img/${item.imgUrl}`;

	const color = document.querySelector('.description-color');
	color.textContent = item.color.join(', ');

	const os = document.querySelector('.description-os');
	os.textContent = item.os;

	//chip
	const chip = document.querySelector('.description-chip');

	chip.textContent = item.chip.cores === null ? `${item.chip.name}`: `${item.chip.name} cores: ${item.chip.cores}`

	const height = document.querySelector('.description-height')
	height.textContent = item.size.height;

	const width = document.querySelector('.description-width');
	width.textContent = item.size.width;

	const depth = document.querySelector('.description-depth');
	depth.textContent = item.size.depth;

	const weight = document.querySelector('.description-weight');
	weight.textContent = item.size.weight;

	// price
	const priceInModal = document.querySelector('.price-modal-number');
	priceInModal.textContent = item.price;

	//in stock
	const inStockModal = document.querySelector('.number-in-stock-modal');
	inStockModal.textContent = item.orderInfo.inStock;
	//btn 
	// const btnModal = document.querySelector('.btn-modal');
	// btnModal.textContent = "Add to cart";
}

class Item {
	constructor(item) {
		Object.assign(this, item);
		this.like = false;
		this.orders = Math.round(Math.random() * 1000);
		this.likes = Math.floor(Math.random() * 101)
	}

	get isAvailableForBuy(){
		return this.orderInfo.inStock > 0;
	}

	get absoluteImgPath(){
		return `img/${this.imgUrl}`;
	}

	toggleLike(){
		//to rewrite current value
		return this.like = !this.like;
	}

	checkIsNameIncludes(name) {
        const nameAsLowerCase = name.toLowerCase();
        return this.name.toLowerCase().includes(nameAsLowerCase);
    }

	checkIsColorIncludes(colors) {
        if(!colors.length) return true;

        for(const color of colors) {
            const isExists = this.color.includes(color);
            if(isExists) {
                return true;
            }
        }
        return false;
    }

    checkIsStorageIncludes(storages) {
        // storages [256, 512, 1024]
        // this.storage 2048
        if(!storages.length) return true;

        for(const storage of storages) {
            if(this.storage === storage){
                return true;
            }
        }
        return false;
    }

	checkIsOsIncludes(oses) { 
        if(!oses.length) return true;

        for(const os of oses) {
            if(this.os === os){
                return true;
            }
        }
        return false;
    }

	checkIsDisplayIncludes(displayes) {
        
        if(!displayes.length) return true;

        for (const display of displayes) {
			if (display === '<5' && this.display < 5) {
			  return true;
			}
			if (display === '5-7' && this.display >= 5 && this.display < 7) {
			  return true;
			}
			if (display === '7-12' && this.display >= 7 && this.display < 12) {
			  return true;
			}
			if (display === '12-16' && this.display >= 12 && this.display <= 16) {
			  return true;
			}
			if (display === '+16' && this.display > 16 && this.display !== null) {
			  return true;
			}
		}
    }

	checkIsPriceIncludes(prices) {
		if (!prices.length) return true;

		for (const price of prices) {
		  if (this.price === price) {
			return true;
		  }
		}
		return false;
	}


}
//зберігає всі item для запитів(як БД) у вигляді екземплярів класу Item
class ItemsModel {
	constructor() { 
		// Create Item instances list from items list
		this.items = items.map(item => new Item(item));
	}

	// array with colors from  item list
	get availableColors(){
		return this.items
		.reduce((acc, item) => [...acc, ...item.color],[])
		.filter((item, index, arr) => arr.indexOf(item) === index);
	}

	get availableStorage(){
		return this.items
		.map(item => item.storage)
		.filter((item, index, arr) => arr.indexOf(item) === index && item !== null);
	}

	get availableOses(){
		return this.items
		.map(item => item.os)
		.filter((item, index, arr) => arr.indexOf(item) === index && item !== null);
	}

	get availableDisplayes(){
		let modifiedDisplays = ['<5', '5-7', '7-12', '12-16', '+16'];
    	return modifiedDisplays
			.filter((item, index, arr) => arr.indexOf(item) === index && item !== null);
	}

	get availablePrice() {
		return this.items
		  .map(item => item.price)
		  .filter(
			(item, index, arr) => arr.indexOf(item) === index && item !== null)
			.sort((a, b) => {return a - b});	
	}

	// Get list with items based on query as substring in item name
	findManyByName(name) {
        const nameAsLowerCase = name.toLowerCase();
        return this.items.filter(item => item.name.toLowerCase().includes(nameAsLowerCase));
	}

	filterItems(filter = {}) {
		const {
			name = '',
			color = [],
			storage = [],
			os = [],
			display = [],
			price = [],
		} = filter;

		return this.items.filter(item => {
            // Check on substring includes in string
            const isNameIncluded = item.checkIsNameIncludes(name);
            if(!isNameIncluded) return false;

            // Check on substring includes in string
            const isColorIncluded = item.checkIsColorIncludes(color);
            if(!isColorIncluded) return false;

            // Check on substring includes in string
            const isStorageIncluded = item.checkIsStorageIncludes(storage);
            if(!isStorageIncluded) return false;

			const isOsIncluded = item.checkIsOsIncludes(os);
            if(!isOsIncluded) return false;

			const isDisplayIncluded = item.checkIsDisplayIncludes(display);
            if(!isDisplayIncluded) return false;

			const isPriceIncluded = item.checkIsPriceIncludes(price);
      		if (!isPriceIncluded) return false;

			return true;
		});
	}
}

class RenderCards {
	//  seems like dependancy injection ?
	constructor(itemsModel, cart) {
		this.cardsContainer = document.querySelector(".cards-items"); // Container  element
		this.cart = cart;
		this.renderCards(itemsModel.items); // Auto render cards after init page
	}
	
	static renderCard(item)  {

		const cardElement = document.createElement('div'); 
		
		cardElement.className = 'card';

		// Modal open
		cardElement.onclick = () => {
			
			createModal(item)
		};


		// Add content
		cardElement.innerHTML = `
		<div  class="card-info">
                                <img class="img-card" src="${item.absoluteImgPath}"/>
                                <p class="item-name">${item.name}</p>
                                <div class="stock card-availability">${item.orderInfo.inStock} left in stock</div>
                                <div class="price">Price: <span class="price price-number">${item.price}</span> $</div>
                                <button class="btn btn-card">Add to cart</button>
                                <button class="like-btn">
                                    <img class="like" src="img/icons/like_filled1.png">
                                </button>
                            </div>
                            <div class="card-footer">
                                <div class="like-permanent">
                                    <img src="img/icons/like_filled1.png">
                                </div>
                                <div class="reviews">
                                    <p class="reviews text-rewiew"><span class="reviews number-rewiews">${item.likes}%</span>Positive reviews</p>
                                    <p class="reviews reviews-above"> Above avarage</p>
                                </div>
                                <div class="orders">
                                    <p class="number-of-orders">${item.orders}</p>
                                    <p class="orders-text">orders</p>
                                </div>
                            </div>
		`;

		const likeBtn = cardElement.querySelector('.like');
		// for saving current condition for likeBtn if card will be rerendered
		if(item.like) {
			likeBtn.classList('active');
		}

		likeBtn.onclick = () => {
			item.toggleLike();
			likeBtn.classList.toggle('active');
		}

		likeBtn.addEventListener('click', e => {
			likeBtn.classList.toggle('like_active');
			e.stopPropagation();
		});

		// for disable button and disable icons
		const button = cardElement.querySelector('.btn-card');
    	const iconDisable = cardElement.querySelector('.card-availability');

		if (item.isAvailableForBuy) {
			button.addEventListener('click', e => {
				e.stopPropagation();
			});
		} else {
			button.disabled = true;
			button.classList.add('disable-btn');
			iconDisable.classList.add('card-non-availability');
		}

		// 
		// cardElement.onclick = (e) => {
		// 	console.log(item);
		// }
		
		button.addEventListener('click', () => {
			cart.addToCart(item);
			renderCart.renderCartItems(cart.items);
		});

		

		// button.oncklick.addEventListener ('click', () => {
		// 	cart.addToCart(item);
		// 	renderCart.renderCartItems(cart.items);
		// });

		return cardElement;
	}
	

	renderCards(items) {
        // Clear container
        this.cardsContainer.innerHTML = '';

        // Cereate elements with cards based on items list
        const elements = items.map(item => RenderCards.renderCard.call(this, item));

        // Add elements to container
        this.cardsContainer.append(...elements);
    }
}


class Filter {
	#itemsModel = null;
	#renderCards = null;
	constructor(itemsModel, renderCards){
		this.name = '';
		this.sort = 'default';
		this.color = [];
		this.storage = [];
		this.os = [];
		this.display = [];
		this.from = 0;
    	this.to = Infinity;
		this.#itemsModel = itemsModel;
		this.#renderCards = renderCards;
	}
	// для розуміння який фільтер використовується (sort/name)
	setFilter(key, value) {
		if (!Array.isArray(this[key])) {
			this[key] = value;
			this.#findAndRerender();
			console.log(this)
			return;
		}

		if(this[key].includes(value)) {
			// якщо колір є, то він видалиться
			this[key] = this[key].filter(val => val !== value);
		} else {
			// якщо немає. то додається
			this[key].push(value);
		}
		this.#findAndRerender();
	}

	#findAndRerender() {
		const items = this.#itemsModel.filterItems({...this});
		
		this.#renderCards.renderCards(items);
	}
}

class RenderFilters {
	#filter = null;
	constructor(itemsModel, filter){
		this.#filter = filter;
		this.containerElem = document.querySelector('.accordion-container');
		this.filterOptions = [
			{
				displayName: 'Price',
				name: 'price',
				options: itemsModel.availablePrice,
			  },
			{
				displayName: 'Color',
				name: 'color',
				options: itemsModel.availableColors,
			},
			{
				displayName: 'Storage',
				name: 'storage',
				options: itemsModel.availableStorage,
			},
			{
				displayName: 'OS',
				name: 'os',
				options: itemsModel.availableOses,
			},
			{
				displayName: 'Display',
				name: 'display',
				options: itemsModel.availableDisplayes,
			}
		];

		this.inputName = document.querySelector('.searchbox__input');
		this.selectSort = document.getElementById('sortFilter');

		// виклик setFilter (запис з input)
		this.inputName.oninput = (event)  =>  {
			const { value }  = event.target;
			this.#filter.setFilter('name', value);
		}
		// value = asc/desc/default
		this.selectSort.onchange = (event)  =>  {
			const { value }  = event.target;
			console.log(value);
			this.#filter.setFilter('sort', value);
		}

		this.renderFilters(this.filterOptions);
	}

	renderFilter(optionsData){
		const filterAccordionBtn = document.createElement('button');
		filterAccordionBtn.className = 'accordion';
		filterAccordionBtn.innerHTML = `<p class="accordion-title-text">${optionsData.displayName}</p>
		<img class="accordion-icon" src="img/icons/arrow_left.svg" alt=""/>`;
		this.containerElem.append(filterAccordionBtn);

		const filterPanel = document.createElement('div');
		filterPanel.className = 'panel-accordion';

		if (optionsData.name !== 'price') {
			const optionsElements = optionsData.options.map(option => {
			const filterOption = document.createElement('label');
			filterOption.innerHTML = `<span>${option}</span>`;

			const checkbox = document.createElement('input');
			checkbox.type = 'checkbox';
			checkbox.value = option;
			checkbox.onchange = () => {
				this.#filter.setFilter(optionsData.name, option);
			};
			filterOption.appendChild(checkbox);

			return filterOption;
			});

			filterPanel.append(...optionsElements);
			this.containerElem.append(filterPanel);
		}

		if (optionsData.name === 'price') {
			const minPrice = document.createElement('label');
			const maxPrice = document.createElement('label');
			const inputMinPrice = document.createElement('input');
			const inputMaxPrice = document.createElement('input');
			const inputPriceFrom = document.createElement('p');
			const inputPriceTo = document.createElement('p');
			filterPanel.className = 'panel-accordion';
			filterPanel.className = ' panel-price-accordion';
			inputMinPrice.className = 'input-min-price';
			inputMaxPrice.className = 'input-max-price';
			inputMinPrice.type = 'number';
            inputMaxPrice.type = 'number';

			inputPriceFrom.innerHTML = 'From:';
			inputPriceTo.innerHTML = 'To:'

			inputPriceFrom.style.fontSize = '16px';
			inputPriceTo.style.fontSize = '16px';

			minPrice.append(inputPriceFrom, inputMinPrice);
			maxPrice.append(inputPriceTo, inputMaxPrice);

			filterPanel.append(minPrice, maxPrice);
			this.containerElem.append(filterPanel);
		}

		filterAccordionBtn.addEventListener('click', function () {
			this.classList.toggle('active');
		
			const panel = this.nextElementSibling;
			if (panel.style.display === 'block') {
				panel.style.display = 'none';
			} else {
				panel.style.display = 'block';
			}
		});

		return filter;
	}
	

	renderFilters(){
		this.containerElem.innerHTML = '';

		const filtersElements = this.filterOptions.map(optionsData =>
			this.renderFilter(optionsData)
			);

		return filtersElements;
	}
}

class Cart {
	constructor(){
		this.items = [];
	}

	addToCart(item) {
		const id = item.id;
		const itemInCart = this.items.find(addedItem => addedItem.id === id);
		if (itemInCart){
			if (itemInCart.amount < 4) {
				itemInCart.amount++;
			}
			return itemInCart;
		}
		//якщо не undefined, тобто цього item ще не було додано до корзини, створення нового об'єкту
		const newItemInCart  = {
			id,
			item,
			amount: 1,
		}

		return this.items.push(newItemInCart);
	}


	get totalAmount(){
		return this.items.reduce((acc, addedItem) => {
			return acc + addedItem.amount;
		}, 0);
	}

	get totalPrice() {
		return this.items.reduce((acc, addedItem) => {
			return acc + addedItem.amount * addedItem.item.price;
		}, 0)
	}

	
	minusItem(item) {
		const id = item.id;
		const itemInCart = this.items.find(addedItem => addedItem.id === id);
		if (itemInCart.amount > 1) {
			itemInCart.amount--;
		}
		return  cart.items;
	}

	removeItem(item) {
		item.amount = 0;
		this.items = this.items.filter(addedItem => addedItem.amount > 0);
	}
}

class RenderCart {
	constructor() {
		this.cartContainer = document.querySelector('.cart-items-in-cart');
		this.renderCartItems(cart.items);
    	this.openCartModal();
	}

	renderCartItem(item) {
		const cartItem = document.createElement('div');
		cartItem.className = 'cart-elements';
		cartItem.innerHTML = `
				<img class="img-cart-item" src="${item.item.absoluteImgPath}" alt="${item.item.name}"/>
				<div class="cart-right-side">
					<p class="cart-item-name">${item.item.name}</p>
					<p class="cart-item-price">$ ${item.item.price}</p>
				</div>
				<div class="cart-item-amount">
					<img class="cart-item-amount-left-arrow" src="img/icons/arrow_left.png" alt=""/>
					<p class="cart-item-quantity">${item.amount}</p>
					<img class="cart-item-amount-right-arrow" src="img/icons/arrow_right.png" alt=""/>
					<img  class="cart-item-remove" src="img/icons/remove.png" alt=""/>
		`;

		const totalAmount = document.querySelector('.total-item-quantity');
		totalAmount.innerHTML = `Total amount: <span>${cart.totalAmount} ptc.</span>`;

		const totalPrice = document.querySelector('.total-item-price');
		totalPrice.innerHTML = `Total price: <span>$${cart.totalPrice}</span>`;

		const cartIconItemAmount = document.querySelector('.number-in-cart');
		if (cart.totalAmount > 0) {
		cartIconItemAmount.classList.remove('cart-number-hidden');
		cartIconItemAmount.innerHTML = `${cart.totalAmount}`;
		} else {
		cartIconItemAmount.classList.add('.cart-number-hidden');
		}

		const minusItem = cartItem.querySelector('.cart-item-amount-left-arrow');
		minusItem.addEventListener('click', () => {
			cart.minusItem(item);
			renderCart.renderCartItems(cart.items);
		});

		const plusItem = cartItem.querySelector('.cart-item-amount-right-arrow');
		plusItem.addEventListener('click', () => {
			cart.addToCart(item);
			renderCart.renderCartItems(cart.items);
		});

		const deleteItem = cartItem.querySelector('.cart-item-remove');
		deleteItem.addEventListener('click', () => {
			cart.removeItem(item);
			renderCart.renderCartItems(cart.items);
			totalAmount.innerHTML = `Total amount: <span>${cart.totalAmount} ptc.</span>`;
			totalPrice.innerHTML = `Total price: <span>$${cart.totalPrice}</span>`;
			cartIconItemAmount.innerHTML = `${cart.totalAmount}`;
		});

		return cartItem;
	}

	renderCartItems(items) {
		this.cartContainer.innerHTML = ``;
		let addedItems = items.map(item => {
		  return this.renderCartItem(item);
		});
		return this.cartContainer.append(...addedItems);
	}

	  
	
	openCartModal() {
		const cartIcon = document.querySelector('.cart-icon');
		const cartModal = document.querySelector('.in-cart-items');
	
		cartIcon.addEventListener('click', () => {
		  cartModal.classList.toggle('cart-hidden');
		});
	}

}

const itemsModel = new ItemsModel();
const cart = new Cart();
const renderCart = new RenderCart(cart);
const renderCards = new RenderCards(itemsModel, cart, renderCart);
const filter = new Filter(itemsModel, renderCards);
const renderFilters = new RenderFilters(itemsModel, filter);





// inputName.oninput = (event)  =>  {
// 	const fondItems = itemsModel.findManyByName(event.target.value);
// 	renderCards.renderCards(fondItems);
// }

