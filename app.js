let page = 1;
let dataAll = [];
let modalWindow;
let data;
let arrowUp = document.querySelector('.arrowUp');
let mainBox = document.querySelector('main');
const ht = document.querySelector('html');
let closeButton = document.querySelector('#modalClose');
let closeWindow = document.querySelector('#myModal');
let checkbox = document.querySelector('#checkbox');
let pagin = document.querySelector('.pagin');
let prevPage = document.querySelector('.prevPage');
let pagePagin = document.querySelector('.pagePagin')
let nextPage = document.querySelector('.nextPage');

let dataRick = async function dataReq(){
    let url = `https://rickandmortyapi.com/api/character/?page=${page}`;
    let res = await fetch(url);
    data = await res.json();
    return data
}
dataRick().then(dataRender);
mainBox = document.querySelector('main');
if(mainBox.clientHeight < window.innerHeight){

    arrowUp.style.display = 'block';
    page += 1;
    dataRick().then(dataRender);
}

window.addEventListener('scroll', hei);
checkbox.addEventListener('change', (event)=>{
    if(event.target.checked){
        arrowUp.style.display = 'none';
        pagin.style.display = 'flex';
        window.removeEventListener('scroll', hei);
        mainBox.innerHTML = '';
        pagePagin.innerHTML = page;
        dataRender(data);
       
        nextPage.addEventListener('click', getNextPage)
        prevPage.addEventListener('click', getPrevPage)
    }
    else{
        nextPage.removeEventListener('click', getNextPage)
        prevPage.removeEventListener('click', getPrevPage)

        pagin.style.display = 'none';
        mainBox.innerHTML = '';
        window.addEventListener('scroll', hei);
        arrowUp.style.display = 'block';
        dataRender(data);
        mainBox = document.querySelector('main');
    // if(mainBox.clientHeight < window.innerHeight){

    //     arrowUp.style.display = 'block';
    //     page += 1;
    //     dataRick().then(dataRender);
    // }
    }
})

mainBox.addEventListener('click',(event)=>{
    modalWindow = document.querySelector('#myModal');
    if(event.target.closest('.card')){
        modalWindow.style.display = 'flex';
        document.body.classList.add('modal-open');

        let temp = dataAll[event.target.closest('.card').id-1];
        for(let key in temp){
            let pole = document.querySelector('.modul' + key);
            if(pole){
                switch(key){
                    case 'image': {
                        pole.setAttribute('src', temp[key])
                    }
                    break;
                    case 'origin':{
                        pole.innerHTML = temp[key].name;
                    }
                    break;
                    case 'episode': {
                        pole.innerHTML = temp[key][0].substring(temp[key][0].indexOf('episode/') + 8);
                    }
                    break;
                    default: {
                        pole.innerHTML = temp[key];
                    }
                    break
                }    
            }
        }
    }
})

closeButton.addEventListener('click', () => {
    modalWindow.style.display = ''
});
closeWindow.addEventListener('click', () => {
    if(!event.target.closest('.modal-content')){
        modalWindow.style.display = '';
    }
    
});
arrowUp.addEventListener('click', ()=>{
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})
function hei(){
    let height = document.body.offsetHeight
    let screenHeight = window.innerHeight;
    let scrolled = window.scrollY;
    let position = scrolled + screenHeight;
    let threshold = height - screenHeight / 4
    if (position >= threshold) {
        page += 1;
        dataRick().then(dataRender);
      }
    return page
}

function dataRender(data){
    data.results.forEach((element, index) => {
        if(dataAll.indexOf(element) === -1){
            dataAll.push(element);
        }
        let cardBox = document.createElement('div');
        cardBox.setAttribute('id', element.id);
        cardBox.classList.add('card');
        let cardImg = document.createElement('img');
        cardImg.setAttribute('src',element.image)
        let cardName = document.createElement('span');
        cardName.innerHTML = element.name;
        cardName.classList.add('nameCharacter');
        cardBox.append(cardImg);
        cardBox.append(cardName);
        mainBox.append(cardBox)
    });
}
function getNextPage(){
    if(page !== data.info.pages){
        page += 1;
        mainBox.innerHTML = '';
        dataRick().then(dataRender);
        pagePagin.innerHTML = page;
    }
}
function getPrevPage(){
    if(page !== 1){
        page -= 1;
        mainBox.innerHTML = '';
        dataRick().then(dataRender);
        pagePagin.innerHTML = page; 
    }
}