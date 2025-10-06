// const togglePassword = document.querySelector('#togglePassword');
//   const password = document.querySelector('#password');
//   const icon = togglePassword.querySelector('i');

//   togglePassword.addEventListener('click', () => {
//     // Toggle input type
//     const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
//     password.setAttribute('type', type);

//     // Toggle icon
//     if (type === 'password') {
//       icon.classList.remove('fa-eye-slash');
//       icon.classList.add('fa-eye');
//     } else {
//       icon.classList.remove('fa-eye');
//       icon.classList.add('fa-eye-slash');
//     }
//   });

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

if (togglePassword && password) {
  const icon = togglePassword.querySelector('i');

  togglePassword.addEventListener('click', () => {
    // Toggle input type
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);

    // Toggle icon
    if (type === 'password') {
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    } else {
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    }
  });
}
