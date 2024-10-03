import { API_ROUTES } from "@/lib/routes"
import { Advisor } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { SetStateAction, useEffect, useState } from "react"

function AdvisorsTable({ income }: { income: string }) {
  const [advisors, setAdvisors] = useState<Advisor[]>([])
  const [isDescendingOrder, setIsDescendingOrder] = useState(false)
  const [sortedColumn, setSortedColumn] = useState<keyof Advisor | null>(null)

  const quantityOfUsersToBeShown = 10
  const [currentPage, setCurrentPage] = useState(1)

  const totalUsers = advisors?.length || 0
  const totalPages = Math.ceil(totalUsers / quantityOfUsersToBeShown)
  const navigate = useRouter()

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

  const toggleSortingOrder = () => {
    setIsDescendingOrder(!isDescendingOrder)
  }

  const goToDetailsPage = (id: number) => {
    navigate.push(`/advisors/${id}`)
  }

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

  useEffect(() => {
    const getAdvisors = async () => {
      try {
        const response = await fetch(API_ROUTES.ADVISORS)
        const advisorsData: Advisor[] = await response.json()

        const newAdvisors = advisorsData.filter((advisor) => {
          const startingRange = Number(income) - 10_000
          const maxRange = Number(income) + 10_000

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
  }, [income])

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

  return (
    <>
      {advisors.length === 0 ? (
        <h3>
          No available Advisors based on the provided income. Please try a
          different income value.
        </h3>
      ) : (
        <>
          <div className="table__filter">
            <h1 className="table__results__title">
              {advisors.length} Advisors Found
            </h1>
            <select name="" id="">
              <option value="">All</option>
              <option value="">Male</option>
              <option value="">Female</option>
            </select>
          </div>
          <table className="table">
            <thead>
              <tr>
                {TableHeadings.map((heading) => {
                  return (
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
                        <strong>{heading.label}</strong>
                        {sortedColumn === heading.value ? (
                          isDescendingOrder ? (
                            <div className="table__heading__wrapper__icon activeColumn">
                              <ChevronDownIcon />
                            </div>
                          ) : (
                            <div className="table__heading__wrapper__icon activeColumn">
                              <ChevronUpIcon />
                            </div>
                          )
                        ) : (
                          <div className="table__heading__wrapper__icon">
                            <ChevronUpIcon />
                          </div>
                        )}
                      </button>
                    </td>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {getUsersDisplayed().map((advisor) => {
                const { id, name, income } = advisor

                return (
                  <tr
                    className="table__link"
                    key={id}
                    onClick={() => goToDetailsPage(id)}
                  >
                    <td>{name}</td>
                    <td>{formatCurrency(income.toFixed(2))}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {/* Table Controls */}
          <div className="table__controls">
            <button
              className="btn btn__ghost"
              disabled={currentPage === 1}
              onClick={handlePrevPage}
            >
              <ChevronLeftIcon />
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn__ghost"
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
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
