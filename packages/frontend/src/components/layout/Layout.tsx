import Footer from './Footer'
import NavbarPage from './NavbarPage'

export default function Layout({ children }) {
  return (
    <div className="bg-base-200">
      <NavbarPage />
      {children}
      <Footer />
    </div>
  )
}
