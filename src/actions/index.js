// Coloque aqui suas actions
export const LOGGED = 'LOGGED';

export function login(userData) {
  return {
    type: LOGGED,
    payload: {
      email: userData,
    },
  };
}
