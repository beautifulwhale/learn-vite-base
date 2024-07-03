import girl from '#assets/images/girl.jpg';


const img = document.createElement('img');
img.src = girl
img.style.width = '500px';
img.style.height = '500px';

document.body.append(img);

console.log('src index.js');
console.log('222');


fetch('/api/user', {
  method: 'post',
}).then((res) => {
  console.log('res', res);
}).catch(err => {
  console.log('err', err);
})