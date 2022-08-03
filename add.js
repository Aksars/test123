/*
jQuery(".modal-wrap").on("mousedown",function(event){
	console.log(event.originalEvent)
  });

*/
/*$('body').click(function(){
	var coord = getPosition();
	console.log(coord);
});*/


/////// закрыть окно с игрой
function closeGame()
{
	jQuery('.modal-wrap').css('visibility', 'hidden');
	jQuery('body').css('overflow', 'initial');
	jQuery('body').css('width', 'initial');
}

////// открыть окно с игрой
var screenWidth = 0; 
function openGame()
{
	jQuery('.modal-wrap').css('visibility', 'visible');
	jQuery('body').css('overflow', 'hidden');
	jQuery('body').css('width', screenWidth);
}
// получение случайного числа
function moveCube(cube, pointX, pointY)
{ 
	cube.css("transform","translate(" +  pointX  + "px," +  pointY  + "px)");
}	

function setCubeMovement(cube)
{
	setInterval(function(){

		//Чекаем чтоб пойнт к которому двигаеться куб был в прделах экрана
		var coordinateCube = Number($(cube).css("left").slice(0,-2));
		var coordinateCubeHeight = Number($(cube).css("top").slice(0,-2));

		//// координаты по ширине 
		if(coordinateCube <= 890)
		{ 
			var randomval = Math.round(Math.random()*890);
		}
		else
		{
			var randomval = 0 -Math.round(Math.random()*890);
		}
	
		//// координаты по высоте
		if(coordinateCubeHeight <= 305)
		{ 
			var randomvalHeight = Math.round(Math.random()*310);
		}
		else
		{
			var randomvalHeight = 0 -Math.round(Math.random()*310);
		}

		moveCube(cube, randomval, randomvalHeight)

	}, 5000);


	
}


function deleteCube(currCube){
	functionCountHit++;	
	pop(currCube);
	jQuery(currCube).remove();
	hitCubes();
}


function getCubePositions()
{
	arrCoordCube = [];
	var cubeData = $(".cube");
	for(i = 0; i < cubeData.length; i++)
	{
		var locationCube = $(cubeData[i]).offset();
		//добавляем кроме оффсет, еще и новое выдуманое свойство -- cube,
		// которое равно текущему кубу от которого и береться офсет
		//, таким образом массив будет содержать кроме координат куда удобную ссылку на сам куб
		locationCube.top  =  locationCube.top + 37.5;
		locationCube.left = locationCube.left + 37.5;
		
		//locationCube = 	{top:1050,left:222}
		locationCube.cube = cubeData[i];

		//locationCube = 	{top:999,left:222, cube = cubeData[i]}
		arrCoordCube.push(locationCube);

		//arrCoordCube [locationCube, locationCube , locationCube] 			
	}
	//console.log(arrCoordCube);
	return arrCoordCube;
}


///// создает кубы
var functionCountHit = 0;
function createCubes()
{
	var countCube =  jQuery('.count-cube').val();
	countCube = Number(countCube);
	for(i=0; i < countCube; i++)
	{
		//Генерируем рандомный квадрат
		var randomVal1 = Math.round(Math.random()*256);
		var randomVal2 = Math.round(Math.random()*256);
		var randomVal3 = Math.round(Math.random()*256);
		var randomVal4 = Math.floor(Math.random()*46);
		var randomVal5 = Math.round(Math.random()*256);
		var randomVal6 = Math.round(Math.random()*256);
		var randomVal7 = Math.round(Math.random()*91);
		var randomVal8 = Math.round(Math.random()*95);
		jQuery('.cube-wrap').append('<div class="cube" style="top:' + randomVal7 + '%; left:  '+ randomVal8 +'%; background: linear-gradient(' + randomVal4 + 'deg, rgb(' + randomVal1 + ','  + randomVal2 + ',' +  randomVal3 + '), rgb(' + randomVal4 + ',' + randomVal5 + ',' + randomVal6 + ')); border: 2px solid rgb(' + randomVal1 + ',' + randomVal2 + ',' + randomVal3 + '); Border-radius:' + randomVal4 + 'px; transform:translateX(0)"></div>');
		var ourCube = jQuery('.cube:last-child')
		
		//Вешаем событие когда закрываем квадрат на клик
		ourCube.on("mouseup mousedown", function (event) {
			
			
			//console.log(this);
			deleteCube(this)
			calcCube();	

			
		})
		
		
		//var delay = 800;
		setCubeMovement(ourCube);
		/// Запускаем цикл для функции передвигающей кубы
		
		/*for(q=0; q<200; q++)
		{
			if(q > 0)
			{
				//задержка равна 800 * 1 = 800
				// 800*2 = 1600 и тд
			 	var delay = q * 800;
				moveCube(ourCube, delay);
			}
			else
			{				
				moveCube(ourCube, 10);	
			}
		}*/
		// много раз вызывать муве кубе с разным временем
		//а еще добавить в мув кубе второй параметр-- время	
	}
}

