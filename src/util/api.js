export const satoya_api = async (url, method, param) => {
	const token = localStorage.getItem("token");
	return new Promise(async (resolve, reject) => {
		await fetch(url, {
			method: method,
			cache: "no-cache",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(param),
		})
			.then((response) => response.json())
			.then((data) => {
				resolve(data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};
