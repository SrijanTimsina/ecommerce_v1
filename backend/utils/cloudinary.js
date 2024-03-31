const cloudinary = require("cloudinary").v2;

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUpload = async (localFilePath) => {
	try {
		if (!localFilePath) return null;
		const response = await cloudinary.uploader.upload(localFilePath, {
			resource_type: auto,
		});
		return response;
	} catch (error) {
		return null;
	}
};

module.exports = cloudinaryUpload;
