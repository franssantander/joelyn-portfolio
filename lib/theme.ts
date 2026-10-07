export type ThemePreference = "light" | "dark" | "system";
export const THEME_KEY = "joelyn-theme";
// First visit is light; subsequent visits follow the system unless saved.
export const themeInitializationScript = `(function(){var p='light';try{var saved=localStorage.getItem('joelyn-theme');if(saved==='light'||saved==='dark'||saved==='system'){p=saved}else if(localStorage.getItem('joelyn-visited')){p='system'}localStorage.setItem('joelyn-visited','1')}catch(e){}var dark=p==='dark'||(p==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var root=document.documentElement;root.classList.toggle('dark',dark);root.dataset.themePreference=p})();`;
