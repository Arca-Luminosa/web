import { render, screen } from '@/test-utils'
import { Link } from './Link'
import { mockData } from './data.mock'

describe('<Link />', () => {
  it('should render', () => {
    render(<Link {...mockData} />)
    const link = screen.getByRole('link', { name: mockData.children as string })
    expect(link).toBeInTheDocument()
  })
})
