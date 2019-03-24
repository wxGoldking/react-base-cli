import './index.css';
import b from './b';
import a from './a';
console.log(process.env);
a();
b();

document.querySelector('#app').innerHTML = 'React-base-cli';

const img1 = document.createElement('img');
const img2 = document.createElement('img');

img1.src = '/static/2.jpg';
img2.src = '/static/top.png';

document.body.appendChild(img1);
document.body.appendChild(img2);