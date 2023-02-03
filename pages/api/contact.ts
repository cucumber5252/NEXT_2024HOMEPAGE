// import { mailOptions, transporter } from "config/nodemailer";
import nodemailer from "nodemailer";

const email = process.env.NODEMAILER_EMAIL;
const pass = process.env.NODEMAILER_PASSWORD;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: pass,
  },
});

const CONTACT_MESSAGE_FIELDS = {
  name: "이름",
  studentNumber: "학번",
  email: "Email",
  phone: "전화번호",
};

const generateEmailContent = (data: any) => {
  const name = data.name;
  const studentNumber = data.studentNumber;
  const receivedEmail = data.email;
  const phone = data.phone;
  const file = data.file;
  return {
    html: `<!DOCTYPE html>
    <html>
      <head>
        <title></title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
          body,
          a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }
          body {
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
          }
          @media screen and (max-width: 525px) {
            .wrapper {
              width: 100% !important;
              max-width: 100% !important;
            }
            .responsive-table {
              width: 100% !important;
            }
            .padding {
              padding: 10px 5% 15px 5% !important;
            }
            .section-padding {
              padding: 0 15px 50px 15px !important;
            }
          }
          img {
            width: 100%;
          }
          mark {
            background-color: "#F7941E" !important;
            font-weight: 600;
            color: #151515;
          }
          b {
            color: "#F7941E" !important;
          }
          .form-container {
            width: 100%;
            background-color: #151515;
            color: white;
          }
          .content-wrapper {
            width: 80%;
            margin: 0 auto;
            padding: 60px;
          }
          .info {
            display: flex;
            flex-direction: column;
          }
        </style>
      </head>
      <body style="margin: 0 !important; padding: 0 !important; background: #fff">
        <div class="form-container">
          <img
            alt="img"
            src="https://next-recruit.s3.ap-northeast-2.amazonaws.com/assets/mail-main.png"
          />
          <div class="content-wrapper">
            <h2>${name}님, NEXT 11기에 지원해주셔서 감사합니다</h2>
            <p>아래는 제출하신 정보입니다</p>
            <p>이름: ${name}</p>
            <p>학번: ${studentNumber}</p>
            <p>email: ${receivedEmail}</p>
            <p>전화번호: ${phone}</p>
            <p>파일명: ${file}</p>
            <div class="info" style="display: flex; flex-direction: column">
              <h2>11기 지원 안내</h2>
              <br />
              <p>
                <span style="color: #f7941e"
                  >1. 면접 촬영 및 개인정보 수집 안내</span
                >
                <br />
                면접 평가는 모두 대면으로 이뤄집니다. <br />
                공정한 면접 평가를 위해 면접 내용을 촬영 및 수집할 예정입니다.
                <br />
                촬영한 면접영상 및 개인정보는 선발과정에서만 활용되며, 리크루팅 이후
                즉시 폐기될 예정입니다. <br />
                <br />
                <span style="color: #f7941e">2. 학회 보증금 제도 안내</span> <br />
                원활한 학회 운영을 위해 보증금 제도를 운영하고 있습니다.
                <br />
                새로 들어오시는 학회원들은 <b style="color: #f7941e">10만원</b>의
                보증금을 납부하고, 해당 보증금은 학회 운영비용으로만 사용될
                예정입니다.
                <br />
                학회원들은 모든 회계 정산 내용을 구글 드라이브에서 확인하실 수
                있으며 활동이 끝난 후 남은 금액을 1/n 하여 전액 반환해 드립니다.
                <br />
                <br />
                <span style="color: #f7941e">3. 오리엔테이션 필참</span>
                <br />
                최종 합격 이후 <b style="color: #f7941e">3월 5일</b>에 진행되는 OT는
                필수 참여입니다. 원활한 학회 운영을 위해, OT를 고려하여 개인 일정을
                조정해주시면 감사하겠습니다
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
    
    `,
  };
};

const handler = async (req: any, res: any) => {
  if (req.method === "POST") {
    const data = req.body.data;
    console.log("여기임", data);
    const mailOptions = {
      from: email,
      to: data.email,
    };

    if (!data || !data.name || !data.email) {
      return res.status(400).send({ message: "Bad request. 똑바로보내" });
    }

    try {
      await transporter.sendMail({
        ...mailOptions,
        ...generateEmailContent(data),
        subject: `${data.name}님 NEXT 11기에 지원해주셔서 감사합니다`,
      });

      return res.status(200).json({ success: true });
    } catch (err: any) {
      console.log(err);
      return res.status(400).json({ message: `여기틀림, ${err.message}` });
    }
  }
  return res.status(400).json({ message: "Bad request예요" });
};
export default handler;