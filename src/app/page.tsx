"use client";

import { useUserStore } from "@/store/user-store";
import { UserQr } from "@/components/UserQr";

export default function Home() {
	const { setUser } = useUserStore();

	try {
		if (typeof window !== "undefined") {
			const tg = window.Telegram.WebApp;

			if (!tg) {
				throw new Error(
					"Telegram Web App API недоступен. Откройте приложение в Telegram."
				);
			}

			const tgUser = tg.initDataUnsafe?.user;

			if (tgUser) {
				const { id, username, photo_url } = tgUser;
				setUser({
					id: id.toString(),
					username: username!,
					imgUrl: photo_url || null,
				});
			} else {
				throw new Error("Данные пользователя недоступны.");
			}
		}
	} catch (err) {
		console.log((err as Error).message);
	}

	return (
		<div className="h-full px-4 py-6">
			Тут типа акции или компании
			<div className="fixed bottom-4 left-1/2 -translate-y-1/2 -translate-x-1/2">
				<UserQr />
			</div>
		</div>
	);
}
