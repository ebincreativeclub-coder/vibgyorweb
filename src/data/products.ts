export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  images: string[];
  features: string[];
  specifications: { label: string; value: string }[];
  downloads: { name: string; url: string }[];
}

export interface ProductCategory {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  products: Product[];
}

export const productCategories: ProductCategory[] = [
  {
    id: "furniture",
    title: "Furniture",
    slug: "furniture",
    description: "Bespoke furniture solutions crafted with precision. From ergonomic office seating to luxury home interiors.",
    image: "/images/products/chair-1.jpg",
    products: [
      {
        id: "executive-chair-1",
        title: "Executive Chair Mod. A",
        slug: "executive-chair-mod-a",
        description: "Premium ergonomic executive chair with advanced lumbar support and sleek modern design.",
        images: ["/images/products/chair-1.jpg"],
        features: ["Advanced lumbar support", "Breathable mesh", "Tilt mechanism"],
        specifications: [{ label: "Base", value: "Aluminum" }, { label: "Warranty", value: "5 Years" }],
        downloads: []
      },
      {
        id: "executive-chair-2",
        title: "Executive Chair Mod. B",
        slug: "executive-chair-mod-b",
        description: "High-back ergonomic chair tailored for maximum comfort during extended working hours.",
        images: ["/images/products/chair-2.jpg"],
        features: ["High back design", "Adjustable armrests", "Premium upholstery"],
        specifications: [{ label: "Base", value: "Reinforced Nylon" }, { label: "Warranty", value: "3 Years" }],
        downloads: []
      },
      {
        id: "executive-chair-3",
        title: "Executive Chair Mod. C",
        slug: "executive-chair-mod-c",
        description: "Minimalist and highly functional office seating designed for contemporary workspaces.",
        images: ["/images/products/chair-3.jpg"],
        features: ["Minimalist aesthetic", "Synchronized tilt", "Breathable fabric"],
        specifications: [{ label: "Base", value: "Steel" }, { label: "Warranty", value: "3 Years" }],
        downloads: []
      },
      {
        id: "designer-sofa-1",
        title: "Lounge Sofa Classic",
        slug: "lounge-sofa-classic",
        description: "Elegant and timeless sofa design featuring deep seating and premium fabrics.",
        images: ["/images/products/sofa-1.jpg"],
        features: ["Deep seating", "Stain-resistant fabric", "Hardwood frame"],
        specifications: [{ label: "Fill", value: "High-Density Foam" }, { label: "Seats", value: "3-Seater" }],
        downloads: []
      },
      {
        id: "designer-sofa-2",
        title: "Modern Sectional Sofa",
        slug: "modern-sectional-sofa",
        description: "Versatile sectional sofa offering flexible configurations and modern comfort.",
        images: ["/images/products/sofa-2.jpg"],
        features: ["Modular design", "Plush cushioning", "Steel legs"],
        specifications: [{ label: "Configuration", value: "L-Shape" }, { label: "Material", value: "Premium Linen" }],
        downloads: []
      },
      {
        id: "designer-sofa-3",
        title: "Luxury Leather Sofa",
        slug: "luxury-leather-sofa",
        description: "A statement piece wrapped in premium Italian leather for a truly luxurious living space.",
        images: ["/images/products/sofa-3.jpg"],
        features: ["Genuine Italian Leather", "Hand-tufted details", "Kiln-dried frame"],
        specifications: [{ label: "Material", value: "Full-Grain Leather" }, { label: "Color", value: "Cognac" }],
        downloads: []
      },
      {
        id: "master-bed-1",
        title: "Upholstered Master Bed",
        slug: "upholstered-master-bed",
        description: "Luxurious master bed featuring a soft, tailored upholstered headboard.",
        images: ["/images/products/bed-1.jpg"],
        features: ["Tall upholstered headboard", "Solid wood frame", "Orthopedic slat system"],
        specifications: [{ label: "Size", value: "King Size" }, { label: "Fabric", value: "Velvet" }],
        downloads: []
      },
      {
        id: "master-bed-2",
        title: "Contemporary Platform Bed",
        slug: "contemporary-platform-bed",
        description: "Clean lines and a minimalist profile define this contemporary platform bed.",
        images: ["/images/products/bed-2.jpg"],
        features: ["Low profile design", "Integrated nightstands", "Premium wood veneer"],
        specifications: [{ label: "Size", value: "Queen Size" }, { label: "Material", value: "Walnut Veneer" }],
        downloads: []
      },
      {
        id: "luxury-modular-kitchen-1",
        title: "Bespoke Modular Kitchen",
        slug: "bespoke-modular-kitchen",
        description: "State-of-the-art modular kitchen designed for both aesthetics and ultimate culinary functionality.",
        images: ["/images/products/kitchen-1.jpg"],
        features: ["Soft-close cabinetry", "Heat-resistant countertops", "Smart storage solutions"],
        specifications: [{ label: "Finish", value: "Matte Lacquer" }, { label: "Countertop", value: "Quartz" }],
        downloads: []
      }
    ]
  },
  {
    id: "partitioning-system",
    title: "Demountable Partitioning System",
    slug: "demountable-partitioning-system",
    description: "Versatile and sound-insulated partitioning solutions for flexible office layouts.",
    image: "/images/service page/Mask group-6.webp",
    products: [
      {
        id: "acoustic-glass-partition",
        title: "Acoustic Glass Partition System",
        slug: "acoustic-glass-partition",
        description: "Elegant double-glazed partitioning system providing superior acoustic insulation while maintaining transparency.",
        images: ["/images/service page/Mask group-6.webp"],
        features: [
          "Superior sound insulation (up to 48dB)",
          "Minimalist slim-line profiles",
          "Seamless glass-to-glass joints",
          "Integrated door solutions"
        ],
        specifications: [
          { label: "Glass Type", value: "10mm or 12mm Toughened Glass" },
          { label: "Profile Finish", value: "Powder Coated Aluminum" },
          { label: "Acoustic Rating", value: "Rw 45dB - 48dB" }
        ],
        downloads: [
          { name: "Technical Specification Sheet", url: "#" }
        ]
      }
    ]
  },
  {
    id: "raised-floor",
    title: "Raised Floor",
    slug: "raised-floor",
    description: "Advanced access floor systems for efficient cable management and airflow in data centers and offices.",
    image: "/images/service page/Mask group-7.webp",
    products: [
      {
        id: "calcium-sulphate-access-floor",
        title: "Calcium Sulphate Access Floor",
        slug: "calcium-sulphate-access-floor",
        description: "High-density calcium sulphate panels offering exceptional fire resistance and structural stability.",
        images: ["/images/service page/Mask group-7.webp"],
        features: [
          "Class A1 fire rating",
          "High load-bearing capacity",
          "Excellent acoustic properties",
          "Environmentally friendly core"
        ],
        specifications: [
          { label: "Panel Size", value: "600 x 600 mm" },
          { label: "Panel Thickness", value: "30mm / 34mm" },
          { label: "Point Load", value: "3.0 kN to 5.0 kN" }
        ],
        downloads: [
          { name: "Raised Floor Catalog", url: "#" }
        ]
      }
    ]
  }
];