function hitCubes ()
{
	jQuery('.hit').html('<p>Попадания: ' + functionCountHit + '</p>');	
}

//////// запуск функции со взрывом

function explosionAnimation(ele,e)
{
	var x = e.clientX - 15;
	var y = e.clientY - 15;
	var effect = document.createElement("IMG");

	effect.setAttribute("src", "images/boom.gif")	
	effect.style.width="75px";
	effect.style.height="75px";
	effect.style.zIndex="1";
	effect.style.position="fixed";
	effect.style.top=y;
	effect.style.left=x;
	ele.appendChild(effect);
	setTimeout(function(){ele.removeChild(effect);},700);
}
function createExplosion(event)
{
	//explosionAnimation(ele,event)		
	var coordinatesX = event.clientX;
	var coordinatesY = event.clientY;
	coordinatesX = Number(coordinatesX) - 100;
	coordinatesY = Number(coordinatesY) - 150;
	console.log(coordinatesX);
	console.log(coordinatesY);
	
	var explosion = '<p class="boom" style= "top: '+ coordinatesY + 'px; left: '+ coordinatesX + 'px" ><img src=""></p>';
	
	var randomnumber = Math.floor(Math.random() * 2222222);
	jQuery(".modal-wrap").append(explosion);
	jQuery(".boom:last-child img").attr("src", "images/boom-3.gif?"+randomnumber);


	
	setTimeout(function(){
		jQuery(".boom:first-of-type").remove()
	},1600);
	
}

//////// Количество Кубов
function calcCube ()
{
	var cubeTotal = jQuery('.cube').length;
	jQuery('.sum-cube').html('<p>Количество: ' + cubeTotal + '</p>');
}

function areaHit(event, radius)
{
	var arrCoordCube = getCubePositions();
	//arrCoordCube
	//0: Object { top: 313.433349609375, left: 1276.8333740234375 , cube}​
	//1: Object { top: 269.7166748046875, left: 812.63330078125 }​
	//2: Object { top: 473.0333251953125, left: 1092.9666748046875 }
	//3: Object { top: 269.7166748046875, left: 812.63330078125, toDelete = true }​
	
	for(i=0; i<arrCoordCube.length; i++)
	{		
		var radiusClick = radius;
		var minX = event.pageX - radiusClick;
		var maxX = event.pageX + radiusClick;
		var minY = event.pageY - radiusClick;
		var maxY = event.pageY + radiusClick;
				
		//arrCoordCube[i].left это координата начала куба
		if( (minX < arrCoordCube[i].left && arrCoordCube[i].left < maxX) && (minY < arrCoordCube[i].top && arrCoordCube[i].top < maxY) )
		{
			/*76 
			(arrCoordCube[i].left - min ) по модулю
			24
			(arrCoordCube[i].top - min ) по модулю
			*/
			deleteCube(arrCoordCube[i].cube)
		}
	}
}



