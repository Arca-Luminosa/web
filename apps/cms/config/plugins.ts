export default ({ env }) => ({
  upload: {
    config: {
      provider: 'strapi-upload-supabase-provider',
      providerOptions: {
        apiUrl: env('SUPABASE_API_URL'),
        apiKey: env('SUPABASE_API_KEY'),
        bucket: env('SUPABASE_BUCKET_NAME'),
        directory: env('SUPABASE_BUCKET_DIRECTORY'),
      }
    },
  },
});
