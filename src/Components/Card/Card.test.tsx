import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Card from './Card'

describe('Card Component', () => {
  it('renders title correctly', () => {
    render(<Card title="Test Card" />)
    expect(screen.getByText('Test Card')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(<Card title="Test Card" description="Test description" />)
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })
})
