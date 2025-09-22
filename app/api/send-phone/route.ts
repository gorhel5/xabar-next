import { NextResponse } from "next/server";
import axios from "axios";

const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const ADMIN_CHAT_ID = process.env.NEXT_PUBLIC_ADMIN_CHAT_ID;

export async function POST(req: Request) {
  try {
    const { phone, userId, username } = await req.json();

    const text = `хуйхуйхуй📱 Новый номер телефона:
- Телефон: ${phone}
- UserID: ${userId || "неизвестно"}
- Username: @${username || "нет"}`;

    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: ADMIN_CHAT_ID,
        text,
        parse_mode: "HTML",
      }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Ошибка при отправке:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
