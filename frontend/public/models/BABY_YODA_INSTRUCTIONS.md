# Baby Yoda Model Setup

## Model Information
- **Name**: BABY YODA FREE 3D BY OSCAR CREATIVO
- **Sketchfab ID**: fa68b8701e1d446cb0341c9dbc21df14
- **Link**: https://sketchfab.com/3d-models/baby-yoda-free-3d-by-oscar-creativo-fa68b8701e1d446cb0341c9dbc21df14

## Download Instructions

1. **Visit the Sketchfab page**: 
   https://sketchfab.com/3d-models/baby-yoda-free-3d-by-oscar-creativo-fa68b8701e1d446cb0341c9dbc21df14

2. **Download the model**:
   - Click the "Download" button (you may need to sign in)
   - Select **glTF Binary (.glb)** format (recommended - single file)
   - Or select **glTF** format if .glb is not available

3. **Save the file**:
   - Rename it to: `baby-yoda.glb` or `baby-yoda.gltf`
   - Place it in: `frontend/public/models/`
   - Full path: `frontend/public/models/baby-yoda.glb`

## Integration

Once downloaded, the code will automatically use it. The PlayerCharacter component is already configured to:
- Load GLTF models from `/models/`
- Fallback to procedural character if model fails to load
- Scale and position the model appropriately

## Model Scale

You may need to adjust the scale in the code if the model is too large or small. The default scale is `[1, 1, 1]`.

## Attribution

Model by OSCAR CREATIVO on Sketchfab
Make sure to check the license and attribution requirements for this model.

