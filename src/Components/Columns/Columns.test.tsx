import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Columns from './Columns'

const mockColumns = [
  {
    id: '1',
    title: 'To Do',
    cards: [
      { id: '1', title: 'Card 1' },
      { id: '2', title: 'Card 2' }
    ]
  }
]

describe('Columns Component', () => {
  it('renders columns with correct titles', () => {
    render(<Columns columns={mockColumns} />)
    expect(screen.getByText('To Do')).toBeInTheDocument()
  })

  it('renders cards within columns', () => {
    render(<Columns columns={mockColumns} />);
    expect(screen.getByText('Card 1')).toBeInTheDocument();
    expect(screen.getByText('Card 2')).toBeInTheDocument();
  });
});
