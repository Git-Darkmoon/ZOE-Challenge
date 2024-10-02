'use client'

import { ROUTES } from "@/lib/routes"
import { Advisor } from "@/lib/types"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function AdvisorsPage() {

    const searchParams = useSearchParams()
    const income = searchParams.get('income')

    const [advisors,setAdvisors] = useState<Advisor[]>([])
    // const [filteredAdvisors,setFilteredAdvisors] = useState<Advisor[]>([])


    useEffect(() => {

        const getAdvisors = async () => {
            const response = await fetch(ROUTES.ADVISORS)
            const advisorsData:Advisor[] = await response.json()

    const newAdvisors =         advisorsData.filter((advisor) => {
    
                const startingRange = Number(income) - 10_000
                const maxRange = Number(income) + 10_000
                
                return (
                    
                    advisor.income >= startingRange && advisor.income <= maxRange   
                    
                )
            })
            setAdvisors(newAdvisors)


        }

getAdvisors()

},[])



    return (
<>

<div>

<h1>
    Advisors</h1>
    <button type="button">New Advisor</button>
</div>

        <table>
            <thead>
                <tr>
                    <td>Id</td>
                    <td>Id</td>
                    <td>Id</td>
                    <td>Id</td>
                </tr>
            </thead>
<tbody>

        {advisors.map((advisor) => {
            
            const {id,name,income} = advisor


            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{income}</td>
                </tr>    
            )
            
        })}
        </tbody>
        </table>
</>

    )
}