import { render, screen, fireEvent } from "@testing-library/react"
import Modal from "@/components/Modal"
import "@testing-library/jest-dom"
import { advisorData } from "@/_mock_/AdvisorData.mock"

describe("Edit Advisor Flow", () => {
  const mockOnClose = jest.fn()
  const mockAction = jest.fn()

  it("should display the advisor's information in the modal", () => {
    render(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        action={mockAction}
        advisorData={advisorData}
      />
    )

    expect(screen.getByLabelText(/First name/i)).toHaveValue("John")
    expect(screen.getByLabelText(/Last name/i)).toHaveValue("Doe")
    expect(screen.getByLabelText(/Income/i)).toHaveValue(50000)
    expect(screen.getByLabelText(/Phone Number/i)).toHaveValue("123-456-7890")
    expect(screen.getByLabelText(/Email/i)).toHaveValue("john.doe@example.com")
    expect(screen.getByLabelText(/Address/i)).toHaveValue("123 Main St, City")
  })

  it("should allow the user to edit and submit the advisor's information", () => {
    render(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        action={mockAction}
        advisorData={advisorData}
      />
    )

    fireEvent.change(screen.getByLabelText(/First name/i), {
      target: { value: "Michael" },
    })
    fireEvent.change(screen.getByLabelText(/Last name/i), {
      target: { value: "Smith" },
    })
    fireEvent.change(screen.getByLabelText(/Income/i), {
      target: { value: 60000 },
    })
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: "555-555-5555" },
    })
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "michael.smith@example.com" },
    })

    fireEvent.click(screen.getByRole("button", { name: /save changes/i }))

    // Assert that the submission is called with updated data
    expect(mockAction).toHaveBeenCalled()
    expect(mockAction).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.anything(),
        preventDefault: expect.any(Function),
      })
    )

    // For doublecheck, assertign specific field changes were passed to the form handler
    const formData = new FormData(
      screen.getByTestId("modal__card__form") as HTMLFormElement
    )
    expect(formData.get("name")).toBe("Michael")
    expect(formData.get("lastName")).toBe("Smith")
    expect(formData.get("income")).toBe("60000")
    expect(formData.get("phone")).toBe("555-555-5555")
    expect(formData.get("email")).toBe("michael.smith@example.com")
  })
})
