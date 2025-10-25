'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Algo deu errado!
              </h2>
              <p className="text-gray-600 mb-6">
                Ocorreu um erro inesperado. Por favor, tente novamente.
              </p>
              <button
                onClick={() => reset()}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}