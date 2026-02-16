-- Helper: check if current user is admin (via profiles table)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND is_admin = true
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ============== PROJECTS ==============
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are viewable by everyone"
  ON public.projects FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert projects"
  ON public.projects FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can update projects"
  ON public.projects FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Only admins can delete projects"
  ON public.projects FOR DELETE
  USING (public.is_admin());

-- ============== BLOG_POSTS ==============
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published posts are viewable by everyone"
  ON public.blog_posts FOR SELECT
  USING (published = true OR public.is_admin());

CREATE POLICY "Only admins can insert blog posts"
  ON public.blog_posts FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can update blog posts"
  ON public.blog_posts FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Only admins can delete blog posts"
  ON public.blog_posts FOR DELETE
  USING (public.is_admin());

-- ============== CERTIFICATES ==============
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Certificates are viewable by everyone"
  ON public.certificates FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert certificates"
  ON public.certificates FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can update certificates"
  ON public.certificates FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Only admins can delete certificates"
  ON public.certificates FOR DELETE
  USING (public.is_admin());

-- ============== CONTACT_MESSAGES ==============
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact messages"
  ON public.contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only admins can view contact messages"
  ON public.contact_messages FOR SELECT
  USING (public.is_admin());

-- No UPDATE or DELETE for contact messages (or add admin-only if needed)
CREATE POLICY "Only admins can update contact messages"
  ON public.contact_messages FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Only admins can delete contact messages"
  ON public.contact_messages FOR DELETE
  USING (public.is_admin());

-- ============== SITE_SETTINGS ==============
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site settings are viewable by everyone"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert site settings"
  ON public.site_settings FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can update site settings"
  ON public.site_settings FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Only admins can delete site settings"
  ON public.site_settings FOR DELETE
  USING (public.is_admin());
