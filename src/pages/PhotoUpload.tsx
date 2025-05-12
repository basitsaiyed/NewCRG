
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarDays, Upload, Tags, FileImage } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { uploadImage } from "@/lib/cloudinary";


const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  date: z.string({ required_error: "A date is required" }),
  meetingType: z.string({ required_error: "Please select a meeting type" }),
  tags: z.string().optional(),
  description: z.string().optional(),
  photos: z.instanceof(FileList).refine(files => files.length > 0, {
    message: "Please select at least one photo.",
  }),
  thumbnail: z.instanceof(FileList).optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Mock implementation of uploadImage function
// const uploadImage = async (file: File) => {
//   // Simulate an API call to upload the image
//   return new Promise<{ secure_url: string }>((resolve) => {
//     setTimeout(() => {
//       resolve({ secure_url: URL.createObjectURL(file) });
//     }, 1000);
//   });
// };

const PhotoUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([]);
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      date: new Date().toISOString().split("T")[0],
      meetingType: "",
      tags: "",
      description: "",
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Clear previous previews
    setPhotoPreviewUrls([]);

    // Create new previews
    const newPreviews: string[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          newPreviews.push(e.target.result as string);
          setPhotoPreviewUrls([...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setThumbnailPreviewUrl(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setThumbnailPreviewUrl(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: FormValues) => {
    setUploading(true);

    try {
      // Upload photos
      const photoUploads = Array.from(data.photos).map(async (file) => {
        return await uploadImage(file);
      });
      const photoResults = await Promise.all(photoUploads);
      const photoUrls = photoResults.map(photo => photo.secure_url);

      // Upload thumbnail
      let thumbnailUrl = '';
      if (data.thumbnail?.[0]) {
        const thumbnailResult = await uploadImage(data.thumbnail[0]);
        thumbnailUrl = thumbnailResult.secure_url;
      }

      // Missing API call to save data
      const response = await fetch('/.netlify/functions/saveGallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: data.title,
          date: data.date,
          meetingType: data.meetingType,
          tags: data.tags ? data.tags.split(',') : [],
          description: data.description,
          photos: photoUrls,
          thumbnail: thumbnailUrl || photoUrls[0]
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save event data');
      }

      toast.success("Upload successful!");
      form.reset();
      setPhotoPreviewUrls([]);
      setThumbnailPreviewUrl(null);

    } catch (error) {
      console.error("Upload error:", error);
      toast.error(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50/30">
      <Navigation />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="pt-28 pb-20"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Upload Photos</h1>
            <p className="text-lg text-gray-600">
              Share your Toastmasters meeting moments with our community
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Weekly Meeting Discussion" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                              <Input
                                type="date"
                                className="pl-10"
                                id="date-input"
                                {...field}
                              />
                              <label
                                htmlFor="date-input"  // Associate label with input
                                className="absolute left-3 top-1/2 -translate-y-1/2"
                              >
                              <CalendarDays className="h-4 w-4 text-gray-500" />
                              </label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="meetingType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meeting Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select meeting type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="regular">Regular Meeting</SelectItem>
                              <SelectItem value="special">Special Event</SelectItem>
                              <SelectItem value="workshop">Workshop</SelectItem>
                              <SelectItem value="contest">Speech Contest</SelectItem>
                              <SelectItem value="social">Social Gathering</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <div className="relative">
                          <Input
                            className="pl-10"  // Add padding to prevent overlap
                            id="tags-input"    // Add ID for label association
                            placeholder="e.g. table-topics, leadership, evaluation (comma separated)"
                            {...field}
                          />
                          <label
                            htmlFor="tags-input"  // Associate label with input
                            className="absolute left-3 top-1/2 -translate-y-1/2"
                          >
                            <Tags className="h-4 w-4 text-gray-500" />
                          </label>
                        </div>
                        </FormControl>
                        <FormDescription>
                          Add relevant tags separated by commas
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide a brief description of this event or photos"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="photos"
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>Photos</FormLabel>
                        <FormControl>
                          <div className="flex flex-col space-y-4">
                            <div className="flex items-center justify-center w-full">
                              <label
                                htmlFor="photo-upload"
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                              >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <Upload className="w-8 h-8 mb-2 text-gray-500" />
                                  <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">Click to upload photos</span> or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    PNG, JPG or WEBP (MAX. 10MB each)
                                  </p>
                                </div>
                                <input
                                  id="photo-upload"
                                  type="file"
                                  className="hidden"
                                  multiple
                                  accept="image/png,image/jpeg,image/webp"
                                  onChange={(e) => {
                                    onChange(e.target.files);
                                    handlePhotoChange(e);
                                  }}
                                  {...field}
                                />
                              </label>
                            </div>

                            {photoPreviewUrls.length > 0 && (
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                                {photoPreviewUrls.map((url, index) => (
                                  <div key={index} className="relative aspect-square rounded-md overflow-hidden bg-gray-100">
                                    <img
                                      src={url}
                                      alt={`Preview ${index + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormDescription>
                          You can upload multiple photos at once
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>Thumbnail (Optional)</FormLabel>
                        <FormControl>
                          <div className="flex flex-col space-y-4">
                            <div className="flex items-center justify-center w-full">
                              <label
                                htmlFor="thumbnail-upload"
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                              >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <FileImage className="w-8 h-8 mb-2 text-gray-500" />
                                  <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">Select a thumbnail</span> for this event
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    This will be the main image shown in galleries
                                  </p>
                                </div>
                                <input
                                  id="thumbnail-upload"
                                  type="file"
                                  className="hidden"
                                  accept="image/png,image/jpeg,image/webp"
                                  onChange={(e) => {
                                    onChange(e.target.files);
                                    handleThumbnailChange(e);
                                  }}
                                  {...field}
                                />
                              </label>
                            </div>

                            {thumbnailPreviewUrl && (
                              <div className="relative w-32 h-32 rounded-md overflow-hidden bg-gray-100">
                                <img
                                  src={thumbnailPreviewUrl}
                                  alt="Thumbnail preview"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormDescription>
                          If not provided, the first photo will be used as the thumbnail
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={uploading}
                    >
                      {uploading ? "Uploading..." : "Upload Photos"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default PhotoUpload;
