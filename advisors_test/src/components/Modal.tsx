import { useState } from "react"
import Image from "next/image"
import { FormEvent } from "react"
import { Advisor } from "@/lib/types"
import Input from "@/components/Input"
import { UploadIcon } from "lucide-react"

function Modal({
  isOpen,
  onClose,
  action,
  advisorData,
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

  const advisorFirstName = advisorData?.name.split(" ")[0]
  const advisorLastName = advisorData?.name.split(" ")[1]

  return (
    <div className={`modal ${isOpen && "modal--open"}`}>
      <article className="modal__card">
        <header className="modal__card__header">
          <h3>
            {advisorData ? `Edit Advisor Information` : "Add New Advisor "}
          </h3>
        </header>
        <form
          id="modal__card__form"
          onSubmit={handleSubmit}
          className="modal__card__form"
          data-testid="modal__card__form"
        >
          {/* Picture options */}
          <div className="modal__card__pictureOptions">
            <Image
              className="pictureOptions__avatar"
              src={advisorData?.avatar || avatarPreview}
              alt="avatar"
              width={96}
              height={96}
            />
            <label className="btn btn__outlined" htmlFor="pictureFile">
              <UploadIcon size={16} />
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
            <Input
              label="First name"
              type="text"
              name="name"
              placeholder="Michael"
              maxLength={20}
              defaultValue={advisorFirstName}
            />

            {/* Last Name */}
            <Input
              type="text"
              label="Last Name"
              name="lastName"
              placeholder="Miller"
              maxLength={20}
              defaultValue={advisorLastName}
            />

            {/* Income */}
            <Input
              label="Income"
              type="number"
              min={10_000}
              max={99_999}
              name="income"
              placeholder="125000"
              defaultValue={advisorData?.income}
            />

            {/* Phone Number */}
            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              placeholder="801-923-4567"
              defaultValue={advisorData?.phone}
            />

            {/* Email */}
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="namv@zoefin.com"
              defaultValue={advisorData?.email}
            />

            {/* Address */}
            <Input
              label="Address"
              type="text"
              name="address"
              placeholder="123 Main Street, London"
              defaultValue={advisorData?.address}
              spellCheck={false}
            />
          </div>
        </form>
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
