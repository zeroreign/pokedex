import { render, screen } from '@testing-library/react'
import Home from './page'


describe('App', () => {
  it('renders a heading', () => {
    render(<Home />)
     
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Pokedex');
  })

  it('renders homepage unchanged', () => {
    const { container } = render(<Home />)
    expect(container).toMatchSnapshot()
  })
})