# React Portfolio Template

A modern, responsive portfolio template for software engineers, featuring beautiful animations and elegant design.

## Preview

This portfolio template includes:
- Animated Aurora background
- Modern navigation bar
- Professional profile card
- Responsive design that works on all devices
- Animation effects powered by Framer Motion

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

1. Clone this repository
```bash
git clone <repository-url>
```

2. Navigate to the project directory
```bash
cd portfolio-site
```

3. Install dependencies
```bash
npm install
# or
yarn install
```

4. Start the development server
```bash
npm start
# or
yarn start
```

5. Open your browser and visit `http://localhost:3000`

## Customization

### Personal Information

Edit the profile data in the `Hero.tsx` component to show your personal information:

```typescript
// In src/components/Hero.tsx
const profileData = {
  name: "Your Name",
  description: "Your professional description",
  imageSrc: "/profile-image.jpg", // Replace with your profile photo
  stats: {
    years: X, // Years of experience
    projects: Y, // Projects completed
    clients: Z // Clients worked with
  }
};
```

### Profile Photo

Replace the file at `public/profile-image.jpg` with your own profile photo.

### Color Scheme

You can easily change the color scheme by editing the color values in the styled components. The primary color used throughout the template is `#FF5722` (orange).

## Technologies Used

- React
- TypeScript
- Styled Components
- Framer Motion

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by modern portfolio trends
- Aurora background animation based on ReactBits
