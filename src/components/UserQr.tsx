"use client";

import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/user-store";
import QRCode from "react-qr-code";
import { QrCode } from "lucide-react";

export const UserQr = () => {
	const user = useUserStore((state) => state.user);

	if (!user) return null;

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size="icon"
					className="h-14 w-14 bg-black text-white rounded-full fixed bottom-6 left-1/2 -translate-x-1/2 "
				>
					<QrCode className="h-6 w-6" />
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Ваш QR-код</DialogTitle>
					<DialogDescription>
						Покажите этот QR-код для начисления или списания баллов
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col items-center justify-center p-6">
					<div className="p-6 rounded-xl shadow-sm">
						<QRCode className="h-48 w-48" value={user.id} />
					</div>
					<div className="mt-4 text-center">
						<div className="font-medium">{user.username}</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
