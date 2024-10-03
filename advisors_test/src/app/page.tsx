"use client"

import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import Image from "next/image"
import "./index.css"
import { ContactRoundIcon, SearchIcon } from "lucide-react"
import Input from "@/components/Input"

function Home() {
  const navigate = useRouter()
  const [incomeValue, setIncomeValue] = useState("")

  const sendIncome = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!incomeValue) return

    navigate.push(`/advisors?income=${incomeValue}`)
  }

  return (
    <div className="home">
      <Image
        src={"/zoe_logo.svg"}
        alt="Zoe Financial Logo"
        width={140}
        height={60}
      />
      <div className="home__avatar">
        <ContactRoundIcon size={36} strokeWidth={1} />
      </div>
      <div className="home__text">
        <h2 className="home__text--title">Find your company Advisors!</h2>
        <p className="home__text--paragraph">
          Search by income to find your advisors
        </p>
      </div>
      <form className="home__incomeForm" onSubmit={sendIncome}>
        <Input
          label="Current Income"
          name="income"
          type="number"
          value={incomeValue}
          onChange={(e) => setIncomeValue(e.target.value)}
          min="10000.00"
          max="99999.99"
          step="0.01"
          autoComplete="off"
          title="Enter a positive number with 5 characters"
        />
        <button className="btn btn__primary" type="submit">
          Search Now <SearchIcon size={18} />
        </button>
      </form>
    </div>
  )
}
export default Home
