# 🎭 Sentiment Analysis Platform

A comprehensive AI-powered sentiment analysis platform that analyzes emotions from both text data and facial expressions in real-time.

![Sentiment Analysis](https://img.shields.io/badge/AI-Sentiment%20Analysis-blue)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Cloud-3ECF8E?logo=supabase)

## ✨ Features

### 📝 Text Sentiment Analysis
- **File Upload**: Support for CSV and TXT files containing comments
- **Local Processing**: Browser-based AI using Hugging Face Transformers
- **Classification**: Positive, Negative, and Neutral sentiment detection
- **Confidence Scoring**: Comments with <70% confidence marked as Neutral

### 📊 Interactive Dashboard
- **Pie Chart**: Overall sentiment distribution
- **Bar Chart**: Domain-wise sentiment breakdown
- **Word Clouds**: Separate clouds for positive, negative, and neutral sentiments
- **Summary Statistics**: Key findings and insights
- **Real-Time Feed**: Live analysis progress during processing
- **PDF Export**: Download complete reports with visualizations

### 💬 Feedback Collection
- User feedback form with database storage
- Secure data handling with Row Level Security

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Library |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| Vite | Build Tool |
| Framer Motion | Animations |
| Shadcn/UI | Component Library |
| Recharts | Data Visualization |
| Lucide React | Icons |

### Backend & Cloud
| Technology | Purpose |
|------------|---------|
| Vite | Build & Dev Server |
| Browser APIs | Local file processing |

### AI/ML
| Technology | Purpose |
|------------|---------|
| Hugging Face Transformers | Browser-based NLP |

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── Hero.tsx                 # Landing section
│   │   ├── FileUpload.tsx           # CSV/Excel upload handler
│   │   ├── Dashboard.tsx            # Charts & analytics
│   │   ├── RealtimeAnalyzer.tsx     # Live text analysis
│   │   └── ui/                      # Shadcn components
│   ├── utils/
│   │   └── localSentimentAnalyzer.ts # Browser-based NLP
│   ├── integrations/
│   │   └── supabase/                # Legacy client (unused)
│   ├── hooks/                       # Custom React hooks
│   └── pages/
│       └── Index.tsx                # Main page
└── public/                          # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sentiment-analysis-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📖 Usage Guide

### Text Analysis
1. Click "Upload Dataset" on the homepage
2. Select a CSV or TXT file with comments (one per line for TXT)
3. The platform analyzes your data locally in the browser
4. View results in the interactive dashboard
5. Export results as PDF

### Sample CSV Format
```csv
comment,domain
"This product is amazing!",Product
"Terrible customer service",Support
"It's okay, nothing special",General
```

### Sample TXT Format
```
This product is amazing!
Terrible customer service
It's okay, nothing special
```

## 🔒 Security Features

- **Data Privacy**: All processing is done locally in your browser — no data is sent to any server
- **No Backend Required**: Fully client-side, no API keys or cloud services needed

## 📈 Future Enhancements

- [ ] Multi-language support
- [ ] Audio sentiment analysis
- [ ] CRM integration APIs
- [ ] Custom model training

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Hugging Face](https://huggingface.co) - Transformers library
- [Shadcn/UI](https://ui.shadcn.com) - Beautiful components
- [Recharts](https://recharts.org) - Data visualization
- [Framer Motion](https://www.framer.com/motion/) - Animations

---

<p align="center">
  Built with ❤️ by Ashwini Vishal
</p>
