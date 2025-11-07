const searchIcon1 = document.querySelector("#searchicon1");
const srchIcon1 = document.querySelector("#srchicon1");
const search1 = document.querySelector('#searchinput1');

searchIcon1.addEventListener('click', function() {
    search1.style.display = 'flex';
    searchIcon1.style.display = 'none';
})
const searchIcon2 = document.querySelector("#searchicon2");
const srchIcon2 = document.querySelector("#srchicon2");
const search2 = document.querySelector('#searchinput2');

searchIcon2.addEventListener('click', function() {
    search2.style.display = 'flex';
    searchIcon2.style.display = 'none';
})

const bar = document.querySelector('.fa-bars');
const cross = document.querySelector('#hdcross');
const headerBar = document.querySelector('.headerbar');

bar.addEventListener('click', function(){
    setTimeout(() => {
        cross.style.display = 'block';
    },200);
    headerBar.style.right = '0%';

})
cross.addEventListener('click', function(){
    headerBar.style.right = '-100%';
    cross.style.display = 'none';
})