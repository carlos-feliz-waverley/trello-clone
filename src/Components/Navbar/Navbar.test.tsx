import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from './Navbar'

describe('Navbar Component', () => {
  it('renders brand title correctly', () => {
    render(<Navbar />)
    expect(screen.getByText('Trello Clone')).toBeInTheDocument()
  })

  it('renders add column button when onAddColumn is provided', () => {
    const onAddColumn = vi.fn()
    render(<Navbar onAddColumn={onAddColumn} />)
    expect(screen.getByText('Add Column')).toBeInTheDocument()
  })

  it('calls onAddColumn when add column button is clicked', () => {
    const onAddColumn = vi.fn()
    render(<Navbar onAddColumn={onAddColumn} />)
    fireEvent.click(screen.getByText('Add Column'))
    expect(onAddColumn).toHaveBeenCalled()
  })

  it('does not render add column button when onAddColumn is not provided', () => {
    render(<Navbar />)
    expect(screen.queryByText('Add Column')).not.toBeInTheDocument()
  })
})
