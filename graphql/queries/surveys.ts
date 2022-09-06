export const GET_SURVEYS = `
{
  surveyQuestionsCollection(skip: 0, limit: 1000, preview: false) {
    total
    skip
    limit
    items {
      sys {
        id
      }
      survey {
        name
        sys {
          id
        }
      }
      question
      description
      answer
      questionType
    }
  }
}`;
