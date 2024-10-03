"use client"

import { API_ROUTES } from "@/lib/routes"
import { Advisor } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, SetStateAction, useEffect, useState } from "react"

function AdvisorsTable() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const queryIncome = searchParams.get("income")
  const queryPage = searchParams.get("page")
  const querySort = searchParams.get("sort")
  const queryOrder = searchParams.get("order")
  const queryLimit = searchParams.get("limit")

  const TableHeadings: { value: keyof Advisor; label: string }[] = [
    {
      value: "name",
      label: "Advisor Name",
    },
    {
      value: "income",
      label: "Income",
    },
  ]

  const [advisors, setAdvisors] = useState<Advisor[]>([])
  const [isDescendingOrder, setIsDescendingOrder] = useState(
    queryOrder === "desc"
  )
  const [sortedColumn, setSortedColumn] = useState<keyof Advisor | null>(
    (querySort as keyof Advisor) || null
  )
  const [quantityOfUsersToBeShown, setQuantityOfUsersToBeShown] = useState(
    Number(queryLimit) || 10
  )
  const [currentPage, setCurrentPage] = useState(Number(queryPage) || 1)

  const totalUsers = advisors?.length || 0
  const totalPages = Math.ceil(totalUsers / quantityOfUsersToBeShown)

  const updateURL = () => {
    const params = new URLSearchParams()
    if (queryIncome) params.set("income", queryIncome)
    params.set("page", currentPage.toString())
    params.set("sort", sortedColumn || "name")
    params.set("order", isDescendingOrder ? "desc" : "asc")
    params.set("limit", quantityOfUsersToBeShown.toString())
    router.replace(`?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    updateURL()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, sortedColumn, isDescendingOrder, quantityOfUsersToBeShown])

  useEffect(() => {
    const getAdvisors = async () => {
      if (!queryIncome) return

      try {
        const response = await fetch(API_ROUTES.ADVISORS)
        const advisorsData: Advisor[] = await response.json()

        const newAdvisors = advisorsData.filter((advisor) => {
          const startingRange = Number(queryIncome) - 10_000
          const maxRange = Number(queryIncome) + 10_000
          return advisor.income >= startingRange && advisor.income <= maxRange
        })
        setAdvisors(newAdvisors)
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message)
        }
      }
    }

    getAdvisors()
  }, [queryIncome])

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const getUsersDisplayed = () => {
    if (!advisors) return []
    const startIndex = (currentPage - 1) * quantityOfUsersToBeShown
    const endIndex = startIndex + quantityOfUsersToBeShown
    return [...advisors].slice(startIndex, endIndex)
  }

  const handleUsersDisplayedChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value
    const amountOfUsersSelected =
      selectedOption === "all" ? totalUsers : Number(selectedOption)

    setQuantityOfUsersToBeShown(amountOfUsersSelected)
    setCurrentPage(1)
  }

  const toggleSortingOrder = () => {
    setIsDescendingOrder(!isDescendingOrder)
  }

  const handleSort = (
    arr: Advisor[],
    key: keyof Advisor,
    setter: (value: SetStateAction<Advisor[]>) => void,
    isAscendingOrder: boolean
  ) => {
    const sortedArray = [...arr].sort((a, b) => {
      if (a[key] > b[key]) {
        return isAscendingOrder ? -1 : 1
      }
      if (a[key] < b[key]) {
        return isAscendingOrder ? 1 : -1
      }
      return 0
    })
    // console.log(arr)
    // console.log(sortedArray)
    setter(sortedArray)
    setSortedColumn(key)
  }

  const goToDetailsPage = (id: number) => {
    router.push(`/advisors/${id}`, { scroll: false })
  }

  return (
    <>
      {advisors.length === 0 ? (
        <h3>No available Advisors based on the provided income.</h3>
      ) : (
        <>
          <div className="table__filter">
            <h1 className="table__results__title">
              {advisors.length} Advisors Found
            </h1>
            <select
              name="displayedUsers"
              className="table__filter__select"
              onChange={handleUsersDisplayedChange}
              value={
                quantityOfUsersToBeShown === totalUsers
                  ? "all"
                  : quantityOfUsersToBeShown
              }
            >
              <option value="5">Show 5</option>
              <option value="10">Show 10</option>
              <option value="all">Show all</option>
            </select>
          </div>
          <table className="table">
            <thead>
              <tr>
                {TableHeadings.map((heading) => (
                  <td className="table__heading" key={heading.value}>
                    <button
                      className="table__heading__wrapper"
                      onClick={() => {
                        handleSort(
                          advisors,
                          heading.value as keyof Advisor,
                          setAdvisors,
                          isDescendingOrder
                        )
                        toggleSortingOrder()
                      }}
                    >
                      <p>{heading.label}</p>
                      {sortedColumn === heading.value ? (
                        isDescendingOrder ? (
                          <ChevronDownIcon className="table__heading__wrapper__icon activeColumn" />
                        ) : (
                          <ChevronUpIcon className="table__heading__wrapper__icon activeColumn" />
                        )
                      ) : (
                        <ChevronUpIcon className="table__heading__wrapper__icon" />
                      )}
                    </button>
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {getUsersDisplayed().map((advisor) => (
                <tr
                  key={advisor.id}
                  className="table__link"
                  onClick={() => goToDetailsPage(advisor.id)}
                >
                  <td>{advisor.name}</td>
                  <td>{formatCurrency(advisor.income)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="table__controls">
            <button
              className="btn btn__ghost"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon />
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn__ghost"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <ChevronRightIcon />
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default AdvisorsTable
