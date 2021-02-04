// const Redis = require('ioredis')
// const redis = new Redis()
// const axios = require('axios')

// class Movie {
//     static async showMovie(req, res){
//         try {
//             const url = "http://localhost:3001/movies";
//             const movieChaced = await redis.get("movies");
      
//             if (movieChaced) {
//               res.send(JSON.parse(movieChaced));
//             } else {
//               axios
//                 .get(url)
//                 .then(async (resp) => {
//                   const movies = resp.data;
//                   await redis.set("movies", JSON.stringify(movies));
//                   return res.send(movies);
//                 })
//                 .catch((err) => console.log(err));
//             }
//           } catch (err) {
//             console.log(err);
//           }
//     }
// }

// module.exports = Movie