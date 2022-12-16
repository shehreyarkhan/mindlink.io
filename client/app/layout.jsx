import '../styles/globals.css'
import Header from './header'
import Footer from './footer'


export default function RootLayout({
  children
}) {


  
  return (
    <html>
      <head />
      <body className="bg-gray-100 text-zinc-900 dark:text-gray-100 dark:bg-zinc-900 transition-all duration-700">
        <Header name={'shehreyar'}/>
        <div className="max-w-6xl mx-auto">

          {children}

          <Footer/>
        </div>
        </body>
    </html>
  )
}
