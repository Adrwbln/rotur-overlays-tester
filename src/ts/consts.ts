export const ROTUR_API = "https://api.rotur.dev/";
export const AVATARS_URL = "https://avatars.rotur.dev/";
export const OVERLAYS_URL = ROTUR_API + "cosmetics/overlays/";

export async function fetchOverlays(): Promise<string[]> {
	const req = await fetch(
		ROTUR_API + "cosmetics/shop?type=overlay&sort=popular",
	);
	if (!req.ok) return [];

	const data = await req.json();
	return data.items.map((i: any) => i.id);
}
