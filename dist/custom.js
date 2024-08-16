(() => {
  'use strict'

  const getStoredTheme = () => localStorage.getItem('theme')

  const matcher = window.matchMedia('(prefers-color-scheme: dark)')

  const changer = () => setTheme(getStoredTheme())

  const showActiveTheme = (theme) => {
    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
      element.classList.remove('active')
      element.setAttribute('aria-pressed', 'false')
    })
    document.querySelectorAll(`[data-bs-theme-value='${['light', 'dark'].includes(theme) ? theme : 'auto'}']`).forEach(element => {
      element.classList.add('active')
      element.setAttribute('aria-pressed', 'true')
    })
  }

  const setTheme = theme => {
    if (['light', 'dark'].includes(theme)) {
      showActiveTheme(theme)
      matcher.removeEventListener('change', changer)
      document.documentElement.setAttribute('data-bs-theme', theme)
    } else {
      showActiveTheme('auto')
      matcher.addEventListener('change', changer)
      document.documentElement.setAttribute('data-bs-theme', matcher.matches ? 'dark' : 'light')
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    setTheme(getStoredTheme())
    document.querySelectorAll('[data-bs-theme-value]')
      .forEach(toggle => {
        toggle.addEventListener('click', () => {
          const theme = toggle.classList.contains('active') ? 'auto' : toggle.getAttribute('data-bs-theme-value')
          localStorage.setItem('theme', theme)
          setTheme(theme)
        })
      })
  })
})()
