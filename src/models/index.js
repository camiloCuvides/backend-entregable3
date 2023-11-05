const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

Actor.belongsToMany(Genre, { through: "actorsGenres" });
Genre.belongsToMany(Actor, { through: "actorsGenres" });


Movie.belongsToMany(Genre, { through: "MoviesGenres" });
Genre.belongsToMany(Movie, { through: "MoviesGenres" });


Movie.belongsToMany(Actor, { through: "MoviesActors" });
Actor.belongsToMany(Movie, { through: "MoviesActors" });


Movie.belongsToMany(Director, { through: "MoviesDirectors" });
Director.belongsToMany(Movie, { through: "MoviesDirectors" });
