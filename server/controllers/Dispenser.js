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

    await this.Logger(page, req);

    await this.Dispenser3(page, req, res);

    // await this.Dispenser(page);
  };

  /**
   *
   *
   *
   *
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
   */

  /**
   *
   * Dispenser Require : userid - pageid - postUrl - pepoleCount - CommentMessage
   * For Running successfully
   *
   *
   *
   *
   *
   */
  static Dispenser3 = async (page, req, res) => {
    let targetPostURL = req.body.postUrl;
    await page.goto(targetPostURL, {
      waitUntil: "networkidle2",
    });
    await delay(8000);

    let person = [];
    let PepoleInCommints = 30;
    personModel
      .find(
        { page: req.body.pageid },
        { _id: 0, __v: 0, url: 0, public: 0, page: 0 }
      )
      .limit(PepoleInCommints)
      .then((personDataFound) => {
        person = personDataFound.map(getTagName);

        function getTagName(item) {
          var identity = [item.tagName].join(" ");
          return identity;
        }

        function creatTag(item) {
          return " " + "@" + item + "  ";
        }

        person = person.map(creatTag);

        console.log("Data Are Found : ", person.length, " => ", person);
      })
      .catch((err) => {
        return res.status(400).json({
          message: "Unexpected Error",
          error: err,
        });
      });
    //     By4nA   Spinner Class waiting for comint

    await delay(30000);
    var commintCounter;
    let commintMessage = req.body.commentMessage;
    var i = 0;
    var delayTime = req.body.delayTime * 60000; // CPM comment per minite
    for (
      commintCounter = 0;
      commintCounter <= PepoleInCommints;
      commintCounter += 5
    ) {
      const pageHandel = await page.evaluate(() => {
        return !!document.querySelector(".By4nA");
      });

      if (!pageHandel) {
        await delay(1000);
        i++;
        let array = person.slice(commintCounter, commintCounter + 5);

        await page.type(".Ypffh", i + " " + commintMessage + " " + array);

        await delay(2000);
        await page.keyboard.press("Tab");
        await delay(200);
        await page.keyboard.press("Enter");
        console.log(`# ${i} commint inserted ...`);
        await delay(delayTime); // delayTime*1000
      } else {
        if (pageHandel) {
          await delay(10000);
          console.log("waitting for the spinner ...");
        }
      }
    }
    await delay(5000);
  };
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

module.exports = Runner;
