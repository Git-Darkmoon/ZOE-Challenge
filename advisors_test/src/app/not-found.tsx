"use client"

import Container from "@/components/Container"
import Image from "next/image"
import Link from "next/link"
import "./index.css"

function NotFoundPage() {
  return (
    <Container>
      <div className="errorPage">
        <Image
          src="/not_found.svg"
          className="error__image"
          alt="Not Found"
          width={300}
          height={300}
        />
        <div className="error__text">
          <h1 className="error__title">
            Error <span className="error__title--error">404</span> - Page not
            found
          </h1>
          <Link href="/" className="btn btn__primary error__btn">
            Back to Home
          </Link>
        </div>
      </div>
    </Container>
  )
}
export default NotFoundPage