var currentSlide = 1;

$(document).ready(function(){

	
	screenWidth = $('body')[0].scrollWidth;
	jQuery(".dropdown-text").hide();	
	jQuery(".dropdown-text-sub").hide();

	

	

	////////////// Игра 
	jQuery('.game').on('click', function() {
		openGame();
	})
	jQuery('.close-game').on('click', ()=> {		
		closeGame();		
	})
	jQuery('.append-cube').on('click', function(){		
		createCubes();///добавляем кубы
		calcCube(); /////считаем кубы
	});

    
	////// Координаты клика
	const coord = document.querySelector(".modal-wrap");
	coord.addEventListener( "mousedown", event => {
	
	
		createExplosion(event);
		areaHit(event, 150);	

		var locationClick = "top: " + event.pageX + ", left: " + event.pageY;
		console.log(event);
		console.log(locationClick);

	})


	/*
	$('body').click(function () {
  	 $(this).offset(function(){
	        
	   });
	});
	*/
	/*
	function getCoords(elem) { 
		var box = elem.getBoundingClientRect();
	  
		return {
		  top: box.top + pageYOffset,
		  left: box.left + pageXOffset
		};	
	  }
	*/
	/*
	$(".modal-wrap").on('click', (elem) =>{
			var coordtop = elem.offsetTop;
			var coordleft = elem.offsetLeft;
			console.log(coordtop);
			console.log(coordleft);
		})
	*/
	/*$('body').mousedown(function(e) {
		var svg = document.querySelector('modal-wrap');
			bcr = svg.getBoundingClientRect();
			x = e.clienX - bcr.left;
			y = e.clientY - bcr.top;
		console.log(x,y);
	});*/

	//https://learn.javascript.ru/coordinates-document

    /////// Слайдер версия 1
	/*	
	jQuery('.slider-btn-right').on('click', () =>{
		if(currentSlide < jQuery(".slider-item").length )
		{
			currentSlide = currentSlide +1;
			jQuery('.slider').addClass("hidden");
			setTimeout(()=>{				
				jQuery('.slider').css('transform', 'translate(-' +(currentSlide-1) + '%)');
				jQuery('.slider').removeClass("hidden");
			},500)
		}
		else
		{
			currentSlide = 1;
			jQuery('.slider').addClass("hidden");
			setTimeout(()=>{				
				jQuery('.slider').css('transform', 'translate(0%)');
				jQuery('.slider').removeClass("hidden");
			},500)
		}
	})	
	jQuery('.slider-btn-left').on('click', () =>{
		if(currentSlide > 1)
		{	
			currentSlide = currentSlide - 1;
			jQuery('.slider').css('transform', 'translate(-' +(currentSlide-1) + '%)');
		}
		else
		{
			var lastSlide = jQuery(".slider-item").length - 1;
			jQuery('.slider').css('transform', 'translate(-' + lastSlide + '%)');
			currentSlide = jQuery(".slider-item").length;
		}	
	});	
*/	
	 	/////////Сладер версия 2
	jQuery('.slider-btn-right').on('click', function(){
		var currentImage = jQuery('.curry');
		var currentImageIndex = jQuery('.curry').index();
		var nextImageIndex = currentImageIndex + 1;
		var nextImage = jQuery('.slider-item').eq(nextImageIndex);
		currentImage.fadeOut(500);
		currentImage.removeClass('curry');

		if(nextImageIndex == (jQuery('.slider-item:last').index()+1))
			{
			 jQuery('.slider-item').eq(0).fadeIn(500);
			 jQuery('.slider-item').eq(0).addClass('.curry');
			}
		else{
			nextImage.fadeIn(500);
			nextImage.addClass('curry');
		}
	});
	jQuery('.slider-btn-left').on('click', function(){
		var currentImage = jQuery('.curry');
		var currentImageIndex = jQuery('.curry').index();
		var prevImageIndex = currentImageIndex - 1;
		var prevImage = jQuery('.slider-item').eq(prevImageIndex);
		currentImage.fadeOut(500);
		currentImage.removeClass('curry');
		prevImage.fadeIn(500);
		prevImage.addClass('curry');

	})
	
 
	/////// команда которая вычисляет "итоговую" сумму, равной цене на старте
	var objects = jQuery(".sum");
	objects.each(function() 
	{
		
		var curentObject = jQuery(this);
		var dataSum = curentObject.parent().parent().find(".price").text().slice(0, -7);
		curentObject.text("Итого: " + dataSum + " рублей");
	
	
	});
	
	
	
	//// Как сделать то  же самое с помощью цикла for

	//////////////// Событие на +/-
	jQuery(".amount-btn:last-child").on("click", function(event)
	{
		var element = jQuery(this).parent().find("p")
		var count = element.text();		
		var countPlus1 = Number(count) + 1;
		element.text(countPlus1);	
		
	})
	jQuery(".amount-btn:first-child").on("click", function(event) 
	{		
		
		var element = jQuery(this).parent().find("p")
		var count = element.text();
		if(Number(count) > 1)
		{
			var countPlus1 = Number(count) - 1;
			element.text(countPlus1);	
		}
		else
		{};
	})
	

		//////////////// Упражнение на Подсчет Суммы при изменении количества товара


				///Действие при (+)
	jQuery(".amount-btn:last-child").each(function(){
		var curentButton = jQuery(this);
		curentButton.on("click", () =>{
			var curentItem = curentButton.parent().parent();
			///нашли цену
			var cost = curentItem.find(".price").text().slice(0,-7)
		

			///////нашли количество товара
			var countProduct = curentItem.find(".rate").text()
		

			/////заменили значение
			var sumCost = cost * countProduct;
		
			
			//// нашли куда вставлять Итоговую Сумму
			var sumDiv = curentItem.find(".sum")
		
			
			jQuery(sumDiv).html("Итог: " +  sumCost + " рублей");
		});
    ;})

				/// Действие при (-)
	jQuery(".amount-btn:first-child").each(function(){
			jQuery(this).on("click", () =>{
			
			///нашли итоговую сумму
			var totalSum = jQuery(this).parent().parent().find(".sum-wrap").find(".sum").text().slice(0, -7).slice(6);
			

			///нашли сумму за 1 единицу
			var cost = jQuery(this).parent().parent().find(".price").text().slice(0,-7)
	
			///количество товаров
			var countProduct = jQuery(this).parent().parent().find(".rate").text()
				

			///вычитаем из общей сумму, сумму за единицу
			var downturnSum = Number(cost) * Number(countProduct);
			

			///заменяем значение на актуальное
			var indexSum = jQuery(this).parent().parent().find(".sum")
		jQuery(indexSum).html("Итог: " + downturnSum + " рублей");
		});
	});

		//////// клик на Корзину
		jQuery(".icon-basket").on("click", ()=>{
			jQuery(".basket-wrap").css("visibility", "visible");
			jQuery(".basket-wrap .exit").addClass("item-close");
			jQuery(".basket-wrap .exit").text("X");
		});
		jQuery(".close").on("click", () =>{
			jQuery(".basket-wrap").css("visibility", "hidden");
		})



});/// document Ready()


