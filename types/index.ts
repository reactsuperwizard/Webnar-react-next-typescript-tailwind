import React from "react";

export type Route = {
  title: string;
  url: string;
  icon: React.ReactNode;
  status?: "active" | "disabled" | "comming_soon";
};

export type Step = {
  id: string;
  value: string;
  label?: string;
};

export type CourseStatus = "in_progress" | "completed" | "not_started";

export type Course = {
  id: string;
  title: string;
  status: CourseStatus;
  description?: string;
  thumb?: string;
  price?: number;
};

export type Resource = {
  id: string;
  title: string;
  course: string;
  file?: string;
  type: ResourceType;
};

export type BreadCrumb = {
  name: string;
  label: string;
  icon?: React.ReactNode;
  active: boolean;
};

export type CourseBonus = {
  id: string;
  title: string;
  price: number;
};

export type TrustyFeedback = {
  id: string;
  img: StaticImageData | string;
  title: string;
  description: string;
};

export type Testimonial = {
  sys: {
    id: string;
  };

  title: string;
  content: string;
  date: string;
  userName: string;
  avatar: {
    fileName: string;
    title: string;
    url: string;
  };
  location: string;
};

export type Survey = {
  sys: {
    id: string;
  };
  survey: {
    name: string;
    sys: {
      id: string;
    };
  };
  question: string;
  description: string;
  answer: [string];
  questionType: string;
};

export type FAQ = {
  sys: {
    id: string;
  };
  title: string;
  description: {
    json: any;
  };
};

export type BlogItem = {
  title?: string;
  url?: string;
  slug?: string;
  category?: string;
  description?: string;
};

export type BlogPost = {
  sys: {
    id: string;
  };
  contentfulMetadata: {
    tags: {
      id: string;
      name: string;
    };
  };
  title: string;
  shortDescription: string;
  slug: string;
  content: {
    json: any;
  };
  category: {
    sys: {
      id: string;
    };
  };
  featureImage: {
    title: string;
    fileName: string;
    url: string;
  };

  quoteElement: {
    json: any;
  };
};

export type BlogCardType = {
  url: string;
  title: string;
};
export type CardType = "Visa" | "AmEx" | "Discover" | "MasterCard";

export type ResourceType = "pdf" | "mov" | "audio";
