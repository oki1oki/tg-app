"use client";

export function User() {
	if (typeof window === "undefined") return null;
	const tg = window.Telegram.WebApp;
	const user = tg.initDataUnsafe.user;

	if (!user) return null;

	return (
		<>
			<div className="">{JSON.stringify(tg)}</div>
			<div className="">{JSON.stringify(user)}</div>
		</>
	);
}
