"use client";

import { CheckCircle, ImageUp, Replace, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

interface ImageDropzoneProps {
    value: File | null;
    onChange: (file: File | null) => void;
    accept?: string;
    maxSizeMB?: number;
    error?: string;
}

export function ImageDropzone({ value, onChange, accept = "image/*", maxSizeMB = 1, error }: ImageDropzoneProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFile = useCallback(
        (file: File | null) => {
            if (!file) return;
            if (file.size > maxSizeMB * 1024 * 1024) {
                alert(`File too large. Max ${maxSizeMB}MB.`);
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => setPreview(e.target?.result as string);
            reader.readAsDataURL(file);
            onChange(file);
        },
        [maxSizeMB, onChange],
    );

    const clearFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreview(null);
        onChange(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files[0];
            if (file?.type.startsWith("image/")) handleFile(file);
        },
        [handleFile],
    );

    return (
        <div className="space-y-2">
            <div
                onClick={() => !preview && inputRef.current?.click()}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`relative w-full rounded-xl border-2 border-dashed transition-all duration-200 overflow-hidden
                    ${preview ? "border-border cursor-default" : "cursor-pointer hover:border-primary/40 hover:bg-primary/5"}
                    ${isDragging ? "border-primary bg-primary/5" : "border-border bg-muted/30"}
                `}
            >
                <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={(e) => handleFile(e.target.files?.[0] ?? null)} />

                {preview ? (
                    <div className="group relative">
                        <Image src={preview} alt="Preview" width={800} height={400} className="w-full h-52 object-cover" />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    inputRef.current?.click();
                                }}
                                className="flex items-center gap-1.5 bg-white text-foreground text-xs font-medium px-3 py-2 rounded-lg hover:bg-white/90 transition-colors"
                            >
                                <Replace className="w-3.5 h-3.5" />
                                Change
                            </button>
                            <button type="button" onClick={clearFile} className="flex items-center gap-1.5 bg-white text-destructive text-xs font-medium px-3 py-2 rounded-lg hover:bg-white/90 transition-colors">
                                <Trash2 className="w-3.5 h-3.5" />
                                Remove
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-3 py-10">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isDragging ? "bg-primary/10" : "bg-muted"}`}>
                            <ImageUp className={`w-6 h-6 transition-colors ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium text-muted-foreground">{isDragging ? "Drop to upload" : "Click or drag & drop"}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">JPG, PNG, JPEG — max {maxSizeMB}MB</p>
                        </div>
                    </div>
                )}
            </div>

            {/* File meta */}
            {value && preview && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate flex-1">{value.name}</span>
                    <span className="shrink-0">{(value.size / 1024).toFixed(1)} KB</span>
                    <button type="button" onClick={clearFile} className="hover:text-destructive transition-colors">
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            )}

            {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
    );
}
