# 3D Spiky "Virus" — pure Python + matplotlib
# pip install matplotlib numpy  (if you don't have them)

import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d.art3d import Line3DCollection
from matplotlib.animation import FuncAnimation

# ---------- helpers ----------
def fibonacci_sphere(samples=260, seed=7):
    rng = np.random.default_rng(seed)
    pts = []
    phi = np.pi * (3.0 - np.sqrt(5.0))  # golden angle
    for i in range(samples):
        y = 1 - (i / float(samples - 1)) * 2  # 1..-1
        r = np.sqrt(max(0.0, 1 - y*y))
        theta = phi * i
        x = np.cos(theta) * r
        z = np.sin(theta) * r
        pts.append((x, y, z))
    return np.array(pts)

# ---------- figure ----------
plt.rcParams["figure.figsize"] = (8, 8)
fig = plt.figure()
ax = fig.add_subplot(111, projection="3d")
fig.patch.set_facecolor("black")
ax.set_facecolor("black")
ax.axis("off")

# ---------- core geometry ----------
R = 1.6  # sphere radius

# sphere surface (just for glossy body)
u = np.linspace(0, np.pi, 120)
v = np.linspace(0, 2*np.pi, 240)
uu, vv = np.meshgrid(u, v)
x = R * np.sin(uu) * np.cos(vv)
y = R * np.sin(uu) * np.sin(vv)
z = R * np.cos(uu)

# fake lighting by z-intensity
z_norm = (z - z.min()) / (z.max() - z.min())
facecolors = plt.cm.Greens(0.4 + 0.6*z_norm)
ax.plot_surface(x, y, z, rstride=2, cstride=2,
                facecolors=facecolors, linewidth=0, shade=False, antialiased=True)

# spikes
dirs = fibonacci_sphere(260)
segments = []
tips_x, tips_y, tips_z = [], [], []

rng = np.random.default_rng(42)
for dx, dy, dz in dirs:
    d = np.array([dx, dy, dz])
    base = R * d
    spike_len = 0.55 + 0.35 * rng.random()
    tip = (R + spike_len) * d
    segments.append([base, tip])
    tips_x.append(tip[0]); tips_y.append(tip[1]); tips_z.append(tip[2])

# glow (wide, transparent)
glow = Line3DCollection(segments, linewidths=6, colors=(0.2, 1.0, 0.2, 0.08))
ax.add_collection3d(glow)

# main spikes
spikes = Line3DCollection(segments, linewidths=1.6, colors=(0.2, 1.0, 0.2, 0.95))
ax.add_collection3d(spikes)

# protein caps
ax.scatter(tips_x, tips_y, tips_z, s=10, c=[(0.5, 1.0, 0.5)], depthshade=False)

# camera frame (fixed for NumPy 2.0)
max_range = np.array([np.ptp(x), np.ptp(y), np.ptp(z)]).max()
mid = np.array([x.mean(), y.mean(), z.mean()])
ax.set_xlim(mid[0]-max_range/2, mid[0]+max_range/2)
ax.set_ylim(mid[1]-max_range/2, mid[1]+max_range/2)
ax.set_zlim(mid[2]-max_range/2, mid[2]+max_range/2)

# ---------- rotation animation ----------
def update(frame):
    ax.view_init(elev=22, azim=frame % 360)
    return []

ani = FuncAnimation(fig, update, frames=360, interval=25, blit=False)

plt.show()