/* Можно создавать обекты вручную, вот так :*/
/*
var item1 = {
	name: "Loren ipsum 1",
	specification: "111111это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба' часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне.",
	price: 2000,
	img: src="item-1.jpg"
};
var item2 = {
	name: "Loren ipsum 2",
	specification: "222222это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба' часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне.",
	price: 2500,
	img: src="item-2.jpg",
	introduce(){
		console.log("my name is " + this.name +" i cost:" + this.price + "$");
	}
};
var item3 = {
	name: "Loren ipsum 3",
	specification: "333333это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба' часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне.",
	price: 3000,
	img: src="item-3.jpg",
	introduce(){
		console.log("my name is " + this.name +" i cost:" + this.price + "$");
	}
};
var item4 = {
	name: "Loren ipsum 4",
	specification: "44444это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба' часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне.",
	price: 3500,
	img: src="item-4.jpg",
	
};
var item5 = {
	name: "Loren ipsum 5",
	specification: "55555это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба' часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне.",
	price: 4000,
	img: src="item-5.jpg",
	introduce(){ // И даже можно делать методы внутри конкретных обектов с использованием this
		console.log("my name is " + this.name +" i cost:" + this.price + "$");
	}
};
*/

/* Можно измыслить класс -- по сути автоматизацию создания обектов, 
это может быть выгодно в больших проектах и улучшает читаемость кода */ 

