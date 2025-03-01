"use client";

import { useEffect, useState } from "react";

// Типы для данных пользователя Telegram
interface TelegramUser {
	id: number;
	first_name: string;
	last_name?: string;
	username?: string;
	language_code?: string;
	is_premium?: boolean;
	allows_write_to_pm?: boolean;
}

export default function Home() {
	const [user, setUser] = useState<TelegramUser | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		try {
			// Проверяем, что код выполняется на клиенте
			if (typeof window !== "undefined") {
				// Проверяем наличие объекта Telegram.WebApp
				if (!window.Telegram?.WebApp) {
					throw new Error(
						"Telegram Web App API недоступен. Откройте приложение в Telegram."
					);
				}

				const tg = window.Telegram.WebApp;

				// Показываем кнопку "Закрыть" в мини-приложении
				tg.MainButton.show();

				// Получаем информацию о пользователе
				const userData = tg.initDataUnsafe.user as
					| TelegramUser
					| undefined;
				if (userData) {
					setUser(userData);
				} else {
					throw new Error("Данные пользователя недоступны.");
				}

				// Обработчик для кнопки "Закрыть"
				tg.MainButton.onClick(() => {
					tg.close();
				});
			}
		} catch (err) {
			// Обрабатываем ошибку и выводим её в интерфейс
			setError(
				err instanceof Error
					? err.message
					: "Произошла неизвестная ошибка."
			);
		}
	}, []);

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}
		>
			{error ? (
				<div style={{ color: "red" }}>
					<h1>Ошибка:</h1>
					<p>{error}</p>
				</div>
			) : user ? (
				<div>
					<h1>Информация о пользователе:</h1>
					<p>Имя: {user.first_name}</p>
					{user.last_name && <p>Фамилия: {user.last_name}</p>}
					{user.username && <p>Username: @{user.username}</p>}
					<p>ID: {user.id}</p>
				</div>
			) : (
				<p>Загрузка...</p>
			)}
		</div>
	);
}
