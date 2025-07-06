export default [
  {
    name: "Blog Title",
    desc: "AI tool That generates Blog titles given blog information",
    catagory: "Blog",
    icon: "/Blog_title.png",
    aiPrompt: "You are a blog topic generation expert. Given a specific niche topic and outline, generate 5 unique, high-quality blog topic ideas in bullet points. Make sure the topics are relevant, attention-grabbing, and tailored for SEO-friendly content. Return the output in rich text editor (HTML or Markdown) format only. Respond only with the result. Do not include explanations, introductions, or confirmations.",
    slug: "generate-blog-title",
    form: [
      {
        label: "Enter your blog niche",
        field: "input",
        name: "niche",
        required: true
      },
      {
        label: "Enter blog outline",
        field: "Textarea",
        name: "outline"
      }
    ]
  },
  {
    name: "Plagiarism Remover",
    desc: "Rewrites text to remove plagiarism while keeping original meaning intact.",
    catagory: "Writing",
    icon: "/plagiarism.png",
    aiPrompt: "You are a plagiarism removal assistant. Given a piece of text, rewrite it entirely in your own words while retaining the original meaning and tone. Ensure it passes AI and human plagiarism checks. Keep the output fluent and natural. Respond only with the result. Do not include explanations, introductions, or confirmations.",
    slug: "plagiarism-remover",
    form: [
      {
        label: "Enter text to rewrite",
        field: "Textarea",
        name: "input",
        required: true
      }
    ]
  },
  {
    name: "YouTube Description Generator",
    desc: "Creates optimized and engaging YouTube video descriptions with keywords and hashtags.",
    catagory: "YouTube",
    icon: "/youtube.png",
    aiPrompt: "You're a YouTube SEO expert. Given a video title and short summary, write a highly engaging, keyword-rich video description. Include relevant hashtags and timestamps if available. Return the result in plain text. Respond only with the result. Do not include explanations, introductions, or confirmations.",
    slug: "youtube-description-generator",
    form: [
      {
        label: "Enter video title",
        field: "input",
        name: "title",
        required: true
      },
      {
        label: "Enter short video summary",
        field: "Textarea",
        name: "summary"
      }
    ]
  },
  {
    name: "Product Description Generator",
    desc: "Generates compelling product descriptions for eCommerce websites.",
    catagory: "eCommerce",
    icon: "/product_description.png",
    aiPrompt: "You're a copywriter for an eCommerce store. Given product name and features, write a compelling, SEO-optimized product description that attracts buyers. Keep it professional and clear. Respond only with the result. Do not include explanations, introductions, or confirmations.",
    slug: "product-description-generator",
    form: [
      {
        label: "Product name",
        field: "input",
        name: "product",
        required: true
      },
      {
        label: "Product features (comma-separated)",
        field: "Textarea",
        name: "features"
      }
    ]
  },
  {
    name: "Instagram Caption Generator",
    desc: "Creates engaging captions for Instagram posts with emojis and hashtags.",
    catagory: "Social Media",
    icon: "/instagram.png",
    aiPrompt: "You're a social media strategist. Given a topic or image description, generate 3 catchy, fun, and trend-aware Instagram captions with emojis and relevant hashtags. Respond only with the result. Do not include explanations, introductions, or confirmations.",
    slug: "instagram-caption-generator",
    form: [
      {
        label: "Describe your post",
        field: "Textarea",
        name: "description",
        required: true
      }
    ]
  },
  {
    name: "AI Email Writer",
    desc: "Generates professional, polite, or persuasive emails based on your input.",
    catagory: "Writing",
    icon: "/email.png",
    aiPrompt: "You are a professional email assistant. Given the purpose, recipient context, and message goal, write a clear, polite, and well-structured email. Keep the tone professional unless otherwise specified. Include subject line and sign-off if appropriate. Respond only with the result. Do not include explanations, introductions, or confirmations.",
    slug: "ai-email-writer",
    form: [
      {
        label: "What is the email about?",
        field: "Textarea",
        name: "purpose",
        required: true
      },
      {
        label: "Recipient details or relationship (e.g., manager, client, recruiter)",
        field: "input",
        name: "recipient"
      },
      {
        label: "Preferred tone (e.g., formal, friendly, persuasive)",
        field: "input",
        name: "tone"
      }
    ]
  },

  {
    "name": "GitHub README Generator",
    "desc": "Creates a professional, well-structured README.md file for your code repositories.",
    "catagory": "Developer",
    "icon": "/github_readme.png",
    "slug": "github-readme-generator",
    "aiPrompt": "**Role**: You are a senior software engineer and technical writer expert in creating high-quality GitHub README.md files.\n\n**Instruction**: Generate a complete, well-structured README in Markdown format using the provided project details. Format sections with proper headings, subheadings, and Markdown syntax. Do not include extra explanations. Only return the final formatted README content.\n\n**Context**: The user wants to publish a project and needs a professional README that includes: a project overview, installation steps, usage examples, license, and contribution guidelines. Your README should be clear, clean, and structured like a real-world open-source project.\n\n**Example**:\n# Project Title\n\nBadges (placeholders)\n\n## Description\nShort summary here.\n\n## Installation\n```bash\nnpm install project-name\n```\n\n## Usage\n```bash\nnpm start\n```\n\n## Contributing\n...\n\n## License\nMIT",
    "form": [
      {
        "label": "Project Name (e.g., Weather App, Portfolio Website)",
        "field": "input",
        "name": "projectName",
        "required": true
      },
      {
        "label": "Project Description (One sentence summary, e.g., 'A simple weather forecast app built with React.')",
        "field": "input",
        "name": "description",
        "required": true
      },
      {
        "label": "Installation Instructions (e.g., 'npm install', or any steps to set up the project)",
        "field": "Textarea",
        "name": "installation",
        "required": true
      },
      {
        "label": "Usage Instructions or Example (e.g., code snippets or CLI commands to run your project)",
        "field": "Textarea",
        "name": "usage",
        "required": true
      },
      {
        "label": "License (Choose how others can use your code — e.g., MIT for open use, Apache 2.0 for protection)",
        "field": "input",
        "name": "license",
        "defaultValue": "MIT"
      }
    ]
  },
  {
    "name": "AI Prompt Enhancer (RICE)",
    "desc": "Refines your simple ideas into powerful, structured AI prompts using the RICE framework.",
    "catagory": "Productivity",
    "icon": "/prompt_enhancer.png",
    "slug": "ai-prompt-enhancer",
    "aiPrompt": "**Role**: You are a top-tier prompt engineer.\n\n**Instruction**: Take the user's vague or simple idea and rewrite it as a powerful prompt using the RICE framework: Role, Instruction, Context, Example. The prompt should be ready for use in any advanced AI system. Return the final output in Markdown format, clearly labeled by section.\n\n**Context**: The user needs more effective responses from an AI model and their initial prompt lacks depth.\n\n**Example**:\n**Role**: You are a professional travel planner.\n\n**Instruction**: Create a 5-day travel itinerary for the specified city. Include food, cultural sights, and unique local experiences.\n\n**Context**: A family of four is traveling with two kids. Budget-conscious.\n\n**Example**: Day 1 - Visit Central Park and explore the Natural History Museum.\n\n---",
    "form": [
      {
        "label": "Write your basic idea or prompt (e.g., 'Write me a poem about nature')",
        "field": "Textarea",
        "name": "prompt",
        "required": true
      }
    ]
  },
  {
    "name": "Flash Card Questions Generator",
    "desc": "Automatically creates question-and-answer flash cards from any block of text.",
    "catagory": "Education",
    "icon": "/flash_cards.png",
    "slug": "flash-card-generator",
    "aiPrompt": "**Role**: You are an expert educator and instructional designer.\n\n**Instruction**: Analyze the provided text and generate 10 clear question-and-answer flash card pairs. Focus on comprehension and concept recall. Format clearly as:\nQ1: ...\nA1: ...\nQ2: ...\nA2: ... and so on. Do not include extra explanations.\n\n**Context**: The user is preparing study material and wants accurate, concise questions that summarize the key points of the text.\n\n**Example**:\nQ1: What is photosynthesis?\nA1: The process by which green plants use sunlight to make food from carbon dioxide and water.",
    "form": [
      {
        "label": "Paste the text, topic, or article you want to turn into flash cards (e.g., 'Photosynthesis is the process by which...')",
        "field": "Textarea",
        "name": "text",
        "required": true
      }
    ]
  }
  ,
  {
    name: "Cover Letter Generator",
    desc: "Writes personalized cover letters based on job and resume details.",
    catagory: "Career",
    icon: "/cover_letter.png",
    aiPrompt: "You are a career assistant. Write a professional and personalized cover letter for the given job title and candidate background. Highlight key skills and enthusiasm. Respond only with the result. Do not include explanations, introductions, or confirmations.",
    slug: "cover-letter-generator",
    form: [
      {
        label: "Job title you're applying for",
        field: "input",
        name: "jobTitle",
        required: true
      },
      {
        label: "Your background or experience",
        field: "Textarea",
        name: "experience"
      }
    ]
  },
  {
    name: "SEO Meta Description Generator",
    desc: "Generates SEO-friendly meta descriptions for web pages or blog posts.",
    catagory: "SEO",
    icon: "/seo_meta.png",
    aiPrompt: "You are an SEO specialist. Write a compelling and optimized meta description for the given webpage title and content. Keep it under 160 characters and include target keywords. Respond only with the result. Do not include explanations, introductions, or confirmations.",
    slug: "seo-meta-description-generator",
    form: [
      {
        label: "Webpage or article title",
        field: "input",
        name: "title",
        required: true
      },
      {
        label: "Page content or summary",
        field: "Textarea",
        name: "content"
      }
    ]
  }
]
