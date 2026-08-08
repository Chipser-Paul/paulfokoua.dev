'use client'

export function PrintButton() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <button
      onClick={handlePrint}
      className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
    >
      Download Resume PDF
    </button>
  )
}