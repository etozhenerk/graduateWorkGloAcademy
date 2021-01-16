const accordeon = () => {
  const accordeonBlock = document.querySelector('.accordeon'),
  elements = accordeonBlock.querySelectorAll('.element'),
  elementsContent = accordeonBlock.querySelectorAll('.element-content');

  accordeonBlock.addEventListener('click', e => {
    const target = e.target,
    parent = target.closest('.element');

    if(parent){
      elements.forEach((elem, i) => {
        elem.classList.remove('active');
        elementsContent[i].style.display = 'none';
        if(elem === parent){
          elem.classList.add('active');
          elementsContent[i].style.display = 'block';
        }
      });
    }

  });
};

export default accordeon;