# DiscordDynamicSystemStatus-DDSS-
# 📊 Discord System Status Tracker
อัปเดตสถานะ DiscordStatus ด้วยค่าการใช้งาน CPU และ RAM แบบ Real-time
---------------------------------------------------------------------
# 🧠 อธิบายการทำงาน (How It Works)

    โปรแกรมนี้ทำงานในรูปแบบ Background Service โดยมีกระบวนการดังนี้:
    System Data Fetching: ใช้ Library systeminformation เพื่อเข้าถึง Kernel ของระบบปฏิบัติการ และดึงค่าการทำงานของ Hardware แบบ Real-time
    Data Processing: นำค่าที่ได้มาคำนวณเป็นเปอร์เซ็นต์ (%) โดยปัดเศษทศนิยมออกเพื่อให้ข้อความสั้นและอ่านง่ายบน Discord
    API Patching: ส่ง HTTP Request แบบ PATCH ไปยัง Endpoint ของ Discord API (/users/@me/settings) โดยใช้ Authorization Token ของผู้ใช้เป็นกุญแจยืนยันตัวตน
    Looping: โปรแกรมจะทำงานซ้ำตามระยะเวลาที่ตั้งไว้ใน interval_ms เพื่อให้สถานะอัปเดตอยู่เสมอโดยไม่กินทรัพยากรเครื่อง

---------------------------------------------------------------------
# ⚠️ คำเตือนสำคัญ (Critical Warnings)
 [!IMPORTANT]
    โปรดอ่านก่อนใช้งาน เพื่อความปลอดภัยของบัญชีของคุณ

    Self-Bot Policy:การใช้โปรแกรมนี้ถือเป็น "Self-bot" ซึ่งขัดต่อDiscord's Terms of Service (ToS) มีความเสี่ยงที่บัญชีอาจถูกระงับ(Ban)ได้หากระบบตรวจพบการทำงานที่ผิดปกติ

    Rate Limiting:ห้ามตั้งค่าinterval_ms ต่ำกว่า5000ms(5 วินาที) เพราะการส่งRequestถี่เกินไปจะทำให้คุณโดนDiscord บล็อกการเชื่อมต่อ(IP Block)หรือโดนแบนได้

    Token Security:ไฟล์config.json คือความลับสูงสุด ห้ามอัปโหลดขึ้น GitHub หรือส่งให้ผู้อื่น หาก Token หลุด ให้รีบเปลี่ยนรหัสผ่านDiscordทันทีเพื่อสร้างTokenใหม่

    Process Management:หากต้องการหยุดโปรแกรมให้กด Ctrl + C ในหน้าConsoleเท่านั้นหากปิดหน้าต่างไปโดยไม่หยุดโปรแกรม มันอาจยังค้างอยู่ในระบบ(Check Task Manager)
    
---------------------------------------------------------------------
# 📥 ขั้นตอนการติดตั้ง (Installation)

1. ติดตั้ง Node.js ที่รองรับ (แนะนำ Version 18.x หรือสูงกว่า)

2. คลอนหรือดาวน์โหลดโปรเจกต์:

```
git clone https://github.com/ikaosudlor/DiscordDynamicSystemStatus-DDSS-.git

cd discord-system-status

npm install systeminformation node-fetch@2

node index.js 
```
---------------------------------------------------------------------

# ⚙️ การตั้งค่าก่อนเริ่มรัน (Configuration)
ก่อนจะใช้คำสั่ง node index.js อย่าลืมเตรียมไฟล์ config.json ให้เรียบร้อย:

JSON
{
  "token": "--ใส่_TOKEN_ของคุณตรงนี้--",
  "interval_ms": 15000 
}
💡 คำแนะนำ: > - ในขั้นตอนการคัดลอก Token จาก Browser ให้หาจาก Header ที่ชื่อ authorization:

นำชุดตัวอักษรยาวๆ มาวางในช่อง token โดยต้องอยู่ในเครื่องหมายคำพูด " " เท่านั้น
---------------------------------------------------------------------
# 🔍 วิธีการหา Discord Token
> **⚠️ สำคัญ:** Token คือรหัสผ่านชุดที่สอง **ห้ามส่งให้ใครเด็ดขาด!**

1. **เข้าสู่ระบบ:** เปิด Discord ใน Browser [discord.com/app](https://discord.com/app)
2. **เปิด DevTools:** กด `F12` หรือ `Ctrl + Shift + I`
3. **ไปที่ Network:** - เลือกแถบ **Network** ด้านบน 
   - ในช่อง Filter พิมพ์ `/api/v9/users/@me` 
   - กด `F5` เพื่อรีเฟรชหน้าเว็บ
4. **การคัดลอกและใช้งาน:**
   - คลิกรายการชื่อ `@me` 
   - ดูที่หัวข้อ **Headers** > เลื่อนหา `authorization:`
   - *คัดลอกชุดตัวอักษรยาวๆ ด้านหลังมาใส่ในไฟล์ `config.json` ในช่อง `"token": "ใส่ตรงนี้"`*
---------------------------------------------------------------------
# รูปตัวอย่างการทำงาน
<br>
<p align="center">
<img width="511" height="480" alt="image" src="https://github.com/user-attachments/assets/f2ec46f3-d1e5-4e50-a20f-f0a91ef4d438" />
</p>
<br>
<p align="center">
<img width="687" height="231" alt="image" src="https://github.com/user-attachments/assets/9f13be00-5da9-4e47-ac0b-6d29ced2e910" />
</p>
<br>

---------------------------------------------------------------------
             *โปรแกรมนี้สร้างขึ้นเพื่อการศึกษาเท่านั้น*
---------------------------------------------------------------------
# ⚖️ Disclaimer
This project is for educational purposes only. Using self-bots can violate Discord's Terms of Service. Use it at your own risk. The developer is not responsible for any banned accounts or leaked tokens.
