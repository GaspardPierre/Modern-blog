import prisma from './prisma'
import { Tag } from '@/types'

export async function getAllTags(): Promise<Tag[]> {
  try {
    // Obtenir les tags avec le compte des posts publiés
    const tags = await prisma.tag.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        _count: {
          select: {
            posts: {
              where: {
                published: true // Ne compter que les posts publiés
              }
            }
          }
        },
        posts: {
          where: {
            published: true // Ne prendre que les posts publiés
          },
          select: {
            id: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    // Formater les données pour correspondre à notre type Tag
    const formattedTags = tags.map(tag => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      count: tag._count.posts,
      posts: tag.posts,
      createdAt: new Date(), // Ces champs sont requis par le type Tag
      updatedAt: new Date(), // mais pas nécessaires pour l'affichage
      videos: [] // Requis par le type Tag mais pas utilisé ici
    }))

    // Log pour debug
    console.log('Tags with counts:', formattedTags.map(tag => ({
      name: tag.name,
      slug: tag.slug,
      count: tag.count,
      actualPostsLength: tag.posts.length
    })))

    return formattedTags
  } catch (error) {
    console.error('Error fetching tags:', error)
    throw error
  }
}