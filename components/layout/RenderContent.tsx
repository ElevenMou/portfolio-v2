import React from "react";
import { BLOCKS, Mark } from "@contentful/rich-text-types";
import Highlight from "@/lib/highlight/Highlight";
import Image from "next/image";

interface Node {
  nodeType: string;
  data: Record<string, unknown>;
  content: Node[];
  value?: string;
  marks?: Mark[];
}
interface EmbededAsset {
  fields: {
    file: {
      url: string;
      details: {
        image: {
          width: number;
          height: number;
        };
      };
    };
    title: string;
  };
}
export interface RichTextDocument {
  document: {
    nodeType: string;
    data: Record<string, unknown>;
    content: Node[];
  };
}

const generateUniqueId = () => Math.random().toString(36).substring(2);
const renderNode = (node: Node): React.ReactNode => {
  switch (node.nodeType) {
    case BLOCKS.DOCUMENT:
      return <>{node.content.map((child) => renderNode(child))}</>;

    case BLOCKS.HEADING_2:
      return (
        <h2 key={generateUniqueId()}>
          {node.content.map((child) => renderNode(child))}
        </h2>
      );

    case BLOCKS.HEADING_3:
      return (
        <h3 key={generateUniqueId()}>
          {node.content.map((child) => renderNode(child))}
        </h3>
      );

    case BLOCKS.HEADING_4:
      return (
        <h4 key={generateUniqueId()}>
          {node.content.map((child) => renderNode(child))}
        </h4>
      );

    case BLOCKS.HEADING_5:
      return (
        <h5 key={generateUniqueId()}>
          {node.content.map((child) => renderNode(child))}
        </h5>
      );

    case BLOCKS.HEADING_6:
      return (
        <h6 key={generateUniqueId()}>
          {node.content.map((child) => renderNode(child))}
        </h6>
      );

    case BLOCKS.PARAGRAPH:
      // Check if paragraph contains a single code block
      if (
        node.content.length === 1 &&
        node.content[0].marks?.some((mark) => mark.type === "code")
      ) {
        const codeContent = node.content[0].value || "";
        const lines = codeContent.split("\n");
        const language = lines[0].trim(); // First line is the language
        const code = lines.slice(1).join("\n"); // Rest is the actual code

        return (
          <Highlight key={generateUniqueId()} className={language}>
            {code}
          </Highlight>
        );
      }
      return (
        <p key={generateUniqueId()}>
          {node.content.map((child) => renderNode(child))}
        </p>
      );

    case "text":
      let content: React.ReactNode = node.value || "";

      // Apply marks (bold, italic, underline, etc.)
      if (node.marks) {
        content = node.marks.reduce<React.ReactNode>((acc, mark) => {
          switch (mark.type) {
            case "bold":
              return <strong key={generateUniqueId()}>{acc}</strong>;
            case "italic":
              return <em key={generateUniqueId()}>{acc}</em>;
            case "underline":
              return <u key={generateUniqueId()}>{acc}</u>;
            case "strikethrough":
              return <del key={generateUniqueId()}>{acc}</del>;
            case "subscript":
              return <sub key={generateUniqueId()}>{acc}</sub>;
            case "superscript":
              return <sup key={generateUniqueId()}>{acc}</sup>;
            case "code":
              return acc; // Skip code marks as they're handled at paragraph level
            default:
              return acc;
          }
        }, <>{content}</>);
      }

      return content;

    case "unordered-list":
      return (
        <ul key={generateUniqueId()}>
          {node.content.map((child) => renderNode(child))}
        </ul>
      );

    case "ordered-list":
      return (
        <ol key={generateUniqueId()}>
          {node.content.map((child) => renderNode(child))}
        </ol>
      );

    case "list-item":
      return (
        <li key={generateUniqueId()}>
          {node.content.map((child) => renderNode(child))}
        </li>
      );

    case "blockquote":
      return (
        <blockquote key={generateUniqueId()}>
          {node.content.map((child) => renderNode(child))}
        </blockquote>
      );

    case "table":
      return (
        <div className="table-container" key={generateUniqueId()}>
          <table>
            <tbody>{node.content.map((child) => renderNode(child))}</tbody>
          </table>
        </div>
      );

    case "table-row":
      return (
        <tr key={generateUniqueId()}>
          {node.content.map((child) => renderNode(child))}
        </tr>
      );

    case "table-header-cell":
      return (
        <th key={generateUniqueId()}>
          {node.content.map((child) => renderNode(child))}
        </th>
      );

    case "table-cell":
      return (
        <td key={generateUniqueId()}>
          {node.content.map((child) => renderNode(child))}
        </td>
      );

    case "hr":
      return <hr key={generateUniqueId()} />;

    case "embedded-asset-block":
      const asset = node.data.target as EmbededAsset;
      if (asset?.fields?.file) {
        return (
          <div key={generateUniqueId()} className="embedded-asset">
            <Image
              src={`https:${asset.fields.file.url}`}
              alt={asset.fields.title || ""}
              width={asset.fields.file.details.image.width}
              height={asset.fields.file.details.image.height}
            />
          </div>
        );
      }
      return null;

    default:
      console.warn(`Unhandled node type: ${node.nodeType}`);
      return null;
  }
};

export const RenderContent = (documentData: RichTextDocument) => {
  return renderNode(documentData.document);
};

export default RenderContent;
