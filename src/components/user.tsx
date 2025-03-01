"use client";

import Image from "next/image";

export function User() {
	if (typeof window === "undefined") return null;
	const tg = window.Telegram?.WebApp;
	const user = tg?.initDataUnsafe.user;

	if (!user) return null;

	return (
		<div className="">
			{user.id}
			{user?.first_name}
			<Image
				src={user.photo_url || ""}
				alt="img"
				width={400}
				height={600}
			/>
		</div>
	);
}
