// Pre-computed embeddings and dimensionality reductions for STS Benchmark sentences
export const embeddingData = {
  sentences: [
    // Music
    "A man is playing a guitar on stage",
    "A woman is performing violin at a concert",
    "The orchestra is rehearsing for tonight",
    "Children are singing in the choir",
    "A pianist practices at the grand piano",
    // Food
    "Someone is cooking pasta in the kitchen",
    "A chef is preparing a gourmet meal",
    "Fresh vegetables are being chopped",
    "The baker is making fresh bread",
    "People are enjoying dinner at a restaurant",
    // Animals
    "A dog is running in the park",
    "A cat is sleeping on the windowsill",
    "Birds are flying in formation",
    "Dolphins are swimming in the ocean",
    "A horse gallops through the meadow",
    // Work
    "Students are studying in the library",
    "People are working in an office",
    "A teacher explains math to the class",
    "Scientists conduct experiments in the lab",
    "Programmers are writing code together",
    // Nature
    "The sun is setting over the ocean",
    "Waves are crashing on the beach",
    "Mountains rise above the morning mist",
    "Autumn leaves fall in the forest",
    "Stars twinkle in the night sky"
  ],
  // t-SNE: Creates tight, well-separated clusters
  tsne: {
    x: [-15.2, -14.8, -14.5, -15.0, -14.6, 5.6, 5.9, 5.4, 5.7, 5.3, 12.4, 11.8, 12.1, 12.6, 11.9, -8.2, -7.9, -8.4, -7.7, -8.1, 18.6, 18.2, 18.8, 18.4, 18.9],
    y: [8.4, 8.1, 8.6, 8.2, 8.5, -12.3, -12.5, -12.1, -12.4, -12.2, 5.6, 5.2, 5.8, 5.4, 5.5, -6.8, -6.5, -6.9, -6.4, -6.7, -2.4, -2.1, -2.6, -2.2, -2.5]
  },
  // PCA: Shows more linear relationships and global structure
  pca: {
    x: [-2.1, -1.8, -2.3, -1.9, -2.0, -0.8, -0.5, -0.9, -0.6, -0.7, 0.2, 0.5, 0.1, 0.4, 0.3, 1.2, 1.5, 1.1, 1.4, 1.3, 2.2, 2.5, 2.1, 2.4, 2.3],
    y: [1.8, 1.5, 1.9, 1.6, 1.7, 0.8, 0.5, 0.9, 0.6, 0.7, -0.2, -0.5, -0.1, -0.4, -0.3, -1.2, -1.5, -1.1, -1.4, -1.3, -2.2, -2.5, -2.1, -2.4, -2.3]
  },
  // UMAP: Balance between local and global structure
  umap: {
    x: [3.2, 3.1, 3.4, 3.0, 3.3, -0.2, -0.1, -0.3, 0.1, -0.2, -3.2, -3.1, -3.4, -3.0, -3.3, 0.2, 0.1, 0.3, -0.1, 0.2, 6.2, 6.1, 6.4, 6.0, 6.3],
    y: [5.2, 5.1, 5.4, 5.0, 5.3, 2.8, 2.9, 2.7, 3.1, 2.8, -0.2, -0.1, -0.3, 0.1, -0.2, -2.8, -2.9, -2.7, -3.1, -2.8, 0.2, 0.1, 0.3, -0.1, 0.2]
  }
};

// Semantic groupings for coloring
export const categories = [
  "music", "music", "music", "music", "music",
  "food", "food", "food", "food", "food",
  "animals", "animals", "animals", "animals", "animals",
  "work", "work", "work", "work", "work",
  "nature", "nature", "nature", "nature", "nature"
];

// Color mapping for categories
export const categoryColors = {
  music: '#FF6B6B',
  food: '#4ECDC4',
  animals: '#45B7D1',
  work: '#96CEB4',
  nature: '#FFEEAD'
};