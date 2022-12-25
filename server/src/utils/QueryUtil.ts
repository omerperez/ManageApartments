import * as yesql from 'yesql';

const getQueryAndObjectValues = (query: string, object: any) => {
  const queryInitParameters = yesql.pg(query)(object);
  return [queryInitParameters.text, queryInitParameters.values];
};

export default getQueryAndObjectValues;
