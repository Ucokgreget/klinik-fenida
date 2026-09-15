Recreate the "Dreamy Pastel Wash" gradient from 21st.dev (https://21st.dev/community/gradients).

Style: Silk Blend. a smooth, silky linear gradient along `angle` (colours at their `pos`) with a faint film `grain` overlay.
Palette: #DCEBF7 (Haze) @ 0%, #B9D4EC (Sky) @ 33%, #F3D9E4 (Rose) @ 67%, #F7EFE3 (Cream) @ 100%

Ready-to-use CSS (apply to any full-bleed element):
```css
.gradient {
  /* CSS approximation: the oversized-layer soften blur, the bitmap grain texture require canvas. Export an image for the exact result. */
  background-color: #DCEBF7;
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.100'/></svg>"), linear-gradient(150deg, #DCEBF7 0%, #B9D4EC 33%, #F3D9E4 67%, #F7EFE3 100%);
  background-size: 120px 120px, auto;
  background-blend-mode: overlay, normal;
}
```

If you need to rebuild it from scratch instead of pasting the CSS, use these exact parameters:
```json
{
  "mode": "ios",
  "colors": [
    {
      "id": "c951_8711",
      "hex": "#DCEBF7",
      "pos": 0,
      "name": "Haze"
    },
    {
      "id": "c952_44472",
      "hex": "#B9D4EC",
      "pos": 33,
      "name": "Sky"
    },
    {
      "id": "c953_80233",
      "hex": "#F3D9E4",
      "pos": 67,
      "name": "Rose"
    },
    {
      "id": "c954_15994",
      "hex": "#F7EFE3",
      "pos": 100,
      "name": "Cream"
    }
  ],
  "angle": 150,
  "centerX": 50,
  "centerY": 50,
  "scale": 68,
  "softness": 26,
  "wave": 12,
  "distortion": 28,
  "grain": 20,
  "vignette": 0,
  "count": 6,
  "fade": 40,
  "envelope": "ramp",
  "spread": -20,
  "soften": 4,
  "pixelCols": 16,
  "pixelRows": 10,
  "pixelAngle": 45,
  "pixelDither": 50,
  "pixelGap": 0,
  "archBase": 70,
  "archHeight": 50,
  "archWidth": 100,
  "archGlow": 55,
  "archEdge": 30,
  "animated": false,
  "speed": 40,
  "motionAmount": 50,
  "motionReverse": false,
  "seed": 1,
  "backdrop": "#EAF4FC"
}
```