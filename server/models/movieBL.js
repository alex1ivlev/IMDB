import Prisma from '@prisma/client'

const prisma = new Prisma.PrismaClient()

export async function getAllMovies() {
    return prisma.movie.findMany({});
}

export async function getMovieById(id) {
    return prisma.movie.findFirst({
        where: {id: parseInt(id)},
        include: {
            creator: true,
            tags: true
        }
    });
}

// [{name:"tag1"}, {name:"tag2"}]
// {
//   connectOrCreate: {
//      {
//          where: {name:"tag1"},
//          create:{name:"tag1"}
//       },
//      {
//          where: {name:"tag2"},
//          create:{name:"tag2"}
//       }
//    }
//  }
export async function addNewMovie(movie) {
    if (movie.tags !== undefined) {
        movie.tags = {
            connectOrCreate: movie.tags.map(t => {
                return {
                    where: t,
                    create: t
                }
            })
        }
    }

    return prisma.movie.create({
        data: movie,
        include: {
            creator: true,
            tags: true
        }
    });
}

export async function updateMovie(id, movie) {

    if (movie.tags !== undefined) {
        movie.tags = {
            set: [], //first we delete all the previous tags
            //then we connect or create our tags
            connectOrCreate: movie.tags.map(t => {
                return {
                    where: t,
                    create: t
                }
            })
        }
    }

    return prisma.movie.update({
        where: {
            id: parseInt(id)
        },
        data: movie,
        include: {
            creator: true,
            tags: true
        }
    })

}

export async function deleteMovie(id) {
    return prisma.movie.delete({
        where: {
            id: parseInt(id)
        }
    })
}

export async function addReview(review) {
    return prisma.review.create({
            data: review
        }
    )
}

export async function getAllReviews(movie_id) {
    return prisma.review.findMany({
        where: {
            movieId: parseInt(movie_id)
        }
    })
}

/*export async function addMovieToUser(user_id, movie) {
    return prisma.user.findOneAndUpdate({
            where: {
                id: parseInt(user_id)
            },
            data:{
                movies:{
                    connect: {
                        id: parseInt(movie.id),
                        title: movie.title,
                        description: movie.description
                    }
                }
            }
        }
    )
}

export async function addActorToMovie(movie_id, actor_id) {
    return prisma.movie.findOneAndUpdate({
            where: {
                id: parseInt(movie_id)
            },
            data:{
                actors:{
                    connect: {
                        id: parseInt(actor_id)
                    }
                }
            }
        }
    )
} */
