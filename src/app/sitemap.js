// agri/src/app/sitemap.js
import dbConnect from "../../lib/dbConnect";
import Product from "../../models/product";

export default async function sitemap() {
  let products = [];
  try {
    await dbConnect();
    products = await Product.find({}, { _id: 1, updatedAt: 1 }).lean();
  } catch {
    // Static pages remain available during builds where database secrets are absent.
  }

  const staticPages = [
    { url: "https://www.statzeq.com/", lastModified: new Date() },
    { url: "https://www.statzeq.com/about", lastModified: new Date() },
    { url: "https://www.statzeq.com/shipping", lastModified: new Date() },
    { url: "https://www.statzeq.com/inventory/agriculture", lastModified: new Date() },
    { url: "https://www.statzeq.com/inventory/construction", lastModified: new Date() },
    { url: "https://www.statzeq.com/inventory/attachments", lastModified: new Date() },
  ];

  const productPages = products.map((p) => ({
    url: `https://www.statzeq.com/products/${p._id.toString()}`,
    lastModified: p.updatedAt || new Date(),
  }));

  return [...staticPages, ...productPages];
}
