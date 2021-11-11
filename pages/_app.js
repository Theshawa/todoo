import 'tailwindcss/tailwind.css'
import './global.css'
function MyApp({ Component, pageProps }) {
  const url = 'http://localhost:1337'
  return <Component {...pageProps} url={url}/>
}

export default MyApp
