export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};
export const searchQuery = (searchTerms) => {
  const query = `*[_type == 'pin' && title match '${searchTerms}*' || category match '${searchTerms}*' || about match '${searchTerms}*']{
    image {
      asset -> {
        url
      }
    },
    _id,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[] {
      _key,
      postedBy -> {
        _id,
      userName,
      image
      },
    },
  }`;
  return query;
};
export const feedQuery = `*[_type=='pin'] | order(_createdAt desc){
  image {
    asset -> {
      url
    }
  },
  _id,
  destination,
  postedBy -> {
    _id,
    userName,
    image
  },
  save[] {
    _key,
    postedBy -> {
      _id,
    userName,
    image
    },
  },
}`;
