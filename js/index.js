// import {items} from "./items.js"

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

// const cardContainer = document.querySelector(".cards-items")


const createCard = (itemList) => {
	const cardContainer = document.querySelector(".cards-items")
	itemList.forEach(element => {
		const cardElement = document.createElement('div'); 
		console.log(element);
		cardElement.classList.add('card');
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
