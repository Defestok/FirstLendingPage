const reviews_Cards = [
    {
        name: 'Анна',
        text:  'Я заказала последний iPhone из США через ваш сервис, и доставка прошла быстро и без каких‑либо проблем. Гарантии качества и надёжная упаковка сделали мой опыт покупки невероятно позитивным',
    },
    {
        name: 'Алексей',
        text: 'Я уже несколько лет заказываю дизайнерскую одежду из Франции через ваш сервис, и он никогда меня не подводил. Важно иметь надёжную компанию, которая позаботится о вашем заказе и предоставит все необходимые документы для ввоза в Россию',
    },
    {
        name: 'Ольга',
        text: 'Я уже несколько лет заказываю дизайнерскую одежду из Франции через ваш сервис, и он никогда меня не подводил. Важно иметь надежную компанию, которая позаботится о вашем заказе и предоставит все необходимые документы для ввоза в Россию',
    },
    {
        name: 'Дмитрий',
        text: 'Я заказал редкий антикварный предмет из Японии через ваш сервис, и остался впечатлен. Все пришло в отличном состоянии, и ваша гарантия качества действительно работает. Спасибо за ваше профессиональное обслуживание',
    },
    {
        name: 'Игорь',
        text: 'Заказал шикарные часы из Швейцарии, и доставка была невероятно быстрой. Ваш сервис делает интернет-шоппинг более доступным и удобным',
    },
    {
        name: 'Федор',
        text: 'Я заказал редкий антикварный предмет из Японии через ваш сервис, и остался впечатлен. Все пришло в отличном состоянии, и ваша гарантия качества действительно работает. Спасибо за ваше профессиональное обслуживание',
    },
    {
        name: "Екатерина",
        text: 'Ваш сервис действительно изменил мой способ покупок. Я больше не переживаю о таможенных вопросах и документах - все у вас в порядке. Спасибо за ваше качество и надежность',
    }
]

const reviewCards = document.getElementById('reviewCards');
const buttonRight = document.getElementById('buttonRight');
const buttonLeft = document.getElementById('buttonLeft');

let currentIndex = 0;

function renderReviews(){
    reviews_Cards.forEach((review, index) =>{
        // const nameReviews = review.name;
        const nameElement = document.createElement('div');
        nameElement.classList.add('reviews-name');
        nameElement.textContent = review.name;

        // const textReviews = review.text;
        const textElement = document.createElement('div');
        textElement.classList.add('reviews-text');
        textElement.textContent = review.text;

        const itemReviews = document.createElement('div');
        itemReviews.classList.add('reviews-item');
        itemReviews.dataset.index = index;
        itemReviews.append(textElement, nameElement);

        reviewCards.appendChild(itemReviews);
    })
    const firstClone = reviewCards.firstElementChild.cloneNode(true);
    const lastClone = reviewCards.lastElementChild.cloneNode(true);

    reviewCards.appendChild(firstClone);
    reviewCards.insertBefore(lastClone, reviewCards.firstChild)
}

function getSlideShift() {
    const slide = reviewCards.firstElementChild;
    const gap = 24;
    return slide.offsetWidth + gap;
}

const initSlider = () => {
    const shift = getSlideShift();
    reviewCards.style.translate = `-${shift * (currentIndex + 1)}px`;
};

const goToPrevSlide = () => {
    const shift = getSlideShift();
    currentIndex--;
    reviewCards.style.transition = 'translate 0.5s ease-in-out';
    reviewCards.style.translate = `-${shift * (currentIndex + 1)}px`;

    reviewCards.addEventListener(
        'transitionend', () => {
            if (currentIndex < 0) {
                currentIndex = reviews_Cards.length - 1;
                reviewCards.style.transition = 'none';
                reviewCards.style.translate = `-${shift * (currentIndex + 1)}px`;
                buttonRight.disabled = false;
            }
        },
        { once: true }
    );
};

