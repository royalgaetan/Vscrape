import { appLanguages } from "@/lib/constants";
import { OperationItem } from "../types/w_types";

export const workflowOperations: Omit<OperationItem, "operationId">[] = [
  // Webhook Operations
  //
  //
  //
  //
  // Manual Operations
  //
  //
  //
  //
  // Cron Operations
  //
  //
  //
  //
  // FormInput Operations
  //
  //
  //
  //
  // ChatBot Operations
  //
  //
  //
  //
  // Web Scraper Operations
  {
    operationName: "Scrape a Web Page",
    nodeName: "Web Scraper",
    operationDescription:
      "Extracts content from a single web page, allowing retrieval of specific elements such as text, images, links, or structured data using defined selectors.",
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "URL to scrape",
        paramInputPlaceholder: "Website URL...",
        paramDescription: "This is the target web page you want to scrape",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Method",
        type: "primitive/customSwitch",
        valuesToPickFrom: ["GET", "POST"],
        paramDescription:
          "Some pages need to be scraped via POST requests (e.g. submitting filters or forms).",
        value: "GET",
      },
      {
        paramName: "Headers",
        type: "primitive/record",
        paramDescription:
          "Add custom headers like User-Agent, cookies, or auth tokens.",
        value: [
          {
            key: "",
            value: "",
          },
        ],
      },
      {
        paramName: "Wait for Selector",
        paramDescription:
          "Wait until a specific element appears before scraping.",
        type: "primitive/text",
        paramInputPlaceholder: "Add your selector here...",
        value: "",
      },
      {
        paramName: "Body",
        type: "primitive/record",
        paramDescription: "Add a body to your POST requests",
        value: [
          {
            key: "",
            value: "",
          },
        ],
      },

      [
        {
          paramName: "Render JS",
          type: "primitive/switch",
          paramDescription:
            "Enables JS rendering for pages where content loads dynamically.",
          value: false,
        },
        {
          paramName: "Metadata",
          type: "primitive/switch",
          paramDescription:
            "Toggle to extract meta tags, title, and other document metadata.",
          value: true,
        },
        {
          paramName: "Redirects",
          type: "primitive/switch",
          paramDescription:
            "Ensures final content is scraped even if the page redirects (e.g., 301, login flow).",
          value: false,
        },
      ],
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Auto-Paginate and Scrape",
    nodeName: "Web Scraper",
    operationDescription:
      "Automatically navigates through multiple pages of a paginated website and extracts content from each page, enabling large-scale data collection without manual intervention.",
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "Start URL",
        paramInputPlaceholder: "Enter the url to begin with...",
        paramDescription:
          "This should be the URL of the first page you want to start scraping.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Pagination Selector",
        paramInputPlaceholder: "Selector to find the “next page” button/link",
        paramDescription:
          'A CSS selector that targets the "Next" button or link in the pagination UI.',
        type: "primitive/text",
        value: "",
      },
      [
        {
          paramName: "Max Pages",
          paramDescription:
            "An upper limit to avoid scraping infinitely. Choose a number based on how many pages you want to scrape.",
          type: "primitive/number",
          paramInputPlaceholder: "Enter...",
          value: "" as any,
        },
        {
          paramName: "Wait between pages",
          paramInputPlaceholder: "0 (ms)",
          paramDescription: "Delay (ms) between pages.",
          type: "primitive/number",
          value: "" as any,
        },
      ],
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  //
  //
  //
  //
  // File Reader Operations
  {
    operationName: "Read Text File",
    nodeName: "File reader",
    operationDescription:
      "Read content from .txt, .log, .md, or similar plain text files.",
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "File input",
        paramInputPlaceholder: "File or file path...",
        paramDescription: "File or file path (dynamic or static)",
        type: "primitive/text",
        value: "",
      },
      [
        {
          paramName: "Encoding",
          paramInputPlaceholder: "Select...",
          paramDescription: "",
          type: "primitive/text",
          valuesToPickFrom: ["utf-8", "ascii", "latin1"],
          value: "",
        },
        {
          paramName: "Read mode",
          paramInputPlaceholder: "Select...",
          paramDescription: "",
          type: "primitive/text",
          valuesToPickFrom: ["full", "lines", "lines with limit"],
          value: "",
        },
      ],

      {
        paramName: "Line limit",
        paramDescription: "(if mode is line-based)",
        type: "primitive/number",
        paramInputPlaceholder: "(if mode is line-based)...",
        value: "" as any,
      },
      {
        paramName: "Trim whitespace",
        paramInputPlaceholder: "",
        paramDescription: "Trim whitespace",
        type: "primitive/switch",
        value: true,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Parse CSV",
    nodeName: "File reader",
    operationDescription: "Parse and extract data from a CSV file.",
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "File input",
        paramInputPlaceholder: "File or file path...",
        paramDescription: "File or file path (dynamic or static)",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Delimiter",
        paramInputPlaceholder: "e.g. « , » | « ; » | « \\t »",
        paramDescription:
          "Character(s) used to separate columns in the CSV file (e.g., comma, semicolon, tab).",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Has header row?",
        paramInputPlaceholder: "",
        paramDescription: "Has header row",
        type: "primitive/switch",
        value: true,
      },
      {
        paramName: "Skip rows?",
        paramInputPlaceholder: "Type...",
        paramDescription: "Number of initial rows to be ignored",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Extract Specific Columns",
        paramInputPlaceholder: "Column filter...",
        paramDescription: "Exact column names you want to extract from",
        type: "primitive/array",
        value: [""],
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Parse PDF",
    nodeName: "File reader",
    operationDescription:
      "Extract text, tables, and optionally structured fields from PDF documents.",
    loopThrough: false,
    params: [
      {
        paramName: "File input",
        paramInputPlaceholder: "File or file path...",
        paramDescription: "Upload the PDF file you want to extract data from.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Extraction mode",
        paramInputPlaceholder: "Select...",
        paramDescription: "Select an extraction mode...",
        type: "primitive/text",
        valuesToPickFrom: [
          "all content",
          "text only",
          "tables",
          "text + tables",
          "images only",
          "text + images",
        ],
        value: "",
      },
      {
        paramName: "Page range",
        paramInputPlaceholder: "e.g. « 1-3 » | « all » | « 1,3,5-7 »",
        paramDescription: "Specifies which pages to extract content from.",
        type: "primitive/text",
        value: "",
      },
      [
        {
          paramName: "Auto-clean formatting",
          paramDescription: "Attempts to clean up common formatting issues",
          type: "primitive/switch",
          value: true,
        },
        {
          paramName: "OCR fallback",
          paramDescription:
            "If the PDF is scanned (i.e., it contains images instead of real text), OCR (Optical Character Recognition) will be used to extract text. (May slow down processing)",
          type: "primitive/switch",
          value: false,
        },
      ],
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Read Image File",
    nodeName: "File reader",
    operationDescription:
      "Get image metadata, base64 encoding, or run OCR on an image.",
    loopThrough: false,
    params: [
      {
        paramName: "File input",
        paramInputPlaceholder: "File or file path...",
        paramDescription: " The image file to process.",
        type: "primitive/text",
        value: "",
      },

      {
        paramName: "Run OCR?",
        paramDescription:
          "Runs Optical Character Recognition and extracts any visible text from the image.",
        type: "primitive/switch",
        value: true,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "AI-Powered File Summary",
    nodeName: "File reader",
    operationDescription:
      "Reads the content of a file (various formats supported — e.g., .pdf, .docx, .txt, .pptx, etc.) and generates a human-readable summary using AI.",
    loopThrough: false,
    params: [
      {
        paramName: "File input",
        paramInputPlaceholder: "File or file path...",
        paramDescription: "The document to be read and summarized.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Summary Type",
        paramInputPlaceholder: "Select...",
        paramDescription: "Select a summary type...",
        type: "primitive/text",
        valuesToPickFrom: ["Short", "Detailed", "Bullet Points"],
        value: "",
      },

      {
        paramName: "Include file metadata",
        paramDescription:
          "If enabled, the summary output will also include metadata from the file",
        type: "primitive/switch",
        value: true,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  //
  //
  //
  //
  // KnowledgeBase Reader Operations
  {
    operationName: "Query Knowledge Base",
    nodeName: "Knowledge Base",
    operationDescription:
      "Ask a question and retrieve the most relevant articles or documents in your knowledge base",
    loopThrough: false,
    params: [
      {
        paramName: "Query",
        paramInputPlaceholder: "Enter query...",
        paramDescription:
          "The question or phrase you want to search for in the knowledge base.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "topK",
        paramInputPlaceholder: "e.g., 3",
        paramDescription: "Number of most relevant entries to return.",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Filter Tags (Optional)",
        isOptional: true,
        paramDescription:
          "Optional tags to filter which parts of the KB are searched.",
        type: "primitive/array",
        value: [""],
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Add to Knowledge Base",
    nodeName: "Knowledge Base",
    operationDescription:
      "Paste or write content directly, or provide a URL or a file path to be parsed and added to the knowledge base.",
    loopThrough: false,
    params: [
      {
        paramName: "Title (optional)",
        isOptional: true,
        paramInputPlaceholder: "Enter a descriptive title...",
        paramDescription:
          "A title or label for the content you're adding to the knowledge base.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Content",
        paramInputPlaceholder:
          "Paste content, or enter a URL or file path reference...",
        paramDescription:
          "Provide the raw content, a URL, or a file path to be parsed and embedded.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Filter Tags (Optional)",
        isOptional: true,
        paramDescription:
          "Tags or categories to help with future filtering and querying.",
        type: "primitive/array",
        value: [""],
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  //
  //
  //
  //
  // Database Reader Operations
  //
  //
  //
  //
  // Wait Operations
  //
  //
  //
  //
  // If/Else Operations
  //
  //
  //
  //
  // Branch Operations
  //
  //
  //
  //
  // Merge Operations
  //
  //
  //
  //
  // Call Workflow Operations
  //
  //
  //
  //
  // Call API Operations
  //
  //
  //
  //
  // Send Operations
  //
  //
  //
  //
  // Extract Data Operations
  {
    operationName: "Extract with AI",
    nodeName: "Extract Data",
    operationDescription:
      "Extract structured data from raw input using AI, based on a target schema.",
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste content, email, file path, etc.",
        paramDescription:
          "The raw text or content, or file from which to extract structured information.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Schema",
        paramInputPlaceholder: "e.g. { name: string, amount: number }",
        paramDescription:
          "A JSON structure defining the fields you want to extract.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Temperature",
        paramInputPlaceholder: "e.g., 0.2",
        paramDescription:
          "Controls how creative the AI is when extracting data. Lower = more accurate.",
        type: "primitive/number",
        value: "" as any,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Extract with Regex",
    nodeName: "Extract Data",
    operationDescription:
      "Use one or multiple regular expressions to extract specific matches.",
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste content, email, file path, etc.",
        paramDescription:
          "The raw text or content, or file to extract data from using regular expressions.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Regex List [Label + Pattern]",
        paramInputPlaceholder:
          "e.g. [ { label: 'Email', pattern: '\\\\S+@\\\\S+\\.\\\\S+' } ]",
        paramDescription:
          "A list of labels and regex patterns to apply. Each match will be returned with its label. E.g. [ { label: 'Email', pattern: '\\\\S+@\\\\S+\\.\\\\S+' } ]",
        type: "primitive/record",
        value: [{ key: "", value: "" }],
      },
      {
        paramName: "Global Match",
        paramDescription:
          "If true, will extract all matches; otherwise, only the first one for each pattern.",
        type: "primitive/switch",
        value: true,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Extract Table from HTML",
    nodeName: "Extract Data",
    operationDescription:
      "Detect and extract tables from HTML pages or fragments.",
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "HTML Input",
        paramInputPlaceholder: "<table>...</table> or URL",
        paramDescription:
          "Paste Raw HTML content, HTML file or url that includes one or more tables.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Table Index",
        paramInputPlaceholder: "(0 = first table)",
        paramDescription:
          "The index of the table to extract if there are multiple (0 = first table).",
        type: "primitive/number",
        value: "" as any,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Extract Named Entities",
    nodeName: "Extract Data",
    operationDescription:
      "Use NLP to extract names, dates, locations, etc., from text.",
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "Input Content",
        paramInputPlaceholder:
          "Paste unstructured text like an article or email...",
        paramDescription: "The text to analyze for named entities.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Entity Types",
        paramDescription:
          "List of named entity types you want to extract (e.g., PERSON, ORG, DATE, LOCATION).",
        type: "primitive/text",
        valuesToPickFrom: [
          "PERSON (e.g., Marie Curie)",
          "ORG (e.g., Google)",
          "LOCATION (e.g., Tokyo)",
          "DATE (e.g., 2025-03-15)",
          "TIME (e.g., 3:00 PM)",
          "MONEY (e.g., $1,000)",
          "PERCENT (e.g., 45%)",
          "NORP (e.g., American)",
          "FAC (e.g., JFK Airport)",
          "LANGUAGE (e.g., French)",
          "LAW (e.g., Section 13)",
          "EVENT (e.g., World War II)",
          "PRODUCT (e.g., iPhone)",
          "WORK_OF_ART (e.g., Starry Night)",
          "QUANTITY (e.g., 3 liters)",
          "ORDINAL (e.g., 1st)",
          "CARDINAL (e.g., 1000)",
          "EMAIL (e.g., user@example.com)",
          "URL (e.g., https://vscrape.com)",
          "PHONE_NUMBER (e.g., +123456789)",
          "HASHTAG (e.g., #Automation)",
          "USERNAME (e.g., @johnny)",
          "IP_ADDRESS (e.g., 192.168.0.1)",
          "FILE_PATH (e.g., /home/user/file.txt)",
          "SKILL (e.g., Python)",
          "JOB_TITLE (e.g., Data Analyst)",
          "BRAND (e.g., Nike)",
        ],
        value: [] as any,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  //
  //
  //
  //
  // Tag Operations
  {
    operationName: "AI-based Tagging",
    nodeName: "Tag",
    operationDescription:
      "Automatically generate tags based on the semantic content of text using AI.",
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content, url or file path...",
        paramDescription: "The raw text or document to analyze and tag.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Tag Type",
        paramInputPlaceholder: "e.g., topic, sentiment, category",
        paramDescription:
          "Describe what kind of tags to generate (e.g., topics, content type, categories).",
        type: "primitive/text",
        value: "",
      },
      [
        {
          paramName: "Max Tags",
          paramInputPlaceholder: "e.g., 5",
          paramDescription: "Maximum number of tags to return.",
          type: "primitive/number",
          value: "" as any,
        },
        {
          paramName: "Temperature",
          paramInputPlaceholder: "e.g., 0.3",
          paramDescription:
            "Controls AI creativity vs. precision. Lower = more focused tagging.",
          type: "primitive/number",
          value: "" as any,
        },
      ],
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Keyword-Based Tagging",
    nodeName: "Tag",
    operationDescription: "Tag content by matching predefined keyword sets.",
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content, url or file path...",
        paramDescription: "Content that will be scanned for keywords.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Keyword Map",
        paramInputPlaceholder: "e.g., topic, sentiment, category",
        paramDescription: `If any keyword appears in the text, the matching tag is added.
        For example: if you set Name = "Health" and Value = "exercise, nutrition", any content mentioning those words will be tagged as Health`,
        type: "primitive/record",
        value: [{ key: "", value: "" }],
      },
      {
        paramName: "Case Sensitive",
        paramDescription: "Whether keyword matching should be case-sensitive.",
        type: "primitive/switch",
        value: false,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  //
  //
  //
  //
  // Field Mapper Operations
  {
    operationName: "Rename Fields",
    nodeName: "Field Mapper",
    operationDescription: `Change the names of fields in your data object to match a new schema.
    Example: { "first_name": "Alice" } → { "name": "Alice" }`,
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "Input Object",
        paramInputPlaceholder: "e.g. { 'name': 'Eva', 'dob': '1990-01-01' }",
        paramDescription: "The original data with keys you want to rename.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Field Map",
        paramDescription: `A mapping of old field names to new field names.`,
        type: "primitive/record",
        value: [{ key: "", value: "" }],
      },
      [
        {
          paramName: "Ignore Missing",
          paramDescription: `If true, missing fields will be ignored instead of throwing an error.`,
          type: "primitive/switch",
          value: true,
        },
        {
          paramName: "Only Renamed",
          paramDescription: `If true, only renamed fields will be returned. Otherwise, unlisted fields will also be included in the output.`,
          type: "primitive/switch",
          value: false,
        },
      ],
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Flatten Nested Structure",
    nodeName: "Field Mapper",
    operationDescription: `Convert a deeply nested object into a flat key-value format using separators.
    Example: { "user": { "name": "Alice" } } → { "user.name": "Alice" }`,
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "Input Object",
        paramInputPlaceholder:
          "e.g. { 'user': { 'name': { 'first': 'Alice' } } }",
        paramDescription: "The nested Data you want to flatten.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Separator",
        paramInputPlaceholder: `e.g., « . » | « _ »`,
        paramDescription: `Separator used in flattened keys (e.g., '.', '_').`,
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Include Array",
        paramDescription: `Whether to flatten arrays (e.g., users[0].name).`,
        type: "primitive/switch",
        value: false,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Rebuild Nested Structure",
    nodeName: "Field Mapper",
    operationDescription: `Turn a flat object with dot-separated keys into a nested structure.
    Example: { "user.name": "Alice" } → { "user": { "name": "Alice" } }`,
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "Input Object",
        paramInputPlaceholder: "e.g. { 'user.name.first': 'Alice' }",
        paramDescription: "The flat key-value object to nest.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Separator",
        paramInputPlaceholder: `e.g., « . » | « _ »`,
        paramDescription: `Separator used in flat keys to define nesting`,
        type: "primitive/text",
        value: "",
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },

  //
  //
  //
  //
  // Text Manipulation Operations
  {
    operationName: "Trim Whitespace",
    nodeName: "Text Manipulation",
    operationDescription:
      "Remove leading and trailing whitespace from a text content.",
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The raw text to trim.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Change Case",
    nodeName: "Text Manipulation",
    operationDescription:
      "Convert text to uppercase, lowercase, title case, or sentence case.",
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The raw text to change the case.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: "Case Type",
        paramDescription: "Choose how to transform the case of the text.",
        valuesToPickFrom: [
          "UPPERCASE",
          "lowercase",
          "Title Case",
          "Sentence case",
        ],
        type: "primitive/text",
        value: "",
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Replace Subtext",
    nodeName: "Text Manipulation",
    operationDescription:
      "Find and replace parts of a text content using plain text or regex.",
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "Find",
        paramInputPlaceholder: `Type your content or regex pattern ("\\s+")`,
        paramDescription: "Text or regex pattern to search for.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: "Replace With",
        paramInputPlaceholder: `e.g. « , » | « - »`,
        paramDescription: "What to replace the matched content with.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Use Regex",
        paramDescription: 'Whether to interpret "find" as a regex pattern.',
        type: "primitive/switch",
        value: false,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Split Text",
    nodeName: "Text Manipulation",
    operationDescription:
      "Split a text content into parts using a delimiter (e.g., comma, space).",
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The raw text to split.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: "Delimiter",
        paramInputPlaceholder: "e.g. « , » | « ; » | « \\t »",
        paramDescription: "Character(s) used to split the text content.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Limit",
        paramInputPlaceholder: "e.g. 4",
        paramDescription: "Optional number of splits to perform.",
        type: "primitive/number",
        value: "" as any,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Subtext",
    nodeName: "Text Manipulation",
    operationDescription:
      "Extract a part of a text based on start index and length.",
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The raw text to split.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: "Start At",
        paramInputPlaceholder: "e.g. 0",
        paramDescription:
          "Index where the subtext should start (0 = beginning).",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Length",
        paramInputPlaceholder: "e.g. 5",
        paramDescription:
          "Number of characters to extract (leave blank to extract till end).",
        type: "primitive/number",
        value: "" as any,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Sanitize Text",
    nodeName: "Text Manipulation",
    operationDescription:
      "Remove special characters, HTML tags, or emojis from text.",
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The text content to sanitize.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: "Remove HTML",
        paramDescription: "Strip HTML tags from the text content.",
        type: "primitive/switch",
        value: true,
      },
      {
        paramName: "Remove Special Chars",
        paramDescription: "Remove special symbols (e.g., @, #, $, %, etc.).",
        type: "primitive/switch",
        value: true,
      },
      {
        paramName: "Remove Emojis",
        paramDescription: "Remove all emojis from the text.",
        type: "primitive/switch",
        value: false,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Normalize Accents",
    nodeName: "Text Manipulation",
    operationDescription:
      "Convert accented characters to plain letters (é → e, ñ → n).",
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The text content to normalize.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Slugify",
    nodeName: "Text Manipulation",
    operationDescription: `Convert text to a URL-safe slug (e.g., "Hello World!" → "hello-world").`,
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The text content to slugify.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: "Delimiter",
        paramInputPlaceholder: "e.g. « - » | « _ » | « / »",
        paramDescription: " Character to use as separator in the slug.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "To Lowercase",
        paramDescription: "Convert result to lowercase.",
        type: "primitive/switch",
        value: true,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Limit Length",
    nodeName: "Text Manipulation",
    operationDescription: `Truncate a text content to a max length with optional ellipsis.`,
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The text content to slugify.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: "Max Length",
        paramInputPlaceholder: "e.g. 100",
        paramDescription: "Maximum number of characters allowed.",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Add Ellipsis (...)",
        paramDescription: 'Append "..." if the text is cut off.',
        type: "primitive/switch",
        value: true,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Remove Duplicates (Words or Lines)",
    nodeName: "Text Manipulation",
    operationDescription: "Remove repeated words or lines from the text.",
    loopThrough: false,
    params: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The raw text to deduplicate.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: "Mode",
        paramDescription: "Choose whether to deduplicate by word or by line.",
        valuesToPickFrom: ["Word", "Line"],
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Ignore Case",
        paramDescription: "Treat Hello and hello as the same for comparison.",
        type: "primitive/switch",
        value: true,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Translate Text",
    nodeName: "Text Manipulation",
    operationDescription:
      "Automatically translate text from one language to another.",
    loopThrough: false,
    params: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The text content to translate.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: "To Language",
        paramDescription: "Target language code.",
        valuesToPickFrom: Object.values(appLanguages)[0].map(
          (lang) => lang.label
        ),
        type: "primitive/text",
        value: "",
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Count Words/Characters",
    nodeName: "Text Manipulation",
    operationDescription:
      "Return the total word count or character count of the text.",
    loopThrough: false,
    params: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Add text content...",
        paramDescription:
          "Return the total word count or character count of the text.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: "Count Type",
        paramDescription: "Choose whether to count words or characters.",
        valuesToPickFrom: ["Word", "Characters"],
        type: "primitive/text",
        value: "",
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Obfuscate / Mask Text",
    nodeName: "Text Manipulation",
    operationDescription: `Mask sensitive parts of a text (e.g., john@example.com → j***@example.com).`,
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The text content to slugify.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: "Mask Character",
        paramInputPlaceholder: "e.g. « * »",
        paramDescription: "Character to use for masking.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Preserve Start (Optional)",
        isOptional: true,
        paramInputPlaceholder: "e.g. 1",
        paramDescription: "Number of characters to preserve at the beginning.",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Preserve End (Optional)",
        isOptional: true,
        paramInputPlaceholder: "e.g. 5",
        paramDescription: "Number of characters to preserve at the end.",
        type: "primitive/number",
        value: "" as any,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Strip Punctuation",
    nodeName: "Text Manipulation",
    operationDescription: "Remove all punctuation characters from the text.",
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The text content to strip punctuation from.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: 'Exclude List (e.g. "?")',
        isOptional: true,
        paramDescription: "Punctuation characters to keep (optional).",
        type: "primitive/array",
        value: [""],
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Add Prefix / Suffix",
    nodeName: "Text Manipulation",
    operationDescription: "Wrap or decorate each word in a text content.",
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The text content to decorate.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: "Prefix",
        isOptional: true,
        paramInputPlaceholder: "e.g. « @ »",
        paramDescription: "Word or Character to add before each word.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Suffix",
        isOptional: true,
        paramInputPlaceholder: "e.g. « ! »",
        paramDescription: "Word or Character to add after each word.",
        type: "primitive/text",
        value: "",
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Pluralize or Singularize",
    nodeName: "Text Manipulation",
    operationDescription: "Convert text between singular and plural forms.",
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The text content to strip punctuation from.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: "Mode",
        paramDescription: "Choose conversion direction.",
        type: "primitive/text",
        valuesToPickFrom: ["Pluralize", "Singularize"],
        value: "",
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Randomize Text",
    nodeName: "Text Manipulation",
    operationDescription:
      "Shuffle words, letters, or apply text scrambling for anonymization.",
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The text content to strip punctuation from.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: "Mode",
        paramDescription: "Choose conversion direction.",
        type: "primitive/text",
        valuesToPickFrom: ["Letters", "Words"],
        value: "",
      },
      {
        paramName: "Preserve Length",
        isOptional: true,
        paramDescription:
          "Keep the length of each word consistent when scrambling.",
        type: "primitive/switch",
        value: "" as any,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  //
  //
  //
  //
  // AI Generation Operations
  {
    operationName: "Generate Text",
    nodeName: "AI Generation",
    operationDescription:
      "Create written content from a prompt — for articles, emails, product descriptions, etc.",
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "Prompt",
        paramInputPlaceholder: "e.g., Write a blog intro about skydiving...",
        paramDescription:
          "The instruction that guides what the AI should write.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Tone",
        isOptional: true,
        paramInputPlaceholder: "e.g., casual, professional, witty",
        paramDescription: "Optional tone or voice for the generated text",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Length",
        isOptional: true,
        paramDescription: "Approximate desired length of the output.",
        valuesToPickFrom: [
          "Very Short",
          "Short",
          "Medium",
          "Long",
          "Very Long",
          "Full / Exhaustive",
        ],
        type: "primitive/text",
        value: "",
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Summarize or Rewrite Content",
    nodeName: "AI Generation",
    operationDescription:
      "Transform existing text — summarizing or paraphrasing it with a clear intent.",
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "Prompt",
        paramInputPlaceholder: "Paste your content here...",
        paramDescription:
          "The full original text to be summarized or rewritten.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Mode",
        valuesToPickFrom: ["Summarize", "Paraphrase"],
        paramDescription: "Choose a specific mode.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Style",
        isOptional: true,
        paramInputPlaceholder: "e.g., simplified, professional",
        paramDescription: "Style of the output text.",
        type: "primitive/text",
        value: "",
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Generate Metadata (SEO, Tags, Titles)",
    nodeName: "AI Generation",
    operationDescription:
      "Generate optimized metadata from raw content (titles, descriptions, tags).",
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "Prompt",
        paramInputPlaceholder:
          "Paste your product description or blog post here...",
        paramDescription: "The source content from which to generate metadata.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Output Type",
        paramDescription: "Specify which metadata element(s) to generate.",
        paramInputPlaceholder: "e.g., meta description, SEO title, tags",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Max Items",
        isOptional: true,
        paramInputPlaceholder: "e.g., 5",
        paramDescription: "Optional limit for tags or suggestions.",
        type: "primitive/number",
        value: "" as any,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Generate Image",
    nodeName: "AI Generation",
    operationDescription: "Create an image from a descriptive prompt using AI.",
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "Prompt",
        paramInputPlaceholder:
          "e.g., “a peaceful forest at sunset in Studio Ghibli style”",
        paramDescription:
          "The instruction that guides what the AI should write.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Style",
        isOptional: true,
        paramInputPlaceholder:
          "e.g., photorealistic, cartoon, oil painting ., photorealistic, cartoon, oil painting",
        paramDescription:
          "Optional visual style to apply to the generated image.",
        type: "primitive/text",
        value: "",
      },
      [
        {
          paramName: "Width",
          isOptional: true,
          paramInputPlaceholder: "e.g. 512",
          paramDescription: "Width of the image to be generated.",
          type: "primitive/number",
          value: "" as any,
        },
        {
          paramName: "Height",
          isOptional: true,
          paramInputPlaceholder: "e.g. 512",
          paramDescription: "Height of the image to be generated.",
          type: "primitive/number",
          value: "" as any,
        },
      ],
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Generate Video (Short Loop)",
    nodeName: "AI Generation",
    operationDescription:
      "Create a short animated video (or loop) from a descriptive scene prompt.",
    params: [
      {
        paramName: "Prompt",
        paramInputPlaceholder:
          "e.g., A drone flying through a dense neon-lit cyberpunk city...",
        paramDescription: "Textual description of the scene to animate.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Duration",
        valuesToPickFrom: ["5 seconds", "10 seconds", "20 seconds"],
        paramDescription: "Length of the video loop.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Motion Style",
        isOptional: true,
        paramInputPlaceholder: "e.g., slow pan, dynamic, steady",
        paramDescription: "Style of motion in the generated clip.",
        type: "primitive/text",
        value: "",
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Generate Voice / Audio",
    nodeName: "AI Generation",
    operationDescription:
      "Create a short animated video (or loop) from a descriptive scene prompt.",
    params: [
      {
        paramName: "Prompt",
        paramInputPlaceholder:
          "e.g., Welcome to our website. Let me walk you through our services...",
        paramDescription: "The text you want to convert into spoken audio.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Voice Type",
        valuesToPickFrom: ["Male", "Female", "Neutral", "Robot"],
        paramDescription: "The desired voice style or persona.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Language",
        paramDescription:
          "The language and regional accent for the generated voice.",
        valuesToPickFrom: Object.values(appLanguages)[0].map(
          (lang) => lang.label
        ),
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Speed",
        valuesToPickFrom: ["1.0 (normal)", "0.8 (slower)", "1.2 (faster)"],
        paramDescription: "Controls the playback speed of the speech.",
        type: "primitive/text",
        value: "",
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  //
  //
  //
  //
  // Sentiment Analysis Operations
  {
    operationName: "Basic Sentiment Classification",
    nodeName: "Sentiment Analysis",
    operationDescription:
      "Determine if the input text expresses a positive, negative, or neutral sentiment.",
    params: [
      {
        paramName: "Text Content",
        paramInputPlaceholder: "Paste the content to analyze...",
        paramDescription: "The text that will be analyzed for basic sentiment.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Language (Optional)",
        isOptional: true,
        paramDescription: "The language of the text for proper analysis.",
        valuesToPickFrom: Object.values(appLanguages)[0].map(
          (lang) => lang.label
        ),
        type: "primitive/text",
        value: "",
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Sentiment Scoring",
    nodeName: "Sentiment Analysis",
    operationDescription:
      "Return a numerical sentiment score (e.g., -1 to 1) and confidence levels.",
    params: [
      {
        paramName: "Text Content",
        paramInputPlaceholder: "Enter the text to be scored...",
        paramDescription: "The content to calculate a sentiment score from.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Normalize Score",
        isOptional: true,
        paramDescription:
          "Whether to normalize the score to a scale like -1 (neg) to +1 (pos).",
        type: "primitive/switch",
        value: "" as any,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Emotion Detection",
    nodeName: "Sentiment Analysis",
    operationDescription:
      "Detect emotional undertones in the text — e.g., joy, anger, sadness, fear, surprise.",
    params: [
      {
        paramName: "Text Content",
        paramInputPlaceholder: "Enter text to be analyzed for emotions...",
        paramDescription: "The text to be analyzed for emotions.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "topN",
        isOptional: true,
        paramInputPlaceholder: "e.g., 1 or 3",
        paramDescription: "Number of top emotions to return.",
        type: "primitive/number",
        value: "" as any,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Intent Classification",
    nodeName: "Sentiment Analysis",
    operationDescription:
      "Classify the text intent — e.g., ask a question, express frustration, request support, etc.",
    params: [
      {
        paramName: "Text Content",
        paramInputPlaceholder: "e.g., I need help with my order...",
        paramDescription: "The text content to classify for intent.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Custom Labels",
        paramDescription:
          "Optional list of custom intents to classify against. E.g., [request, complaint, inquiry]",
        type: "primitive/array",
        isOptional: true,
        value: [""],
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Tone Classification",
    nodeName: "Sentiment Analysis",
    operationDescription:
      "Detect the tone of the text — e.g., formal, casual, sarcastic, professional, angry.",
    params: [
      {
        paramName: "Text Content",
        paramInputPlaceholder: "Paste your text content here...",
        paramDescription: "Text content to analyze for tone.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Sentiment from Image",
    nodeName: "Sentiment Analysis",
    operationDescription:
      "Analyze the sentiment from an Image. Optionally detect facial emotions if faces are present.",
    params: [
      {
        paramName: "Text Content",
        paramInputPlaceholder: "Enter Image Path or URL...",
        paramDescription:
          "URL or Image Path to an image containing text or faces.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Include Facial Emotion",
        paramDescription:
          "Whether to detect facial emotions from human faces (e.g., happy, angry).",
        type: "primitive/switch",
        value: true,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  //
  //
  //
  //
  // Data Enrichment Operations
  {
    operationName: "Email Lookup",
    nodeName: "Data Enrichment",
    operationDescription:
      "Enrich an email address with associated profile data (name, company, job title, LinkedIn, etc.)",
    params: [
      {
        paramName: "Email to look up",
        paramInputPlaceholder: "e.g., john.doe@example.com",
        paramDescription:
          "The email address to enrich with public profile information.",
        type: "primitive/emailUrl",
        value: "",
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Company Info Lookup",
    nodeName: "Data Enrichment",
    operationDescription:
      "Retrieve enriched data about a company using its domain (size, industry, tech stack, logo, etc.)",
    params: [
      {
        paramName: "Domain",
        paramInputPlaceholder: "e.g., shopify.com",
        paramDescription:
          "The company domain name used to fetch enrichment details.",
        type: "primitive/url",
        value: "",
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Social Profile Extraction",
    nodeName: "Data Enrichment",
    operationDescription:
      "Extract and enrich data from a given social media URL (e.g., LinkedIn, Twitter, etc.)",
    params: [
      {
        paramName: "Profile URL",
        paramInputPlaceholder: "e.g., https://www.linkedin.com/in/john-doe",
        paramDescription: "The social profile URL to analyze and enrich.",
        type: "primitive/url",
        value: "",
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "IP to Geo & ISP Info",
    nodeName: "Data Enrichment",
    operationDescription:
      "Enrich an IP address with location (city, country), timezone, ISP, and organization data.",
    params: [
      {
        paramName: "IP Address",
        paramInputPlaceholder: "e.g., 192.168.0.1",
        paramDescription:
          "The IP address to enrich with geo-location and network provider information.",
        type: "primitive/text",
        value: "",
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Phone Number Lookup",
    nodeName: "Data Enrichment",
    operationDescription:
      "Validate and enrich a phone number with carrier, line type, country, and region data.",
    params: [
      {
        paramName: "Phone Number",
        paramInputPlaceholder: "e.g., +14155552671",
        paramDescription:
          "Phone number to enrich with telecom and geographical data.",
        type: "primitive/tel",
        value: "" as any,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Zip/Postal Code Enrichment",
    nodeName: "Data Enrichment",
    operationDescription:
      "Get city, state, region, timezone, and population data from a zip or postal code.",
    params: [
      {
        paramName: "Postal Code",
        paramInputPlaceholder: "e.g., 94107",
        paramDescription:
          "The zip or postal code to enrich with location and demographic information.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Country Code (Optional)",
        isOptional: true,
        paramInputPlaceholder: "e.g., US",
        paramDescription:
          "Optional 2-letter country code to narrow down the postal code context.",
        type: "primitive/text",
        value: "",
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  //
  //
  //
  //
  // Image Manipulation Operations
  {
    operationName: "Resize Image",
    nodeName: "Image Manipulation",
    operationDescription:
      "Resize an image to specific dimensions or by percentage.",
    params: [
      {
        paramName: "Image input",
        paramInputPlaceholder: "Add your Image, URL or Path...",
        paramDescription: "Image to resize",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Resize Mode",
        paramDescription: "Choose Resize Method",
        type: "primitive/radio",
        valuesToPickFrom: ["Percentage", "Pixels"],
        value: "Percentage",
      },
      [
        {
          paramName: "Width",
          paramInputPlaceholder: "Enter...",
          paramDescription: "Target width in pixels or percentage.",
          type: "primitive/number",
          value: "" as any,
        },
        {
          paramName: "Height",
          paramInputPlaceholder: "Enter...",
          paramDescription: "Target height in pixels or percentage.",
          type: "primitive/number",
          value: "" as any,
        },
      ],
      {
        paramName: "Keep Aspect Ratio",
        paramDescription: "Maintain aspect ratio when resizing.",
        type: "primitive/switch",
        value: true,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Crop Image",
    nodeName: "Image Manipulation",
    operationDescription:
      "Crop using coordinates or aspect ratio, with optional Smart Crop to focus on key content.",
    params: [
      {
        paramName: "Image input",
        paramInputPlaceholder: "Add your Image, URL or Path...",
        paramDescription: "Image to crop",
        type: "primitive/text",
        value: "",
      },
      [
        {
          paramName: "X",
          paramInputPlaceholder: "e.g., 100",
          paramDescription: "X coordinate of the top-left corner for cropping.",
          type: "primitive/number",
          value: "" as any,
        },
        {
          paramName: "Y",
          paramInputPlaceholder: "e.g., 50",
          paramDescription: "Y coordinate of the top-left corner for cropping.",
          type: "primitive/number",
          value: "" as any,
        },
      ],
      [
        {
          paramName: "Width",
          paramInputPlaceholder: "e.g., 400",
          paramDescription: "Width of the crop box in pixels.",
          type: "primitive/number",
          value: "" as any,
        },
        {
          paramName: "Height",
          paramInputPlaceholder: "e.g., 300",
          paramDescription: "Height of the crop box in pixels.",
          type: "primitive/number",
          value: "" as any,
        },
      ],
      {
        paramName: "Aspect Ratio (Optional)",
        isOptional: true,
        paramDescription: "Optional aspect ratio to maintain while cropping.",
        type: "primitive/text",
        valuesToPickFrom: [
          "1:1 (Square, social media)",
          "4:3 (Standard, old TVs)",
          "3:2 (Photo, DSLR)",
          "16:9 (Widescreen, HD)",
          "9:16 (Vertical, mobile)",
          "21:9 (Ultra-wide, cinema)",
          "2:1 (Modern video)",
          "5:4 (Classic monitor)",
          "4:5 (Portrait, social)",
          "3:1 (Banner, wide)",
        ],
        value: "",
      },
      {
        paramName: "Smart Crop",
        paramDescription:
          "If true, automatically crop to keep the most relevant parts.",
        type: "primitive/switch",
        value: false,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Compress Image",
    nodeName: "Image Manipulation",
    operationDescription: "Reduce file size with quality control.",
    params: [
      {
        paramName: "Image input",
        paramInputPlaceholder: "Add your Image, URL or Path...",
        paramDescription: "Image to compress",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Quality (1-100)",
        paramInputPlaceholder: "e.g., 75",
        paramDescription: "Compression quality from 1 (worst) to 100 (best).",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Max File Size (KB) (Optional)",
        isOptional: true,
        paramInputPlaceholder: "e.g., 500",
        paramDescription: "Optional max file size in KB after compression.",
        type: "primitive/number",
        value: "" as any,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Blur Image",
    nodeName: "Image Manipulation",
    operationDescription:
      "Apply a blur effect to the entire image or selective areas (including faces).",
    params: [
      {
        paramName: "Image input",
        paramInputPlaceholder: "Add your Image, URL or Path...",
        paramDescription: "Image to blur",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Blur Radius",
        paramDescription: "Intensity of the blur effect.",
        paramInputPlaceholder: "e.g., 10",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Blur Faces",
        paramDescription: "Automatically detect and blur faces for privacy.",
        type: "primitive/switch",
        value: false,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Overlay Text / Watermark",
    nodeName: "Image Manipulation",
    operationDescription: "Add text or image watermark with styling.",
    params: [
      {
        paramName: "Image input",
        paramInputPlaceholder: "Add your Image, URL or Path...",
        paramDescription: "Image to add watermark on.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Overlay Content",
        paramInputPlaceholder: "Add Your watermark text or image...",
        paramDescription: "Text or Image (path, url) to overlay on the image.",
        isTextarea: true,
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Position",
        paramDescription: "Position of the overlay content on the image.",
        type: "primitive/text",
        valuesToPickFrom: [
          "top-left",
          "top-center",
          "top-right",
          "center-left",
          "center",
          "center-right",
          "bottom-left",
          "bottom-center",
          "bottom-right",
        ],
        value: "",
      },
      [
        {
          paramName: "Overlay Size (pixels)",
          paramInputPlaceholder: "e.g., 24",
          paramDescription: "Image or Font size of the overlay content",
          type: "primitive/number",
          value: "" as any,
        },
        {
          paramName: "Opacity (0-1)",
          paramInputPlaceholder: "e.g., 0.7",
          paramDescription: "Opacity of the overlay content (0 to 1).",
          type: "primitive/number",
          value: "" as any,
        },
      ],
      {
        paramName: "Color HEX (if Text Overlay)",
        isOptional: true,
        paramInputPlaceholder: "e.g., #FFFFFF",
        paramDescription: "Text color in HEX.",
        type: "primitive/text",
        value: "" as any,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Rotate / Flip Image",
    nodeName: "Image Manipulation",
    operationDescription: "Rotate or flip the image.",
    params: [
      {
        paramName: "Image input",
        paramInputPlaceholder: "Add your Image, URL or Path...",
        paramDescription: "Image to rotate or flip",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Rotate Degrees",
        paramInputPlaceholder: "e.g., 90",
        paramDescription: "Rotate image by degrees clockwise (0-360).",
        type: "primitive/number",
        value: "" as any,
      },
      [
        {
          paramName: "Flip Horizontal",
          paramDescription: "Flip the image horizontally.",
          type: "primitive/switch",
          value: false,
        },
        {
          paramName: "Flip Vertical",
          paramDescription: "Flip the image vertically.",
          type: "primitive/switch",
          value: false,
        },
      ],
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Remove Background",
    nodeName: "Image Manipulation",
    operationDescription: "Automatically isolate and remove image background.",
    params: [
      {
        paramName: "Image input",
        paramInputPlaceholder: "Add your Image, URL or Path...",
        paramDescription: "Image to remove background",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Tolerance",
        paramInputPlaceholder: "e.g., 10",
        paramDescription:
          "Sensitivity for background removal (higher = more aggressive).",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Background Color (Optional)",
        isOptional: true,
        paramInputPlaceholder: "e.g., #FFFFFF",
        paramDescription:
          "Background color to replace removed background (default: transparent).",
        type: "primitive/text",
        value: "",
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Enhance Image (Super Resolution)",
    nodeName: "Image Manipulation",
    operationDescription: "Improve blurry or low-res images to high quality.",
    params: [
      {
        paramName: "Image input",
        paramInputPlaceholder: "Add your Image, URL or Path...",
        paramDescription: "Image to enhance",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Scale Factor",
        paramInputPlaceholder: "e.g., 2",
        paramDescription: `Multiplier for resolution enhancement (e.g., 2x, 4x).`,
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Denoise Strength (Optional)",
        isOptional: true,
        paramInputPlaceholder: "e.g., 0.5",
        paramDescription: `Level of noise reduction applied (0 to 1).`,
        type: "primitive/number",
        value: "" as any,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Image Quality Enhancer",
    nodeName: "Image Manipulation",
    operationDescription:
      "Enhances image clarity by combining sharpening, brightness/contrast adjustment, and noise reduction.",
    params: [
      {
        paramName: "Image input",
        paramInputPlaceholder: "Add your Image, URL or Path...",
        paramDescription: "Image to enhance",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Brightness",
        paramInputPlaceholder: "e.g., 10",
        paramDescription: `Brightness adjustment (-100 to 100).`,
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Contrast",
        paramInputPlaceholder: "e.g., 20",
        paramDescription: `Contrast adjustment (-100 to 100).`,
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Sharpen Amount",
        paramInputPlaceholder: "e.g., 1.5",
        paramDescription: `Sharpness intensity (1 = normal).`,
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Denoise Level (Optional)",
        paramInputPlaceholder: "e.g., 0.3",
        paramDescription: `Noise reduction level (0 to 1).`,
        type: "primitive/number",
        value: "" as any,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Extract Dominant Colors",
    nodeName: "Image Manipulation",
    operationDescription: "Identify main colors in the image.",
    params: [
      {
        paramName: "Image input",
        paramInputPlaceholder: "Add your Image, URL or Path...",
        paramDescription: "Image to extract colors from.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Color Count",
        paramInputPlaceholder: "e.g., 3",
        paramDescription: `Number of dominant colors to extract.`,
        type: "primitive/number",
        value: "" as any,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Detect Faces and Objects",
    nodeName: "Image Manipulation",
    operationDescription: "Detect faces and objects with bounding boxes.",
    params: [
      {
        paramName: "Image input",
        paramInputPlaceholder: "Add your Image, URL or Path...",
        paramDescription: "Image used to detect faces and objects.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Draw Bounding Boxes",
        paramDescription: `Overlay bounding boxes on detected faces/objects.`,
        type: "primitive/switch",
        value: true,
      },
      {
        paramName: "Object Types",
        paramDescription: `Filter object types to detect. E.g., Person, Car, Dog. (leave empty for all).`,
        type: "primitive/array",
        isOptional: true,
        value: [""],
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Generate Thumbnail",
    nodeName: "Image Manipulation",
    operationDescription: "Create a small optimized preview image.",
    params: [
      {
        paramName: "Image input",
        paramInputPlaceholder: "Add your Image, URL or Path...",
        paramDescription: "Image used to generate thumbnail",
        type: "primitive/text",
        value: "",
      },
      [
        {
          paramName: "Max Width",
          paramInputPlaceholder: "e.g., 150",
          paramDescription: "Maximum width of thumbnail. (Pixels)",
          type: "primitive/number",
          value: "" as any,
        },
        {
          paramName: "Max Height",
          paramInputPlaceholder: "e.g., 150",
          paramDescription: "Maximum height of thumbnail. (Pixels)",
          type: "primitive/number",
          value: "" as any,
        },
      ],
      {
        paramName: "Maintain Aspect Ratio",
        paramDescription: "Keep original aspect ratio.",
        type: "primitive/switch",
        value: true,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Add Shape & Border",
    nodeName: "Image Manipulation",
    operationDescription:
      "Shapes the image (e.g., circle) and adds border or padding.",
    params: [
      {
        paramName: "Image input",
        paramInputPlaceholder: "Add your Image, URL or Path...",
        paramDescription: "Image to modify",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Shape",
        paramDescription: "Shape mask to apply.",
        type: "primitive/text",
        valuesToPickFrom: [
          "None",
          "Circle",
          "Square",
          "Rounded-rectangle",
          "Ellipse",
          "Triangle",
          "Hexagon",
          "Star",
          "Heart",
        ],
        value: "",
      },
      [
        {
          paramName: "Border Width",
          paramInputPlaceholder: "e.g., 5",
          paramDescription: "Width of the border in pixels.",
          type: "primitive/number",
          value: "" as any,
        },
        {
          paramName: "Border Color",
          paramInputPlaceholder: "e.g., #000000",
          paramDescription: "Border color in HEX.",
          type: "primitive/text",
          value: "",
        },
      ],
      {
        paramName: "Padding",
        paramDescription: "Padding space around the image in pixels.",
        paramInputPlaceholder: "e.g., 10",
        type: "primitive/number",
        value: "" as any,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Apply Filters",
    nodeName: "Image Manipulation",
    operationDescription: "Add artistic filters to an image.",
    params: [
      {
        paramName: "Image input",
        paramInputPlaceholder: "Add your Image, URL or Path...",
        paramDescription: "Image to apply filters to.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Filter Type",
        paramDescription: "Filter style to apply.",
        type: "primitive/text",
        valuesToPickFrom: [
          "Grayscale",
          "BlackWhite",
          "Sepia",
          "Vintage",
          "Cool",
          "Warm",
          "Blur",
          "Sharpen",
          "Invert",
          "Brightness",
          "Contrast",
          "Saturate",
          "Duotone",
          "Clarendon",
          "Gingham",
          "Lark",
          "Juno",
          "Slumber",
          "Aden",
          "Perpetua",
          "Valencia",
          "xProII",
          "Earlybird",
          "Brannan",
        ],
        value: [] as any,
      },
      {
        paramName: "intensity",
        paramInputPlaceholder: "e.g., 0.7",
        paramDescription: "Filter intensity (0 to 1).",
        type: "primitive/number",
        value: "" as any,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  {
    operationName: "Image Fusion",
    nodeName: "Image Manipulation",
    operationDescription:
      "Combines multiple images using side-by-side, stacked, or overlay layouts.",
    params: [
      {
        paramName: "Images",
        paramInputPlaceholder: "List of image path, URLs or base64 to merge.",
        paramDescription: "Add images to combine...",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Layout",
        paramDescription: "How to combine images.",
        type: "primitive/text",
        valuesToPickFrom: [
          "Side-by-side",
          "Stacked",
          "Overlay",
          "Grid",
          "Collage",
        ],
        value: "",
      },
      {
        paramName: "Spacing",
        paramInputPlaceholder: "e.g., 10",
        paramDescription: "Space between images in pixels.",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Alignment",
        paramDescription: "Alignment for merged images.",
        type: "primitive/text",
        valuesToPickFrom: [
          "center",
          "left",
          "right",
          "top",
          "bottom",
          "top-left",
          "top-right",
          "bottom-left",
          "bottom-right",
        ],
        value: "",
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  //
  //
  //
  //
  // Video Manipulation Operations
  {
    operationName: "Trim Video",
    nodeName: "Video Manipulation",
    operationDescription: "Cut the video to a specific start and end time.",
    params: [
      {
        paramName: "Video",
        paramInputPlaceholder: "Add Video path, URL or base64 to trim.",
        paramDescription: "Add video to trim...",
        type: "primitive/text",
        value: "",
      },
      [
        {
          paramName: "Start Time",
          paramDescription: "Start trimming from this timestamp (HH:MM:SS).",
          type: "primitive/milliseconds",
          value: "" as any,
        },
        {
          paramName: "End Time",
          paramDescription: "Stop trimming at this timestamp (HH:MM:SS).",
          type: "primitive/milliseconds",
          value: "" as any,
        },
      ],
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  //
  //
  //
  //
  // Audio Manipulation Operations
  //
  //
  //
  //
  // Data Converter Operations
  //
  //
  //
  //
  // Image Converter Operations
  //
  //
  //
  //
  // Video Converter Operations
  //
  //
  //
  //
  // Audio Converter Operations
  //
  //
  //
  //
  // Encoding Operations
  //
  //
  //
  //
  // PDF Converter Operations
  //
  //
  //
  //
  // To Markup Operations
  //
  //
  //
  //
  // PDF Viewer Operations
  //
  //
  //
  //
  // Docs Viewer Operations
  //
  //
  //
  //
  // Spreadsheet Viewer Operations
  //
  //
  //
  //
  // Image Preview Operations
  //
  //
  //
  //
  // Media Player Operations
  //
  //
  //
  //
  // Code Preview Operations
  //
  //
  //
  //
  // App Sync Operations
  //
  //
  //
  //
] as const;
