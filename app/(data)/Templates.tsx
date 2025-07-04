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
