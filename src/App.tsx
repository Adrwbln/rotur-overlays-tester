import { useEffect, useState } from "preact/hooks";
import Avatar from "./lib/Avatar";
import { AVATARS_URL, fetchOverlays, OVERLAYS_URL } from "./ts/consts";
import { Plus } from "lucide-preact";
import { askFile } from "./ts/util";

export default function App() {
	const [overlays, setOverlays] = useState<string[]>([]);
	const [username, setUsername] = useState<string>("");
	const [currentOverlay, setCurrentOverlay] = useState<string>("");

	useEffect(() => {
		if (overlays.length <= 0) fetchOverlays().then((o) => setOverlays(o));
	}, []);

	return (
		<main>
			<div style="display:flex;flex-direction:column;gap:2rem;">
				<Avatar
					size="15rem"
					name={username || ".default"}
					overlay={
						currentOverlay
							? currentOverlay
							: username
								? AVATARS_URL + ".overlay/" + username
								: undefined
					}
				/>

				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(ev) => {
						if (!(ev.target as any).value) return;
						setUsername((ev.target as any).value);
					}}
				/>
			</div>
			<div class="overlay-grid">
				<div class="clickable" onClick={() => setCurrentOverlay("")}>
					<Avatar size="5rem" name={username || ".default"} />
				</div>

				{overlays.map((overlay) => (
					<div
						class="clickable"
						onClick={() =>
							setCurrentOverlay(OVERLAYS_URL + overlay + ".gif")
						}
					>
						<Avatar
							size="5rem"
							name={username || ".default"}
							overlay={OVERLAYS_URL + overlay + ".gif"}
						/>
					</div>
				))}

				<div
					class="clickable"
					onClick={async () => {
						const file = (await askFile())[0];
						if (!file) return;

						const url = URL.createObjectURL(file);
						setCurrentOverlay(url);
					}}
				>
					<Avatar size="5rem">
						<div class="center">
							<Plus />
						</div>
					</Avatar>
				</div>
			</div>
		</main>
	);
}
