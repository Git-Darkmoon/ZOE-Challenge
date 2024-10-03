import Image from "next/image"
import Link from "next/link"

function Navbar() {
  return (
    <header className="navbar">
      <Link href="/">
        <Image
          src="/zoe_logo.svg"
          alt="Zoe Financial Logo"
          width={80}
          height={40}
          className="navbar__logo"
        />
      </Link>
    </header>
  )
}
export default Navbar
