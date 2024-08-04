import * as React from "react"

interface VerifyEmailTemplate {
  capitalizeUserName: string
  otp: string
}

export const VerifyEmailTemplate = ({ capitalizeUserName, otp }: VerifyEmailTemplate) =>
  `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title>Veil Voice</title>
      
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
            rel="stylesheet"
          />
        </head>
        <body
          style="
            margin: 0;
            font-family: 'Poppins', sans-serif;
            background: #ffffff;
            font-size: 14px;
          "
        >
          <div
            style="
              max-width: 680px;
              margin: 0 auto;
              padding: 45px 30px 60px;
              background: #f4f7ff;
              background-image: url(https://cdn.sanity.io/images/hjuptpmq/production/9529fe4275c0d97f4ec7a69bc253463d6c8cafb1-3000x2000.jpg);
              background-repeat: no-repeat;
              background-size: 800px 452px;
              background-position: top center;
              font-size: 14px;
              color: #434343;
            "
          >
            <header>
              <table style="width: 100%">
                <tbody>
                  <tr style="height: 0">
                    <td>
                      <img height="85px" src="https://cdn.sanity.io/images/hjuptpmq/production/3c7e69bd873f69994a0a29c715711fabe39c6e47-100x100.svg" alt="external-assassin-avatar-classes-role-playing-game-game-ui-maxicons-2"/>
                    </td>
                    <td style="text-align: right">
                      <span
                        style="
                          font-size: 32px;
                          line-height: 30px;
                          color: #ffffff;
                          font-family: Times New Roman, serif;
                          font-weight: 600;
                        "
                        >Veil Voice</span
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </header>
      
            <main>
              <div
                style="
                  margin: 0;
                  margin-top: 70px;
                  padding: 92px 30px 115px;
                  background: #ffffff;
                  border-radius: 30px;
                  text-align: center;
                "
              >
                <div style="width: 100%; max-width: 489px; margin: 0 auto">
                  <h1
                    style="
                      margin: 0;
                      font-size: 24px;
                      font-weight: 500;
                      color: #1f1f1f;
                    "
                  >
                    Verification Code
                  </h1>
                  <p
                    style="
                      margin: 0;
                      margin-top: 17px;
                      font-size: 16px;
                      font-weight: 500;
                      color: #45443F"
                    "
                  >
                    Hey ${capitalizeUserName},
                  </p>
                  <p
                    style="
                      margin: 0;
                      margin-top: 17px;
                      font-weight: 500;
                      letter-spacing: 0.56px;
                      color: #45443F"
                    "
                  >
                  Your secret code is here, shrouded in mystery! 🥷
                  <br/>
                  <br/>
                  Use it within the next 10 minutes to unveil your access.
                    <br />
                    If you did not request this verification, please ignore this email or contact our support team immediately.
                    <br />
                  </p>
                  <p
                    style="
                      margin: 0;
                      margin-top: 60px;
                      font-size: 25px;
                      font-weight: 600;
                      letter-spacing: 18.2px;
                      text-align:center;
                      color: #8c8c8c;
                    "
                  >
                    ${otp}
                  </p>
                  <p
                  style="
                  margin: 0;
                  margin-top: 32px;
                  font-size: 19px;
                  font-weight: 500;
                  letter-spacing: 0.56px;
                  color: #499fb6
                "
                  >Happy Veiling!</p>

                </div>
              </div>
      
              <p
                style="
                  max-width: 400px;
                  margin: 0 auto;
                  margin-top: 90px;
                  text-align: center;
                  font-weight: 500;
                  color: #8c8c8c;
                "
              >
              Need a voice behind the veil?
                <br />
                We've got you covered! Reach out at
                <a
                  href="mailto:archisketch@gmail.com"
                  style="color: #499fb6; text-decoration: none"
                  >veilvoice@gmail.com</a
                >
              </p>
            </main>
      
            <footer
              style="
                width: 100%;
                max-width: 490px;
                margin: 20px auto 0;
                text-align: center;
                border-top: 1px solid #e6ebf1;
              "
            >
              <p
                style="
                  margin: 0;
                  margin-top: 40px;
                  font-size: 16px;
                  font-weight: 600;
                  color: #434343;
                "
              >
                VEIL VOICE
              </p>
              <!-- <p style="margin: 0; margin-top: 8px; color: #434343">
                1335, 11th Cross Rd, Stage 3, Indiranagar, Bengaluru, Karnataka 560038
              </p> -->
              <div style="margin: 0; margin-top: 16px">
                <a href="" target="_blank" style="display: inline-block">
                  <img
                    width="36px"
                    alt="Facebook"
                    src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook"
                  />
                </a>
                <a
                  href=""
                  target="_blank"
                  style="display: inline-block; margin-left: 8px"
                >
                  <img
                    width="36px"
                    alt="Instagram"
                    src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram"
                /></a>
                <a
                  href=""
                  target="_blank"
                  style="display: inline-block; margin-left: 8px"
                >
                  <img
                    width="36px"
                    alt="Twitter"
                    src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter"
                  />
                </a>
                <a
                  href=""
                  target="_blank"
                  style="display: inline-block; margin-left: 8px"
                >
                  <img
                    width="36px"
                    alt="Youtube"
                    src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube"
                /></a>
              </div>
              <p style="margin: 0; margin-top: 16px; color: #434343">
                Copyright © 2024 Veil Voice. All rights reserved.
              </p>
            </footer>
          </div>
        </body>
      </html>
      
      `

