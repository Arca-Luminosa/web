import { render, screen } from '@/test-utils'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'
import { mockData } from './data.mock'

describe('<Button />', () => {
	const clickHandler = jest.fn()

	beforeEach(() => {
		render(<Button {...mockData} onClick={clickHandler}/>)
	})

  it('should render', () => {
    const button = screen.getByRole('button', { name: mockData.children as string })
    expect(button).toBeInTheDocument()
  })

	it('should call the click handler', async () => {
		const button = screen.getByRole('button', { name: mockData.children as string })
		await userEvent.click(button)
		expect(clickHandler).toHaveBeenCalled()
	})
})
