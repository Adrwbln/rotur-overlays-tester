export async function askFile(
	multiple: boolean = false,
	accept: string = "*/*",
): Promise<File[]> {
	const input = document.createElement("input");
	input.type = "file";
	input.multiple = multiple;
	input.accept = accept;

	const promise = new Promise<File[]>((r) => {
		input.addEventListener("change", (ev) => {
			r(Array.from((ev.target as any).files));
		});
	});

	input.click();
	return await promise;
}
