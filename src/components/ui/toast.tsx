'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  showSuccess: (title: string, message?: string) => void
  showError: (title: string, message?: string) => void
  showInfo: (title: string, message?: string) => void
  showWarning: (title: string, message?: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { ...toast, id }
    
    setToasts(prev => [...prev, newToast])

    // Auto remove after duration
    const duration = toast.duration || 5000
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const showSuccess = useCallback((title: string, message?: string) => {
    addToast({ type: 'success', title, message })
  }, [addToast])

  const showError = useCallback((title: string, message?: string) => {
    addToast({ type: 'error', title, message, duration: 7000 })
  }, [addToast])

  const showInfo = useCallback((title: string, message?: string) => {
    addToast({ type: 'info', title, message })
  }, [addToast])

  const showWarning = useCallback((title: string, message?: string) => {
    addToast({ type: 'warning', title, message })
  }, [addToast])

  return (
    <ToastContext.Provider value={{
      toasts,
      addToast,
      removeToast,
      showSuccess,
      showError,
      showInfo,
      showWarning
    }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}

interface ToastContainerProps {
  toasts: Toast[]
  onRemove: (id: string) => void
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}

interface ToastItemProps {
  toast: Toast
  onRemove: (id: string) => void
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getStyles = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-white border-green-200 shadow-lg'
      case 'error':
        return 'bg-white border-red-200 shadow-lg'
      case 'warning':
        return 'bg-white border-yellow-200 shadow-lg'
      case 'info':
        return 'bg-white border-blue-200 shadow-lg'
    }
  }

  return (
    <div className={`${getStyles()} border rounded-lg p-4 animate-in slide-in-from-right duration-300`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">
            {toast.title}
          </p>
          {toast.message && (
            <p className="mt-1 text-sm text-gray-600">
              {toast.message}
            </p>
          )}
        </div>
        <button
          onClick={() => onRemove(toast.id)}
          className="ml-4 flex-shrink-0 rounded-md p-1.5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <X className="h-4 w-4 text-gray-400" />
        </button>
      </div>
    </div>
  )
}