import { Component, ErrorInfo, ReactNode } from "react"
import { Button } from "@/components/ui/button"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center space-y-4">
            <div className="text-6xl">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-800">Something went wrong</h1>
            <p className="text-gray-500 max-w-md">
              An unexpected error occurred. Please refresh the page or try again.
            </p>
            <Button onClick={() => window.location.reload()}>Refresh Page</Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
