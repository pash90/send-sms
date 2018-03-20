/**
 * Custom Types using the source code since types not provided by 
 * DefinitelyTyped or the original author
 */

interface NormalizeOptions {
  normalizeProtocol?: boolean,
  normalizeHttps?: boolean,
  stripFragment?: boolean,
  stripWWW?: boolean,
  removeQueryParameters?: Array<RegExp | string>,
  removeTrailingSlash?: boolean,
  removeDirectoryIndex?: boolean,
  sortQueryParameters?: boolean,
}

declare module 'normalize-url' {
  export default function normalizeUrl(text: string, options?: NormalizeOptions): string;
}

declare module 'string-url-extractor' {
  export default function urlExtractor(text: string): Array<string>;
}