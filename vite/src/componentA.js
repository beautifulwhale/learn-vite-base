import _ from 'lodash'
import footer from './index.module.css'
// import yongen from '@assets/images/yongen.png';
import yongen from '#assets/images/yongen.png';

const obj = _.cloneDeep({})
console.log('obj', obj);

console.log('footer.', footer);
const div = document.createElement('div');

div.className = footer.footer
document.body.appendChild(div)




const img = document.createElement('img');
img.src = yongen

document.body.append(img);