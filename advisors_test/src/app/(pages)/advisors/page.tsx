"use client"

import AdvisorsTable from "@/components/AdvisorsTable"
import Modal from "@/components/Modal"
import { ROUTES } from "@/lib/routes"
import { useSearchParams } from "next/navigation"
import { FormEvent, useState } from "react"

export default function AdvisorsPage() {
  const searchParams = useSearchParams()
  const income = searchParams.get("income")

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const handleAddAdvisor = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.target as HTMLFormElement
    const formData = new FormData(form)

    // It is not possible to upload to the API the real image file
    // due to the image hosting, so we are using a dummy one.
    // const avatarFile = formData.get("avatar") as File

    const randomPic = Math.floor(Math.random() * 100)

    const avatarFile = `https://randomuser.me/api/portraits/men/${randomPic}.jpg`

    if (avatarFile) {
      formData.append("avatar", avatarFile)
    }

    console.log(Object.fromEntries(formData))

    // try {
    //   const response = await fetch(`${ROUTES.ADVISORS}`, {
    //     method: "POST",
    //     body: JSON.stringify(formData),
    //   })

    //   if (response.ok) {
    //     const result = await response.json()
    //     console.log("Advisor created:", result)
    //   } else {
    //     console.error("Error creating advisor:", response.statusText)
    //   }
    // } catch (error) {
    //   console.error("Network error:", error)
    // }
  }

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        action={handleAddAdvisor}
      />
      <div className="advisors__header">
        <h1 className="advisors__title">Advisors</h1>
        <button type="button" onClick={openModal} className="btn btn__primary">
          + Add New Advisor
        </button>
      </div>

      <section className="advisors__container">
        <AdvisorsTable income={income as string} />
      </section>
    </>
  )
}
