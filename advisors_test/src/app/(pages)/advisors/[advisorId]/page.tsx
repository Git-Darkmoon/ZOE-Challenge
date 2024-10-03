"use client"

import Modal from "@/components/Modal"
import { API_ROUTES, ROUTES } from "@/lib/routes"
import { Advisor } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import {
  BriefcaseBusinessIcon,
  ChevronLeftIcon,
  MapPinIcon,
  SquarePenIcon,
  Trash2Icon,
} from "lucide-react"
import { revalidatePath } from "next/cache"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"

function AdvisorDetailsPage({ params }: { params: { advisorId: string } }) {
  const { advisorId } = params
  const navigate = useRouter()
  const [advisor, setAdvisor] = useState<Advisor>()
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const getAdvisor = async () => {
      const response = await fetch(`${API_ROUTES.ADVISORS}/${advisorId}`)
      const advisorData: Advisor = await response.json()
      setAdvisor(advisorData)
    }

    getAdvisor()
  }, [advisorId])

  //   console.log(advisor)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const handleDelete = async () => {
    const isConfirmed = confirm(
      "Are you sure you want to delete this advisor ? \n(This action cannot be undone)"
    )

    if (isConfirmed) {
      try {
        const response = await fetch(`${API_ROUTES.ADVISORS}/${advisorId}`, {
          method: "DELETE",
        })

        if (response.ok) {
          alert("Advisor deleted successfully")
          navigate.replace(`${ROUTES.ADVISORS}?income=${advisor?.income}`)
        } else {
          console.error("Error deleting advisor:", response.statusText)
        }
      } catch (error) {
        console.error("Network error:", error)
      }
    }
  }
  const handleEdit = async (event: FormEvent<HTMLFormElement>) => {
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

    const advisorName = `${formData.get("name") as string} ${
      formData.get("lastName") as string
    }`

    const updatedAdvisor = {
      name: advisorName,
      avatar: avatarFile,
      income: Number(formData.get("income") as string),
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
    }

    try {
      const response = await fetch(`${API_ROUTES.ADVISORS}/${advisorId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAdvisor),
      })

      if (response.ok) {
        const updatedData = await response.json()
        setAdvisor(updatedData)
        alert("Advisor updated successfully")
        setIsModalOpen(false)
        revalidatePath(`/advisors/${advisorId}`)
      } else {
        console.error("Error updating advisor:", response.statusText)
      }
    } catch (error) {
      console.error("Network error:", error)
    }
  }

  const goBackToAdvisorsList = () => {
    navigate.replace(`${ROUTES.ADVISORS}?income=${advisor?.income}`)
  }

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        advisorData={advisor}
        action={handleEdit}
      />
      <article>
        <button
          className="btn btn__ghost btn__back"
          onClick={goBackToAdvisorsList}
        >
          <ChevronLeftIcon /> Go back to advisors list
        </button>
        <header>
          <div className="advisor__avatar-container">
            <Image
              className="advisor__avatar"
              src={advisor?.avatar ?? "/default_avatar.avif"}
              alt={`Avatar image of ${advisor?.name}`}
              width={100}
              height={100}
            />
            {/* actions */}
            <div className="advisor__actions">
              <button
                type="button"
                onClick={handleDelete}
                className="btn btn__danger"
              >
                <Trash2Icon size={18} /> Delete
              </button>
              <button
                type="button"
                onClick={openModal}
                className="btn btn__outlined"
              >
                <SquarePenIcon size={18} /> Edit Advisor
              </button>
            </div>
          </div>
          <div className="advisor__info">
            <h1 className="advisor__name">{advisor?.name}</h1>
            <p className="advisor__baseInfo">
              <MapPinIcon size={18} />
              {advisor?.address}
            </p>
            <p className="advisor__baseInfo">
              <BriefcaseBusinessIcon size={18} />
              Planet Advisors
            </p>
          </div>
        </header>
        <hr />
        <section className="advisor__details">
          <div className="advisor__details--wrapper">
            <h3 className="advisor__details--headers">ID Number:</h3>
            <p>ID: {advisor?.id}</p>
          </div>
          <div className="advisor__details--wrapper">
            <h3 className="advisor__details--headers">Income:</h3>
            <p>{formatCurrency(advisor?.income as number)}</p>
          </div>
          <div className="advisor__details--wrapper">
            <h3 className="advisor__details--headers">Phone:</h3>
            <p>{advisor?.phone}</p>
          </div>
          <div className="advisor__details--wrapper">
            <h3 className="advisor__details--headers">Email:</h3>
            <p>{advisor?.email}</p>
          </div>
        </section>
      </article>
    </>
  )
}
export default AdvisorDetailsPage
