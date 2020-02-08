export const setToken = (token: string) => {
  const date = new Date();
  const minute = date.getMinutes() + 60 * 12;
  date.setMinutes(minute);

  localStorage.setItem('token', token);
  localStorage.setItem('expire', date.toString());
};

export const getToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return token;
  }

  console.warn('Token Is Null');
};

export const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expire');
};