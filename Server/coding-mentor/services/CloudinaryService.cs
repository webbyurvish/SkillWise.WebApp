using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace coding_mentor.services
{
    public class CloudinaryService : ICloudinaryService
    {
        private readonly Cloudinary _cloudinary;

        public CloudinaryService(IOptions<CloudinarySettings> cloudinaryConfig)
        {
            // Configure the Cloudinary account using the provided options
            var account = new Account(
                cloudinaryConfig.Value.CloudName,
                cloudinaryConfig.Value.ApiKey,
                cloudinaryConfig.Value.ApiSecret);

            // Create a new Cloudinary instance with the configured account
            _cloudinary = new Cloudinary(account);
        }

        // Upload an image to Cloudinary asynchronously
        public async Task<string> UploadImageAsync(IFormFile file, string folder)
        {
            if (file == null || file.Length == 0)
            {
                return null;
            }

            // Set the parameters for the image upload
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, file.OpenReadStream()),
                Folder = folder
            };

            // Upload the image to Cloudinary and await the result
            var uploadResult = await _cloudinary.UploadAsync(uploadParams);

            // Return the secure URL of the uploaded image
            return uploadResult.SecureUrl.ToString();
        }

        // Configuration settings for Cloudinary
        public class CloudinarySettings
        {
            public string CloudName { get; set; }
            public string ApiKey { get; set; }
            public string ApiSecret { get; set; }
        }
    }
}