class MarketProduct {
	name = "no name";
	specification;
	price;
	img; 
  	sayHi() 
	{
    	alert(this.name);
  	}
	constructor(test1, test2, test3, test4)
	{
		this.name = test1
   	 	this.price = test2;
		this.img = test3;
		this.specification = test4;
  	}

} 


var item1 = new MarketProduct("Loren ipsum 1", 2000, 'item-1.jpg' ,  "111111это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба' часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне.");
var item2 = new MarketProduct("Loren ipsum 2", 2500, 'item-2.jpg' ,  "222222это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба' часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне.");
var item3 = new MarketProduct("Loren ipsum 3", 3000, 'item-3.jpg' ,  "333333это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба' часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне.");
var item4 = new MarketProduct("Loren ipsum 4", 3500, 'item-4.jpg' ,  "444444это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба' часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне.");
var item5 = new MarketProduct("Loren ipsum 5", 4000, 'item-5.jpg' ,  "555555это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне. это текст-'рыба' часто используемый в печати и вэб-дизайне. это текст-'рыба', часто используемый в печати и вэб-дизайне.");





// цикл по созданию товаров на странице
var allItems = [item1,item2,item3,item4,item5];


for(i=0; i< allItems.length; i++ )
{
	var itemHTML = `
	<div class="item">
	<img src=`+ allItems[i].img +`>
				<div class="item-center">
				<h2 class='item-title'>` + allItems[i].name +`</h2>
				<p>`+ allItems[i].specification +`</p>
				</div>
				<div class="item-right">
					<div class="price"><p>`+ allItems[i].price +` рублей</p></div>
					<div class="amount-controls">
						<button class="amount-btn">-</button>
						<p class="rate">1</p>
						<button class="amount-btn">+</button>
					</div>
					<div class="sum-wrap"><p class="sum">Итого: `+ allItems[i].price +` рублей</p></div>
					<div class="favorite">
						<button class="add-to-cart" id="item1">Добавить в корзину</button>
						<button class='in-cart'>Добавлено</button>
					</div>
				</div>
			</div>
	`;
	
	jQuery('.main').append(itemHTML);
}

cartItem1 = 
{
	name: "перчатки",
	count: 2
};
cartItem2 = 
{
	name: "ботинки",
	count: 4
};
var itemsInBasket = [cartItem1, cartItem2];



var itemsNames = ["перчатки", "ботинки"];
var itemsCount = [2,4];


//// Массивы для корзины
var itemsNames = []
var itemsCount = []


