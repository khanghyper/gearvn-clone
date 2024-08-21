import slugify from 'slugify';

export const transformSort = (sort: string | undefined | object) => {
  // let result = {
  //   createdAt: -1
  // };
  // if (typeof sort === 'string') {
  //   console.log('in ', sort);
  //   if (typeof sort === 'string') {
  //     let sortFilters = sort.split(',')
  //     sortFilters.forEach(item => {
  //       if (item.startsWith('-')) {
  //         result = { ...result, [item.split('-').pop()]: -1 }
  //       } else {
  //         result = { ...result, [item]: 1 }
  //       }
  //     })
  //   }
  //   return result
  // } else {
  //   return sort
  // }
  if (typeof sort === 'string') {
    return {
      [sort.startsWith('-') ? sort.split('-')[1] : sort]: sort.startsWith('-') ? -1 : 1
    }
  } else {
    return sort;
  }
};

export const slugTrans = (text: string): string => {
  return slugify(text, {
    replacement: '-', // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
    locale: 'vi', // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
};
