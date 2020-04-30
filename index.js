function setCss(elem, styles) {
  Object.keys(styles).forEach(key => {
    elem.style[key] = styles[key];
  });
}
function setWidth(el, val) {
  if (typeof val === "function") val = val();
  if (typeof val === "string") el.style.width = val;
  else el.style.width = val + "px";
}

function getWidth(el) {
  return parseFloat(getComputedStyle(el, null).width.replace("px", ""));
}

export default {
  inserted(el, binding) {
    const { value } = binding;
    const options = Object.assign({
      minWidth: 0,
      maxWidth: 1000,
      comfortZone: 70
    }, value);
    const minWidth = options.minWidth || el.getBoundingClientRect().width;
    const input = el;
    const testSubject = document.createElement('tester');
    setCss(testSubject, {
      position: 'absolute',
      top: '-9999px',
      left: '-9999px',
      width: 'auto',
      fontSize: getComputedStyle(el)['fontSize'],
      fontFamily: getComputedStyle(el)['fontFamily'],
      fontWeight: getComputedStyle(el)['fontWeight'],
      letterSpacing: getComputedStyle(el)['letterSpacing'],
      whiteSpace: 'nowrap'
    });
    let val = '';

    const check = function() {
      if (val === (val = input.value)) {
        return;
      }
      const escaped = val
        .replace(/&/g, '&amp;')
        .replace(/\s/g, ' ')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      testSubject.innerHTML = escaped;
      const testerWidth = getWidth(testSubject);
      const newWidth = testerWidth + options.comfortZone >= minWidth ? testerWidth + options.comfortZone : minWidth;
      const currentWidth = getWidth(input);
      const isValidWidthChange = (newWidth < currentWidth && newWidth >= minWidth) ||
            (newWidth > minWidth && newWidth < options.maxWidth);
      if (isValidWidthChange) {
        setWidth(input, newWidth);
      }
    };
    if (el.parentNode) {
      el.parentNode.insertBefore(testSubject, el.nextSibling);
    }

    el.__vueAutogrowInput__ = check;
    el.addEventListener('keyup', check);
    el.addEventListener('keydown', check);
    el.addEventListener('blur', check);
    el.addEventListener('update', check);
  },
  update() {},
  unbind(el) {
    el.removeEventListener('keyup', el.__vueAutogrowInput__);
    el.removeEventListener('keydown', el.__vueAutogrowInput__);
    el.removeEventListener('blur', el.__vueAutogrowInput__);
    el.removeEventListener('update', el.__vueAutogrowInput__);
    delete el.__vueAutogrowInput__;
  }
};
