export const GET_BLOGS = `
{
  blogPostCollection(skip: 0, limit: 100) {
    total
    skip
    items {
      sys {
        id
      }
      contentfulMetadata {
        tags {
          id
          name
        }
      }
      title
      shortDescription
      slug
      content {
        json
      }
      category {
        sys {
          id
        }
      }
      featureImage {
        title
        fileName
        url
      }
    }
  }
}
`;

export const GET_BLOG_BY_SLUG = (slug: string) => `
{
  blogPostCollection(skip: 0, limit: 100, where: {
    slug: "${slug}"
  }) {
    total
    skip
    items {
      sys {
        id
      }
      contentfulMetadata {
        tags {
          id
          name
        }
      }
      title
      shortDescription
      slug
      content {
        json
      }
      category {
        sys {
          id
        }
      }
      featureImage {
        title
        fileName
        url
      }
    }
  }
}
`;

export const GET_CATEGORIES = `
{
  categoryCollection (skip: 0, limit: 1000) {
    total
    limit
    skip
    items {
      sys {
        id
      }
      name
    }
  }
}
`;
