import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('form calls the event handler it received as props with the right details when a new blog is created', async () => {

    const user = userEvent.setup()
    const createBlog = vi.fn()

    const component = render(
        <BlogForm createBlog={createBlog} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const sendButton = screen.getByText('create')

    screen.debug(component.container)

    await user.type(title, 'Test Title')
    await user.type(author, 'Test Author')
    await user.type(url, 'www.testurl.com')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Test Title')
    expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
    expect(createBlog.mock.calls[0][0].url).toBe('www.testurl.com')
})