"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Loader2, RotateCcw, Save, Upload, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { createClient } from "@/lib/supabase/client";

const RESUME_BUCKET = "resumes";
const RESUME_FILE_NAME = "resume.pdf";
const AVATAR_BUCKET = "avatars";
const AVATAR_FILE_NAME = "profile.jpg";

export function SettingsAdminClient({
  initialSettings,
}: {
  initialSettings: Record<string, string>;
}) {
  const [settings, setSettings] = useState(initialSettings);
  const [isLoading, setIsLoading] = useState(false);
  const [isResumeUploading, setIsResumeUploading] = useState(false);
  const [isProfileUploading, setIsProfileUploading] = useState(false);
  const [resumeUploadError, setResumeUploadError] = useState<string | null>(null);
  const [profileUploadError, setProfileUploadError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const resumeFileRef = useRef<HTMLInputElement>(null);
  const profileFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const supabase = createClient();

    try {
      for (const [key, value] of Object.entries(settings)) {
        await supabase
          .from("site_settings")
          .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
      }
      setMessage("Settings saved successfully!");
      router.refresh();
    } catch {
      setMessage("Failed to save settings.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateSetting = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const saveSingleSetting = async (key: string, value: string) => {
    const supabase = createClient();
    await supabase
      .from("site_settings")
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
    router.refresh();
  };

  const handleResumeUploadClick = () => {
    setResumeUploadError(null);
    resumeFileRef.current?.click();
  };

  const handleProfileUploadClick = () => {
    setProfileUploadError(null);
    profileFileRef.current?.click();
  };

  const handleResumeFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setResumeUploadError("Please select a PDF file.");
      e.target.value = "";
      return;
    }

    setIsResumeUploading(true);
    setResumeUploadError(null);

    const supabase = createClient();

    try {
      const { error } = await supabase.storage
        .from(RESUME_BUCKET)
        .upload(RESUME_FILE_NAME, file, { upsert: true });
      if (error) throw error;

      const { data } = supabase.storage
        .from(RESUME_BUCKET)
        .getPublicUrl(RESUME_FILE_NAME);

      updateSetting("resume_url", data.publicUrl);
      await saveSingleSetting("resume_url", data.publicUrl);
    } catch (err) {
      setResumeUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setIsResumeUploading(false);
      e.target.value = "";
    }
  };

  const handleProfileFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setProfileUploadError("Please select an image file (JPG/PNG).");
      e.target.value = "";
      return;
    }

    setIsProfileUploading(true);
    setProfileUploadError(null);

    const supabase = createClient();

    try {
      const { error } = await supabase.storage
        .from(AVATAR_BUCKET)
        .upload(AVATAR_FILE_NAME, file, { upsert: true });
      if (error) throw error;

      const { data } = supabase.storage
        .from(AVATAR_BUCKET)
        .getPublicUrl(AVATAR_FILE_NAME);

      updateSetting("profile_image_url", data.publicUrl);
      await saveSingleSetting("profile_image_url", data.publicUrl);
    } catch (err) {
      setProfileUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setIsProfileUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-8">Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Profile Photo</CardTitle>
            <CardDescription>Upload a photo used in the header.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              ref={profileFileRef}
              type="file"
              accept="image/*"
              className="hidden"
              aria-hidden
              onChange={handleProfileFileChange}
            />
            <div className="flex items-center gap-4">
              {settings.profile_image_url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={settings.profile_image_url}
                  src="/api/profile-image"
                  alt="Current profile"
                  className="w-24 h-24 rounded-full object-cover border border-border shrink-0"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <div className="flex-1 space-y-2">
                <Label htmlFor="profile_image_url">Profile image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="profile_image_url"
                    type="url"
                    value={settings.profile_image_url || ""}
                    onChange={(e) => updateSetting("profile_image_url", e.target.value)}
                    placeholder="https://... or upload below"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleProfileUploadClick}
                    disabled={isProfileUploading}
                  >
                    {isProfileUploading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </>
                    )}
                  </Button>
                </div>
                {profileUploadError && (
                  <p className="text-xs text-destructive">{profileUploadError}</p>
                )}
              </div>
            </div>
            {settings.profile_image_url && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={async () => {
                  updateSetting("profile_image_url", "");
                  await saveSingleSetting("profile_image_url", "");
                }}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear photo
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Social Links</CardTitle>
            <CardDescription>
              Update your social media and contact links (used in hero section)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="github_url">GitHub URL</Label>
              <Input
                id="github_url"
                type="url"
                value={settings.github_url || ""}
                onChange={(e) => updateSetting("github_url", e.target.value)}
                placeholder="https://github.com/username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin_url">LinkedIn URL</Label>
              <Input
                id="linkedin_url"
                type="url"
                value={settings.linkedin_url || ""}
                onChange={(e) => updateSetting("linkedin_url", e.target.value)}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telegram_url">Telegram URL</Label>
              <Input
                id="telegram_url"
                type="url"
                value={settings.telegram_url || ""}
                onChange={(e) => updateSetting("telegram_url", e.target.value)}
                placeholder="https://t.me/username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input
                id="email"
                type="email"
                value={settings.email || ""}
                onChange={(e) => updateSetting("email", e.target.value)}
                placeholder="your@email.com"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Hero & About</CardTitle>
            <CardDescription>
              Edit hero and about content. Leave empty to use defaults. Switch language to edit each version.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="en" className="w-full">
              <TabsList>
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="om">Afaan Oromo</TabsTrigger>
              </TabsList>
              <TabsContent value="en" className="mt-4 space-y-4">
                <Collapsible defaultOpen>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between px-0">
                      <span className="font-medium">Hero section</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Greeting</Label>
                      <Input
                        value={settings.hero_greeting_en || ""}
                        onChange={(e) => updateSetting("hero_greeting_en", e.target.value)}
                        placeholder="Hi, I'm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input
                        value={settings.hero_name_en || ""}
                        onChange={(e) => updateSetting("hero_name_en", e.target.value)}
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Role</Label>
                      <Input
                        value={settings.hero_role_en || ""}
                        onChange={(e) => updateSetting("hero_role_en", e.target.value)}
                        placeholder="Software Engineer | Full-Stack Developer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Subtitle</Label>
                      <Input
                        value={settings.hero_subtitle_en || ""}
                        onChange={(e) => updateSetting("hero_subtitle_en", e.target.value)}
                        placeholder="Backend & Cloud Focus"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={settings.hero_description_en || ""}
                        onChange={(e) => updateSetting("hero_description_en", e.target.value)}
                        placeholder="Short bio..."
                        rows={4}
                      />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between px-0">
                      <span className="font-medium">About section</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={settings.about_title_en || ""}
                        onChange={(e) => updateSetting("about_title_en", e.target.value)}
                        placeholder="About Me"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={settings.about_description_en || ""}
                        onChange={(e) => updateSetting("about_description_en", e.target.value)}
                        placeholder="About paragraph..."
                        rows={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Education (label)</Label>
                      <Input
                        value={settings.about_education_en || ""}
                        onChange={(e) => updateSetting("about_education_en", e.target.value)}
                        placeholder="Education"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Education (text)</Label>
                      <Textarea
                        value={settings.about_education_text_en || ""}
                        onChange={(e) => updateSetting("about_education_text_en", e.target.value)}
                        placeholder="Software Engineering Student"
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Experience (label)</Label>
                      <Input
                        value={settings.about_experience_en || ""}
                        onChange={(e) => updateSetting("about_experience_en", e.target.value)}
                        placeholder="Experience"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Experience (text)</Label>
                      <Textarea
                        value={settings.about_experience_text_en || ""}
                        onChange={(e) => updateSetting("about_experience_text_en", e.target.value)}
                        placeholder="Full-Stack Development..."
                        rows={5}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Interests (label)</Label>
                      <Input
                        value={settings.about_interests_en || ""}
                        onChange={(e) => updateSetting("about_interests_en", e.target.value)}
                        placeholder="Interests"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Interests (text)</Label>
                      <Textarea
                        value={settings.about_interests_text_en || ""}
                        onChange={(e) => updateSetting("about_interests_text_en", e.target.value)}
                        placeholder="Cloud Computing, System Design..."
                        rows={3}
                      />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </TabsContent>
              <TabsContent value="om" className="mt-4 space-y-4">
                <Collapsible defaultOpen>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between px-0">
                      <span className="font-medium">Hero section</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Greeting</Label>
                      <Input
                        value={settings.hero_greeting_om || ""}
                        onChange={(e) => updateSetting("hero_greeting_om", e.target.value)}
                        placeholder="Akkam, Ani"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input
                        value={settings.hero_name_om || ""}
                        onChange={(e) => updateSetting("hero_name_om", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Role</Label>
                      <Input
                        value={settings.hero_role_om || ""}
                        onChange={(e) => updateSetting("hero_role_om", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Subtitle</Label>
                      <Input
                        value={settings.hero_subtitle_om || ""}
                        onChange={(e) => updateSetting("hero_subtitle_om", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={settings.hero_description_om || ""}
                        onChange={(e) => updateSetting("hero_description_om", e.target.value)}
                        rows={4}
                      />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between px-0">
                      <span className="font-medium">About section</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={settings.about_title_om || ""}
                        onChange={(e) => updateSetting("about_title_om", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={settings.about_description_om || ""}
                        onChange={(e) => updateSetting("about_description_om", e.target.value)}
                        rows={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Education (label)</Label>
                      <Input
                        value={settings.about_education_om || ""}
                        onChange={(e) => updateSetting("about_education_om", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Education (text)</Label>
                      <Textarea
                        value={settings.about_education_text_om || ""}
                        onChange={(e) => updateSetting("about_education_text_om", e.target.value)}
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Experience (label)</Label>
                      <Input
                        value={settings.about_experience_om || ""}
                        onChange={(e) => updateSetting("about_experience_om", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Experience (text)</Label>
                      <Textarea
                        value={settings.about_experience_text_om || ""}
                        onChange={(e) => updateSetting("about_experience_text_om", e.target.value)}
                        rows={5}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Interests (label)</Label>
                      <Input
                        value={settings.about_interests_om || ""}
                        onChange={(e) => updateSetting("about_interests_om", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Interests (text)</Label>
                      <Textarea
                        value={settings.about_interests_text_om || ""}
                        onChange={(e) => updateSetting("about_interests_text_om", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Resume</CardTitle>
            <CardDescription>
              Add a link to your resume/CV for download
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              ref={resumeFileRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              aria-hidden
              onChange={handleResumeFileChange}
            />
            <div className="space-y-2">
              <Label htmlFor="resume_url">Resume URL</Label>
              <div className="flex gap-2">
                <Input
                  id="resume_url"
                  type="url"
                  value={settings.resume_url || ""}
                  onChange={(e) => updateSetting("resume_url", e.target.value)}
                  placeholder="https://example.com/resume.pdf"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResumeUploadClick}
                  disabled={isResumeUploading}
                >
                  {isResumeUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Enter a direct link to your resume PDF
              </p>
              {resumeUploadError && (
                <p className="text-xs text-destructive">{resumeUploadError}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {message && (
          <p
            className={`text-sm ${message.includes("success") ? "text-green-600 dark:text-green-400" : "text-destructive"}`}
          >
            {message}
          </p>
        )}

        <Button type="submit" disabled={isLoading}>
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? "Saving..." : "Save Settings"}
        </Button>
      </form>
    </div>
  );
}
