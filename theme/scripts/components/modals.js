import MicroModal from 'micromodal';
import '../../styles/components/modals.scss';

/*-------------------------
Modals
-------------------------*/

document.addEventListener('DOMContentLoaded', event => {
  MicroModal.init({
    awaitOpenAnimation: true,
    awaitCloseAnimation: true,
  });
});
