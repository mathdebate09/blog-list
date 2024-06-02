const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog, simulateLikes } = require('./helper')

describe('Blog App', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Log in to application')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')
      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('wrong credentials')
      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'A book by playwright', 'Monesieur Playwrighty', 'playwright.dev')
      await expect(page.getByText('A book by playwright Monesieur Playwright')).toBeVisible()
      page.getByRole('button', { name: 'view' })
    })

    describe('When blogs exist', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'first blog', 'playwright', 'first.dev')
        await createBlog(page, 'second blog', 'playwright', 'second.dev')
        await createBlog(page, 'third blog', 'playwright', 'third.dev')
      })

      test('a blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).first().click()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('Likes 1')).toBeVisible()
      })

      test('original user can delete it', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).first().click();
        page.once('dialog', dialog => {
          console.log(`Dialog message: ${dialog.message()}`);
          dialog.dismiss().catch(() => { });
        });
        await page.getByRole('button', { name: 'remove' }).click();
        await expect(page.getByText('first blog')).not.toBeVisible()
      })

      test('other users cannot delete the blog', async ({ page, request }) => {
        await request.post('/api/users', {
          data: {
            name: 'test',
            username: 'test',
            password: 'test'
          }
        })
        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'test', 'test')
        await page.getByRole('button', { name: 'view' }).first().click()
        await page.getByRole('button', { name: 'remove' }).click()
        await page.on('dialog', dialog => dialog.accept());
        await expect(page.getByText('first blog')).toBeVisible()
      })

      test('blogs are arranged as per likes', async ({ page }) => {
        await simulateLikes(page)
        const blogs = await page.$$('div[data-testid="blog"]')
        const blogHTMLs = await Promise.all(blogs.map(blog => blog.innerHTML()))
        expect(blogHTMLs[0].includes("first") && blogHTMLs[1].includes("second") && blogHTMLs[2].includes("third"))
      })
    })
  })
})