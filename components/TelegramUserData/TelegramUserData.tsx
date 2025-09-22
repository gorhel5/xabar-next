"use client";

import { useEffect, useState } from "react";

// Определяем интерфейс для данных пользователя
interface UserData {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initDataUnsafe: {
          user?: UserData;
        };
        ready: () => void;
      };
    };
  }
}

export default function TelegramUserData() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Проверяем, доступен ли Telegram WebApp
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp;
      webApp.ready(); // Уведомляем Telegram, что приложение готово

      // Устанавливаем данные пользователя, если они есть
      if (webApp.initDataUnsafe.user) {
        setUserData(webApp.initDataUnsafe.user);
      }
    }
  }, []);

  return (
    <main>
      <h1>User Information</h1>
      {userData ? (
        <ul>
          <li>
            <strong>ID:</strong> {userData.id}
          </li>
          <li>
            <strong>First Name:</strong> {userData.first_name || "N/A"}
          </li>
          <li>
            <strong>Last Name:</strong> {userData.last_name || "N/A"}
          </li>
          <li>
            <strong>Username:</strong> {userData.username || "N/A"}
          </li>
          <li>
            <strong>Language Code:</strong> {userData.language_code || "N/A"}
          </li>
          <li>
            <strong>Is Premium:</strong> {userData.is_premium ? "Yes" : "No"}
          </li>
        </ul>
      ) : (
        <p>Loading user data...</p>
      )}
    </main>
  );
}
