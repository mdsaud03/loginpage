const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input');
const error_message = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
  let errors = [];

  if (firstname_input) {
    // If firstname_input exists, we are in the signup process
    errors = getSignupFormErrors(
      firstname_input.value,
      email_input.value,
      password_input.value,
      repeat_password_input.value,
    );
  } else {
    // If firstname_input does not exist, we are in the login process
    errors = getLoginFormErrors(email_input.value, password_input.value);
  }

  if (errors.length > 0) {
    // If there are errors, prevent form submission and show errors
    e.preventDefault();
    error_message.innerText = errors.join(". ");
  } else if (!firstname_input) {
    // No errors in login form, redirect to the specified URL
    window.location.href = "https://www.youtube.com";

    alert("success");
  }
});

function getSignupFormErrors(firstname, email, password, repeatPassword) {
  let errors = [];

  // Clear previous errors
  [firstname_input, email_input, password_input, repeat_password_input].forEach(input => {
    if (input) input.parentElement.classList.remove('incorrect');
  });
  error_message.innerText = '';

  if (!firstname) {
    errors.push('Firstname is required');
    if (firstname_input) firstname_input.parentElement.classList.add('incorrect');
  }
  if (!email) {
    errors.push('Email is required');
    email_input.parentElement.classList.add('incorrect');
  }
  if (!password) {
    errors.push('Password is required');
    password_input.parentElement.classList.add('incorrect');
  }
  if (password.length < 8) {
    errors.push('Password must have at least 8 characters');
    password_input.parentElement.classList.add('incorrect');
  }
  if (password !== repeatPassword) {
    errors.push('Password does not match repeated password');
    if (password_input) password_input.parentElement.classList.add('incorrect');
    if (repeat_password_input) repeat_password_input.parentElement.classList.add('incorrect');
  }

  return errors;
}

function getLoginFormErrors(email, password) {
  let errors = [];

  // Clear previous errors
  [email_input, password_input].forEach(input => {
    if (input) input.parentElement.classList.remove('incorrect');
  });
  error_message.innerText = '';

  if (!email) {
    errors.push('Email is required');
    email_input.parentElement.classList.add('incorrect');
  }
  if (!password) {
    errors.push('Password is required');
    password_input.parentElement.classList.add('incorrect');
  }

  return errors;
}

const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null);

allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if (input.parentElement.classList.contains('incorrect')) {
      input.parentElement.classList.remove('incorrect');
      error_message.innerText = '';
    }
  });
});
