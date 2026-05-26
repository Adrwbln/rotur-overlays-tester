import type { VNode } from "preact";
import { AVATARS_URL } from "../ts/consts";

export default function Avatar({
	name,
	overlay,
	size,
	children,
}: {
	name?: string;
	overlay?: string;
	size: string | number;
	children?: VNode;
}) {
	return (
		<div class="avatar" style={`width:${size};height:${size};`}>
			{overlay && (
				<img
					class="avatar-overlay"
					src={overlay}
					style={`width: var(--overlay-size);height:var(--overlay-size);`}
				/>
			)}

			{name && (
				<img
					style={`width:${size};height:${size};`}
					class="avatar-image"
					src={AVATARS_URL + name}
				/>
			)}

			{children}
		</div>
	);
}
