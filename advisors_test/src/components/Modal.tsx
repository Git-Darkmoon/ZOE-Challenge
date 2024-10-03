import { useState } from "react"
import Image from "next/image"
import { FormEvent } from "react"
import { Advisor } from "@/lib/types"

function Modal({
  isOpen,
  onClose,
  action,
}: {
  isOpen: boolean
  onClose: () => void
  action: (event: FormEvent<HTMLFormElement>) => void | Promise<void>
  advisorData?: Advisor
}) {
  const [avatarPreview, setAvatarPreview] = useState("/default_avatar.avif")
  // const [avatarFile, setAvatarFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // setAvatarFile(file)
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    action(event)
  }

  return (
    <div className={`modal ${isOpen ? "modal--open" : ""}`}>
      <article className="modal__card">
        <header className="modal__card__header">
          <h3>Edit Advisor Information</h3>
        </header>
        <hr />
        <form
          id="modal__card__form"
          onSubmit={handleSubmit}
          className="modal__card__form"
        >
          {/* Picture options */}
          <div className="modal__card__pictureOptions">
            <Image
              className="pictureOptions__avatar"
              src={avatarPreview}
              alt="avatar"
              width={96}
              height={96}
            />
            <label className="btn btn__outlined" htmlFor="pictureFile">
              Upload Picture
            </label>
            <input
              type="file"
              id="pictureFile"
              name="avatar"
              style={{ display: "none" }}
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
            />
            <button
              className="btn btn__ghost"
              type="button"
              onClick={() => {
                setAvatarPreview("/default_avatar.avif")
                // setAvatarFile(null)
              }}
            >
              Remove
            </button>
          </div>

          <div className="modal__card__inputs">
            {/* Name */}
            <div>
              <label htmlFor="name">First Name</label>
              <input
                className="input"
                type="text"
                id="name"
                name="name"
                placeholder="Johnny"
                maxLength={20}
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                className="input"
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Appleseed"
                maxLength={20}
                required
              />
            </div>

            {/* Income */}
            <div>
              <label htmlFor="income">Income</label>
              <input
                className="input"
                type="number"
                min={10_000}
                max={99_999}
                name="income"
                id="income"
                placeholder="125000"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone">Phone Number</label>
              <input
                className="input"
                type="tel"
                name="phone"
                id="phone"
                placeholder="08012345678"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email">Email</label>
              <input
                className="input"
                type="email"
                name="email"
                id="email"
                placeholder="namv@zoefin.com"
                required
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address">Address</label>
              <input
                className="input"
                type="text"
                name="address"
                id="address"
                placeholder="123 Main Street, London"
                required
              />
            </div>
          </div>
        </form>
        <hr />
        <footer className="modal__card__footer">
          <button type="button" className="btn btn__ghost" onClick={onClose}>
            Go Back
          </button>
          <button
            type="submit"
            form="modal__card__form"
            className="btn btn__primary"
          >
            Save Changes
          </button>
        </footer>
      </article>
    </div>
  )
}

export default Modal
