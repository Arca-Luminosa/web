import { render, screen } from '@/test-utils'
import { Footer } from './Footer'
import { mockData } from './data.mock'

describe('<Footer />', () => {
  it('should render', () => {
    render(<Footer {...mockData} />)
    const title = screen.getByRole('heading', { level: 2, name: mockData.title })
    expect(title).toBeInTheDocument()
  })
})
