import { render, screen } from '@/test-utils'
import { Header } from './Header'
import { mockData } from './data.mock'

describe('<Header />', () => {
  it('should render', () => {
    render(<Header {...mockData} />)
    const logo = screen.getByAltText(mockData.logoAltText)
    expect(logo).toBeInTheDocument()
  })
})
