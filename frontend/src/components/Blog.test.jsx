import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import '@testing-library/jest-dom'

describe('check visibilty toggle for a blog', () => {
    test('renders only title and author', () => {
        const blog = {
            title: 'Test Title',
            author: 'Test Author',
            url: 'www.testurl.com',
            likes: 22,
            user: {
                name: 'Test User'
            }
        }
    
        render(<Blog blog={blog} />)
        const element = screen.getByText('Test Title Test Author')
    
        screen.debug(element)
    
        expect(element).toBeDefined()
    })
    
    
    test('clicking the view button shows url and likes', async () => {
        const user = userEvent.setup()
        const blog = {
            title: 'Test Title',
            author: 'Test Author',
            url: 'www.testurl.com',
            likes: 5,
            user: {
                name: 'Test User'
            }
        }
    
        const component = render(<Blog blog={blog} />)
    
        const button = component.getByText('view')
        await user.click(button)
    
        expect(component.container).toHaveTextContent('www.testurl.com')
        expect(component.container).toHaveTextContent('likes 5')
    })
})

describe('liking a blog functionality', () => {
    test('clicking the like button twice calls event handler twice', async () => {
        const user = userEvent.setup()
        const blog = {
            title: 'Test Title',
            author: 'Test Author',
            url: 'www.testurl.com',
            likes: 5,
            user: {
                name: 'Test User'
            }
        }
    
        const mockHandler = vi.fn()
    
        const component = render(<Blog blog={blog} handleLikes={mockHandler} />)
    
        const viewButton = component.getByText('view')
        await user.click(viewButton)
    
        const likeButton = component.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)
    
        expect(mockHandler.mock.calls).toHaveLength(2)
        expect(component.container).toHaveTextContent('Test User')
    })
})