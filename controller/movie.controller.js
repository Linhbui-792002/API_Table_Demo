import movie from "../models/movie.js";
// import data from "../config/movies.json" assert { type: "json" };

const getAllMovie = async (req, res) => {
  try {
    const page = Number(req.query.page) - 1 || 0;
    const limit = Number(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "rating";
    let genre = req.query.genre || "All";

    // demo genreOptions

    const genreOptions = [
      "Action",
      "Romance",
      "Fantasy",
      "Drama",
      "Crime",
      "Adventure",
      "Thriller",
      "Sci-fi",
      "Music",
      "Family",
    ];
    genre === "All"
      ? (genre = [...genreOptions])
      : (genre = req.query.genre.split(","));

    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }
    console.log(
      sortBy,
      "sortBy",
      sortBy[sort[0]],
      " sortBy[sort[0]]",
      sort[0],
      sort[1]
    );
    const movies = await movie
      .find({
        name: { $regex: new RegExp(search, "i") },
        genre: { $in: genre },
      })
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await movie.countDocuments({
      genre: { $in: genre },
      name: { $regex: new RegExp(search, "i") },
    });

    const response = {
      statusCode: 200,
      error: false,
      total,
      page: page + 1,
      limit,
      genres: genreOptions,
      data: movies,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      error: true,
      statusCode: 500,
      messages: error.toString(),
    });
  }
};

const insertMovies = async () => {
  try {
    const docs = await movie.insertMany(data);
    return Promise.resolve(docs);
  } catch (error) {
    return Promise.reject(error);
  }
};

export { getAllMovie, insertMovies };
