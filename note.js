// selecting element in DOM 

document.querySelector();
document.querySelectorAll();
document.getElementById();
document.getElementsByClassName();
document.getElementsByTagName();

// creating new element 
insertAdjacentHTML
const header = document.querySelector('.header')
const message = document.createElement('div')
message.classList.add('cookie-message')
message.innerHTML = 'we will use you coockies to improve functionnality <button class="btn btn--close-cookie">Got it!</button>'
// as first child
// header.prepend(message)
// // // as last child
// // header.append(message)
// // copy the same element multiple times 
// header.append(message.cloneNode(true))
// before the header
// header.before(message)
// // after the header
header.after(message)
document.querySelector('.btn--close-cookie').addEventListener('click', function(){
  // remove element
  message.remove()
})
// style
message.style.backgroundColor = '#37383d'
message.style.width = "120%"
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'
document.documentElement.style.setProperty('--color-primary', 'orangered')