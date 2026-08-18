import { useState } from "react";
import Hero from "@/components/Hero";
import FileUpload from "@/components/FileUpload";
import Dashboard from "@/components/Dashboard";
import RealtimeAnalyzer from "@/components/RealtimeAnalyzer";
import { useToast } from "@/hooks/use-toast";
import { analyzeSentimentLocal } from "@/utils/localSentimentAnalyzer";

interface SentimentResult {
  comment: string;
  sentiment: "positive" | "negative" | "neutral";
}

const Index = () => {
  const [results, setResults] = useState<SentimentResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState({ current: 0, total: 0 });
  const [currentAnalysis, setCurrentAnalysis] = useState<SentimentResult | null>(null);
  const { toast } = useToast();

  const handleAnalyzeLocal = async (comments: string[]) => {
    setIsAnalyzing(true);
    setResults([]);
    setAnalysisProgress({ current: 0, total: comments.length });
    
    try {
      toast({
        title: "Starting Local Analysis",
        description: `Analyzing ${comments.length} comments securely in your browser...`,
      });

      const results = await analyzeSentimentLocal(comments, (current, total, result) => {
        setAnalysisProgress({ current, total });
        if (result) {
          setCurrentAnalysis(result);
          setResults(prev => [...prev, result]);
        }
      });

      setCurrentAnalysis(null);
      
      toast({
        title: "Analysis Complete!",
        description: `Successfully analyzed ${results.length} comments locally`,
      });
    } catch (error) {
      console.error("Analysis error:", error);
      const errorMessage = error instanceof Error ? error.message : "There was an error analyzing your data";
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
      setAnalysisProgress({ current: 0, total: 0 });
      setCurrentAnalysis(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <RealtimeAnalyzer />
      <FileUpload
        onAnalyzeLocal={handleAnalyzeLocal}
        isAnalyzing={isAnalyzing}
        analysisProgress={analysisProgress}
      />
      {(results.length > 0 || isAnalyzing) && (
        <Dashboard 
          results={results} 
          onReset={() => {
            setResults([]);
            setAnalysisProgress({ current: 0, total: 0 });
            setCurrentAnalysis(null);
          }}
          isAnalyzing={isAnalyzing}
          currentAnalysis={currentAnalysis}
        />
      )}
    </div>
  );
};

export default Index;
