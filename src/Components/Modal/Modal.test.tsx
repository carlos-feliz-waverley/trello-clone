import { describe, it, vi, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Modal from './Modal'

describe('Modal Component', () => {
  const onClose = vi.fn()

  it('renders modal when isOpen is true', () => {
    render(
      <Modal 
        isOpen={true} 
        onClose={onClose} 
        title="Test Modal"
      >
        <div>Content</div>
      </Modal>
    )
    expect(screen.getByText('Test Modal')).toBeInTheDocument()
  })

  it('calls onClose when clicking outside modal', () => {
    render(
      <Modal 
        isOpen={true} 
        onClose={onClose} 
        title="Test Modal"
      >
        <div>Content</div>
      </Modal>
    )
    fireEvent.click(screen.getByRole('dialog'))
    expect(onClose).toHaveBeenCalled()
  })

  it('calls onClose when clicking close button', () => {
    render(
      <Modal 
        isOpen={true} 
        onClose={onClose} 
        title="Test Modal"
      >
        <div>Content</div>
      </Modal>
    )
    fireEvent.click(screen.getByText('×'))
    expect(onClose).toHaveBeenCalled()
  })

  it('does not render when isOpen is false', () => {
    render(
      <Modal 
        isOpen={false} 
        onClose={onClose} 
        title="Test Modal"
      >
        <div>Content</div>
      </Modal>
    )
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument()
  })
})
