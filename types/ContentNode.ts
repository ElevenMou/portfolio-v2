import { Mark } from "@contentful/rich-text-types";

interface Node {
  nodeType: string;
  data: Record<string, unknown>;
  content: Node[];
  value?: string;
  marks?: Mark[];
}

export default Node;
