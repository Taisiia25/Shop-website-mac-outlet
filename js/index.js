
// Swiper
new Swiper('.swiper', {
    slidesPerGroup: 1,

    centerSliders: true,
});

/////////////// input

document.querySelector("#search-input").addEventListener("keyup", function() {
	var searchbox = document.querySelector(".aa-input");
	var reset = document.querySelector(".searchbox [type='reset']");
	if (searchbox.value.length === 0){
		reset.classList.add("hide");
	} else {
	  reset.classList.remove('hide');
  }
});

// ////////////////  Accordion
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

// Modal close
document.querySelector('.modal').addEventListener("click", (event) => {
	const isClickInsideModal = document.querySelector(".modal_active .innerModal").contains(event.target)
	if (!isClickInsideModal) {
		document.querySelector(".modal_active").classList.remove('modal_active')
	}
});


const createCard = (itemList) => {
	const cardContainer = document.querySelector(".cards-items");
	
	itemList.forEach(element => {
		const cardElement = document.createElement('div'); 
		
		console.log(element);
		cardElement.classList.add('card');

		// Modal open
		cardElement.onclick = () => {
			
			createModal(element)
		};

		///////// card-info
		const cardInfo = document.createElement('div');
		cardInfo.classList.add('card-info');
		cardElement.appendChild(cardInfo);
		//img-card
		const cardImg = document.createElement('div'); 
		cardImg.classList.add('img-card');
		const imgPicture = document.createElement('img');
		imgPicture.classList.add('img-card'); 
		imgPicture.src = `./img/${element.imgUrl}`
		
		cardImg.appendChild(imgPicture);
		cardInfo.appendChild(cardImg);

		//item-name
		const itemName = document.createElement('p');
		itemName.classList.add('item-name');
		itemName.textContent = element.name;
		cardInfo.appendChild(itemName);
		//stock
		const itemStock = document.createElement('div');
		itemStock.classList.add('stock');
		const itemInStock = document.createElement('div');
		itemInStock.textContent = "left in stock";
		itemInStock.classList.add('in-stock');
		const numberInStock = document.createElement('span');
		numberInStock.classList.add('number-in-stock')
		numberInStock.textContent = element.orderInfo.inStock;
		
		itemInStock.prepend(numberInStock);
		itemStock.appendChild(itemInStock);
		cardInfo.appendChild(itemStock)

		//price
		const itemPrice = document.createElement('div');
		itemPrice.classList.add('price');
		itemPrice.textContent = "Price: $";
		const priceNumber = document.createElement('span');
		priceNumber.classList.add('price-number');
		priceNumber.textContent = element.price;

		cardInfo.appendChild(itemPrice)
		itemPrice.appendChild(priceNumber)

		//buttonCard
		const buttonCard = document.createElement('button')
		buttonCard.classList.add('btn','btn-card')
		buttonCard.textContent = "Add to cart";
		cardInfo.appendChild(buttonCard)
		//likeButton
		const likeButton = document.createElement('button')
		likeButton.classList.add('like-btn')
		const likeImg = document.createElement('img')
		likeImg.classList.add('like')
		likeImg.src = "img/icons/like_filled1.png"
		likeButton.appendChild(likeImg)
		cardInfo.appendChild(likeButton)

		///////card-footer
		const cardFooter = document.createElement('div');
		cardFooter.classList.add('card-footer');
		cardElement.appendChild(cardFooter);
		//like-permanent
		const likePermanent = document.createElement('div'); 
		likePermanent.classList.add('like-permanent');
		const imgLike = document.createElement('img');
		imgLike.classList.add('like-permanent'); 
		imgLike.src = "img/icons/like_filled1.png";

		likePermanent.appendChild(imgLike);
		cardFooter.appendChild(likePermanent);

		//reviews
		const itemRewiews = document.createElement('div');
		itemRewiews.classList.add('reviews');

		const textReview = document.createElement('p');
		textReview.classList.add('text-rewiew');
		textReview.textContent = " Positive reviews";
		//number-rewiews
		const numberRewiews = document.createElement('span');
		numberRewiews.classList.add('number-rewiews');
		const likes = Math.floor(Math.random() * 101)
		numberRewiews.textContent = `${likes}%`;
		
		const reviewAbove = document.createElement('p');
		reviewAbove.classList.add('reviews-above');
		reviewAbove.textContent = " Above avarage";
		

		cardFooter.appendChild(itemRewiews)
		itemRewiews.appendChild(textReview)
		textReview.prepend(numberRewiews)
		itemRewiews.appendChild(reviewAbove)

		//orders

		const orders = document.createElement('div');
		orders.classList.add('orders');

		const numberOrders = document.createElement('p');
		numberOrders.classList.add('number-of-orders');
		const ordered = Math.floor(Math.random() * 1001)
		numberOrders.textContent = `${ordered}`;

		const orderText = document.createElement('p');
		orderText.classList.add('orders-text');
		orderText.textContent = "orders";



		cardFooter.appendChild(orders)
		orders.appendChild(numberOrders)
		orders.appendChild(orderText)
		

		// добавляем в карточку
		cardContainer.appendChild(cardElement);
	});
} 

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
	const priceInModal = document.querySelector('.price-modal-number')
	priceInModal.textContent = item.price;

	//in stock
	const inStockModal = document.querySelector('.number-in-stock-modal')
	inStockModal.textContent = item.orderInfo.inStock;
	//btn 
	// const btnModal = document.querySelector('.btn-modal');
	// btnModal.textContent = "Add to cart";
}