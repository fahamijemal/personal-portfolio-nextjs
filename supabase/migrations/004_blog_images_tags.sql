-- Add image_url and tags to blog_posts
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

-- Create blog-images storage bucket.
-- If this fails (e.g. storage schema not initialized), create the bucket manually
-- in Supabase Dashboard > Storage > New bucket > "blog-images", Public.
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read for blog-images
CREATE POLICY "Blog images are publicly readable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');

-- Admins can upload blog images
CREATE POLICY "Admins can upload blog images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'blog-images' AND public.is_admin());

-- Admins can update/delete blog images
CREATE POLICY "Admins can update blog images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'blog-images' AND public.is_admin());

CREATE POLICY "Admins can delete blog images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'blog-images' AND public.is_admin());
