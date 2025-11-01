# How to Download and Add a Character Model

## Step 1: Find a Free Model

Visit these sites and search for "free character" or "free robot":
- https://sketchfab.com/3d-models?features=downloadable&q=free+character
- https://www.turbosquid.com/3d-model/free/game-character
- https://www.mixamo.com/ (requires account, but free)

## Step 2: Download

1. Look for models marked as "Free" or "CC0" (public domain)
2. Download in **GLB** or **GLTF** format
3. Save the file in this directory: `frontend/public/models/`

## Step 3: Recommended Models (Free)

### Simple Robot Character
- Sketchfab: Search "free robot character gltf"
- Many low-poly options available

### Game Character
- Sketchfab Model ID: `free-game-character-glad-2bbc08504a6d4514992a1d1c2c1dd7d0`
  - Direct link: https://sketchfab.com/3d-models/free-game-character-glad-2bbc08504a6d4514992a1d1c2c1dd7d0
  - Download as GLB

## Step 4: Update Code

Once downloaded, rename the file to something simple like `character.glb` or `robot.glb`,
then update `PlayerCharacter.jsx` to use:

```jsx
modelPath="/models/character.glb"
useModel={true}
```

## Current Status

The game currently uses a **procedural robot character** (created with Three.js geometries).
It works immediately without any external files!

To switch to a GLTF model:
1. Download a model
2. Place it in this folder
3. Update the component props
