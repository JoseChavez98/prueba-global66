import * as mutations from '../../mutation-types';

export default {
    [mutations.OPEN_MODAL](state) {
        state.modalOpened = true;
    },
    [mutations.CLOSE_MODAL](state) {
        state.modalOpened = false;
    }
}