const goToNextSlide = () => {
    const shift = getSlideShift();
    currentIndex++;
    reviewCards.style.transition = 'translate 0.5s ease-in-out';
    reviewCards.style.translate = `-${shift * (currentIndex + 1)}px`;

    reviewCards.addEventListener(
        'transitionend', () => {
            if (currentIndex >= reviews_Cards.length) {
                currentIndex = 0;
                reviewCards.style.transition = 'none';
                reviewCards.style.translate = `-${shift * (currentIndex + 1)}px`;
                buttonRight.disabled = false;
            }
        },
        { once: true }
    );
};


buttonRight.addEventListener('click', goToNextSlide)
buttonLeft.addEventListener('click', goToPrevSlide)

renderReviews();
initSlider();

// Бургер
const infoRight = document.getElementById("infoRight");
const logoHeader = document.querySelector(".logo-header");
const originalParent = document.querySelector(".info-header");

function moveInfoRight() {
    if (window.innerWidth <= 1024) {
        if (!logoHeader.contains(infoRight)) {
            logoHeader.appendChild(infoRight);
        }
    } else {
        if (!originalParent.contains(infoRight)) {
            originalParent.appendChild(infoRight);
        }
    }
}

window.addEventListener("resize", moveInfoRight);
window.addEventListener("DOMContentLoaded", moveInfoRight);

const burger = document.querySelector('.burger');
const menu = document.querySelector('.bottom-header');

burger.addEventListener('click', () => {
  menu.classList.toggle('active');
});

const infoLeft = document.querySelector('.info-left');
const bottomHeader = document.querySelector('.bottom-header');
const infoHeader = document.querySelector('.info-header');
let moved = false;

function relocateInfoLeft() {
    if (window.innerWidth <= 758 && !moved) {
      bottomHeader.prepend(infoLeft);
      moved = true;
    } else if (window.innerWidth > 758 && moved) {
      infoHeader.insertBefore(infoLeft, infoHeader.firstChild);
      moved = false;
    }
}

window.addEventListener('resize', relocateInfoLeft);
window.addEventListener('DOMContentLoaded', relocateInfoLeft);

  const menuList = document.querySelector('.menu-list-header');
  const requestButton = document.querySelector('.request-button-header');
  const bottomHeaderr = document.querySelector('.bottom-header');

  let burgerMenu = null;
  let movedMenu = false;

  function relocateBurgerMenu() {
    if (window.innerWidth <= 758 && !movedMenu) {
      // создаём .burger-menu
      burgerMenu = document.createElement('div');
      burgerMenu.classList.add('burger-menu');

      burgerMenu.appendChild(menuList);
      burgerMenu.appendChild(requestButton);
      bottomHeaderr.appendChild(burgerMenu);

      movedMenu = true;
    } else if (window.innerWidth > 758 && movedMenu) {
      // возвращаем элементы обратно
      bottomHeaderr.appendChild(menuList);
      bottomHeaderr.appendChild(requestButton);

      burgerMenu.remove();
      burgerMenu = null;
      movedMenu = false;
    }
  }

  window.addEventListener('resize', relocateBurgerMenu);
  window.addEventListener('DOMContentLoaded', relocateBurgerMenu);
// Бургер

// Увеличенное фото
const lightbox = document.getElementById('lightbox');
const zoomed = lightbox.querySelector('img')

document.querySelectorAll('.guarantees-img').forEach(img =>{
    img.addEventListener('click', ()=>{
        zoomed.src = img.src;
        lightbox.classList.add('show')
    });
});

lightbox.addEventListener('click', ()=>{
    lightbox.classList.remove('show')
    zoomed.src = ''
})
// Увеличенное фото

// Скрытая форма заявки
const requestForm = document.querySelector('.request-form')
document.getElementById('request-button').addEventListener('click', ()=>{
    requestForm.classList.add('show')
});
requestForm.addEventListener('click', () =>{
    requestForm.classList.remove('show')
})
// Скрытая форма заявки