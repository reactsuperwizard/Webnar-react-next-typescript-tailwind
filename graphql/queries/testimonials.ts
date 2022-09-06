export const GET_TESTIMONIALS = `
{
  testimonialCollection(skip:0, limit:100) {
    total
    skip
    limit
    __typename
    items {
      sys {
        id
      }
      
      title
      content
      date
      userName
      avatar {
        fileName
        title
        url
      }
      location
    }
  }
}
`;
