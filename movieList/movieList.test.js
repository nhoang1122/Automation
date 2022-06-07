const {Builder, Capabilities, By} = require('selenium-webdriver')

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get('http://127.0.0.1:5501/movieList/index.html')
})

afterAll(async () => {
    await driver.quit()
})

test('delete a movie', async() => {
    
    await driver.findElement(By.xpath('//input')).sendKeys('Back to the Future \n')
    
    await driver.findElement(By.xpath(`//li/button`)).click()
    
    await driver.sleep(2000)

    expect(By.xpath('//ul')).not.toContain('Back to the Future')
})

test('test movie name is checked',async() => {
   
    await driver.findElement(By.xpath('//input')).sendKeys('Back to the future \n')
    
    const movie = await driver.findElement(By.xpath(`//li`))
    
    const displayed =  await movie.isDisplayed()
    
    await driver.findElement(By.xpath(`//li/span`)).click()

    await driver.sleep(3000)

    expect(By.xpath(`//class="checked"`)).toBeTruthy()
})

test('test if message pops after deleting', async()=> {
    await driver.findElement(By.xpath('//input')).sendKeys('Back to the Future \n')
    
    await driver.findElement(By.xpath(`//li/button`)).click()
    
    await driver.sleep(2000)

    expect(By.id('message')).toBeTruthy()
})

