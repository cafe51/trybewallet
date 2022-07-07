// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGGED } from '../actions/index';

const INITIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGGED:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
}
