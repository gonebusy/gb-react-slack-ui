import { TweenLite, Sine, Power3 } from 'gsap';
import SplitText from './vendor/gsap/uncompressed/utils/SplitText';


import '../scss/main.scss';

export default (() => {


  TweenLite.from('.slack-ui__msg', 1, {y:"+=100", autoAlpha:0,  ease:Sine.easeInOut})


  const [element] = document.querySelectorAll('.slack-ui__msg-input-text');

  element.innerHTML = '/gonebusy book Interview w/ Bruce Wayne tomorrow at 1pm';

  let { chars } = new SplitText(element, {type: 'chars'});

  for(let i = 0; i < chars.length; i++){
    let char = chars[i];
    TweenLite.from(char, 0, {autoAlpha:0, delay: (i * .05), ease:Power3.easeOut})
  }

})();
