export const validateName = (name: string) => {
  if (!name) {
    return 'This field is required';
  }

  return '';
}

export  const validateEmail = (email: string) => {
  if (!email) {
    return 'This field is required';
  }


  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!regex.test(email)) {
    return 'Invalid email format';
  }

  return '';
}

export const validatePosition = (name: string) => {
  if (!name) {
    return 'This field is require';
  }

  return '';
}