////// Клик на кнопку "Добавить  в корзину" кладет данные о товаре в массивы
jQuery('.add-to-cart').each(function(){
	jQuery(this).on('click', () =>{
		
		///Тут видим имя продукта который хочет добавить пользователь
		var productNameToAdd = jQuery(this).parent().parent().parent().find('.item-title').text();
		
		
		///Тут видим количество товара хочет добавить пользователь
		var addToCartCount = jQuery(this).parent().parent().find('.rate').text();
			addToCartCount = Number(addToCartCount);
		
		var avalabilty = itemsNames.includes(productNameToAdd);		
		if(avalabilty === false)
		{
			//Тут мы обрабатываем сценарий когда продукта еще нет в корзине
			itemsNames.push(productNameToAdd);			
			itemsCount.push(addToCartCount);
			
			
			console.log(itemsNames);
			console.log(itemsCount);
		}
		else
		{	//productNameToAdd // 
	
			var indexOfItem = itemsNames.indexOf(productNameToAdd);
			console.log(indexOfItem);
			
			
			itemsCount[indexOfItem] =  Number(itemsCount[indexOfItem]) + Number(addToCartCount)
			
			
			console.log(itemsNames);
			console.log(itemsCount);
			
			//Тут будем обрабатывать сценарий когда продукт уже добавляли в корзину ранее
		}
		
		updateCartView();
		//var avalabilityCount = itemsCount.includes(addToCartCount);		
			//console.log(avalabilityCount)
				/*		
			var itemsNames = []
			var itemsCount = []				
				*/
	});
});
/////функция которая помогает закинуть товары в корзину
var selectedNames = allItems.indexOf(itemsNames[0])
console.log(selectedNames)
function updateCartView()
{
	// сожжем все товары в корзине,
	// а потом добавим все заново основываясь на itemsNames и itemsCount
	jQuery('.products').find('.item').remove()
	//jQuery('.products').empty()
	
	for(q = 0; q < itemsNames.length; q++)
	{
		var indexOfItemInCart = -1111;
		//itemsNames 
	
		//for(q = 0)
		for(i=0; i<allItems.length; i++)
		{
			
			//
			if(allItems[i].name == itemsNames[q])
			{	
				indexOfItemInCart = i;
			}
			else
			{
				
			}	
		}
	
		//смотрим масив олл айтемс, но в индексы подставляем номер того элемента который в корзине

		
		var curentItemAllInfo =	allItems[indexOfItemInCart]
		
		//Генерируем полученную инфу в хтмл код
		var itemHTML = `
		<div class="item item` + (indexOfItemInCart +1) + `">
					<img src=`+ curentItemAllInfo.img +`> 
					<div class="item-center">
					<h2 class='item-title'>` + curentItemAllInfo.name +`</h2>
					</div>
					<div class="item-right">
						<div class="price"><p>`+ curentItemAllInfo.price +` рублей</p></div>
						<div class="amount-controls">
							<button class="amount-btn-in">-</button>
							<p class="rate">` + itemsCount[q] + `</p>
							<button class="amount-btn-in">+</button>
						</div>
						<div class="sum-wrap"><p class="sum-in">Итого: `+ curentItemAllInfo.price +` рублей</p></div>
						<div class="exit item-close">X</div>
					</div>
		</div>
		`;
		
		//Append itemHTML
		jQuery('.products').append(itemHTML);
	}
}


/*
	var test1 = -1111;
for(i=0; i<allItems.length; i++)
{
	if(allItems[i].name == "Loren ipsum 3")
	{
		console.log("YES")
		console.log(i)
		test1 = i;
	}
	else
	{
		console.log("NO")
	}	
	
}


console.log("Тот самый айтем это №" + test1);
*/

	
	// добавлять нужно в корзину
	// добавлять нужно только те вещи которые пользователь добавил в 
	// itemsNames 
	// и
	// itemsCount	
	


///////Замена "Добавить в корзину" на "Добавлено"
jQuery('.add-to-cart').each(function(){
	jQuery(this).on('click', ()=>
	{
		jQuery(this).css('display', 'none');
		jQuery(this).parent().find('.in-cart').css('display', 'block');
		setTimeout(()=>{
			
			jQuery(this).css('display', 'block');
			jQuery(this).parent().find('.in-cart').css('display', 'none');
		},1500)
	})
})

jQuery('.add-to-cart').each(function(){
  	jQuery(this).on('click', () =>{
		if(jQuery('.in-cart').css('display') === 'block')
			{
				jQuery('.basket-count').css('display', 'block')
			}
		})
});

function sum(x, y) {
    return 1 + 1;
}
console.log(sum)

