const mainLiName = document.querySelectorAll('.main-li-name');
const subUl = document.querySelectorAll('.sub-ul');
const brandCheck = document.querySelectorAll('#brand');
const os = document.querySelectorAll('#os');
const processor = document.querySelectorAll('#processor');
const rating = document.querySelectorAll('#rating');
const sorting = document.querySelectorAll('.sort-section span');
const items = document.querySelector('.items');
const renderHtml = document.querySelector('.render');
const amount = document.querySelectorAll('.amount');
const icon = document.querySelectorAll('i');

const db = [
    {
        id: 0,
        model: "HP Ryzen",
        brand: "HP",
        os: "windows",
        processor: "Intel",
        rating: 4.3,
        price: 4800
    },
    {
        id: 1,
        model: "HP OMEN",
        brand: "HP",
        os: "Ubuntu",
        processor: "AMD",
        rating: 4.7,
        price: 7300
    },
    {
        id: 2,
        model: "HP Pavilion",
        brand: "HP",
        os: "DOS",
        processor: "Intel",
        rating: 3,
        price: 3900
    },
    {
        id: 3,
        model: "ASUS Vivobook",
        brand: "ASUS",
        os: "windows",
        processor: "Intel",
        rating: 3,
        price: 5400
    },
    {
        id: 4,
        model: "ASUS TUF",
        brand: "ASUS",
        os: "ubuntu",
        processor: "Intel",
        rating: 2.5,
        price: 2700
    },
    {
        id: 5,
        model: "ASUS ROG",
        brand: "ASUS",
        os: "DOS",
        processor: "AMD",
        rating: 4.1,
        price: 4100
    },
    {
        id: 6,
        model: "MacBook",
        brand: "Apple",
        os: "Mac",
        processor: "Intel",
        rating: 4,
        price: 8000
    },
    {
        id: 7,
        model: "Macbook Pro",
        brand: "Apple",
        os: "Mac",
        processor: "M1",
        rating: 4.9,
        price: 11800
    },
    {
        id: 8,
        model: "Lenovo Ideapad",
        brand: "Lenovo",
        os: "Ubuntu",
        processor: "AMD",
        rating: 4.8,
        price: 6600
    },
    {
        id: 9,
        model: "Lenovo Thinkpad",
        brand: "Lenovo",
        os: "windows",
        processor: "Intel",
        rating: 4.1,
        price: 5600
    },
    {
        id: 10,
        model: "Lenovo Celeron",
        brand: "Lenovo",
        os: "DOS",
        processor: "Intel",
        rating: 2.8,
        price: 3500
    }
];

let filterArray = [];

let brandArray = [];
let osArray = [];
let processorArray = [];
let ratingArray = 1;
let temp = [];

let renderStr = '';

function filterFunction() {
    filterArray = [];
    // brand
    if (brandArray.length !== 0) {
        brandArray.forEach(x => {
            db.forEach(y => {
                if (x == (y.brand).toLocaleLowerCase()) {
                    filterArray.push(y);
                }
            });
        })
    }
    else {
        filterArray = db;
    }
    // os
    temp = [];
    if (osArray.length !== 0) {
        osArray.forEach(x => {
            filterArray.forEach(y => {
                if (x == (y.os).toLocaleLowerCase()) {
                    temp.push(y);
                }
            })
        })
        filterArray = temp;
    }
    // processor
    temp = [];
    if (processorArray.length !== 0) {
        processorArray.forEach(x => {
            filterArray.forEach(y => {
                if (x == (y.processor).toLocaleLowerCase()) {
                    temp.push(y);
                }
            })
        })
        filterArray = temp;
    }
    // rating
    temp = [];
    if (ratingArray !== 1) {
        filterArray.forEach(e => {
            if (e.rating >= ratingArray) {
                temp.push(e);
            }
        })
        filterArray = temp;
    }
    // price
    temp = [];
    if (true) {
        filterArray.forEach(e => {
            if (e.price >= amount[0].value && e.price <= amount[1].value) {
                temp.push(e);
            }
        })
        filterArray = temp;
    }
    // sorting
    (sorting[0].classList.contains('highlight')) ? sortPop() : (sorting[1].classList.contains('highlight')) ? sortl2h() : (sorting[2].classList.contains('highlight')) ? sorth2l() : render();
}

function brandFunction() {
    brandArray = [];
    brandCheck.forEach(e => {
        if (e.checked === true) {
            brandArray.push(e.name);
        }
    })
    filterFunction();
}

function osFunction() {
    osArray = [];
    os.forEach(e => {
        if (e.checked === true) {
            osArray.push(e.name);
        }
    })
    filterFunction();
}

function processorFunction() {
    processorArray = [];
    processor.forEach(e => {
        if (e.checked === true) {
            processorArray.push(e.name);
        }
    })
    filterFunction();
}

function ratingFunction() {
    ratingArray = 1;
    rating.forEach(e => {
        if (e.checked) {
            ratingArray = e.value;
        }
    })
    filterFunction();
}

function sortPop() {
    filterArray.sort((a, b) => b.rating - a.rating);
    render();
}

function sortl2h() {
    filterArray.sort((a, b) => a.price - b.price);
    render();
}

function sorth2l() {
    filterArray.sort((a, b) => b.price - a.price);
    render();
}

function render() {
    renderStr = '';
    filterArray.forEach(e => {
        renderStr += `
        <div class="item">
        <div class="item-img">
          <img src="./images/${e.id}.jpg" alt="img"/>
        </div>
        <div class="details">
          <h2>${e.model}</h2>
          <p>Brand : ${e.brand}</p>
          <p>OS : ${e.os}</p>
          <p>Processor : ${e.processor}</p>
        </div>
        <div class="price-details">
          <h3 class="price">$${e.price}</h3>
          <div class="rating">${e.rating}</div>
        </div>
      </div>
        `
    })
    renderHtml.innerHTML = renderStr;
}

sorting.forEach(e => {
    e.addEventListener('click', () => {
        e.classList.add('highlight');
        if (e.classList.contains('popularity')) {
            sortPop();
            sorting[1].classList.remove('highlight');
            sorting[2].classList.remove('highlight');
        } else if (e.classList.contains('l2h')) {
            sortl2h();
            sorting[0].classList.remove('highlight');
            sorting[2].classList.remove('highlight');
        } else if (e.classList.contains('h2l')) {
            sorth2l();
            sorting[0].classList.remove('highlight');
            sorting[1].classList.remove('highlight');
        }
    })
})

brandCheck.forEach(e => {
    e.addEventListener('change', () => {
        brandFunction();
    })
})

os.forEach(e => {
    e.addEventListener('change', () => {
        osFunction();
    })
})

processor.forEach(e => {
    e.addEventListener('change', () => {
        processorFunction();
    })
})

rating.forEach(e => {
    e.addEventListener('change', () => {
        ratingFunction();
    })
})

amount.forEach(e => {
    e.addEventListener('change', () => {
        filterFunction();
    })
})

mainLiName.forEach((e, i) => {
    if (i !== 4) {
        e.addEventListener('click', () => {
            subUl[i].classList.toggle('show');
            if (subUl[i].classList.contains('show')) {
                icon[i].classList.replace('fa-angle-down', 'fa-angle-up');
            }
            else {
                icon[i].classList.replace('fa-angle-up', 'fa-angle-down');
            }
        })
    }
})

filterFunction();