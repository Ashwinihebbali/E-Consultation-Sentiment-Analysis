import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onAnalyzeLocal: (comments: string[]) => void;
  isAnalyzing: boolean;
  analysisProgress: { current: number; total: number };
}

const FileUpload = ({ onAnalyzeLocal, isAnalyzing, analysisProgress }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const isValidFile = (file: File) => {
    const validTypes = ["text/csv", "text/plain"];
    const validExtensions = [".csv", ".txt"];
    return validTypes.includes(file.type) || validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && isValidFile(droppedFile)) {
      setFile(droppedFile);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV or TXT file",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (isValidFile(selectedFile)) {
        setFile(selectedFile);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a CSV or TXT file",
          variant: "destructive",
        });
      }
    }
  };

  const parseCSV = async (file: File): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim());
        // Assume first line is header, rest are comments
        const comments = lines.slice(1).map(line => line.trim()).filter(Boolean);
        resolve(comments);
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const parseTXT = async (file: File): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        resolve(lines);
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const handleAnalyze = async () => {
    if (!file) return;

    try {
      let comments: string[] = [];
      const fileName = file.name.toLowerCase();

      if (fileName.endsWith('.csv')) {
        comments = await parseCSV(file);
      } else if (fileName.endsWith('.txt')) {
        comments = await parseTXT(file);
      } else {
        throw new Error("Unsupported file format");
      }

      if (comments.length === 0) {
        toast({
          title: "No data found",
          description: "The file appears to be empty or contains no readable text.",
          variant: "destructive",
        });
        return;
      }

      // Always use local analysis for full data confidentiality
      onAnalyzeLocal(comments);

    } catch (error) {
      toast({
        title: "Error parsing file",
        description: "Could not read the file. Please check the format and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-2 text-center">Upload Your Data</h2>
          <p className="text-center text-muted-foreground mb-8">
            Upload CSV or TXT files. All processing is done locally in your browser to guarantee data confidentiality.
          </p>

          <motion.div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            whileHover={{ scale: 1.01 }}
            className={`
              border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
              transition-colors duration-200
              ${isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
            `}
          >
            <input
              type="file"
              accept=".csv,.txt"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
              disabled={isAnalyzing}
            />

            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl font-semibold mb-2">
                {file ? file.name : "Drop your file here"}
              </p>
              <p className="text-muted-foreground">
                or click to browse (CSV or TXT)
              </p>
            </label>
          </motion.div>

          {file && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex items-center justify-between bg-secondary/50 p-4 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <span className="font-medium">{file.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFile(null)}
                disabled={isAnalyzing}
              >
                <X className="w-4 h-4" />
              </Button>
            </motion.div>
          )}

          <Button
            onClick={handleAnalyze}
            disabled={!file || isAnalyzing}
            className="w-full mt-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg py-6"
          >
            {isAnalyzing ? (
              <>
                Analyzing Locally...
                {analysisProgress.total > 0 && (
                  <span className="ml-2">
                    {analysisProgress.current}/{analysisProgress.total}
                  </span>
                )}
              </>
            ) : (
              "Secure Local Analysis"
            )}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FileUpload;
