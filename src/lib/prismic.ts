import Prismic from 'prismic-javascript'

export const apiEndpoint = 'https://devcommercenatanael.cdn.prismic.io/api/v2'

export const clientPrismic = (req = null) =>{
    const options =req ? {req} : null

    return Prismic.client(apiEndpoint, options)
}