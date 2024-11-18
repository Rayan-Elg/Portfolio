"use client";

import { Button } from "@/app/components/ui/button";
import { Github, Linkedin, Mail, Moon, Sun } from 'lucide-react';
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

const CodeLine = ({ line, currentLine, onHover }: CodeLineProps) => (
  <pre
    className={`${currentLine === line.number ? "bg-primary/20" : ""}`}
    onMouseEnter={() => onHover(line.number)}
  >
    <span className="line-number">{line.number.toString()}</span>
    <span dangerouslySetInnerHTML={{ __html: line.content }} />
  </pre>
);

export default function Component() {
  const [theme, setTheme] = useState("light");
  const [currentLine, setCurrentLine] = useState(1);
  const [codeLines, setCodeLines] = useState<CodeLine[]>([]);

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

  useEffect(() => {
    // Apply dark mode class to html element
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleGithubClick = () => {
    window.open('https://github.com/yourusername', '_blank');
  };

  const handleLinkedinClick = () => {
    window.open('https://linkedin.com/in/yourusername', '_blank');
  };

  const handleMailClick = () => {
    window.location.href = 'mailto:your.email@example.com';
  };

  return (
    <div className="container mx-auto px-4 py-8">
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
        <div className="code-window">
          <div className="code-content overflow-y-auto h-[500px]">
            {codeLines.map((line) => (
              <CodeLine
                key={line.number}
                line={line}
                currentLine={currentLine}
                onHover={setCurrentLine}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}