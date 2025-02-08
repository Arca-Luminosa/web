import { render, screen } from '@/test-utils'
import { dynamicComponent } from './DynamicComponent'

describe('dynamicComponent', () => {
  it('should render any given tag as a component', () => {
		const Component = dynamicComponent('h1', true)
		const text = 'Text'
    render(<Component>{text}</Component>)
    const title = screen.getByRole('heading', { level: 1, name: text })
    expect(title).toBeInTheDocument()
  });
});