function addToCart()
{
	
}
function removeFromCart()
{
	
}




		////// Эта штука удаляет товары из корзины
	
function closedItem()
{
	for(i=0; i<=jQuery(".item-close").length; i++)
    var test123 = document.getElementsByClassName('.item-close')
	console.log(test123)
	//jQuery(jQuery(".item-close")[i]).parent().parent().remove();
	
}

			/////////Действия в динамически созданных элементах
//////// товар в корзине, действие на -
jQuery('body').on('click', '.amount-btn-in:first-child', function(){
		$(this).each(function (){
			var countProductCart = jQuery(this).parent().find('p');
			var countProductCartValue = countProductCart.text();
			console.log(countProductCartValue)
			var countProductCartPlus = Number(countProductCartValue) - 1;
			if(countProductCartPlus > 0)
			{
			jQuery(countProductCart).text(countProductCartPlus);

			/////Эта часть считает сумму за товар в каждом отдельном айтеме
			var valuePrice = jQuery(this).parent().parent().find('.price').text().slice(0,4);
			var sumForItem =  Number(countProductCartPlus) * Number(valuePrice);
			var currentSumObject = jQuery(this).parent().parent().find('.sum-in');
			jQuery(currentSumObject).html("Итого: " + sumForItem + " рублей");
			console.log(sumForItem);
			}
			else{
			}
			

		})	
})
//////// товар в корзине, действие на +
jQuery('body').on('click', '.amount-btn-in:last-child', function(){
		$(this).each(function (){
			var countProductCart = jQuery(this).parent().find('p');
			var countProductCartValue = countProductCart.text();
			console.log(countProductCartValue)
			var countProductCartPlus = Number(countProductCartValue) + 1;
			jQuery(countProductCart).text(countProductCartPlus);


			/////Эта часть считает сумму за товар в каждом отдельном айтеме
			var valuePrice = jQuery(this).parent().parent().find('.price').text().slice(0,4);
			var sumForItem =  Number(countProductCartPlus) * Number(valuePrice);
			var currentSumObject = jQuery(this).parent().parent().find('.sum-in');
			jQuery(currentSumObject).html("Итого: " + sumForItem + " рублей");
			console.log(sumForItem);
		})
})

////// удаляем товар из корзины
jQuery('body').on('click', '.exit', function() {
		$(this).each(function()
			{
				///тут удаляем товар из массива(ИМЯ)
				var currentTitle  = jQuery(this).parent().parent().find('.item-title').text();
				var currentIndexName =  itemsNames.indexOf(currentTitle);
				itemsNames.splice(currentIndexName, 1);
				//// тут удаляем из массива Количество
				var currentCount = jQuery(this).parent().find('.rate').text();
				var currentIndexCount = itemsCount.indexOf(currentCount);
				itemsCount.splice(currentIndexCount, 1);
		

				jQuery(this).parent().parent().remove();

			})

})









function myFunction()
{
	document.querySelector("demo").innerHTML = "параграф изменен";
}
/*elem.onclick = function(){
	alert("Спасибо");
}*/
var about;
function init()
{
	about = document.getElementById("about").style.color = "blue";
}

const changeText = () => {
	const p = document.getElementById("textp");
	var oldText = document.getElementById("textp").textContent;
	if(oldText === "Какой-то текст")
	{
	p.textContent = "Новый текст";
	}
	else
	{
	p.textContent = "Какой-то текст"	
	}
};
/*
//textp.style.color = "purple";
//textp.style.fontSize = "9px";

function whatTime (){
	document.getElementById("timewindow").innerHTML = Date()
}
//timewindow.style.fontSize = "12px"
//var succ = document.getElementById("timewindow").textContent;

function success ()
{	
 succ.textContent = "Это успех";
}
*/


