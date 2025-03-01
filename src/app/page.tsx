"use client";

import { useUserStore } from "@/store/user-store";
import { UserQr } from "@/components/UserQr";
import { useEffect, useState } from "react";

export default function Home() {
	const { setUser } = useUserStore();
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// Проверяем, что код выполняется на клиенте
		if (typeof window !== "undefined") {
			// Проверяем наличие объекта Telegram.WebApp
			const tg = window.Telegram?.WebApp;
			if (!tg) {
				setError(
					"Telegram Web App API недоступен. Откройте приложение в Telegram."
				);
				return;
			}

			// Инициализируем Telegram Web App
			tg.ready();

			// Получаем информацию о пользователе
			const tgUser = tg.initDataUnsafe?.user;

			if (tgUser) {
				const { id, username, photo_url } = tgUser;
				setUser({
					id: id.toString(),
					username: username!,
					imgUrl: photo_url || null,
				});
				setError(null); // Очистка ошибки, если пользователь успешно установлен
			} else {
				setError("Данные пользователя недоступны.");
			}
		}
	}, [setUser]);

	console.log(error);

	return (
		<div className="h-full px-4 py-6">
			{/* Отображаем ошибку, если она есть */}
			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
					<p>{error}</p>
				</div>
			)}

			{/* Основной контент страницы */}
			<p>Тут типа акции или компании</p>

			{/* Компонент QR-кода */}
			<div className="fixed bottom-4 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
				<UserQr />
			</div>
		</div>
	);
}
