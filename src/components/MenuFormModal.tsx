"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Define the interface for a single menu item
interface MenuItem {
  id: string;
  nombre: string;
  detalles?: string;
  precio: number;
  image: string | null;
  // These are not part of the final object but needed for the form
  category: string;
  subCategory: string;
}

interface MenuFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: MenuItem) => void;
  itemToEdit: MenuItem | null;
}

export default function MenuFormModal({
  isOpen,
  onClose,
  onSave,
  itemToEdit,
}: MenuFormModalProps) {
  const [item, setItem] = useState<MenuItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (itemToEdit) {
      setItem(itemToEdit);
    } else {
      // Default structure for a new item
      setItem({
        id: `item-${Date.now()}`,
        nombre: "",
        detalles: "",
        precio: 0,
        image: null,
        category: "",
        subCategory: "",
      });
    }
  }, [itemToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (item) {
      setItem({
        ...item,
        [name]: name === "precio" ? Number.parseFloat(value) : value,
      });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !item) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/images/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Image upload failed");
      }

      const data = await res.json();
      setItem({ ...item, image: data.secure_url });
      toast({
        title: "Éxito",
        description: "Imagen subida exitosamente.",
      });
    } catch (error: unknown) {
      console.error(error);
      toast({
        title: "Error",
        description: `Error al subir la imagen: ${(error as Error).message}`,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (item) {
      onSave(item);
    }
  };

  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{itemToEdit ? "Edit" : "Add"} Menu Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nombre" className="text-right">
              Name
            </Label>
            <Input
              id="nombre"
              name="nombre"
              value={item.nombre}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="detalles" className="text-right">
              Details
            </Label>
            <Textarea
              id="detalles"
              name="detalles"
              value={item.detalles}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="precio" className="text-right">
              Price
            </Label>
            <Input
              id="precio"
              name="precio"
              type="number"
              value={item.precio}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Input
              id="category"
              name="category"
              value={item.category}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subCategory" className="text-right">
              Sub-Category
            </Label>
            <Input
              id="subCategory"
              name="subCategory"
              value={item.subCategory}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image
            </Label>
            <div className="col-span-3">
              <Input
                id="image"
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
              />
              {isUploading && (
                <p className="text-sm text-gray-500">Uploading...</p>
              )}
              {item.image && (
                <img
                  src={item.image}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded-md mt-2"
                />
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUploading}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
