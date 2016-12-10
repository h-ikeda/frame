---
---

  # Create a shape
  shape = seen.Shapes.tetrahedron()

  # Create scene and add shape to model
  scene = new seen.Scene
    model    : seen.Models.default().add(shape)
    viewport : seen.Viewports.center(400, 400)

  # Create render context from canvas
  context = seen.Context('model', scene)

  # Render it!
  context.render()