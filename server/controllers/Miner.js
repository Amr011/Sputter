const puppeteer = require('puppeteer')
const delay = require('delay')

const userModel = require('../models/userModel')
const personModel = require('../models/personModel')
const pageModel = require('../models/pageModel')

class Runner {
  static Lancher = async (req, res) => {
    const browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-breakpad',
        '--disable-component-extensions-with-background-pages',
        '--disable-dev-shm-usage',
        '--disable-extensions',
        '--disable-features=TranslateUI,BlinkGenPropertyTrees',
        '--disable-ipc-flooding-protection',
        '--disable-renderer-backgrounding',
        '--enable-features=NetworkService,NetworkServiceInProcess',
        '--force-color-profile=srgb',
        '--hide-scrollbars',
        '--metrics-recording-only',
        '--mute-audio',
        '--no-sandbox',
        '--remote-debugging-port=9223',
      ],
      headless: false,
    })

    const page = await browser.newPage()
    page.setRequestInterception(true)

    page.on('request', async (request) => {
      if (request.resourceType() === 'image') {
        request.abort()
      } else {
        request.continue()
      }
    })
    await this.Logger(page, req)

    await this.Miner(page, req)

    // await this.Dispenser(page);
  }

  /**
   *
   *
   *
   * Miner Require : userid - pageid - pepoleCount
   * For Running successfully
   *
   *
   *
   */

  static Logger = async (page, req, res) => {
    try {
      let url = 'https://www.instagram.com/accounts/login/'

      await page.goto(url, {
        waitUntil: 'networkidle2',
      })
      console.log('getting logging in page')
      await delay(5000)

      let userNameData = await userModel.findOne({ _id: req.body.userid }).select('username')

      let userPasswordData = await userModel.findOne({ _id: req.body.userid }).select('password')

      console.log(`# logging with
       username : ${userNameData.username}
       password : ${userPasswordData.password}      
      `)
      // email

      await page.waitForSelector("[name='username']")
      await page.type("[name='username']", userNameData.username)

      await delay(5000)

      // password

      await page.keyboard.down('Tab')
      await page.keyboard.type(userPasswordData.password)

      await delay(5000)

      await page.evaluate(() => {
        const btns = [...document.querySelector('.HmktE').querySelectorAll('button')]
        btns.forEach(function (btn) {
          if (btn.innerText === 'Log In') {
            btn.click()
          }
        })
      })

      await delay(15000)
    } catch {
      return res.status(400).json({
        message: 'Unexpected Error',
      })
    }
  }

  /**
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   */
  static Miner = async (page, req) => {
    let pageData = await pageModel.findOne({ _id: req.body.pageid }).select('tagName')
    console.log(pageData.tagName)

    await page.goto(`https://www.instagram.com/${pageData.tagName}/`, {
      waitUntil: 'networkidle2',
    })

    await delay(7000)

    await page.keyboard.down('Tab')
    await delay(1000)
    await page.keyboard.down('Tab')
    await delay(1000)
    await page.keyboard.down('Tab')
    await delay(1000)
    await page.keyboard.down('Tab')
    await delay(1000)
    await page.keyboard.down('Tab')
    await delay(1000)
    await page.keyboard.down('Tab')

    await delay(1000)
    await page.keyboard.down('NumpadEnter')

    await delay(10000)

    let scroll = 10000000
    let followersCounter
    let pepole = req.body.pepoleCount
    for (var i = 0; i <= scroll; i++) {
      if (i < 7) {
        await delay(100)
        await page.mouse.click(400, 357)
      }
      const pageHandel = await page.evaluate(() => {
        return !!document.querySelector('.PZuss')
      })
      if (pageHandel) {
        await page.keyboard.press('PageDown')
        await delay(200)

        followersCounter = (await page.$$('.FPmhX')).length
        console.log('Counting : ', followersCounter)

        if (followersCounter >= pepole) {
          break
        }
      } else {
        if (!pageHandel) {
          await delay(2000)
        }
      }
    }

    await delay(4000)
    const accountsElements = await page.$$('.FPmhX')
    let accountsData = []
    for (let i = 1; i <= pepole; i++) {
      await delay(50)
      let accountName = await (await accountsElements[i].getProperty('innerText')).jsonValue()
      accountsData.push(accountName)
      let person = new personModel({
        tagName: accountName,
        url: `https://www.instagram.com/${accountName}`,
        page: req.body.pageid,
      })
      await person.save()
      console.log(`${accountName} Saved Successfully`)
    }
    console.log('Done :) ...')
  }
}
/**
 *
 *
 *
 *
 *
 *
 *
 */

module.exports = Runner
