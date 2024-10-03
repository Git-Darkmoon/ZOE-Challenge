"use client"

import AdvisorsTable from "@/components/AdvisorsTable"
import Modal from "@/components/Modal"
import { API_ROUTES } from "@/lib/routes"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export default function AdvisorsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
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

    // console.log(Object.fromEntries(formData))

    const advisorName = `${formData.get("name") as string} ${
      formData.get("lastName") as string
    }`

    console.log(formData.get("lastName") as string)

    const newAdvisor = {
      name: advisorName,
      avatar: avatarFile,
      income: Number(formData.get("income") as string),
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
    }

    try {
      const response = await fetch(`${API_ROUTES.ADVISORS}`, {
        method: "POST",
        body: JSON.stringify(newAdvisor),
      })

      if (response.ok) {
        const result = await response.json()
        alert("Advisor created successfully")
        console.log("Advisor created:", result)
        closeModal()
        router.push(`/advisors?income=${newAdvisor.income}`)
        router.refresh()
      } else {
        console.error("Error creating advisor:", response.statusText)
      }
    } catch (error) {
      console.error("Network error:", error)
    }
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
        <AdvisorsTable />
      </section>
    </>
  )
}
