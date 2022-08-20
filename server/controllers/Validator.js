const puppeteer = require("puppeteer");
const delay = require("delay");

const userModel = require("../models/userModel");
const personModel = require("../models/personModel");

class Runner {
  static Lancher = async (req, res) => {
    const browser = await puppeteer.launch({
      executablePath:
        "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--disable-gpu",
        "--disable-background-timer-throttling",
        "--disable-backgrounding-occluded-windows",
        "--disable-breakpad",
        "--disable-component-extensions-with-background-pages",
        "--disable-dev-shm-usage",
        "--disable-extensions",
        "--disable-features=TranslateUI,BlinkGenPropertyTrees",
        "--disable-ipc-flooding-protection",
        "--disable-renderer-backgrounding",
        "--enable-features=NetworkService,NetworkServiceInProcess",
        "--force-color-profile=srgb",
        "--hide-scrollbars",
        "--metrics-recording-only",
        "--mute-audio",
        "--no-sandbox",
        "--remote-debugging-port=9223",
      ],
      headless: false,
    });

    const page = await browser.newPage();
    page.setRequestInterception(true);

    page.on("request", async (request) => {
      if (request.resourceType() === "image") {
        request.abort();
      } else {
        request.continue();
      }
    });

    await this.Logger(page, req, res);

    await this.Validator(page, req, res);

    // await this.Dispenser(page);
  };

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
      let url = "https://www.instagram.com/accounts/login/";

      await page.goto(url, {
        waitUntil: "networkidle2",
      });
      console.log("getting logging in page");
      await delay(5000);

      let userNameData = await userModel
        .findOne({ _id: req.body.userid })
        .select("username");

      let userPasswordData = await userModel
        .findOne({ _id: req.body.userid })
        .select("password");

      console.log(`# logging with
       username : ${userNameData.username}
       password : ${userPasswordData.password}      
      `);
      // email

      await page.waitForSelector("[name='username']");
      await page.type("[name='username']", userNameData.username);

      await delay(5000);

      // password

      await page.keyboard.down("Tab");
      await page.keyboard.type(userPasswordData.password);

      await delay(5000);

      await page.evaluate(() => {
        const btns = [
          ...document.querySelector(".HmktE").querySelectorAll("button"),
        ];
        btns.forEach(function (btn) {
          if (btn.innerText === "Log In") {
            btn.click();
          }
        });
      });

      await delay(15000);
    } catch {
      return res.status(400).json({
        message: "Unexpected Error",
      });
    }
  };

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
  static Validator = async (page, req, res) => {
    var pageFollows = req.body.pageid;
    var PepoleInValidate = 1000;
    let person = [];
    await personModel
      .find(
        {
          page: pageFollows,
        },
        {
          _id: 0,
          __v: 0,
          page: 0,
          url: 0,
          public: 0,
        }
      )
      .limit(PepoleInValidate)

      .then((personDataFound) => {
        function getTagName(item) {
          var identity = [item.tagName].join(" ");
          return identity;
        }
        person = personDataFound.map(getTagName);

        console.log("Data Are Found : ", person.length, " => ", person);
      })
      .catch((err) => {
        return res.status(400).json({
          message: "Unexpected Error",
          error: err,
        });
      });

    await delay(10000);

    var validateCounter;

    for (
      validateCounter = 0;
      validateCounter <= PepoleInValidate;
      validateCounter++
    ) {
      let accountTagName = person[validateCounter];

      await page.goto(`https://www.instagram.com/${accountTagName}`, {
        waitUntil: ["load", "networkidle2"],
      });
      // Handel if private accounts
      const pageHandel = await page.evaluate(() => {
        return !!document.querySelector(".rkEop");
      });
      // Handel error accounts
      const pageHandel2 = await page.evaluate(() => {
        return !!document.querySelector(".error-container");
      });
      // Handel error accounts

      const pageHandel3 = await page.evaluate(() => {
        return !!document.querySelector(".x-6xq");
      });

      if (pageHandel || pageHandel2 || pageHandel3) {
        personModel
          .findOneAndUpdate(
            {
              tagName: accountTagName,
            },
            {
              $set: {
                public: false,
              },
            },
            { upsert: true }
          )
          .then((updatedPerson) => {
            console.log(validateCounter + "- " + accountTagName + " private");
            delay(500);
          })
          .catch((err) => {
            return res.status(400).json({
              message: "Unexpected Error",
              error: err,
            });
          });
      } else {
        personModel
          .findOneAndUpdate(
            {
              tagName: accountTagName,
            },
            {
              $set: {
                public: true,
              },
            },
            { upsert: true }
          )
          .then((updatedPerson) => {
            console.log(validateCounter + "- " + accountTagName + " pubilc");
            delay(500);
          })
          .catch((err) => {
            return res.status(400).json({
              message: "Unexpected Error",
              error: err,
            });
          });
      }
    }
  };
}

module.exports = Runner;
