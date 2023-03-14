class SearchFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        }
      : {};

    console.log(keyword);

    this.query = this.query.find({ ...keyword });
    return this;
  }
}

const searchQuery = (queryString, searchIn, exclude) => {
  if (queryString) {
    const filter = searchIn.forEach((ele) => {
      return { [ele]: { $regex: queryString }, $options: "i", exclude };
    });

    return { $or: [...filter] };
  } else {
    return exclude;
  }
};

module.exports = {
  SearchFeature,
  searchQuery,
};
