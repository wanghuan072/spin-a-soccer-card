"use client";

import { useState } from "react";
import { Icon } from "@/components/common/Icon";

export function CodeCopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      }}
    >
      <Icon name={copied ? "check" : "copy"} size={17} />{" "}
      {copied ? "Copied" : "Copy code"}
    </button>
  );
}
