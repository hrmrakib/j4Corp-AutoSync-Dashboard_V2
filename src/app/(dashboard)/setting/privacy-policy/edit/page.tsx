/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  useGetContentBySlugQuery,
  useUpdateContentBySlugMutation,
} from "@/redux/features/setting/settingAPI";

export default function EditPrivacyPolicyPage() {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const [content, setContent] = useState<string>("");
  const router = useRouter();

  const { data: termsData, isLoading } = useGetContentBySlugQuery("privacy-policy");
  const terms = termsData?.data;
  const description = Array.isArray(terms) ? terms[0]?.description : terms?.description;

  const [updateContentBySlugMutation, { isLoading: isSaving }] =
    useUpdateContentBySlugMutation();

  useEffect(() => {
    let initialized = false;

    const init = async () => {
      if (initialized || quillRef.current) return;
      initialized = true;

      const Quill = (await import("quill")).default;

      if (editorRef.current && !editorRef.current.querySelector(".ql-editor")) {
        const quill = new Quill(editorRef.current, {
          theme: "snow",
          placeholder: "Enter your Privacy Policy...",
        });

        quillRef.current = quill;

        if (description) {
          quill.root.innerHTML = description;
          setContent(description);
        }

        quill.on("text-change", () => {
          setContent(quill.root.innerHTML);
        });
      }
    };

    if (typeof window !== "undefined") {
      init();
    }

    return () => {
      initialized = true;
    };
  }, [terms]);

  if (isLoading && !terms && !quillRef.current) return <div className="flex items-center justify-center min-h-[50vh] text-lg text-primary">Loading...</div>;

  const handleSubmit = async () => {
    if (!content || content === "<p><br></p>") {
      toast.error("Description cannot be empty");
      return;
    }

    try {
      const res = await updateContentBySlugMutation({
        slug: "privacy-policy",
        data: {
          title: "Privacy Policy",
          description: content,
        },
      }).unwrap();

      if (res) {
        toast.success("Privacy Policy updated successfully!");
        router.push("/setting/privacy-policy");
      }
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Failed to update Privacy Policy",
      );
    }
  };

  return (
    <div className='min-h-[75vh] w-[96%] mx-auto flex flex-col justify-between gap-6'>
      <div className='space-y-6'>
        <div className='h-auto'>
          <div
            ref={editorRef}
            className='h-[50vh] bg-white text-base text-primary'
            id='quill-editor'
          />
        </div>
      </div>

      <div className='flex justify-end'>
        <Button
          onClick={handleSubmit}
          disabled={isSaving}
          className='bg-primary hover:bg-teal-700'
        >
          {isSaving ? "Saving..." : "Save Content"}
        </Button>
      </div>
    </div>
  );
}
