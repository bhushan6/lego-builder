# 3D Lego-like Brick Builder Web App

Build and collaborate in real-time on 3D models using rectangular bricks. This multi-user application allows users to create intricate designs in a 3D space using Lego-like bricks.

![App Screenshot](/public/Screenshot.png)

## Features

- **3D Rendering**: Utilizes `three.js` and `react-three-fiber` for efficient and smooth 3D rendering.
- **Real-time Collaboration**: Integrated with `liveblocks` to enable users to collaborate in real-time.
- **Intuitive UI**: Built with `radix ui` to provide a seamless user experience.
- **State Management**: `Zustand` is being used as state management solution.

## Technologies Used

- [React](https://reactjs.org/)
- [three.js](https://threejs.org/)
- [react-three-fiber](https://github.com/pmndrs/react-three-fiber)
- [radix ui](https://www.radix-ui.com/)
- [liveblocks](https://liveblocks.io/)
- [zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Vite](https://vitejs.dev/)

## Live Demo

Experience the app live [here](<[your_live_project_link](https://lego-builder.vercel.app/)>).

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/bhushan6/lego-builder.git
   ```

2. Navigate to the project directory:

   ```bash
   cd lego-builder
   ```

3. Install the dependencies:

   ```bash
   yarn install
   ```

   or

   ```bash
   npm install
   ```

4. Create a .env file in the root directory and add your Liveblocks public API key:

   ```bash
   echo "VITE_LIVEBLOCKS_API_KEY=your_liveblocks_public_api_key" > .env
   ```

   Replace your_liveblocks_public_api_key with your actual Liveblocks public API key.

5. Start the development server:
   ```bash
   yarn dev
   ```
   or
   ```bash
   npm run dev
   ```
6. Open your browser and navigate to http://127.0.0.1:5173/ (or the port you've configured).

## Contribution

Feel free to fork the project, open issues, and submit pull requests. Any contribution is highly appreciated!
