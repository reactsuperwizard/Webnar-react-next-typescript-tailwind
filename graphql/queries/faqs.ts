export const GET_FAQS = `
{
  faqCollection(skip: 0, limit: 1000) {
    total
    skip
    limit
    items {
      sys {
        id
      }
      title
      description {
        json
      }
    }
  }
}
`;
