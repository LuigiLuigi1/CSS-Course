// Skeleton Screen UI shown for 3 seconds
setTimeout(() => {
    document.querySelectorAll('.skeleton').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.hidden').forEach(el => el.style.display = 'block');
}, 3000);

// Function to check if page is scrolled and adjust the logo size
function checkScroll() {
    const navbar = document.getElementById('navbar');
    const logo = document.getElementById('logo');
    let scrollposition = window.scrollY;

    // Add/remove 'scrolled' class based on scroll position
    if (scrollposition > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Calculate new font size based on scroll position
    let newFontSize = 3 - (scrollposition * 0.03); // Decrease font size by 0.03rem per pixel scrolled

    // Clamp the font size between 1.5rem and 3rem
    newFontSize = Math.max(1.5, newFontSize);
    newSize = Math.min(3, newFontSize);

    logo.style.fontSize = newFontSize + 'rem';
}

// Event listener for scroll event
window.addEventListener('scroll', checkScroll);

// Dark Mode --------------------------------------------------------
const themeSwitcher = document.getElementById('theme-switcher');

function updateThemeIcon(isDarkMode) {
  themeSwitcher.children[0].classList.replace(isDarkMode ? 'fa-sun' : 'fa-moon', isDarkMode ? 'fa-moon' : 'fa-sun');
}

// Determine if dark mode is preferred
function prefersDarkMode() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Set the theme based on the preference
function setThemeBasedOnPreference() {
  const isDarkMode = prefersDarkMode();
  document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  updateThemeIcon(isDarkMode);
}

// Switch Theme manually
function switchTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme === 'dark');
}

// Event Listener
themeSwitcher.addEventListener('click', switchTheme);

// Initialize Theme
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      updateThemeIcon(savedTheme === 'dark');
  } else {
      setThemeBasedOnPreference();
  }
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setThemeBasedOnPreference);

// Initialize theme when the script loads
initializeTheme();