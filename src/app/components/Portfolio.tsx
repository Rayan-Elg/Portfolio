"use client";

import { Button } from "@/app/components/ui/button";
import {
  Github,
  Linkedin,
  Mail,
  Moon,
  Play,
  Sun,
  Terminal,
} from "lucide-react"; // Add these imports
import { useEffect, useState } from "react";

interface CodeLineProps {
  line: {
    number: number;
    content: string;
  };
  currentLine: number;
  onHover: (lineNumber: number) => void;
}

interface CodeLine {
  number: number;
  content: string;
}

const CodeLine = ({
  line,
  currentLine,
  onHover,
  visible = false,
}: CodeLineProps & { visible?: boolean }) => (
  <pre
    className={`${
      currentLine === line.number ? "bg-primary/20" : ""
    } transition-opacity duration-100 ${visible ? "opacity-100" : "opacity-0"}`}
    onMouseEnter={() => onHover(line.number)}
  >
    <span className="line-number">{line.number.toString()}</span>
    <span dangerouslySetInnerHTML={{ __html: line.content }} />
  </pre>
);

export default function Component() {
  const [theme, setTheme] = useState("system"); // Change default to "system"
  const [currentLine, setCurrentLine] = useState(1);
  const [codeLines, setCodeLines] = useState<CodeLine[]>([]);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isExecuting, setIsExecuting] = useState(false);
  const [output, setOutput] = useState<string>("");
  const [showCursor, setShowCursor] = useState(true);

  // Add cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Define executeCode before using it
  const executeCode = () => {
    setIsExecuting(true);
    setOutput("");

    // Code to execute
    const codeToExecute = `
function RayanElg() {
  const skills = [
    'JavaScript', 'React', 'Node.js',
    'Python', 'CSS', 'HTML'
  ];
  
  const projects = [
    { name: 'Project A', tech: 'React' },
    { name: 'Project B', tech: 'Node.js' },
    { name: 'Project C', tech: 'Python' }
  ];

  return {
    name: 'Rayan Elg',
    title: 'Full Stack Developer',
    skills,
    projects,
    contact: 'rayan.elg@example.com'
  };
}

const developer = RayanElg();
console.log(developer);
`;

    // Capture console.log output
    let capturedOutput = '';
    const originalConsoleLog = console.log;
    console.log = (message?: any, ...optionalParams: any[]) => {
      capturedOutput += `${JSON.stringify(message, null, 2)}\n`;
    };

    // Execute the code
    try {
      eval(codeToExecute);
    } catch (error) {
      capturedOutput = error.toString();
    }

    // Restore console.log
    console.log = originalConsoleLog;

    // Prepare the output string
    const outputStr = `> console.log(developer)\n${capturedOutput.trim()}`;

    // Use a local variable to accumulate output
    let i = 0;
    let currentOutput = "";
    const typeInterval = setInterval(() => {
      if (i < outputStr.length) {
        currentOutput += outputStr[i];
        setOutput(currentOutput);
        i++;
      } else {
        clearInterval(typeInterval);
        setIsExecuting(false);
      }
    }, 10);
  };

  useEffect(() => {
    const code = `
function RayanElg() {
  const skills = [
    'JavaScript', 'React', 'Node.js',
    'Python', 'CSS', 'HTML'
  ]
  
  const projects = [
    { name: 'Project A', tech: 'React' },
    { name: 'Project B', tech: 'Node.js' },
    { name: 'Project C', tech: 'Python' }
  ]

  return {
    name: 'Rayan Elg',
    title: 'Full Stack Developer',
    skills,
    projects,
    contact: 'rayan.elg@example.com'
  }
}

const developer = RayanElg()
console.log(developer)
    `
      .trim()
      .split("\n");

    setCodeLines(
      code.map((content, index) => ({
        number: index + 1,
        content: content
          .replace(/([{}[\],])/g, '<span class="text-primary">$1</span>')
          .replace(
            /(function|const|return)/g,
            '<span class="text-secondary-foreground">$1</span>'
          )
          .replace(/'([^']*)'/g, "<span class=\"text-green-500\">'$1'</span>"),
      }))
    );
  }, []);

  // Correct the typo in setTimeout
  useEffect(() => {
    if (codeLines.length === 0) return;

    const timeout = setTimeout(() => {
      if (visibleLines < codeLines.length) {
        setVisibleLines((prev) => prev + 1);
      }
    }, 70); // Adjust speed here (lower = faster)

    return () => clearTimeout(timeout);
  }, [visibleLines, codeLines.length]);

  useEffect(() => {
    // Apply dark mode class to html element
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Add system theme detection
  useEffect(() => {
    // Check if user prefers dark mode
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Set initial theme based on system preference
    if (theme === "system") {
      setTheme(systemPrefersDark ? "dark" : "light");
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleGithubClick = () => {
    window.open("https://github.com/yourusername", "_blank");
  };

  const handleLinkedinClick = () => {
    window.open("https://linkedin.com/in/yourusername", "_blank");
  };

  const handleMailClick = () => {
    window.location.href = "mailto:your.email@example.com";
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-base transition-colors duration-200">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Rayan Elg</h1>
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "light" ? (
            <Moon className="h-6 w-6" />
          ) : (
            <Sun className="h-6 w-6" />
          )}
        </Button>
      </header>
      <main className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Welcome to my interactive portfolio
          </h2>
          <p className="text-muted-foreground">
            Hover over the code to explore my skills and projects. Each line
            tells a part of my story as a developer.
          </p>
          <div className="flex space-x-4">
            <Button variant="outline" size="icon" onClick={handleGithubClick}>
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleLinkedinClick}>
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleMailClick}>
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="code-window">
            <div className="code-header flex items-center justify-between px-4 py-2 border-b border-muted/20">
              <div className="flex items-center gap-2">
                <span className="text-sm opacity-70">script.ts</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={executeCode}
                  disabled={isExecuting}
                  className="h-6 w-6 hover:bg-primary/10"
                >
                  <Play className="h-3 w-3" />
                </Button>
              </div>
              {showCursor && <span className="animate-blink">|</span>}
            </div>
            <div className="code-content overflow-y-auto">
              {codeLines.map((line) => (
                <CodeLine
                  key={line.number}
                  line={line}
                  currentLine={currentLine}
                  onHover={setCurrentLine}
                  visible={line.number <= visibleLines}
                />
              ))}
            </div>
          </div>
          {output && (
            <div className="code-window">
              <div className="code-header flex items-center justify-between px-4 py-2 border-b border-muted/20">
                <span className="text-sm opacity-70">Console Output</span>
                <Terminal className="h-4 w-4 opacity-50" />
              </div>
              <div className="code-content">
                <pre className="text-green-500">{output}</pre>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
