# 3D Models Directory

Place your GLTF/GLB character models here.

## Recommended Models

Here are some free sources where you can download character models:

1. **Sketchfab** (https://sketchfab.com)
   - Free game-ready characters
   - Search for "free character gltf"
   - Download in GLTF format

2. **Mixamo** (https://www.mixamo.com)
   - Free rigged characters with animations
   - Export as FBX, then convert to GLTF

3. **TurboSquid Free Models** (https://www.turbosquid.com)
   - Search for "free character"
   - Many available in GLTF format

4. **Poly Haven** (https://polyhaven.com/models)
   - CC0 licensed models
   - Various formats including GLTF

## Usage

Once you download a model:

1. Place the `.glb` or `.gltf` file in this directory
2. Update the `modelPath` prop in `PlayerCharacter.jsx`
3. Set `useModel={true}` to enable the model

## Example

```jsx
<PlayerCharacter 
  position={[0, 0, 0]}
  rotation={[0, 0, 0]}
  useModel={true}
  modelPath="/models/your-character.glb"
/>
```

## File Format

- **GLB** (recommended): Binary format, single file
- **GLTF**: JSON format, may require additional texture files

## Notes

- Models should be reasonably sized (under 5MB for web performance)
- Low-poly models work best for real-time rendering
- The component will automatically fallback to procedural character if model fails to load

