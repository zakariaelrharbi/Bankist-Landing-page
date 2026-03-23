'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
// selection lean more button
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// learn more scroll
btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  const s1coords = section1.getBoundingClientRect();
  section1.scrollIntoView({ behavior: 'smooth' });
});
// section navigation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
// tabs
 const tabs = document.querySelectorAll('.operations__tab');
 const tabsContainer = document.querySelector('.operations__tab-container');
 const tabsContent = document.querySelectorAll('.operations__content');

 tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');

  if(!clicked) return;

  // remove active classes
  tabs.forEach(t=> t.classList.remove('operations__tab--active'))
  tabsContent.forEach(c=> c.classList.remove('operations__content--active'))

  // activate tab
  clicked.classList.add('operations__tab--active')
  // activate content 
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
 })

//  menu fade animation
const navigation = document.querySelector('.nav')
const handleHover = function(e, opacity){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')
    siblings.forEach(el=>{
      if(el !== link) el.style.opacity = opacity;
    })
    logo.style.opacity = opacity;
  }
}
navigation.addEventListener('mouseover', function(e){
  handleHover(e, 0.5)
})
navigation.addEventListener('mouseout', function(e){
handleHover(e, 1)
})
