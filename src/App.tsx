import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { Brain, LineChart, GitCompare, Info, MousePointer, ArrowRight, School, User, BookOpen } from 'lucide-react';
import { embeddingData, categories, categoryColors } from './data/embeddings';

function App() {
  const [activeMethod, setActiveMethod] = useState('tsne');

  const methods = {
    tsne: { 
      name: 't-SNE', 
      description: 't-Distributed Stochastic Neighbor Embedding (t-SNE) is particularly good at preserving local structure, making it excellent for visualization. In our visualization, you can see how it clearly separates different semantic groups while maintaining relationships between similar sentences.',
      insights: [
        "Forms tight, well-defined clusters for each semantic category",
        "Maximizes separation between different topics",
        "Preserves local relationships within each cluster",
        "May exaggerate distances between clusters",
        "Best for identifying distinct groups in the data"
      ]
    },
    pca: { 
      name: 'PCA', 
      description: 'Principal Component Analysis (PCA) is a linear dimensionality reduction technique that preserves global structure and variance. Notice how it maintains the overall spread of the data while potentially keeping semantically similar sentences closer together.',
      insights: [
        "Shows a more gradual transition between categories",
        "Maintains global data structure and variance",
        "Reveals linear relationships between sentences",
        "Categories form a continuous spectrum rather than distinct clusters",
        "Better at preserving distances between all points"
      ]
    },
    umap: { 
      name: 'UMAP', 
      description: 'Uniform Manifold Approximation and Projection (UMAP) balances local and global structure preservation. In our visualization, it shows both the local relationships between similar sentences and the broader semantic structure of the dataset.',
      insights: [
        "Balances local and global structure preservation",
        "Creates semi-distinct clusters while maintaining global relationships",
        "Better preserves the topological structure of the data",
        "Shows both within-category and between-category relationships",
        "Good compromise between t-SNE and PCA"
      ]
    }
  };

  // Create traces for each category
  const uniqueCategories = [...new Set(categories)];
  const traces = uniqueCategories.map(category => {
    const indices = categories.map((cat, i) => cat === category ? i : null).filter(i => i !== null);
    return {
      name: category.charAt(0).toUpperCase() + category.slice(1),
      x: indices.map(i => embeddingData[activeMethod].x[i]),
      y: indices.map(i => embeddingData[activeMethod].y[i]),
      text: indices.map(i => embeddingData.sentences[i]),
      mode: 'markers',
      type: 'scatter',
      marker: { 
        size: 12,
        color: categoryColors[category],
        line: {
          color: 'white',
          width: 1
        }
      },
      hovertemplate: '%{text}<extra></extra>'
    };
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">XAI in LLMs</h1>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center space-x-2 text-gray-600">
              <User className="w-5 h-5" />
              <span>Faraz Jawed</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <BookOpen className="w-5 h-5" />
              <span>AIPI 590 - Explainable AI</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <School className="w-5 h-5" />
              <span>Duke University</span>
            </div>
          </div>
          <p className="mt-4 text-gray-600">Embedding Space Visualization of STS Benchmark Sentences</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Method Selection */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {Object.entries(methods).map(([key, { name }]) => (
            <button
              key={key}
              onClick={() => setActiveMethod(key)}
              className={`p-4 rounded-lg flex items-center justify-center space-x-2 ${
                activeMethod === key
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } transition-colors duration-200`}
            >
              {key === 'tsne' && <LineChart className="w-5 h-5" />}
              {key === 'pca' && <GitCompare className="w-5 h-5" />}
              {key === 'umap' && <Info className="w-5 h-5" />}
              <span>{name}</span>
            </button>
          ))}
        </div>

        {/* Hover Instruction */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 flex items-center space-x-2">
          <MousePointer className="w-5 h-5 text-indigo-600" />
          <p className="text-gray-700">Hover over any point to see the corresponding sentence</p>
        </div>

        {/* Visualization */}
        <div className="bg-white rounded-lg shadow p-6">
          <Plot
            data={traces}
            layout={{
              title: `${methods[activeMethod].name} Visualization of Sentence Embeddings`,
              width: 900,
              height: 600,
              hovermode: 'closest',
              xaxis: { 
                title: 'Dimension 1',
                zeroline: false,
                showgrid: false
              },
              yaxis: { 
                title: 'Dimension 2',
                zeroline: false,
                showgrid: false
              },
              showlegend: true,
              legend: {
                x: 1,
                y: 0.5
              },
              margin: {
                l: 50,
                r: 50,
                t: 50,
                b: 50
              }
            }}
            config={{ 
              responsive: true,
              displayModeBar: true,
              modeBarButtonsToRemove: ['lasso2d', 'select2d']
            }}
          />
        </div>

        {/* Method Description and Insights */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">About {methods[activeMethod].name}</h2>
          <p className="text-gray-700 mb-6">{methods[activeMethod].description}</p>
          
          <h3 className="text-lg font-semibold mb-3">Key Insights</h3>
          <ul className="space-y-2">
            {methods[activeMethod].insights.map((insight, index) => (
              <li key={index} className="flex items-start space-x-2">
                <ArrowRight className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Comparison Section */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Understanding the Differences</h2>
          <div className="prose max-w-none">
            <h3 className="text-lg font-medium mb-3">Method Comparison</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>
                <strong>Local vs Global Structure:</strong>
                <ul className="list-disc pl-5 mt-2">
                  <li>t-SNE excels at preserving local structure, making it ideal for cluster visualization</li>
                  <li>PCA maintains global structure, showing broader patterns and relationships</li>
                  <li>UMAP finds a balance between local and global preservation</li>
                </ul>
              </li>
              <li>
                <strong>Interpretability:</strong>
                <ul className="list-disc pl-5 mt-2">
                  <li>PCA dimensions have direct mathematical interpretations</li>
                  <li>t-SNE and UMAP dimensions are more abstract but better for visualization</li>
                </ul>
              </li>
              <li>
                <strong>Use Cases:</strong>
                <ul className="list-disc pl-5 mt-2">
                  <li>Use t-SNE when looking for distinct clusters or groups</li>
                  <li>Use PCA when linear relationships and variance are important</li>
                  <li>Use UMAP when you need both local and global structure preservation</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        {/* Dataset Information */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Dataset Information</h2>
          <p className="text-gray-700 mb-4">
            This visualization uses a subset of semantically related sentences grouped into five categories: music, food, animals, work, and nature. 
            Each category contains five sentences that are semantically related, allowing us to observe how different dimensionality reduction 
            techniques preserve and represent these semantic relationships.
          </p>
          <div className="prose max-w-none">
            <h3 className="text-lg font-medium mb-2">Observations:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Semantic Clustering:</strong> Notice how sentences with similar meanings are positioned closer together, regardless of the method used.</li>
              <li><strong>Category Separation:</strong> Each method handles category separation differently, from distinct clusters (t-SNE) to gradual transitions (PCA).</li>
              <li><strong>Distance Preservation:</strong> The distance between points represents semantic similarity, with closer points indicating more similar meanings.</li>
              <li><strong>Dimensionality Impact:</strong> Despite reducing from high-dimensional space to 2D, each method maintains important semantic relationships.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;