/*
/////////// Упражнение со скролом в начало страницы
$(window).scroll(function()
{
	if($(window).scrollTop() >300)
{
	jQuery(".scrolltop").addClass("active");
}
else{
	jQuery(".scrolltop").removeClass("active");
}
});
jQuery(".scrolltop").on("click", function()
{
jQuery('html, body').animate({scrollTop: 0}, 1000);
});
*/

//////////// Кнопка с анимацией
if (document.body.animate) {
	document.querySelector('#button').addEventListener('click', pop);
  }
  
  function pop (cube) {
	// Quick check if user clicked the button using a keyboard
	var cubeOffset = $(cube).offset();
	var cubeLength = $(cube).height()/2;
	var cubeCoordinateLeft = cubeOffset.left + cubeLength;
	var cubeCoordinateTop = cubeOffset.top + cubeLength;
		
	for (let i = 0; i < 30; i++) 
	{
		// We call the function createParticle 30 times
		// As we need the coordinates of the mouse, we pass them as arguments
		createParticle(cubeCoordinateLeft , cubeCoordinateTop );
	}
	
  }
  
  function createParticle (x, y) {
	const particle = document.createElement('particle');
	var parent = document.querySelector('.game-modal');
	parent.appendChild(particle);
	
	// Calculate a random size from 5px to 25px
	const size = Math.floor(Math.random() * 20 + 5);
	particle.style.width = `${size}px`;
	particle.style.height = `${size}px`;
	// Generate a random color in a blue/purple palette
	particle.style.background = `hsl(${Math.random() * 90 + 180}, 70%, 60%)`;
	
	// Generate a random x & y destination within a distance of 75px from the mouse
	const destinationX = x + (Math.random() - 0.5) * 2 * 75;
	const destinationY = y + (Math.random() - 0.5) * 2 * 75;
  
	// Store the animation in a variable as we will need it later
	const animation = particle.animate([
	  {
		// Set the origin position of the particle
		// We offset the particle with half its size to center it around the mouse
		transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
		opacity: 1
	  },
	  {
		// We define the final coordinates as the second keyframe
		transform: `translate(${destinationX}px, ${destinationY}px)`,
		opacity: 0
	  }
	], {
	  // Set a random duration from 500 to 1500ms
	  duration: Math.random() * 1000 + 500,
	  easing: 'cubic-bezier(0, .9, .57, 1)',
	  // Delay every particle with a random value of 200ms
	  delay: Math.random() * 200
	});
	
	// When the animation is complete, remove the element from the DOM
	animation.onfinish = () => {
	  particle.remove();
	};
  }



  /// пишем Калькулятор
/*
  var a = '';
  var b = '';
  var sing = '';
  var finish = false;

  const digit = ['0','1','2','3','4','5','6','7','8','9','.'];
  const action = ['-','+','X','/'];

  const out = document.querySelector('.calc-screen p');

  function clearAll () {
	a = '';
	b = '';
	sing = '';
	finish = false;
	out.textContent = 0;
  }

  document.querySelector('.ac').onclick = clearAll;

  document.querySelector('.buttons').onclick = (event) =>{
	if(!event.target.classList.contains('btn')) return;

	if(event.target.classList.contains('ac')) return;
	out.textContent = '';

	const key = event.target.textContent;

	if(digit.includes(key))
	{
		if(b === '' && sing === ''){
			a += key;
			out.textContent = a;
		}
		else if(a!=='' && b!=='' && finish)
		{
			b = key;
			finish = false;
			out.textContent = b;
		}
		else
		{
			b += key;
			out.textContent = b;
		}
		
		console.log(a,b,sing);
		return;
	}

	if(action.includes(key)){
		sing = key;
		out.textContent = sing;
		console.log(a,b,sing);
		return;
	}

	if(key === '=')
	{
		 switch(sing){
			case "+":
				a = (+a) + (+b);
				break;
			case "-":
				a = a - b;
				break;
			case "X":
				a = a * b;
				break;
			case "/":
				a = a  / b;
				break;
		 }
		 finish = true;
		 out.textContent = a;
	}



  }	*/