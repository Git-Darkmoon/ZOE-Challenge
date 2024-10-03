"use client"

import Modal from "@/components/Modal"
import { ROUTES } from "@/lib/routes"
import { Advisor } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import Image from "next/image"
import { useEffect, useState } from "react"

function AdvisorDetailsPage({ params }: { params: { advisorId: string } }) {
  const { advisorId } = params
  const [advisor, setAdvisor] = useState<Advisor>()
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const getAdvisor = async () => {
      const response = await fetch(`${ROUTES.ADVISORS}/${advisorId}`)
      const advisorData: Advisor = await response.json()
      setAdvisor(advisorData)
    }

    getAdvisor()
  }, [advisorId])

  //   console.log(advisor)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const handleDelete = () => {
    // openModal()
    console.log("delete")
  }
  const handleEdit = () => {
    openModal()
  }

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <article>
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
              <button type="button" className="btn btn__danger">
                🗑 Delete
              </button>
              <button
                type="button"
                onClick={handleEdit}
                className="btn btn__outlined"
              >
                ✏ Edit Advisor
              </button>
            </div>
          </div>
          <div className="advisor__info">
            <h1 className="advisor__name">{advisor?.name}</h1>
            <p>{advisor?.address}</p>
            <p>Planet Advisors</p>
          </div>
        </header>
        <hr />
        <section className="advisor__details">
          <div className="advisor__details--headers">
            <h3>ID Number</h3>
            <h3>Income</h3>
            <h3>Phone</h3>
            <h3>Email</h3>
          </div>
          <div className="advisor__details--data">
            <p>ID: {advisor?.id}</p>
            <p>{formatCurrency(advisor?.income as number)}</p>
            <p>{advisor?.phone}</p>
            <p>{advisor?.email}</p>
          </div>
        </section>
      </article>
    </>
  )
}
export default AdvisorDetailsPage
