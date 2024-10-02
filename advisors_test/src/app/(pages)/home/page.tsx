'use client'


import {  useRouter } from "next/navigation"
import { FormEvent } from "react"

export default function HomePage() {

    const navigate = useRouter()

    const sendIncome = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const income = e.currentTarget.income.value
        console.log(income)


navigate.push(`/advisors?income=${income}`)    
    }


   return  (<form onSubmit={sendIncome}>
    <label htmlFor="income">Income</label>
    <input type="number" name="income" min={5} maxLength={5} required id="income" />
    <button type="submit">Search</button>
    </form>
   )
}