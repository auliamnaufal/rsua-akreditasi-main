declare module "*.svg?react" {
  import type * as React from "react";
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
