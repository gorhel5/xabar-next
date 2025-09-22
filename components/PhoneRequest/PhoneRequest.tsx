"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface UserData {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
}

export default function PhoneRequest() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [phone, setPhone] = useState("");
  const [lang, setLang] = useState("ru");

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp;
      webApp.ready();

      const user = webApp.initDataUnsafe.user;
      if (user) {
        setUserData(user);
        setLang(user.language_code || "ru");
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone) {
      try {
        await axios.post("/api/send-phone", {
          phone,
          userId: userData?.id,
          username: userData?.username,
        });
        alert("✅ Номер отправлен");
        setPhone("");
      } catch (err) {
        console.error(err);
        alert("❌ Ошибка при отправке");
      }
    }
  };

  const t = {
    ru: {
      title: "Введите номер телефона",
      placeholder: "+998 XX XXX XX XX",
    },
  }[lang] || {
    title: "Enter your phone number",
    placeholder: "+998 XX XXX XX XX",
  };

  return (
    <main className="p-4">
      <h1 className="text-xl mb-4">{t.title}</h1>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t.placeholder}
          className="border p-2 rounded flex-grow"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded ml-2"
        >
          Отправить
        </button>
      </form>
    </main>
  );
}
