# 📊 Discord System Status Tracker
อัปเดตสถานะ DiscordStatus ด้วยค่าการใช้งาน CPU และ RAM แบบ Real-time
---------------------------------------------------------------------
🧠 อธิบายการทำงาน (How It Works)

    โปรแกรมนี้ทำงานในรูปแบบ Background Service โดยมีกระบวนการดังนี้:
    System Data Fetching: ใช้ Library systeminformation เพื่อเข้าถึง Kernel ของระบบปฏิบัติการ และดึงค่าการทำงานของ Hardware แบบ Real-time
    Data Processing: นำค่าที่ได้มาคำนวณเป็นเปอร์เซ็นต์ (%) โดยปัดเศษทศนิยมออกเพื่อให้ข้อความสั้นและอ่านง่ายบน Discord
    API Patching: ส่ง HTTP Request แบบ PATCH ไปยัง Endpoint ของ Discord API (/users/@me/settings) โดยใช้ Authorization Token ของผู้ใช้เป็นกุญแจยืนยันตัวตน
    Looping: โปรแกรมจะทำงานซ้ำตามระยะเวลาที่ตั้งไว้ใน interval_ms เพื่อให้สถานะอัปเดตอยู่เสมอโดยไม่กินทรัพยากรเครื่อง

---------------------------------------------------------------------
⚠️ คำเตือนสำคัญ (Critical Warnings)
 [!IMPORTANT]
    โปรดอ่านก่อนใช้งาน เพื่อความปลอดภัยของบัญชีของคุณ

    Self-Bot Policy: การใช้โปรแกรมนี้ถือเป็น "Self-bot" ซึ่งขัดต่อ Discord's Terms of Service (ToS) มีความเสี่ยงที่บัญชีอาจถูกระงับ (Ban) ได้ หากระบบตรวจพบการทำงานที่ผิดปกติ

    Rate Limiting: ห้ามตั้งค่า interval_ms ต่ำกว่า 5000ms (5 วินาที) เพราะการส่ง Request ถี่เกินไปจะทำให้คุณโดน Discord บล็อกการเชื่อมต่อ (IP Block) หรือโดนแบนได้

    Token Security: ไฟล์ config.json คือความลับสูงสุด ห้ามอัปโหลดขึ้น GitHub หรือส่งให้ผู้อื่น หาก Token หลุด ให้รีบเปลี่ยนรหัสผ่าน Discord ทันทีเพื่อสร้าง Token ใหม่

    Process Management: หากต้องการหยุดโปรแกรม ให้กด Ctrl + C ในหน้า Console เท่านั้น หากปิดหน้าต่างไปโดยไม่หยุดโปรแกรม มันอาจยังค้างอยู่ในระบบ (Check Task Manager)
    
---------------------------------------------------------------------
## 🛠️ วิธีใช้งาน (Setup)
1. ติดตั้ง [Node.js](https://nodejs.org/)
2. รันคำสั่ง `npm install` ในโฟลเดอร์
3. เปลี่ยนชื่อไฟล์ `config.json.example` เป็น `config.json` แล้วใส่ Token
4. รันโปรแกรมด้วยคำสั่ง `node index.js`
---------------------------------------------------------------------
## 🔍การหาTokenDiscord
[!WARNING]สำคัญมาก: Discord Token เปรียบเสมือนรหัสผ่านชุดที่สอง ห้ามส่งให้ใครเด็ดขาดหากหลุดไปผู้อื่นสามารถเข้าควบคุมบัญชีของคุณได้ทันที!

1.เข้าสู่ระบบ: เปิด Discord ผ่าน Browser (Chrome/Edge) ที่ discord.com/app
2.เปิดเครื่องมือผู้พัฒนา: กดปุ่ม F12 หรือ Ctrl + Shift + I บนคีย์บอร์ด
3.ไปที่แถบ Network: - คลิกที่แถบ Network ด้านบน
  -ในช่อง Filter ให้พิมพ์คำว่า /api/v9/users/@me
  -กด F5 เพื่อ Refresh หน้าเว็บหนึ่งครั้ง
4.คัดลอก Token:
 -คลิกที่รายการชื่อ @me ที่ปรากฏขึ้นมา
 -ดูที่หัวข้อ Headers ทางด้านขวา
 -เลื่อนหาคำว่า authorization:
 -ก๊อปปี้ตัวอักษรชุดยาวๆ ที่อยู่ข้างหลังนั่นแหละคือ Token ของคุณ
 -การนำไปใช้งาน: นำ Token ที่ได้ไปวางในไฟล์ config.json ในช่อง "token": "ใส่ตรงนี้"
---------------------------------------------------------------------
*โปรแกรมนี้สร้างขึ้นเพื่อการศึกษาเท่านั้น*
---------------------------------------------------------------------
## ⚖️ Disclaimer
This project is for educational purposes only. Using self-bots can violate Discord's Terms of Service. Use it at your own risk. The developer is not responsible for any banned accounts or leaked tokens.