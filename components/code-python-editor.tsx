import ReactCodeMirror, { ViewUpdate } from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { Button } from "./ui/button";
import { Divide, RefreshCcw, TriangleAlert } from "lucide-react";
import apiClient from "@/lib/apiClient";
import React from "react";
import { useTheme } from "next-themes";

type PythonCodeEditorProps = {
  className?: string;
  code?: string;
  onChange: (val: string, viewUpdate: ViewUpdate) => void;
};

export default function PythonCodeEditor({
  className,
  code,
  onChange,
}: PythonCodeEditorProps) {
  const { theme } = useTheme();
  const [error, setError] = React.useState<{
    state: boolean;
    message: string;
  }>({ state: false, message: "" });

  async function evaluateCode() {
    const { data } = await apiClient.post("/scripts/evalute", {
      code: code,
    });

    if (data?.success == false) {
      setError({ state: true, message: data.errorMessage });
      return;
    }

    setError({ state: false, message: "" });
  }

  return (
    <>
      <ReactCodeMirror
        className={className}
        height="200px"
        extensions={[python()]}
        value={code}
        onChange={onChange}
        theme={theme == "light" ? "light" : vscodeDark}
        placeholder="Digite seu código Python aqui..."
      />
      {error.state && <p className="text-danger">{error.message}</p>}

      <div className="flex justify-between">
        <p className="pt-2 flex gap-2 text-yellow-600 items-center">
          <TriangleAlert size={20} /> Não é possível utilizar imports
        </p>
        <Button variant="ghost" className="my-2" onClick={evaluateCode}>
          <RefreshCcw /> Evaluate code syntax
        </Button>
      </div>
    </>
  );
}
