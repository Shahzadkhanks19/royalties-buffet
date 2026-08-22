import GalleryItem from "../models/GalleryItem.js";
import MenuItem from "../models/MenuItem.js";
import { galleryItems } from "../../src/data/galleryItems.js";
import { menuItems } from "../../src/data/menuItems.js";

export async function seedCmsContent() {
  const [menuCount, galleryCount] = await Promise.all([
    MenuItem.estimatedDocumentCount(),
    GalleryItem.estimatedDocumentCount(),
  ]);

  if (menuCount === 0 && menuItems.length) {
    await MenuItem.insertMany(
      menuItems.map((item, index) => ({ ...item, sortOrder: index, isActive: true })),
      { ordered: true },
    );
    console.log(`[cms] Seeded ${menuItems.length} menu items.`);
  }

  if (galleryCount === 0 && galleryItems.length) {
    await GalleryItem.insertMany(
      galleryItems.map((item, index) => ({ ...item, sortOrder: index, isActive: true })),
      { ordered: true },
    );
    console.log(`[cms] Seeded ${galleryItems.length} gallery items.`);
  }
}
