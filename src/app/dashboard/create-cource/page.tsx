"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useEdgeStore } from "@/lib/edgestore"
import { Loader2, CheckCircle2, UploadCloud } from "lucide-react"

export default function CourseRegistrationForm() {
  const [file, setFile] = useState<File>();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const { edgestore } = useEdgeStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnailUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      // Handle error - no file selected
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          setUploadProgress(progress);
        },
      });

      setFormData(prev => ({ ...prev, thumbnailUrl: res.url }));
      return res.url;
    } catch (error) {
      console.error("Upload failed:", error);
      // Handle error
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // If there's a file to upload but no thumbnailUrl yet
      if (file && !formData.thumbnailUrl) {
        const thumbnailUrl = await handleUpload();
        if (!thumbnailUrl) {
          throw new Error("Failed to upload thumbnail");
        }
      }
      console.log("Form data:", formData);
      console.log("File:", file);

      const response = await fetch("/api/course/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create course");
      }

      // Reset form
      setFormData({
        title: "",
        description: "",
        thumbnailUrl: "",
      });
      setFile(undefined);
      setUploadProgress(0);

      // Optionally redirect to the course page or courses list
      // router.push('/courses')
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create New Course</CardTitle>
          <CardDescription className="text-center">
            Fill in the details below to register your new course
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter course title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Course Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your course in detail"
                value={formData.description}
                onChange={handleChange}
                required
                className="min-h-[120px] w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Course Thumbnail</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full"
                  disabled={isUploading}
                />
                {file && !formData.thumbnailUrl && (
                  <Button
                    type="button"
                    onClick={handleUpload}
                    disabled={isUploading}
                    size="sm"
                    variant="outline"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {uploadProgress}%
                      </>
                    ) : (
                      <>
                        <UploadCloud className="mr-2 h-4 w-4" />
                        Upload
                      </>
                    )}
                  </Button>
                )}
              </div>

              {(formData.thumbnailUrl || file) && (
                <div className="mt-2 rounded-md overflow-hidden border border-gray-200">
                  <img
                    src={formData.thumbnailUrl || URL.createObjectURL(file!)}
                    alt="Course thumbnail preview"
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg?height=160&width=320"
                    }}
                  />
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading || isUploading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Course...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Create Course
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}