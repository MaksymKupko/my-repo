import axios from "axios";

export default axios.create({
	baseURL: "https://api.unsplash.com",
	headers: {
		Authorization: "Client-ID xoJjO-lm4vYe-qFbfV3rvphhEqfKhjaPCrt3apKBBJc",
	},
})