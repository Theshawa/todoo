module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors:{
      dark:'#000D6B',
      primary:'#185ADB',
      pink:'#FF5DA2',
      white:'#fff'
    },
    fontFamily:{
      mirrorweather:['Merriweather', 'serif'],
      mohave:['Mohave', 'sans-serif']
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
