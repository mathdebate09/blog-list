const loginWith = async (page, username, password)  => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
  }
  
  const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'create new blog' }).click()
    await page.getByTestId('title').fill(title)
    await page.getByTestId('author').fill(author)
    await page.getByTestId('url').fill(url)
    await page.getByRole('button', { name: 'create' }).click()
  }

  const simulateLikes = async (page) => {
    await page.getByRole('button', { name: 'view' }).first().click();
    await page.getByRole('button', { name: 'like' }).first().click();
    await page.getByRole('button', { name: 'like' }).first().click();
    await page.getByRole('button', { name: 'like' }).first().click();
    
    await page.getByRole('button', { name: 'view' }).nth(1).click();
    await page.getByRole('button', { name: 'like' }).nth(1).click();
    await page.getByRole('button', { name: 'like' }).nth(1).click();
    
    await page.getByRole('button', { name: 'view' }).nth(2).click();
    await page.getByRole('button', { name: 'like' }).nth(2).click();
  }
  
  export { loginWith, createBlog, simulateLikes }