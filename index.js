
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}



function ready() {

    let deleteButtons = document.querySelectorAll('.delete')
        for(let i = 0; i < deleteButtons.length; i++) {
            let deleteButton = deleteButtons[i]
            deleteButton.addEventListener('click', deleteElement)
        }

    let quanityElements = document.querySelectorAll('.item-quantity-selector')
        for(let i = 0; i < quanityElements.length; i++) {
            let quanityElement = quanityElements[i]
            quanityElement.addEventListener('change', updateTotal)
        }

    // let TotalItemsElements = document.querySelectorAll('.item-quantity-selector')
    //     for(let i = 0; i < TotalItemsElements.length; i++) {
    //         let TotalItemsElement = TotalItemsElements[i]
    //         TotalItemsElement.addEventListener('change', updateItemsInCart)
    //     }

    let addToCartElements = document.querySelectorAll('.item-container')
        for(let i = 0; i < addToCartElements.length; i++) {
            let addToCartElement = addToCartElements[i]
            addToCartElement.addEventListener('click', addToCartButton)
        }

    //document.querySelector('.purchase-btn').addEventListener('click', purchaseButton)
    document.addEventListener("DOMContentLoaded", renderFromLocalStorage)

}



function deleteElement(e) {
    let deleteButton = e.target
    deleteButton.parentElement.parentElement.remove()
    updateTotal()

    
}

function addToCartButton(e) {


   

    let buttonClicked = e.target
    let itemsContainer = buttonClicked.parentElement.parentElement
    let itemImage = itemsContainer.querySelector('.item-img').src
    let itemName = itemsContainer.querySelector('.description-header').innerText
    let itemDescription = itemsContainer.querySelector('.item-description').innerText
    let itemPrice = itemsContainer.querySelector('.item-price').innerText

    // if(buttonClicked) {
    //     console.log(e.disabled = true )
    //     //buttonClicked.style.backgroundColor = 'green'
    //     buttonClicked.e.disabled = true
    // }

    // if( e.currentTarget > 1) {
    //     e.currentTarget.disabled = true;
    //     alert('Item has been added already')
    // } else {
    //     return
    // }


  

    addToCart(itemImage, itemName, itemDescription, itemPrice)

}



   
let saveToArray = []

function addToCart(itemImage, itemName, itemDescription, itemPrice) {
   
    let cartRowContent =  
        `<div class="col-3 cart-item-img-col">
            <img class='cart-item-image mx-auto d-block' src="${itemImage}" height="175">
        </div>
        <div class="col-6 col-5">
            <h5 class='item-name'>${itemName}</h5>
            <p class='item-availability'>In Stock</p>
            <p class='item-location'>Shipped from: Amazon</p>
            <select class='item-quantity-selector' name="" id="">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            <span class='delete'>Delete</span>
        </div>
        <div class="col-3 col-2 cart-item-price-con">
            <p class='cart-item-price'>${itemPrice}</p>
        </div> ` 
  
    saveToArray.push(cartRowContent)

    //console.log(saveToArray.includes(cartRowContent))
       


        
    localStorage.setItem('cart-content',  JSON.stringify(saveToArray))
    //window.location.href = './cart.html'

}   


function renderFromLocalStorage() {
   
    let cartContainer = document.querySelector('.cart-items-container')
    let itemsInCart = JSON.parse(localStorage.getItem('cart-content'))
    
    if(itemsInCart) {

        for(let i = 0; i < itemsInCart.length; i++) {

            var addItemToCart = itemsInCart[i]
                //console.log(addItemToCart)

                for(let j = 0;  j < itemsInCart.length; j++) {
                    
                    let itemCount = itemsInCart[j]
                        //console.log(itemCount)
                    if(itemCount === addItemToCart) {
                       
                        let createRow = document.createElement('div')
                        createRow.classList.add('row')
                        createRow.classList.add('cart-row')

                        cartContainer.append(createRow)
                        createRow.innerHTML = addItemToCart
                        
                        
                        updateTotal()
                       
                        createRow.querySelector('.delete').addEventListener('click', deleteElement)
                        createRow.querySelector('.item-quantity-selector').addEventListener('change', updateTotal)
                        createRow.querySelector('.item-quantity-selector').addEventListener('change',updateItemsInCart)
                    }
            }
        } 
    } 
        
    
    document.querySelector('.purchase-btn').addEventListener('click', function(){

        let emptyCart = cartContainer.hasChildNodes()
         
        while (cartContainer.hasChildNodes()) {
            cartContainer.removeChild(cartContainer.firstChild)
            localStorage.clear()
            updateTotal()
        }

        setTimeout(() => {
            
            if(emptyCart) {
                alert('Order placed, Thanks')
            } else {
                alert('Cart is empty please add items to purchase')
            }
        }, 100 )

      });
}


function updateTotal() {
    let cartItem = document.querySelector('.cart-container')
    let cartRows = cartItem.querySelectorAll('.cart-row')
    let total = 0
        for(let i = 0; i < cartRows.length; i++) {
            let cartRow = cartRows[i]
            let priceElement = cartRow.querySelectorAll('.cart-item-price')[0]
            let quanityElement = cartRow.querySelectorAll('.item-quantity-selector')[0]
            let quanity = quanityElement.value
            let price = parseFloat(priceElement.innerText.replace('$', '').replace(',', ''))
            total = total + (price * quanity)
            //console.log(price, quanity, total)
        }

    document.querySelector('.total-price-bottom').innerText = ' $' + total.toLocaleString() + '.00'

    document.querySelector('.total-price').innerText = ' $' + total.toLocaleString() + '.00'
}


function updateItemsInCart() {
    let cartItem = document.querySelector('.cart-container')
    let cartRows = cartItem.querySelectorAll('.cart-row')
    let cartLength = cartRows.length
    //console.log(cartRows.length)
    //let total = 0
        for(let i = 0; i < cartRows.length; i++) {
            let cartRow = cartRows[i]
            
            let quanityElement = cartRow.querySelector('.item-quantity-selector')
            let quanity = quanityElement.value
            console.log(cartLength * quanity)

            total = total + (quanity + cartLength)
            //console.log(total)
           
        }

        document.querySelector('.number-of-items').innerText =  total.toLocaleString()

}

















  // let cartItemName = document.querySelector('.cart-container')

    // for(let i = 0; i < itemName.length; i++) {
    //     if (cartItemName[i].innerText == itemName)  {
    //         alert('Item has already been added')
    //         return
    //     }
    // }

