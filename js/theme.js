const themeToggler = document.querySelector('.theme-toggler');

const theme = localStorage.getItem('theme');
if (theme === 'dark') document.body.classList.add('dark');

themeToggler.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  let isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
