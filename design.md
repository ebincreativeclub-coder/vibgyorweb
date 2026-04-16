Context:
You are an expert frontend developer. I need you to build a highly interactive, layered parallax Hero section for a real estate website. We are using Next.js (App Router), Tailwind CSS, and Framer Motion for scroll animations.

I have four local assets in my public/images folder:

back.webp (The sky/distant background)

cloud.webp (Atmospheric elements)

house.webp (The main subject, transparent background)

smoke.webp (Foreground fog, transparent background)

Goal:
Create a Hero.tsx component that stacks these images using absolute positioning to create a deep, atmospheric 3D parallax effect as the user scrolls.

Architecture & Z-Index Stacking (From Back to Front):
The parent container <section> must be relative, taking up at least 100vh and hiding overflow. Inside, stack the layers exactly in this order:

Layer 1 (z-0): Background

Use <Image src="/images/back.webp" />.

Position: Absolute, inset-0, object-cover.

Animation: Slower scroll speed (moves slightly down as user scrolls down).

Layer 2 (z-10): Giant Background Logo

A massive inline SVG of the word "FIND".

Position: Absolute, centered horizontally, near the bottom of the section. Color should be white with low opacity (e.g., text-white/20).

Animation: Moves up slightly on scroll.

Layer 3 (z-20): Clouds

Two separate div containers, both using <Image src="/images/cloud.webp" />.

Position: Absolute, one offset to the left, one to the right, floating behind the house.

Animation: Drifting slowly horizontally and vertically on scroll.

Layer 4 (z-30): The House

Use <Image src="/images/house.webp" />.

Position: Absolute, bottom-aligned so it anchors the scene, scaling up nicely on larger screens.

Animation: Stays relatively fixed or moves very slightly to create parallax against the background.

Layer 5 (z-40): Content Wrapper

Position: Relative, flex flex-col, centered content, h-full, z-40.

Heading: <h1> "Find What Moves You" (Large, bold, sans-serif, white).

Subheading: <p> "Expert agents. Real guidance. A clear path to find what’s next." (Medium, white/80).

CTA Button: Rounded pill shape, primary brand color, reads "Find Properties" with a right-arrow SVG icon.

Layer 6 (z-50): Foreground Smoke

Use <Image src="/images/smoke.webp" />.

Position: Absolute, anchored to the very bottom, stretching across the full width.

Animation: Moves up over the content and house as the user scrolls down, acting as a transition mask into the next section.

Technical Requirements:

Use Next.js <Image /> components with fill, sizes, and priority where appropriate (especially on house.webp and back.webp).

Ensure the text content remains completely legible across all screen sizes.

Provide the complete code for Hero.tsx. Use Framer Motion's useScroll and useTransform hooks to handle the parallax logic based on the scroll position.