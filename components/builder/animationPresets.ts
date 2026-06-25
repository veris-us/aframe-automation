export const animationPresets = {
  none: {
    hidden: {},
    visible: {},
  },

  fadeUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },

  fadeDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  },

  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },

  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },

  zoom: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },

  scale: {
    hidden: { scale: 0.92 },
    visible: { scale: 1 },
  },

  blur: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
    },
  },
};