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
const nav = document.querySelector('nav')

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

// // sticky navigation
// const initialCoords = section1.offsetTop;

// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoords) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// sticky navigation : intersection observer 
// 1- to use intersection observer we need to create one
// call back function
// const obsCallBack = function(entries, obserever){
//   entries.forEach(entry => {
//     console.log(entry)
//   })
// }
// // options object 
// const obsOptions = {
//   // object option needs two element 
//   // 1 root the element that the target intersecting or null to interact with the whole page
//   root : null,
//   // 2 treshold which the percentage of intersection that which the obersever callback function will be called 
//   threshold: 0.1 // which 10%
// }
// // we need to pass in call back function and options object 
// const observer = new IntersectionObserver(obsCallBack ,obsOptions);
// //  now we have to use the observer to observe a certain target use observe method
// // inside the method we call the target 
// observer.observe(section1)

const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries){
  // distruc to get first element of entries
  const [entry] = entries;
  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky')

}
Option ={
  root:null,
  theshold :0,
  rootMargin: `-${navHeight}px`
}
const headerObserver = new IntersectionObserver(stickyNav, Option )
headerObserver.observe(header)

//  show up setcions 
const allSection = document.querySelectorAll('.section')
const revealSection = function(entries, obserever){
  const [entry] = entries;
  if(!entry.isIntersecting) return
  entry.target.classList.remove('section--hidden')
  obserever.unobserve(entry.target)
}
const sectionObserver = new IntersectionObserver(revealSection, {
  root : null,
  threshold:0.15,
});

allSection.forEach(function(section){
  section.classList.add('section--hidden')
  sectionObserver.observe(section);
})


//  lazy loading images 
const imgTargets = document.querySelectorAll('img[data-src]')
Option = {
  root :null,
  threshold:0
}
const revealImage = function(entries, observer){
  const [entry] = entries
  if(!entry.isIntersecting) return

  // replace  src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img')
  })
  observer.unobserve(entry.target)
}
const imageObserver = new IntersectionObserver(revealImage, Option)
imgTargets.forEach(img => imageObserver.observe(img))
