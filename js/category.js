const pagination = document.querySelector('.pagination')

if (pagination) {
    const paginationNumbers = document.querySelectorAll('.pagination__number')
    let paginationActiveNumber = document.querySelector('.pagination__number--active')
    const paginationNumberIndicator = document.querySelector('.pagination__number-indicator')
    const paginationLeftArrow = document.querySelector('.pagination__arrow:not(.pagination__arrow--right)')
    const paginationRightArrow = document.querySelector('.pagination__arrow--right')

    const postionIndicator = (element) => {
        const paginationRect = pagination.getBoundingClientRect()
        const paddingElement = parseInt(window.getComputedStyle(element, null).getPropertyValue('padding-left'), 10)
        const elementRect = element.getBoundingClientRect()
        paginationNumberIndicator.style.left = `${elementRect.left + paddingElement - paginationRect.left}px`
        paginationNumberIndicator.style.width = `${elementRect.width - paddingElement * 2}px`
        if(element.classList.contains('pagination__number--active')) {
            paginationNumberIndicator.style.opacity = 1
        } else {
            paginationNumberIndicator.style.opacity = .2
        }
    }

    const setActiveNumber = (element) => {
        if (element.classList.contains('pagination__number--active')) return
        element.classList.add('pagination__number--active')
        paginationActiveNumber.classList.remove('pagination__number--active')
        paginationActiveNumber = element
        setArrowState()
    }

    const disableArrow = (arrow, disable) => {
        if (
            (!disable && !arrow.classList.contains('pagination__arrow--disabled')) ||
            (disable && arrow.classList.contains('pagination__arrow--disabled'))
        )
            return
        if (disable) {
            arrow.classList.add('pagination__arrow--disabled')
        } else {
            arrow.classList.remove('pagination__arrow--disabled')
        }
    }

    const setArrowState = () => {
        const previousElement = paginationActiveNumber.previousElementSibling
        const nextElement = paginationActiveNumber.nextElementSibling
        if(previousElement.classList.contains('pagination__number')) {
            disableArrow(paginationLeftArrow, false)
        } else {
            disableArrow(paginationLeftArrow, true)
        }

        if(nextElement.classList.contains('pagination__number')) {
            disableArrow(paginationRightArrow, false)
        } else {
            disableArrow(paginationRightArrow, true)
        }
    }

    paginationLeftArrow.addEventListener('click', () => {
        setActiveNumber(paginationActiveNumber.previousElementSibling)
        postionIndicator(paginationActiveNumber)
    })

    paginationRightArrow.addEventListener('click', () => {
        setActiveNumber(paginationActiveNumber.nextElementSibling)
        postionIndicator(paginationActiveNumber)
    })

    Array.from(paginationNumbers).forEach((element) => {
        element.addEventListener('click', () => {
            setActiveNumber(element)
            postionIndicator(paginationActiveNumber)
        })

        element.addEventListener('mouseover', () => {postionIndicator(element)})

        element.addEventListener('mouseout', () => {postionIndicator(paginationActiveNumber)})
    })

    postionIndicator(paginationActiveNumber)
}
var lowerSlider = document.querySelector('#lower');
var  upperSlider = document.querySelector('#upper');

document.querySelector('#two').value=upperSlider.value;
document.querySelector('#one').value=lowerSlider.value;

var  lowerVal = parseInt(lowerSlider.value);
var upperVal = parseInt(upperSlider.value);

upperSlider.oninput = function () {
    lowerVal = parseInt(lowerSlider.value);
    upperVal = parseInt(upperSlider.value);

    if (upperVal < lowerVal + 4) {
        lowerSlider.value = upperVal - 4;
        if (lowerVal == lowerSlider.min) {
            upperSlider.value = 4;
        }
    }
    document.querySelector('#two').value=this.value
};

lowerSlider.oninput = function () {
    lowerVal = parseInt(lowerSlider.value);
    upperVal = parseInt(upperSlider.value);
    if (lowerVal > upperVal - 4) {
        upperSlider.value = lowerVal + 4;
        if (upperVal == upperSlider.max) {
            lowerSlider.value = parseInt(upperSlider.max) - 4;
        }
    }
    document.querySelector('#one').value=this.value
};