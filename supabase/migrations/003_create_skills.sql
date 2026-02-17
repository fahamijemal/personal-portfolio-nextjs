-- Create skills table
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL CHECK (category IN ('backend', 'frontend', 'cloud', 'database', 'tools')),
  name TEXT NOT NULL,
  level INT NOT NULL CHECK (level >= 0 AND level <= 100) DEFAULT 80,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Skills are viewable by everyone"
  ON public.skills FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert skills"
  ON public.skills FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can update skills"
  ON public.skills FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Only admins can delete skills"
  ON public.skills FOR DELETE
  USING (public.is_admin());

-- Seed with current static data
INSERT INTO public.skills (category, name, level, display_order) VALUES
  ('backend', 'Node.js', 90, 0),
  ('backend', 'Python', 85, 1),
  ('backend', 'Java', 80, 2),
  ('backend', 'Express.js', 90, 3),
  ('backend', 'FastAPI', 80, 4),
  ('frontend', 'React', 85, 0),
  ('frontend', 'Next.js', 90, 1),
  ('frontend', 'TypeScript', 88, 2),
  ('frontend', 'Tailwind CSS', 92, 3),
  ('frontend', 'HTML/CSS', 95, 4),
  ('cloud', 'AWS', 80, 0),
  ('cloud', 'Docker', 85, 1),
  ('cloud', 'Kubernetes', 70, 2),
  ('cloud', 'CI/CD', 82, 3),
  ('cloud', 'Terraform', 65, 4),
  ('database', 'PostgreSQL', 88, 0),
  ('database', 'MongoDB', 82, 1),
  ('database', 'Redis', 78, 2),
  ('database', 'MySQL', 85, 3),
  ('tools', 'Git', 92, 0),
  ('tools', 'Linux', 85, 1),
  ('tools', 'VS Code', 95, 2),
  ('tools', 'Postman', 88, 3);
