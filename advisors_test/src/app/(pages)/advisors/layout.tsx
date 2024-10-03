import Container from "@/components/Container"
import Navbar from "@/components/Navbar"
// Importing the global styles preventing some layout shifts
import "../../index.css"

export default function AdvisorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Navbar />
      <Container>{children}</Container>
    </div>
  )
}
