import GalleryItem from "../models/GalleryItem.js";
import Location from "../models/Location.js";
import MenuItem from "../models/MenuItem.js";
import SiteSettings from "../models/SiteSettings.js";
import { galleryItems } from "../../src/data/galleryItems.js";
import { locationItems, defaultSiteSettings } from "../../src/data/locations.js";
import { menuItems } from "../../src/data/menuItems.js";

export async function seedCmsContent() {
  const [menuCount, galleryCount, locationCount, settingsCount] = await Promise.all([
    MenuItem.estimatedDocumentCount(),
    GalleryItem.estimatedDocumentCount(),
    Location.estimatedDocumentCount(),
    SiteSettings.estimatedDocumentCount(),
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

  if (locationCount === 0 && locationItems.length) {
    await Location.insertMany(
      locationItems.map((item, index) => ({ ...item, sortOrder: index, isActive: true })),
      { ordered: true },
    );
    console.log(`[cms] Seeded ${locationItems.length} locations.`);
  }

  if (settingsCount === 0) {
    await SiteSettings.create({ key: "main", ...defaultSiteSettings });
    console.log("[cms] Seeded site settings.");
  }
}
